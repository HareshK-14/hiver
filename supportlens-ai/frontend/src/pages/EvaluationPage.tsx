import { BarChart3, AlertCircle, Sparkles, HelpCircle } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const METRICS_TABLE = [
  { metric: 'Intent Accuracy', trivial: null, simple: null, ai: null },
  { metric: 'Intent Macro F1', trivial: null, simple: null, ai: null },
  { metric: 'Intent Weighted F1', trivial: null, simple: null, ai: null },
  { metric: 'Escalation F1', trivial: null, simple: null, ai: null },
  { metric: 'False Auto-Handle Rate', trivial: null, simple: null, ai: null },
  { metric: 'Reply Quality (avg 1–5)', trivial: null, simple: null, ai: null },
  { metric: 'Groundedness Rate (%)', trivial: null, simple: null, ai: null },
]

function fmt(v: number | null) {
  return v !== null ? v.toFixed(3) : '—'
}

export function EvaluationPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Evaluation &amp; Model Benchmark"
        subtitle="Can we trust the system? Evidence-based performance measurement and comparison against baseline models."
        badge={{ label: 'Phase 15–20 Benchmark', color: 'amber' }}
        actions={
          <button
            disabled
            className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 px-3.5 py-2 text-xs font-bold text-indigo-700 opacity-60 cursor-not-allowed"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Run Benchmark Harness</span>
          </button>
        }
      />

      {/* Honest disclaimer notice */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-900">Evaluation Requires Golden Set Data</p>
            <p className="mt-0.5 text-xs text-amber-800 leading-relaxed">
              In accordance with strict ML evaluation standards: metrics are left unpopulated (<strong>—</strong>)
              until the Golden Set benchmark (Phase 7) is created and the evaluation pipeline (Phase 15) is executed.
              Zero simulated or fabricated numbers.
            </p>
          </div>
        </div>
      </div>

      {/* Headline Metric + "What is misleading about this number?" */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Headline Performance Metric
            </h2>
            <p className="text-sm font-bold text-slate-900">
              Primary Target: Intent Macro F1
            </p>
            <p className="mt-1 text-xs text-slate-500 max-w-xl">
              Macro F1 is intentionally prioritized over standard accuracy because class imbalance in customer support data
              causes models to score deceptively high while completely failing rare, high-urgency queries.
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-300 tracking-tight">—</span>
            <span className="text-xs font-bold text-slate-400">Target ≥ 0.85</span>
          </div>
        </div>

        {/* Section 34: "What is misleading about my headline number?" */}
        <div className="mt-5 rounded-xl border border-indigo-100 bg-gradient-to-r from-blue-50/40 via-indigo-50/30 to-purple-50/30 p-4">
          <div className="flex items-center gap-2 mb-2 text-indigo-950 font-bold text-xs">
            <HelpCircle className="h-4 w-4 text-indigo-600" />
            <span>What this headline metric does NOT measure</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-start gap-1.5">
              <span className="text-indigo-600 font-bold">·</span>
              <span><strong>Retrieval correctness:</strong> Macro F1 only checks intent labels, not retrieved evidence relevance.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-indigo-600 font-bold">·</span>
              <span><strong>Response groundedness:</strong> Does not verify whether draft replies hallucinate unmentioned company policies.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-indigo-600 font-bold">·</span>
              <span><strong>Escalation safety:</strong> Does not penalize dangerous autonomous replies to distressed customers.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-indigo-600 font-bold">·</span>
              <span><strong>Distribution shift:</strong> Sensitive to evaluation split sampling and customer vocabulary shifts over time.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Baseline Comparison Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Baseline Model Comparison</h2>
          <p className="text-xs text-slate-500">
            SupportLens AI must prove statistically significant improvement over trivial and simple baselines
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-semibold">
                <th className="px-6 py-3.5">Metric</th>
                <th className="px-4 py-3.5">Trivial Baseline (Majority Class)</th>
                <th className="px-4 py-3.5">Simple Baseline (TF-IDF + Ridge)</th>
                <th className="px-4 py-3.5 text-indigo-700 font-bold">SupportLens AI Copilot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {METRICS_TABLE.map(row => (
                <tr key={row.metric} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-800">{row.metric}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{fmt(row.trivial)}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{fmt(row.simple)}</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-300">{fmt(row.ai)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LLM Judge Calibration */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <h2 className="text-sm font-bold text-slate-900 mb-1">LLM Judge &amp; Human Calibration</h2>
        <p className="text-xs text-slate-500 mb-4">
          To ensure LLM-as-a-Judge scores reflect real human quality standards, automated ratings will be calibrated against human review using Spearman rank correlation.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Calibration Sample Size</p>
            <p className="mt-1 text-2xl font-black text-slate-300">—</p>
            <p className="mt-1 text-[11px] text-slate-400">Min 30 labeled pairs</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Spearman Rank Correlation (ρ)</p>
            <p className="mt-1 text-2xl font-black text-slate-300">—</p>
            <p className="mt-1 text-[11px] text-slate-400">Target ρ ≥ 0.70</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Human vs Model Scoring Delta</p>
            <p className="mt-1 text-2xl font-black text-slate-300">—</p>
            <p className="mt-1 text-[11px] text-slate-400">1–5 point Likert rubric</p>
          </div>
        </div>
      </div>
    </div>
  )
}
