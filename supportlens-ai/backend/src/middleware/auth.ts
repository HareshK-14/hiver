// SupportLens AI — Backend Authentication & Role Authorization Middleware
import { Request, Response, NextFunction } from 'express';

export type UserRole = 'ADMIN' | 'SUPPORT_AGENT' | 'ANALYST';

export type AuthUser = {
  email: string;
  role: UserRole;
  name: string;
};

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const DEMO_USERS: Record<string, AuthUser> = {
  'admin@supportlens.ai': {
    email: 'admin@supportlens.ai',
    role: 'ADMIN',
    name: 'System Administrator',
  },
  'agent@supportlens.ai': {
    email: 'agent@supportlens.ai',
    role: 'SUPPORT_AGENT',
    name: 'Tier 2 Support Specialist',
  },
  'analyst@supportlens.ai': {
    email: 'analyst@supportlens.ai',
    role: 'ANALYST',
    name: 'AI Evaluation Analyst',
  },
  // Backward compatibility for demo account
  'demo@supportlens.ai': {
    email: 'demo@supportlens.ai',
    role: 'ADMIN',
    name: 'Support Operations Lead',
  },
};

/**
 * Authentication Middleware
 * Validates Bearer token or demo authentication headers.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const headerRole = req.headers['x-user-role'] as string | undefined;
  const headerEmail = req.headers['x-user-email'] as string | undefined;

  let authenticatedUser: AuthUser | null = null;

  // 1. Check Bearer token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();

    if (token === 'demo-token-admin') {
      authenticatedUser = DEMO_USERS['admin@supportlens.ai'];
    } else if (token === 'demo-token-agent') {
      authenticatedUser = DEMO_USERS['agent@supportlens.ai'];
    } else if (token === 'demo-token-analyst') {
      authenticatedUser = DEMO_USERS['analyst@supportlens.ai'];
    } else if (token === 'demo-token-legacy') {
      authenticatedUser = DEMO_USERS['demo@supportlens.ai'];
    } else {
      // Try decoding base64 JSON token
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
        if (decoded && decoded.email && decoded.role) {
          const validRole = ['ADMIN', 'SUPPORT_AGENT', 'ANALYST'].includes(decoded.role)
            ? (decoded.role as UserRole)
            : null;
          if (validRole) {
            authenticatedUser = {
              email: decoded.email,
              role: validRole,
              name: decoded.name || decoded.email.split('@')[0],
            };
          }
        }
      } catch {
        // Invalid token format
      }
    }
  }

  // 2. Check x-user-role & x-user-email headers (for internal test/prototype calls)
  if (!authenticatedUser && headerRole) {
    const normalizedRole = headerRole.toUpperCase() as UserRole;
    if (['ADMIN', 'SUPPORT_AGENT', 'ANALYST'].includes(normalizedRole)) {
      const email = headerEmail || (normalizedRole === 'ADMIN' ? 'admin@supportlens.ai' : normalizedRole === 'SUPPORT_AGENT' ? 'agent@supportlens.ai' : 'analyst@supportlens.ai');
      authenticatedUser = DEMO_USERS[email] || {
        email,
        role: normalizedRole,
        name: email.split('@')[0],
      };
    }
  }

  if (!authenticatedUser) {
    res.status(401).json({
      error: 'Authentication required',
      code: 'UNAUTHORIZED',
      message: 'Provide a valid Authorization Bearer token or X-User-Role header',
    });
    return;
  }

  req.user = authenticatedUser;
  next();
}

/**
 * Role-Based Authorization Middleware
 * Rejects requests if user does not hold one of the specified allowed roles.
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // If not already authenticated, run requireAuth first
    if (!req.user) {
      requireAuth(req, res, () => {
        if (!req.user) return;
        verifyRole(req, res, next, allowedRoles);
      });
      return;
    }

    verifyRole(req, res, next, allowedRoles);
  };
}

function verifyRole(req: Request, res: Response, next: NextFunction, allowedRoles: UserRole[]): void {
  if (!req.user) {
    res.status(401).json({
      error: 'Authentication required',
      code: 'UNAUTHORIZED',
    });
    return;
  }

  if (!allowedRoles.includes(req.user.role)) {
    res.status(403).json({
      error: 'Access denied: insufficient permissions',
      code: 'FORBIDDEN',
      requiredRoles: allowedRoles,
      currentRole: req.user.role,
      message: `Endpoint requires one of the following roles: [${allowedRoles.join(', ')}]`,
    });
    return;
  }

  next();
}
