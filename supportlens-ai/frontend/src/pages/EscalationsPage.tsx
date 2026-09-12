import { useState } from 'react'
import { ShieldAlert, AlertTriangle } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'

const TABS = ['All Cases', 'High Risk', 'Low Confidence', 'Weak Evidence', 'Financial / PII']

export function EscalationsPage() {
  const [activeTab, setActiveTab] = useState('All Cases')

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Human Escalation Center"
        subtitle="Cases recommended for human review — triage, approve auto-replies, or maintain escalation boundaries."
        badge={{ label: 'Phase 14 Queue', color: 'red' }}
      />

      {/* Escalation Policy Banner */}
      <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/70 to-orange-50/50 p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-950">
              Escalation Safety Policy: When in Doubt, Escalate
            </p>
            <p className="mt-0.5 text-xs text-rose-900 leading-relaxed">
              The agent defaults to human escalation whenever classifier confidence is &lt; 75%, evidence strength is WEAK,
              or sensitive financial / account-specific keywords are detected. The False Auto-Handle Rate (FAHR) is the primary safety benchmark.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-white/90 p-1.5 shadow-2xs backdrop-blur-md">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>{tab}</span>
            <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
              activeTab === tab ? 'bg-rose-200/60 text-rose-900' : 'bg-slate-100 text-slate-500'
            }`}>
              0
            </span>
          </button>
        ))}
      </div>

      {/* Main Empty State */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <EmptyState
          icon="🛡️"
          title="Escalation Queue Empty"
          description="When the AI Copilot detects low confidence, weak evidence, or sensitive keywords during message analysis, cases will appear here for human review."
        />
      </div>
    </div>
  )
}
