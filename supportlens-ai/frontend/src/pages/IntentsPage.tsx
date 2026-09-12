import { Brain, HelpCircle } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const PLANNED_INTENTS = [
  { name: 'Refund Request', desc: 'Customer requests money back for a transaction', escalation: 'high' },
  { name: 'Payment Issue', desc: 'Problem with charge, duplicate billing, incorrect amount', escalation: 'high' },
  { name: 'Delivery Problem', desc: 'Package lost, delayed, or damaged in transit', escalation: 'medium' },
  { name: 'Account Access', desc: 'Unable to log in, password reset, account locked', escalation: 'medium' },
  { name: 'Order Status', desc: 'Tracking, estimated delivery, order confirmation', escalation: 'low' },
  { name: 'Product Question', desc: 'Compatibility, features, specifications inquiry', escalation: 'low' },
  { name: 'Cancellation Request', desc: 'Cancel order, subscription, or service', escalation: 'medium' },
  { name: 'General Complaint', desc: 'Dissatisfaction with service or experience', escalation: 'high' },
]

export function IntentsPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Intent Intelligence Taxonomy"
        subtitle="Discover, train, and monitor customer intent categories — derived from actual brand support behavior in Phase 6."
        badge={{ label: 'Phase 6 Taxonomy', color: 'amber' }}
      />

      {/* Status Notice */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <Brain className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-900">Intent Discovery Pending Dataset Exploration</p>
            <p className="mt-0.5 text-xs text-amber-800">
              The intent taxonomy will be extracted from actual selected brand conversations in Phase 6.
              The categories below represent the <strong>planned 8–15 class taxonomy structure</strong>. No classifier metrics exist yet.
            </p>
          </div>
        </div>
      </div>

      {/* Planned Taxonomy Grid */}
      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          Planned Intent Taxonomy (8–15 Data-Driven Classes)
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PLANNED_INTENTS.map(intent => (
            <div
              key={intent.name}
              className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md"
            >
              <div className="mb-2 flex items-start justify-between">
                <p className="text-sm font-bold text-slate-900">{intent.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  intent.escalation === 'high'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : intent.escalation === 'medium'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {intent.escalation} risk
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{intent.desc}</p>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {['Macro F1', 'Precision', 'Recall'].map(m => (
                  <div key={m} className="rounded-xl bg-slate-50 border border-slate-100 py-1.5">
                    <p className="text-[9px] font-bold uppercase text-slate-400">{m}</p>
                    <p className="text-xs font-bold text-slate-300">—</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discovery Methodology */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <h3 className="mb-2 text-sm font-bold text-slate-900">Intent Discovery Methodology</h3>
        <ul className="space-y-1.5 text-xs text-slate-600">
          <li>• Intents will be mined from the target brand's real customer inquiries (not imported from artificial benchmark sets)</li>
          <li>• Merged when company resolution actions are identical; split when actions diverge</li>
          <li>• Each intent is paired with positive/negative keyword anchors and human escalation rules in <code className="font-mono text-indigo-600">configs/intents.yaml</code></li>
        </ul>
      </div>
    </div>
  )
}
