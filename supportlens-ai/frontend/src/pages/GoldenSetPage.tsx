import { Database, Lock } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'

export function GoldenSetPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Golden Evaluation Benchmark"
        subtitle="150–250 hand-labelled ground truth examples for evaluating the AI pipeline — strictly held-out from training and retrieval."
        badge={{ label: 'Phase 7 Benchmark', color: 'amber' }}
      />

      {/* Target Stats */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {[
          { label: 'Target Benchmark Size', value: '0 / 200', note: 'Stratified sampling' },
          { label: 'Intent Coverage', value: '—', note: 'Min 10 per category' },
          { label: 'Escalation Balance', value: '—', note: '50/50 target' },
          { label: 'Dataset Contamination', value: '0.0%', note: 'Zero leak policy' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Isolation Notice */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/60 p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Strict Benchmark Isolation Policy</p>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              The Golden Set is completely excluded from the vector index, embedding cache, few-shot prompt examples,
              and classifier training splits. This prevents artificial overfitting and ensures true generalization measurement.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Benchmark Examples</h2>
          <p className="text-xs text-slate-500">Curated and audited customer support cases</p>
        </div>
        <EmptyState
          icon="⭐"
          title="Golden Set Pending Creation"
          description="Benchmark dataset creation occurs in Phase 7 following target brand selection and data cleaning."
        />
      </div>
    </div>
  )
}
