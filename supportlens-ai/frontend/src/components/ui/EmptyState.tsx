type EmptyStateProps = {
  icon?: string
  title: string
  description: string
  action?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  compact?: boolean
}

export function EmptyState({ icon, title, description, action, secondaryAction, compact }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8 px-4' : 'py-14 px-6'}`}>
      {icon && <span className={`mb-3 ${compact ? 'text-2xl' : 'text-4xl'}`}>{icon}</span>}
      <h3 className={`font-bold text-slate-800 ${compact ? 'text-xs' : 'text-sm'}`}>{title}</h3>
      <p className={`mt-1 text-slate-500 leading-relaxed ${compact ? 'text-[11px] max-w-xs' : 'text-xs max-w-md'}`}>
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="mt-4 flex items-center gap-2.5">
          {action && (
            <button
              onClick={action.onClick}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 transition cursor-pointer"
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
type SkeletonProps = { className?: string }
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/60 ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
      <Skeleton className="mb-3 h-3.5 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-2.5 h-3 w-40" />
    </div>
  )
}

// ── Error state ───────────────────────────────────────────────────────────────
type ErrorStateProps = { message: string; onRetry?: () => void }
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm font-bold text-rose-900">Application Error</p>
          <p className="mt-0.5 text-xs text-rose-800">{message}</p>
          {onRetry && (
            <button onClick={onRetry} className="mt-2 text-xs font-bold text-rose-900 underline hover:no-underline cursor-pointer">
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
