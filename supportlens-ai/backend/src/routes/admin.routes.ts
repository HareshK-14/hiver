// SupportLens AI — Admin Protected Routes
import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';

export const adminRouter = Router();

// All routes under /api/admin require ADMIN role
adminRouter.use(requireAuth);
adminRouter.use(requireRole('ADMIN'));

// GET /api/admin/overview
adminRouter.get('/overview', (req, res) => {
  res.json({
    status: 'ok',
    role: req.user?.role,
    data: {
      totalUsers: 3,
      totalConversations: null,
      aiAnalyses: 0,
      autoHandleRate: null,
      escalationRate: null,
      intentMacroF1: null,
      replyQuality: null,
      systemHealth: 'OPERATIONAL',
      message: 'Admin oversight operational — live metrics populate after Phase 2 dataset & Phase 15 evaluation',
    },
  });
});

// GET /api/admin/users
adminRouter.get('/users', (_req, res) => {
  res.json({
    users: [
      {
        id: 'usr-1',
        name: 'System Administrator',
        email: 'admin@supportlens.ai',
        role: 'ADMIN',
        status: 'ACTIVE',
        lastActive: new Date().toISOString(),
        created: '2026-09-01T00:00:00.000Z',
      },
      {
        id: 'usr-2',
        name: 'Tier 2 Support Specialist',
        email: 'agent@supportlens.ai',
        role: 'SUPPORT_AGENT',
        status: 'ACTIVE',
        lastActive: new Date().toISOString(),
        created: '2026-09-02T00:00:00.000Z',
      },
      {
        id: 'usr-3',
        name: 'AI Evaluation Analyst',
        email: 'analyst@supportlens.ai',
        role: 'ANALYST',
        status: 'ACTIVE',
        lastActive: new Date().toISOString(),
        created: '2026-09-03T00:00:00.000Z',
      },
    ],
  });
});

// POST /api/admin/ai-settings (Admin only write)
adminRouter.post('/ai-settings', (req, res) => {
  const { llmModel, temperature, topK, escalationThreshold } = req.body;
  res.json({
    status: 'updated',
    updatedBy: req.user?.email,
    settings: {
      llmModel: llmModel || 'gpt-4o-mini',
      temperature: temperature ?? 0.2,
      topK: topK ?? 5,
      escalationThreshold: escalationThreshold ?? 0.5,
    },
  });
});

// GET /api/admin/audit
adminRouter.get('/audit', (_req, res) => {
  res.json({
    logs: [
      {
        time: new Date().toISOString(),
        user: 'admin@supportlens.ai',
        role: 'ADMIN',
        action: 'PLATFORM_INIT',
        resource: 'system_core',
        status: 'SUCCESS',
      },
    ],
  });
});
