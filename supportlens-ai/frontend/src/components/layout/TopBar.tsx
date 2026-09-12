import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Settings, LogOut, ShieldCheck, Menu, X } from 'lucide-react'
import { useHealth } from '../../hooks/useHealth'
import { useAuth } from '../../context/AuthContext'

type TopBarProps = {
  onMenuClick: () => void
  targetBrand?: string | null
}

export function TopBar({ onMenuClick, targetBrand }: TopBarProps) {
  const { status, latencyMs, health } = useHealth()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const isOk = status === 'ok'

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut '/' to trigger search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  const handleLogout = () => {
    setProfileOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setSearchOpen(false)
    navigate(`/evidence?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.02)] transition-colors lg:left-64 sm:px-6">
        {/* Left Side: Mobile Menu + System Status Badges */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <button
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm hover:bg-slate-50 lg:hidden cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Quick search button trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-xl border border-slate-200/90 bg-white/70 px-3.5 py-1.5 text-xs text-slate-500 shadow-sm transition hover:border-indigo-300 hover:bg-white hover:text-slate-800 sm:flex cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search intelligence…</span>
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-2xs">
              /
            </kbd>
          </button>

          {/* System status pills */}
          <div className="hidden items-center gap-2 md:flex">
            {/* API Health */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-2.5 py-1 text-[11px] shadow-2xs text-emerald-800">
              <span className={`h-2 w-2 rounded-full ${isOk ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="font-semibold">
                {isOk ? `API ${latencyMs !== null ? `${latencyMs}ms` : 'Online'}` : 'API Offline'}
              </span>
            </div>

            {/* Brand Status */}
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-[11px] shadow-2xs">
              <span className="font-semibold text-slate-400">Brand:</span>
              <span className="font-bold text-slate-700">
                {targetBrand ?? 'Not configured'}
              </span>
            </div>

            {/* Phase info */}
            <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/60 px-2.5 py-1 text-[11px] shadow-2xs text-indigo-700">
              <span className="font-semibold">Phase:</span>
              <span className="font-bold">{health?.phase ?? 'Phase 1 — Setup'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Status Pills, Notifications, User Menu */}
        <div className="flex items-center gap-2.5">
          {/* Dataset & Evaluation Pills */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-full border border-amber-200/80 bg-amber-50/80 px-2.5 py-1 text-[11px] font-bold text-amber-700 shadow-2xs">
              Dataset: Not configured
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-2xs">
              Last Eval: Not evaluated
            </span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Notifications
                  </h4>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    0 new
                  </span>
                </div>
                <div className="py-6 text-center">
                  <span className="text-2xl">🔔</span>
                  <p className="mt-2 text-xs font-bold text-slate-800">
                    No new notifications
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Live events, evaluation alerts, and dataset updates will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100/70 cursor-pointer"
              aria-label="User menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 text-xs font-bold text-white shadow-md shadow-indigo-500/20">
                {user?.avatar || 'SA'}
              </div>
              <div className="hidden text-left xl:block">
                <p className="text-xs font-bold text-slate-800 leading-none">
                  {user?.name || 'Support Lead'}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                      user?.role === 'ADMIN'
                        ? 'bg-indigo-100 text-indigo-700'
                        : user?.role === 'SUPPORT_AGENT'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {user?.role ? user.role.replace('SUPPORT_', '') : 'ADMIN'}
                  </span>
                </div>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                {/* User card header */}
                <div className="border-b border-slate-100 p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white">
                      {user?.avatar || 'SA'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || 'Support Lead'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user?.email || 'admin@supportlens.ai'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                    <span>
                      Role:{' '}
                      <strong className="text-indigo-700">
                        {user?.role === 'ADMIN'
                          ? 'Administrator'
                          : user?.role === 'SUPPORT_AGENT'
                          ? 'Support Agent'
                          : 'AI Analyst'}
                      </strong>
                    </span>
                    <span className="rounded bg-indigo-100 px-1 py-0.2 text-indigo-700 font-bold">Demo</span>
                  </div>
                </div>

                {/* Dropdown Links */}
                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      if (user?.role === 'ADMIN') navigate('/admin/dashboard')
                      else if (user?.role === 'SUPPORT_AGENT') navigate('/agent/dashboard')
                      else navigate('/analyst/dashboard')
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-indigo-700 font-bold hover:bg-indigo-50 cursor-pointer"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    My Role Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      navigate('/settings')
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                  >
                    <Settings className="h-4 w-4 text-slate-400" />
                    Settings &amp; Configuration
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      navigate('/trust')
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                  >
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    Trust &amp; Safety Policy
                  </button>
                </div>

                {/* Divider and Logout */}
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command / Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/30 backdrop-blur-sm pt-20 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <Search className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search across conversations, evidence, intents, failures…"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

            <div className="mt-4 px-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quick Navigation
              </p>
              <div className="mt-2 space-y-1 text-xs">
                {[
                  { label: 'AI Agent Workspace', path: '/agent' },
                  { label: 'Evidence Explorer', path: '/evidence' },
                  { label: 'Evaluation Dashboard', path: '/evaluation' },
                  { label: 'Human Escalation Center', path: '/escalations' },
                ].map(item => (
                  <button
                    key={item.path}
                    onClick={() => {
                      setSearchOpen(false)
                      navigate(item.path)
                    }}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="font-mono text-[10px] text-slate-400">{item.path}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
