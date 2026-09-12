import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

type PageHeaderProps = {
  title: string
  subtitle?: string
  backTo?: string
  actions?: React.ReactNode
  badge?: { label: string; color?: 'amber' | 'blue' | 'green' | 'red' }
}

const BADGE_COLORS = {
  amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
  blue: 'bg-blue-50 text-blue-800 border-blue-200/80',
  green: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  red: 'bg-rose-50 text-rose-800 border-rose-200/80',
}

export function PageHeader({ title, subtitle, backTo, actions, badge }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {backTo && (
            <button
              onClick={() => navigate(backTo)}
              className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            {badge && (
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${BADGE_COLORS[badge.color ?? 'amber']}`}>
                {badge.label}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-shrink-0 items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  )
}
