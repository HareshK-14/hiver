import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Search,
  Brain,
  AlertTriangle,
  BarChart3,
  AlertCircle,
  Database,
  ShieldCheck,
  Cpu,
  FileText,
  Settings,
  X,
  Sparkles,
  Headphones,
  UserCheck,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types'

type NavItem = {
  label: string
  to: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

function getRoleNavGroups(role?: UserRole): { groups: NavGroup[]; label: string; pillColor: string } {
  switch (role) {
    case 'SUPPORT_AGENT':
      return {
        label: 'Agent Triage Workspace',
        pillColor: 'bg-teal-50 text-teal-700 border-teal-200/80',
        groups: [
          {
            title: 'Overview',
            items: [
              {
                label: 'Agent Dashboard',
                to: '/agent/dashboard',
                icon: LayoutDashboard,
              },
            ],
          },
          {
            title: 'Support Tools',
            items: [
              {
                label: 'AI Copilot',
                to: '/agent',
                icon: Bot,
              },
              {
                label: 'Inbox & Tickets',
                to: '/conversations',
                icon: MessageSquare,
              },
              {
                label: 'Evidence Search',
                to: '/evidence',
                icon: Search,
              },
              {
                label: 'Escalation Queue',
                to: '/escalations',
                icon: AlertTriangle,
              },
            ],
          },
          {
            title: 'Knowledge & Trust',
            items: [
              {
                label: 'Intent Catalog',
                to: '/intents',
                icon: Brain,
              },
              {
                label: 'Trust & Safety Policy',
                to: '/trust',
                icon: ShieldCheck,
              },
            ],
          },
        ],
      }

    case 'ANALYST':
      return {
        label: 'AI Evaluation Suite',
        pillColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
        groups: [
          {
            title: 'Overview',
            items: [
              {
                label: 'Analyst Dashboard',
                to: '/analyst/dashboard',
                icon: LayoutDashboard,
              },
            ],
          },
          {
            title: 'Evaluation & Benchmarks',
            items: [
              {
                label: 'Benchmark Suite',
                to: '/evaluation',
                icon: BarChart3,
              },
              {
                label: 'Failure Analysis',
                to: '/failures',
                icon: AlertCircle,
              },
              {
                label: 'Golden Benchmark Set',
                to: '/golden-set',
                icon: Database,
              },
              {
                label: 'Intent Intelligence',
                to: '/intents',
                icon: Brain,
              },
            ],
          },
          {
            title: 'Evidence & Governance',
            items: [
              {
                label: 'Evidence Explorer',
                to: '/evidence',
                icon: Search,
              },
              {
                label: 'Trust Center',
                to: '/trust',
                icon: ShieldCheck,
              },
              {
                label: 'Architecture Decisions',
                to: '/decisions',
                icon: FileText,
              },
            ],
          },
        ],
      }

    case 'ADMIN':
    default:
      return {
        label: 'Operations & Control',
        pillColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        groups: [
          {
            title: 'Overview',
            items: [
              {
                label: 'Admin Dashboard',
                to: '/admin/dashboard',
                icon: LayoutDashboard,
              },
            ],
          },
          {
            title: 'Operations',
            items: [
              {
                label: 'AI Copilot Pipeline',
                to: '/agent',
                icon: Bot,
              },
              {
                label: 'Conversation Logs',
                to: '/conversations',
                icon: MessageSquare,
              },
              {
                label: 'Evidence Retrieval',
                to: '/evidence',
                icon: Search,
              },
              {
                label: 'Intent Intelligence',
                to: '/intents',
                icon: Brain,
              },
              {
                label: 'Escalation Center',
                to: '/escalations',
                icon: AlertTriangle,
              },
            ],
          },
          {
            title: 'Evaluation & Audit',
            items: [
              {
                label: 'Evaluation Dashboard',
                to: '/evaluation',
                icon: BarChart3,
              },
              {
                label: 'Failure Signals',
                to: '/failures',
                icon: AlertCircle,
              },
              {
                label: 'Golden Dataset',
                to: '/golden-set',
                icon: Database,
              },
              {
                label: 'Trust Center',
                to: '/trust',
                icon: ShieldCheck,
              },
            ],
          },
          {
            title: 'System Control',
            items: [
              {
                label: 'Architecture',
                to: '/architecture',
                icon: Cpu,
              },
              {
                label: 'Decision Log',
                to: '/decisions',
                icon: FileText,
              },
              {
                label: 'AI Settings',
                to: '/settings',
                icon: Settings,
              },
            ],
          },
        ],
      }
  }
}

type SidebarProps = {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user } = useAuth()
  const { groups, label, pillColor } = getRoleNavGroups(user?.role)

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar container (Light Aurora / Lavender-Blue Theme) */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200/80 bg-gradient-to-b from-[#F8FAFF] via-[#F3F5FD] to-[#F5F3FF] text-slate-800 shadow-[4px_0_24px_rgba(15,23,42,0.03)] backdrop-blur-xl transition-transform duration-250 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Subtle Decorative Ambient Glows */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-36 w-36 rounded-full bg-blue-200/50 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 -right-16 h-36 w-36 rounded-full bg-purple-200/50 blur-2xl" />

        {/* Top Logo Container */}
        <div className="relative z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200/70 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold tracking-tight text-slate-900">SupportLens</span>
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200/60">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500">Support Intelligence Copilot</p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Workspace Pill tailored to role */}
        <div className="relative z-10 px-4 pt-3.5 pb-1">
          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-800 truncate">{label}</span>
            </div>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${pillColor}`}>
              {user?.role ? user.role.replace('SUPPORT_', '') : 'LIVE'}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="thin-scroll relative z-10 flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {groups.map(group => (
            <div key={group.title}>
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map(item => {
                  const ItemIcon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/80 text-indigo-950 font-semibold shadow-sm border border-indigo-100/80'
                            : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active Left Indicator Accent Bar */}
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-indigo-600" />
                          )}
                          <ItemIcon
                            className={`h-4 w-4 transition-colors ${
                              isActive
                                ? 'text-indigo-600'
                                : 'text-slate-400 group-hover:text-indigo-500'
                            }`}
                          />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-indigo-100/60 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-600">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer info box with Role Info */}
        <div className="relative z-10 flex-shrink-0 border-t border-slate-200/70 bg-white/60 p-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700 truncate">{user?.name || 'SupportLead'}</span>
            <span className="rounded-full border border-indigo-200 bg-indigo-50/80 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
              {user?.role || 'ADMIN'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Environment: Demo</span>
            <span>Hiver SDE</span>
          </div>
        </div>
      </aside>
    </>
  )
}

