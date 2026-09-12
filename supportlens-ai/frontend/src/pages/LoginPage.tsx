import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Sparkles, CheckCircle2, ArrowRight, Lock, Mail, Eye, EyeOff, ShieldCheck, Headphones, BarChart3, UserCheck } from 'lucide-react'
import { useAuth, getRoleDashboardRoute, DEMO_CREDENTIALS } from '../context/AuthContext'
import type { UserRole } from '../types'

export function LoginPage() {
  const { login, loginAsRole, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForgotModal, setShowForgotModal] = useState(false)

  // If already authenticated, redirect to role-specific dashboard
  if (isAuthenticated && user) {
    return <Navigate to={getRoleDashboardRoute(user.role)} replace />
  }

  const handleFillDemo = (role: UserRole) => {
    const creds: Record<UserRole, { email: string; pass: string }> = {
      ADMIN: { email: 'admin@supportlens.ai', pass: 'admin123' },
      SUPPORT_AGENT: { email: 'agent@supportlens.ai', pass: 'agent123' },
      ANALYST: { email: 'analyst@supportlens.ai', pass: 'analyst123' },
    }
    setEmail(creds[role].email)
    setPassword(creds[role].pass)
    setError(null)
  }

  const handleQuickLogin = async (role: UserRole) => {
    setError(null)
    setLoading(true)
    try {
      const res = await loginAsRole(role)
      if (!res.success) {
        setError(res.error || 'Quick authentication failed.')
      } else {
        navigate(getRoleDashboardRoute(role), { replace: true })
      }
    } catch {
      setError('An unexpected error occurred during quick sign in.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await login(email, password, rememberMe)
      if (!res.success) {
        setError(res.error || 'Authentication failed.')
      } else {
        const trimmedEmail = email.trim().toLowerCase()
        const userRole: UserRole =
          DEMO_CREDENTIALS[trimmedEmail]?.role ||
          (trimmedEmail.includes('agent')
            ? 'SUPPORT_AGENT'
            : trimmedEmail.includes('analyst')
            ? 'ANALYST'
            : 'ADMIN')
        navigate(getRoleDashboardRoute(userRole), { replace: true })
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* ── LIGHT AURORA BACKGROUND BLOBS ──────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 bg-light-aurora" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-200/50 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[650px] w-[650px] rounded-full bg-purple-200/45 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full bg-cyan-100/50 blur-[130px]" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 grid min-h-screen w-full lg:grid-cols-12">
        {/* ── LEFT SIDE: Brand & Abstract AI Pipeline Flow ───────────────── */}
        <div className="relative hidden flex-col justify-between border-r border-slate-200/70 bg-gradient-to-br from-white/70 via-indigo-50/30 to-purple-50/40 p-10 backdrop-blur-xl lg:col-span-7 lg:flex xl:col-span-7 xl:p-14">
          {/* Top Brand Header */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900">SupportLens</span>
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200/70">
                    AI
                  </span>
                </div>
                <p className="text-xs text-slate-500">Evidence-First Customer Support Intelligence</p>
              </div>
            </div>

            <div className="mt-8 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Hiver SDE Intern Assignment · Production-Grade Copilot
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 xl:text-4xl leading-tight">
                "Understand the customer. Find the evidence.{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Decide with confidence.
                </span>"
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Built to safely analyze customer-support messages, retrieve grounded historical brand resolutions, calibrate decision confidence, and enforce human escalation safety boundaries.
              </p>
            </div>
          </div>

          {/* Decorative AI Decision Flow Pipeline (Light Theme Cards) */}
          <div className="my-8 max-w-xl rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Evidence-First Decision Flow
                </span>
              </div>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                Grounded Pipeline
              </span>
            </div>

            {/* Pipeline Visual Stages */}
            <div className="space-y-2.5 font-sans">
              {/* Step 1: Customer Input */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 shadow-2xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700">
                  01
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-900">Customer Message</p>
                    <span className="text-[10px] text-slate-400 font-mono">Sanitized</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">"I was charged twice on my credit card..."</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center text-xs text-indigo-400 -my-1 font-bold">↓</div>

              {/* Step 2: Intent Classification */}
              <div className="flex items-center gap-3 rounded-xl border border-indigo-200/80 bg-indigo-50/50 p-3 shadow-2xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-sm">
                  02
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-indigo-900">Intent Intelligence</p>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      92% Confidence
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">Duplicate Payment · Calibrated</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center text-xs text-purple-400 -my-1 font-bold">↓</div>

              {/* Step 3: Historical Evidence */}
              <div className="flex items-center gap-3 rounded-xl border border-purple-200/80 bg-purple-50/40 p-3 shadow-2xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white shadow-sm">
                  03
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-purple-900">Historical Evidence Explorer</p>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      STRONG EVIDENCE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">5 brand historical resolutions retrieved · 88% consistency</p>
                </div>
              </div>

              {/* Connector Split */}
              <div className="flex items-center justify-center gap-6 text-[10px] text-slate-400 -my-0.5 font-mono">
                <span>↙ Automation Safety</span>
                <span>↘ Grounded Reply</span>
              </div>

              {/* Step 4: Decision & Grounded Reply */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-2.5 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Decision Safety</p>
                  <p className="text-xs font-bold text-slate-900">AUTO-HANDLE / ESCALATE</p>
                  <p className="text-[10px] text-slate-500">Target FAHR &lt; 5%</p>
                </div>
                <div className="rounded-xl border border-cyan-200/80 bg-cyan-50/60 p-2.5 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">Grounded Reply</p>
                  <p className="text-xs font-bold text-slate-900">Evidence-Constrained</p>
                  <p className="text-[10px] text-slate-500">Zero Hallucination</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Feature Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Intent Intelligence
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Evidence-Grounded Replies
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Human Escalation Safety
            </span>
          </div>
        </div>

        {/* ── RIGHT SIDE: Light Aurora Login Form ─────────────────────────── */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-5 lg:p-12 xl:col-span-5 xl:p-16">
          {/* Mobile Top Brand (visible on small screens) */}
          <div className="flex items-center justify-between lg:hidden mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-slate-900">SupportLens AI</span>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
              Demo Environment
            </span>
          </div>

          <div className="my-auto mx-auto w-full max-w-md">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/90 px-2.5 py-0.5 text-xs font-bold text-indigo-700 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                Demo Environment
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Sign in to your SupportLens workspace to access the intelligence dashboard.
              </p>
            </div>

            {/* 3-Role Demo Fast Switcher Box */}
            <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Select Demo Role (3 Distinct Workspaces)
                  </span>
                </div>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                  Instant Access
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Admin Card */}
                <div className="group flex flex-col justify-between rounded-xl border border-blue-200/80 bg-gradient-to-b from-blue-50/70 to-indigo-50/50 p-2.5 transition hover:border-indigo-400 hover:shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                        Admin
                      </span>
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-slate-800">Ops &amp; Control</p>
                    <p className="font-mono text-[9px] text-slate-500">admin@supportlens.ai</p>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleQuickLogin('ADMIN')}
                      className="flex-1 rounded-lg bg-indigo-600 py-1 text-[10px] font-bold text-white shadow-2xs transition hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('ADMIN')}
                      title="Autofill form"
                      className="rounded-lg border border-indigo-200 bg-white px-1.5 py-1 text-[9px] font-semibold text-indigo-700 hover:bg-indigo-50 cursor-pointer"
                    >
                      Fill
                    </button>
                  </div>
                </div>

                {/* Support Agent Card */}
                <div className="group flex flex-col justify-between rounded-xl border border-cyan-200/80 bg-gradient-to-b from-cyan-50/60 to-emerald-50/40 p-2.5 transition hover:border-cyan-400 hover:shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-teal-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                        Agent
                      </span>
                      <Headphones className="h-3.5 w-3.5 text-teal-600" />
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-slate-800">Workspace &amp; Triage</p>
                    <p className="font-mono text-[9px] text-slate-500">agent@supportlens.ai</p>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleQuickLogin('SUPPORT_AGENT')}
                      className="flex-1 rounded-lg bg-teal-600 py-1 text-[10px] font-bold text-white shadow-2xs transition hover:bg-teal-700 cursor-pointer disabled:opacity-50"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('SUPPORT_AGENT')}
                      title="Autofill form"
                      className="rounded-lg border border-teal-200 bg-white px-1.5 py-1 text-[9px] font-semibold text-teal-700 hover:bg-teal-50 cursor-pointer"
                    >
                      Fill
                    </button>
                  </div>
                </div>

                {/* Analyst Card */}
                <div className="group flex flex-col justify-between rounded-xl border border-purple-200/80 bg-gradient-to-b from-purple-50/70 to-violet-50/50 p-2.5 transition hover:border-purple-400 hover:shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-purple-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                        Analyst
                      </span>
                      <BarChart3 className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-slate-800">Evals &amp; Benchmarks</p>
                    <p className="font-mono text-[9px] text-slate-500">analyst@supportlens.ai</p>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleQuickLogin('ANALYST')}
                      className="flex-1 rounded-lg bg-purple-600 py-1 text-[10px] font-bold text-white shadow-2xs transition hover:bg-purple-700 cursor-pointer disabled:opacity-50"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('ANALYST')}
                      title="Autofill form"
                      className="rounded-lg border border-purple-200 bg-white px-1.5 py-1 text-[9px] font-semibold text-purple-700 hover:bg-purple-50 cursor-pointer"
                    >
                      Fill
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 flex items-start gap-2.5 animate-shake shadow-2xs">
                <span className="text-base">⚠️</span>
                <div>
                  <p className="font-bold text-rose-900">Authentication Error</p>
                  <p className="mt-0.5 text-rose-700">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="e.g. demo@supportlens.ai"
                    className="w-full rounded-xl border border-slate-200 bg-white/90 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-2xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white/90 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-2xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember my session
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    <span>Sign in to SupportLens</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200/80 pt-6 text-center">
              <p className="text-xs text-slate-500 font-medium">
                AI support intelligence workspace · Evidence-First Architecture
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Hiver SDE Intern Assignment · Built with React 19, TypeScript &amp; Tailwind CSS
              </p>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="text-center text-[10px] text-slate-400 mt-6">
            🔒 Demo authentication uses local session storage. Production integrates with SSO / OAuth2.
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="text-base font-bold text-slate-900">Demo Environment Access</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This application is configured in <strong>Demo Mode</strong> for the Hiver SDE evaluation. Password reset is not required.
            </p>
            <div className="mt-3 space-y-1.5 rounded-xl bg-slate-50 p-3 border border-slate-200 text-xs font-mono text-slate-700">
              <div><strong className="text-indigo-700">Admin:</strong> admin@supportlens.ai / admin123</div>
              <div><strong className="text-teal-700">Agent:</strong> agent@supportlens.ai / agent123</div>
              <div><strong className="text-purple-700">Analyst:</strong> analyst@supportlens.ai / analyst123</div>
            </div>
            <button
              onClick={() => {
                setShowForgotModal(false)
                handleFillDemo('ADMIN')
              }}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 cursor-pointer"
            >
              Autofill Admin &amp; Return to Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
