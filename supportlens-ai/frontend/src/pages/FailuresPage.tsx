import { AlertOctagon, HelpCircle, Search, Cpu, MessageSquare } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const FAILURE_MODES = [
  {
    id: 1,
    type: 'Intent Ambiguity / Multi-Intent Collision',
    severity: 'MEDIUM' as const,
    frequency: '—',
    example: '"I need to cancel my subscription and get a refund for last month\'s charge"',
    expected: 'Detect multi-intent or route to human escalation queue',
    actual: 'Single intent predicted with split confidence (~48% cancel / 45% refund)',
    hypothesis: 'Model lacks multi-label thresholding for compound customer requests',
    fix: 'Implement multi-intent detector and enforce ambiguity escalation rules',
    icon: HelpCircle,
  },
  {
    id: 2,
    type: 'Weak Retrieval / Semantic Drift',
    severity: 'HIGH' as const,
    frequency: '—',
    example: '"The mobile app keeps crashing during biometric facial authentication"',
    expected: 'Retrieve app-crash troubleshooting guides or escalate',
    actual: 'Retrieved general login reset instructions with weak similarity (0.54)',
    hypothesis: 'Vocabulary gap between customer crash descriptions and support macros',
    fix: 'Augment historical index with BM25 hybrid lexical scoring and intent pre-filters',
    icon: Search,
  },
  {
    id: 3,
    type: 'Unsupported Policy Claims (Hallucination)',
    severity: 'HIGH' as const,
    frequency: '—',
    example: '"Will I be refunded within 24 hours if I return this tomorrow?"',
    expected: 'Quote official 3–5 business day policy from retrieved evidence',
    actual: 'Draft response promises instantaneous same-day processing',
    hypothesis: 'Generator prompt not sufficiently constrained to retrieved context snippets',
    fix: 'Enforce strict LLM Judge groundedness verifier and discard ungrounded drafts',
    icon: AlertOctagon,
  },
  {
    id: 4,
    type: 'Incorrect Auto-Handling (Safety Breach)',
    severity: 'HIGH' as const,
    frequency: '—',
    example: '"Someone hacked my card and made three unauthorized transactions"',
    expected: 'Immediate ESCALATE TO HUMAN with Critical Risk Tag',
    actual: 'Auto-handled with generic FAQ payment dispute macro',
    hypothesis: 'Security keywords (hacked, unauthorized) bypassed heuristic risk filter',
    fix: 'Add deterministic safety regex overrides to force immediate human escalation',
    icon: AlertOctagon,
  },
  {
    id: 5,
    type: 'Multi-Turn Context Amnesia',
    severity: 'LOW' as const,
    frequency: '—',
    example: '"Yes, that is what I meant by my previous tweet"',
    expected: 'Incorporate preceding context turn into analysis payload',
    actual: 'Classified in isolation as general confirmation without context',
    hypothesis: 'Single-turn input pipeline loses conversation thread history',
    fix: 'Include sliding conversation history buffer in input request schema',
    icon: MessageSquare,
  },
]

const SEVERITY_STYLES = {
  HIGH: 'bg-rose-50 text-rose-800 border-rose-200',
  MEDIUM: 'bg-amber-50 text-amber-800 border-amber-200',
  LOW: 'bg-blue-50 text-blue-800 border-blue-200',
}

export function FailuresPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Failure Mode Analysis &amp; Mitigations"
        subtitle="Where does the AI pipeline fail? Transparent root-cause documentation and mitigation engineering."
        badge={{ label: 'Phase 18 Analysis', color: 'amber' }}
      />

      {/* Notice */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 shadow-2xs">
        <p className="text-sm font-bold text-amber-900">
          Anticipated Failure Taxonomies (Pre-Evaluation)
        </p>
        <p className="mt-0.5 text-xs text-amber-800">
          The 5 failure modes below represent core vulnerability categories identified during architecture design.
          Actual empirical frequencies and failure distributions will be populated following Phase 18 evaluation runs.
        </p>
      </div>

      {/* Failure Cards */}
      <div className="space-y-4">
        {FAILURE_MODES.map(mode => {
          const ModeIcon = mode.icon
          return (
            <div
              key={mode.id}
              className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-2xs">
                    <ModeIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{mode.type}</h3>
                    <p className="text-xs text-slate-500">Observed in edge-case exploration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${SEVERITY_STYLES[mode.severity]}`}>
                    Severity: {mode.severity}
                  </span>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    Freq: {mode.frequency}
                  </span>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Example Customer Trigger
                  </p>
                  <p className="text-slate-700 italic">{mode.example}</p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Expected Safe Behavior
                  </p>
                  <p className="text-slate-700">{mode.expected}</p>
                </div>

                <div className="rounded-xl bg-rose-50/50 border border-rose-100 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                    Observed Model Failure
                  </p>
                  <p className="text-rose-950 font-medium">{mode.actual}</p>
                </div>

                <div className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                    Root-Cause Hypothesis &amp; Engineering Fix
                  </p>
                  <p className="text-indigo-950">{mode.hypothesis} <span className="font-bold text-indigo-700">→ Fix:</span> {mode.fix}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
