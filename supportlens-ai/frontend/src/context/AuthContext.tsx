import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User, UserRole } from '../types'

export type { User, UserRole }

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>
  loginAsRole: (role: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'supportlens_auth'
const TOKEN_KEY = 'supportlens_token'
const ROLE_KEY = 'supportlens_role'
const EMAIL_KEY = 'supportlens_email'

export const DEMO_CREDENTIALS: Record<string, { role: UserRole; name: string; avatar: string; pass: string; token: string }> = {
  'admin@supportlens.ai': {
    role: 'ADMIN',
    name: 'System Administrator',
    avatar: 'AD',
    pass: 'admin123',
    token: 'demo-token-admin',
  },
  'agent@supportlens.ai': {
    role: 'SUPPORT_AGENT',
    name: 'Tier 2 Support Specialist',
    avatar: 'AG',
    pass: 'agent123',
    token: 'demo-token-agent',
  },
  'analyst@supportlens.ai': {
    role: 'ANALYST',
    name: 'AI Evaluation Analyst',
    avatar: 'AN',
    pass: 'analyst123',
    token: 'demo-token-analyst',
  },
  // Backward compatibility
  'demo@supportlens.ai': {
    role: 'ADMIN',
    name: 'Support Operations Lead',
    avatar: 'SO',
    pass: 'demo123',
    token: 'demo-token-admin',
  },
}

export function getRoleDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard'
    case 'SUPPORT_AGENT':
      return '/agent/dashboard'
    case 'ANALYST':
      return '/analyst/dashboard'
    default:
      return '/login'
  }
}

function persistUser(user: User, rememberMe: boolean) {
  const store = rememberMe ? localStorage : sessionStorage
  const cleanStore = rememberMe ? sessionStorage : localStorage
  try {
    cleanStore.removeItem(STORAGE_KEY)
    cleanStore.removeItem(TOKEN_KEY)
    cleanStore.removeItem(ROLE_KEY)
    cleanStore.removeItem(EMAIL_KEY)

    store.setItem(STORAGE_KEY, JSON.stringify(user))
    if (user.token) store.setItem(TOKEN_KEY, user.token)
    store.setItem(ROLE_KEY, user.role)
    store.setItem(EMAIL_KEY, user.email)
  } catch {
    // Storage fallback
  }
}

function clearPersistedUser() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    localStorage.removeItem(EMAIL_KEY)

    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(ROLE_KEY)
    sessionStorage.removeItem(EMAIL_KEY)
  } catch {
    // Storage fallback
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as User
        setUser(parsed)
      }
    } catch {
      clearPersistedUser()
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail) {
      return { success: false, error: 'Please enter your email.' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }

    if (!password) {
      return { success: false, error: 'Please enter your password.' }
    }

    const demoEntry = DEMO_CREDENTIALS[trimmedEmail]
    if (demoEntry) {
      if (demoEntry.pass !== password) {
        return { success: false, error: `Invalid password for ${demoEntry.role.toLowerCase()} account. Check demo credentials.` }
      }

      const newUser: User = {
        email: trimmedEmail,
        name: demoEntry.name,
        role: demoEntry.role,
        avatar: demoEntry.avatar,
        isDemo: true,
        token: demoEntry.token,
      }

      setUser(newUser)
      persistUser(newUser, rememberMe)
      return { success: true }
    }

    // Generic fallback for any other demo user if formatted correctly
    if (trimmedEmail.endsWith('@supportlens.ai') && password.length >= 6) {
      const role: UserRole = trimmedEmail.includes('agent')
        ? 'SUPPORT_AGENT'
        : trimmedEmail.includes('analyst')
        ? 'ANALYST'
        : 'ADMIN'

      const newUser: User = {
        email: trimmedEmail,
        name: trimmedEmail.split('@')[0],
        role,
        avatar: role.slice(0, 2),
        isDemo: true,
        token: `demo-token-${role.toLowerCase()}`,
      }

      setUser(newUser)
      persistUser(newUser, rememberMe)
      return { success: true }
    }

    return {
      success: false,
      error: 'Invalid credentials. Please select one of the 3 role demo accounts.',
    }
  }

  const loginAsRole = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    const emailByRole: Record<UserRole, string> = {
      ADMIN: 'admin@supportlens.ai',
      SUPPORT_AGENT: 'agent@supportlens.ai',
      ANALYST: 'analyst@supportlens.ai',
    }
    const email = emailByRole[role]
    const entry = DEMO_CREDENTIALS[email]
    if (!entry) return { success: false, error: 'Role account not found' }

    return login(email, entry.pass, true)
  }

  const logout = () => {
    setUser(null)
    clearPersistedUser()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
