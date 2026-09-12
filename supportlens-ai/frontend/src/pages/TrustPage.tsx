import { ShieldCheck, Target, FileSearch, ShieldAlert, Sparkles, AlertOctagon, ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const TRUST_SECTIONS = [
  {
    icon: FileSearch,
    title: 'Grounding & Evidence Retrieval',
    accent: 'border-l-4 border-l-blue-500 bg-white/90',
    head: 'text-blue-950',
    status: 'Heuristic & Embedding Search',
    description: 'Every reply draft must cite specific historical brand cases as evidence. Claims without evidence are flagged as "unsupported." Groundedness is scored by the LLM Judge.',
    items: [
      'Reply generation is strictly constrained to retrieved evidence',
      'Unsupported claims are flagged rather than silently hallucinated',
      'Groundedness percentage is reported per response',
    ],
  },
  {
    icon: Target,
    title: 'Calibrated Confidence',
    accent: 'border-l-4 border-l-indigo-500 bg-white/90',
    head: 'text-indigo-950',
    status: 'Probability Calibrated',
    description: 'The classifier emits calibrated confidence scores for customer intent. Confidence directly dictates the escalation threshold — low confidence triggers immediate human triage.',
    items: [
      'Intent confidence is a calibrated probability, not a raw heuristic score',
      'Default auto-handling threshold: 75% confidence',
      'Misclassification risk is continuously logged in the failure center',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Automation Safety & FAHR',
    accent: 'border-l-4 border-l-emerald-500 bg-white/90',
    head: 'text-emerald-950',
    status: 'Safety Boundary Enforced',
    description: 'Safety is primarily measured by the False Auto-Handle Rate (FAHR). An erroneous autonomous response on a sensitive or financial case is considered a critical safety breach.',
    items: [
      'Primary safety metric: False Auto-Handle Rate (target < 5%)',
      'Account-specific and billing requests default to escalation',
      'Unresolved customer sentiment triggers human specialist handoff',
    ],
  },
  {
    icon: AlertOctagon,
    title: 'Explainable Escalation Boundaries',
    accent: 'border-l-4 border-l-amber-500 bg-white/90',
    head: 'text-amber-950',
    status: 'Deterministic Rule Engine',
    description: 'Escalation decisions are explainable. Every escalation includes a reason, detected risk signals, and the evidence gap that prevented automated response.',
    items: [
      'Explicit reason is provided for every escalation decision',
      'Risk signals (financial keywords, PII, urgent distress) are categorized',
      'Core philosophy: When in doubt, escalate',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Known System Limitations',
    accent: 'border-l-4 border-l-rose-500 bg-white/90',
    head: 'text-rose-950',
    status: 'Explicitly Documented',
    description: 'Do NOT trust the system to autonomously handle: legal/compliance questions, account credentials/passwords, abusive customers, multi-lingual non-English queries, or issues with zero historical precedent.',
    items: [
      'Password resets & credentials (require secure human authentication)',
      'Legal disputes & regulatory compliance claims',
      'Novel issue types with zero historical evidence',
      'Non-English support interactions',
    ],
  },
]

export function TrustPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Trust Center & Safety Governance"
        subtitle="Understand how SupportLens decides when to automate — and when to escalate to human specialists."
        badge={{ label: 'Evidence-First Architecture', color: 'blue' }}
      />

      {/* ── Visual Trust Pipeline (Section 32) ─────────────────────────── */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-50/60 via-indigo-50/50 to-purple-50/40 p-6 shadow-2xs backdrop-blur-md">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
          Trust Verification Pipeline
        </h2>
        <p className="text-xs text-slate-600 mb-5">
          Autonomous support requires proving reliability across each link in the decision chain before generating customer replies.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {[
            { step: '01', title: 'Evidence Retrieval', desc: 'Cosine similarity ≥ 0.60', color: 'bg-blue-600' },
            { step: '02', title: 'Confidence Check', desc: 'Classifier prob ≥ 75%', color: 'bg-indigo-600' },
            { step: '03', title: 'Risk Filter', desc: 'Zero financial/PII flags', color: 'bg-purple-600' },
            { step: '04', title: 'Decision Gate', desc: 'AUTO-HANDLE vs ESCALATE', color: 'bg-emerald-600' },
            { step: '05', title: 'Grounded Reply', desc: 'LLM Judge verified', color: 'bg-cyan-600' },
          ].map((node, i) => (
            <div key={node.step} className="relative flex flex-col justify-between rounded-xl border border-white/80 bg-white/90 p-4 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${node.color} text-[10px] font-bold text-white`}>
                    {node.step}
                  </span>
                  {i < 4 && (
                    <span className="hidden sm:inline text-xs text-slate-400 font-bold">→</span>
                  )}
                </div>
                <p className="text-xs font-bold text-slate-900">{node.title}</p>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Readiness Framework */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Decision Readiness Framework</h2>
        <p className="text-xs text-slate-500 mb-4">
          Rather than relying on a single deceptive confidence percentage, the system evaluates 5 orthogonal readiness signals:
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: 'Intent Confidence', factor: 'Classifier probability calibration' },
            { label: 'Evidence Strength', factor: 'Volume of historical brand precedents' },
            { label: 'Resolution Consistency', factor: 'Coherence of historical solutions' },
            { label: 'Risk Signals', factor: 'Financial, account, or compliance tags' },
            { label: 'Reply Groundedness', factor: 'Verification that citations match evidence' },
          ].map(item => (
            <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{item.label}</p>
              <p className="text-[11px] text-slate-600 font-medium">{item.factor}</p>
            </div>
          ))}
        </div>

        {/* Readiness States */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-center">
            <p className="text-sm font-black text-emerald-800">READY</p>
            <p className="mt-0.5 text-xs text-emerald-700">All 5 readiness factors positive. Safe to auto-handle.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-center">
            <p className="text-sm font-black text-amber-800">REVIEW</p>
            <p className="mt-0.5 text-xs text-amber-700">Ambiguity or medium evidence detected. Human review required.</p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-center">
            <p className="text-sm font-black text-rose-800">ESCALATE</p>
            <p className="mt-0.5 text-xs text-rose-700">High risk, low confidence, or policy exclusion. Must not auto-handle.</p>
          </div>
        </div>
      </div>

      {/* Trust & Safety Policy Sections */}
      <div className="space-y-4">
        {TRUST_SECTIONS.map(section => {
          const SectionIcon = section.icon
          return (
            <div key={section.title} className={`rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] ${section.accent}`}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 shadow-2xs">
                  <SectionIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h3 className={`text-sm font-bold ${section.head}`}>{section.title}</h3>
                    <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {section.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{section.description}</p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
