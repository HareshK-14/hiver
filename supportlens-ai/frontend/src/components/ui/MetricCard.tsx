import React from 'react'
import {
  MessageSquare,
  Bot,
  Target,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
} from 'lucide-react'

type MetricCardProps = {
  label: string
  value: number | string | null
  unit?: string
  description?: string
  accent?: 'blue' | 'green' | 'violet' | 'cyan' | 'teal' | 'rose' | 'amber'
  icon?: 'messages' | 'bot' | 'target' | 'sparkles' | 'shield' | 'alert' | 'userCheck'
  trend?: 'up' | 'down' | 'stable' | null
  notEvaluated?: boolean
  action?: { label: string; onClick: () => void }
}

const ACCENT_STYLES = {
  blue: {
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    topLine: 'border-t-blue-500',
    valColor: 'text-blue-900',
  },
  green: {
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    topLine: 'border-t-emerald-500',
    valColor: 'text-emerald-900',
  },
  violet: {
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    topLine: 'border-t-purple-500',
    valColor: 'text-purple-900',
  },
  cyan: {
    iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
    topLine: 'border-t-cyan-500',
    valColor: 'text-cyan-900',
  },
  teal: {
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    topLine: 'border-t-teal-500',
    valColor: 'text-teal-900',
  },
  rose: {
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    topLine: 'border-t-rose-500',
    valColor: 'text-rose-900',
  },
  amber: {
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    topLine: 'border-t-amber-500',
    valColor: 'text-amber-900',
  },
}

function renderLucideIcon(type?: string) {
  switch (type) {
    case 'messages':
      return <MessageSquare className="h-4 w-4" />
    case 'bot':
      return <Bot className="h-4 w-4" />
    case 'target':
      return <Target className="h-4 w-4" />
    case 'sparkles':
      return <Sparkles className="h-4 w-4" />
    case 'shield':
      return <ShieldCheck className="h-4 w-4" />
    case 'alert':
      return <AlertTriangle className="h-4 w-4" />
    case 'userCheck':
      return <UserCheck className="h-4 w-4" />
    default:
      return null
  }
}

export function MetricCard({
  label,
  value,
  unit,
  description,
  accent = 'blue',
  icon,
  notEvaluated,
  action,
}: MetricCardProps) {
  const style = ACCENT_STYLES[accent] || ACCENT_STYLES.blue

  return (
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] hover:border-slate-300/90">
      {/* Top row: small colored icon + uppercase label */}
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${style.iconBg} shadow-2xs`}>
            {renderLucideIcon(icon)}
          </div>
        )}
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>

      {/* Middle: Large metric value */}
      <div className="mt-3.5">
        {notEvaluated || value === null ? (
          <div>
            <p className="text-3xl font-extrabold text-slate-300 tracking-tight">—</p>
            {action ? (
              <button
                onClick={action.onClick}
                className="mt-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
              >
                {action.label}
              </button>
            ) : (
              <p className="mt-1 text-xs text-slate-400">Not evaluated yet</p>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-xs font-bold text-slate-500">{unit}</span>}
            </div>
            {description && (
              <p className="mt-1 text-xs text-slate-500 leading-snug">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
