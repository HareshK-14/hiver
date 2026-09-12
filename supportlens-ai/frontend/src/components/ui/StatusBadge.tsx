import { Check, AlertTriangle, ShieldCheck } from 'lucide-react'
import type { EvidenceStrength, DecisionType, RiskLevel } from '../../types'

// ── Decision badge ────────────────────────────────────────────────────────────
type DecisionBadgeProps = { decision: DecisionType | null; size?: 'sm' | 'md' | 'lg' }
export function DecisionBadge({ decision, size = 'sm' }: DecisionBadgeProps) {
  if (!decision) return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-400 font-medium">—</span>
  const sizeClass = size === 'lg' ? 'px-4 py-1.5 text-sm' : size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-xs'
  const style = decision === 'AUTO_HANDLE'
    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
    : 'bg-rose-50 text-rose-800 border border-rose-200/80 shadow-2xs'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider ${sizeClass} ${style}`}>
      {decision === 'AUTO_HANDLE' ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span>Auto-Handle</span>
        </>
      ) : (
        <>
          <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
          <span>Escalate</span>
        </>
      )}
    </span>
  )
}

// ── Evidence strength badge ───────────────────────────────────────────────────
type EvidenceBadgeProps = { strength: EvidenceStrength | null; size?: 'sm' | 'md' }
export function EvidenceBadge({ strength, size = 'sm' }: EvidenceBadgeProps) {
  if (!strength || strength === 'NONE') return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-400 font-medium">—</span>
  const sizeClass = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-xs'
  const styles: Record<EvidenceStrength, string> = {
    STRONG: 'bg-cyan-50 text-cyan-800 border border-cyan-200/80',
    MEDIUM: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    WEAK: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    NONE: 'bg-slate-100 text-slate-400 border border-slate-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider shadow-2xs ${sizeClass} ${styles[strength]}`}>
      {strength === 'STRONG' && <ShieldCheck className="h-3 w-3 text-cyan-600" />}
      <span>{strength}</span>
    </span>
  )
}

// ── Risk badge ────────────────────────────────────────────────────────────────
type RiskBadgeProps = { risk: RiskLevel | null }
export function RiskBadge({ risk }: RiskBadgeProps) {
  if (!risk) return null
  const styles: Record<RiskLevel, string> = {
    LOW: 'bg-slate-100 text-slate-700 border border-slate-200',
    MEDIUM: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    HIGH: 'bg-rose-50 text-rose-800 border border-rose-200/80',
    CRITICAL: 'bg-rose-600 text-white',
  }
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${styles[risk]}`}>{risk}</span>
}

// ── Confidence bar ────────────────────────────────────────────────────────────
type ConfidenceBarProps = { value: number | null; label?: string }
export function ConfidenceBar({ value, label }: ConfidenceBarProps) {
  if (value === null) return <span className="text-xs text-slate-400">—</span>
  const pct = Math.round(value * 100)
  const color = pct >= 80 ? 'bg-indigo-600' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex justify-between text-xs text-slate-600">
          <span>{label}</span>
          <span className="font-bold text-slate-800">{pct}%</span>
        </div>
      )}
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-1.5 rounded-full ${color} transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-[10px] text-slate-400">Model confidence score</p>
    </div>
  )
}

// ── Phase badge ───────────────────────────────────────────────────────────────
type PhaseBadgeProps = { phase: string }
export function PhaseBadge({ phase }: PhaseBadgeProps) {
  return (
    <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
      {phase}
    </span>
  )
}

// ── Status pill ───────────────────────────────────────────────────────────────
type StatusPillProps = { ok: boolean; label?: string }
export function StatusPill({ ok, label }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80' : 'bg-rose-50 text-rose-800 border border-rose-200/80'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      {label ?? (ok ? 'Operational' : 'Offline')}
    </span>
  )
}
