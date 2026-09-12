import { useState } from 'react'
import { ChevronDown, ChevronUp, Cpu, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const STAGES = [
  {
    step: 1, name: 'Raw Twitter Dataset', status: 'pending', phase: 'Phase 2',
    purpose: 'Twitter Customer Support benchmark dataset (~3M customer tweets)',
    input: 'Kaggle download (twcs.csv)',
    output: 'data/raw/twcs.csv',
    tech: 'Kaggle CLI / Python CSV streaming',
    risks: ['Dataset format drift since publication', 'Duplicate conversation IDs'],
  },
  {
    step: 2, name: 'Data Cleaning & Normalization', status: 'pending', phase: 'Phase 4',
    purpose: 'Remove bot noise, retweets, non-English text, and incomplete threads',
    input: 'data/raw/twcs.csv',
    output: 'data/processed/cleaned.csv',
    tech: 'Python / pandas / langdetect',
    risks: ['Language detector false positives', 'Accidentally discarding valid short tweets'],
  },
  {
    step: 3, name: 'Conversation Builder & Threading', status: 'pending', phase: 'Phase 4',
    purpose: 'Reconstruct multi-turn dialog trees from reply_to_tweet_id graphs',
    input: 'data/processed/cleaned.csv',
    output: 'data/processed/conversations.json',
    tech: 'NetworkX / Graph traversal',
    risks: ['Orphaned tweets without root IDs', 'Cyclic reply references'],
  },
  {
    step: 4, name: 'Target Brand Selection', status: 'pending', phase: 'Phase 3',
    purpose: 'Select single brand with high volume and diverse intent coverage',
    input: 'data/processed/brand_statistics.csv',
    output: 'configs/config.yaml (target_brand)',
    tech: 'Statistical distributions / volume thresholding',
    risks: ['Brand volume dominated by single repetitive issue'],
  },
  {
    step: 5, name: 'Data-Driven Intent Discovery', status: 'pending', phase: 'Phase 6',
    purpose: 'Mined 8–15 realistic intent classes from actual brand resolutions',
    input: 'data/processed/conversations.json',
    output: 'configs/intents.yaml',
    tech: 'Semantic clustering + human curation',
    risks: ['Overly generic intent categories', 'Insufficient examples for rare classes'],
  },
  {
    step: 6, name: 'Intent Classifier & Calibration', status: 'pending', phase: 'Phase 11',
    purpose: 'Predict intent label with calibrated probability confidence',
    input: 'configs/intents.yaml + stratified training split',
    output: 'IntentPrediction with calibrated probability',
    tech: 'TF-IDF + Logistic Regression / Few-Shot LLM fallback',
    risks: ['Confidence overconfidence on out-of-distribution text', 'Intent boundary overlap'],
  },
  {
    step: 7, name: 'Historical Evidence Retrieval', status: 'pending', phase: 'Phase 10',
    purpose: 'Retrieve top-K similar past brand tickets and company responses',
    input: 'Customer message + Vector embedding index',
    output: 'Top-5 similar historical cases with similarity scores',
    tech: 'sentence-transformers (all-MiniLM-L6-v2) + BM25 hybrid',
    risks: ['Surface similarity without causal relevance', 'Outdated policy retrieval'],
  },
  {
    step: 8, name: 'Evidence Quality Assessment', status: 'pending', phase: 'Phase 10',
    purpose: 'Categorize retrieved evidence as STRONG, MEDIUM, or WEAK',
    input: 'Retrieved cases + similarity scores + resolution tags',
    output: 'EvidenceQuality rating + resolution consistency metric',
    tech: 'Heuristic consistency scoring & similarity thresholding',
    risks: ['Inconsistent resolutions across similar cases'],
  },
  {
    step: 9, name: 'Escalation Safety Engine', status: 'pending', phase: 'Phase 12',
    purpose: 'Determine AUTO_HANDLE vs ESCALATE with explicit risk reasoning',
    input: 'Intent confidence + Evidence quality + Keyword risk filters',
    output: 'EscalationDecision (AUTO_HANDLE / ESCALATE)',
    tech: 'Deterministic policy rules + safety boundaries',
    risks: ['False auto-handling of sensitive financial complaints'],
  },
  {
    step: 10, name: 'Evidence-Grounded Reply Generator', status: 'pending', phase: 'Phase 13',
    purpose: 'Draft grounded response strictly constrained to historical brand actions',
    input: 'Customer message + Intent + Retrieved historical cases',
    output: 'Grounded reply draft + quotation anchors',
    tech: 'LiteLLM / OpenAI API prompt constraint harness',
    risks: ['Model hallucinating non-existent customer perks or refunds'],
  },
  {
    step: 11, name: 'Evaluation Benchmark Harness', status: 'pending', phase: 'Phase 15',
    purpose: 'Execute full pipeline benchmark against held-out Golden Set',
    input: 'Golden Set (150–250 cases) + Pipeline outputs',
    output: 'Intent Macro F1, Groundedness %, FAHR %, Latency',
    tech: 'Python scikit-learn + LLM-as-a-Judge',
    risks: ['Judge misalignment with human quality criteria'],
  },
  {
    step: 12, name: 'Judge Calibration & Validation', status: 'pending', phase: 'Phase 20',
    purpose: 'Measure Spearman correlation between human ratings and LLM Judge',
    input: 'Sample of 30+ paired human/judge reviews',
    output: 'Spearman rank correlation report (target ≥ 0.70)',
    tech: 'Scipy stats / Cohen kappa / Spearman rho',
    risks: ['Low human annotator agreement on subjective tone'],
  },
]

export function ArchitecturePage() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null)

  const toggleStage = (step: number) => {
    setExpandedStage(expandedStage === step ? null : step)
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="AI Pipeline Architecture"
        subtitle="12-stage verified execution pipeline — each module is tested and evaluated independently before deployment."
        badge={{ label: 'Pipeline Architecture', color: 'blue' }}
      />

      <div className="space-y-3">
        {STAGES.map((stage, i) => {
          const isExpanded = expandedStage === stage.step
          return (
            <div key={stage.step}>
              <div
                onClick={() => toggleStage(stage.step)}
                className={`rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md transition-all hover:border-indigo-300 cursor-pointer ${
                  isExpanded ? 'ring-2 ring-indigo-500/20' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 shadow-2xs">
                      {stage.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{stage.name}</h3>
                        <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.2 text-[10px] font-semibold text-slate-500">
                          {stage.phase}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{stage.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-indigo-600 hidden sm:inline">
                      {isExpanded ? 'Click to collapse' : 'Click for specs'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs animate-in fade-in slide-in-from-top-1">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Input</p>
                      <p className="text-slate-800 font-medium">{stage.input}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Output</p>
                      <p className="text-slate-800 font-medium">{stage.output}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Technology</p>
                      <p className="text-slate-800 font-medium">{stage.tech}</p>
                    </div>
                    <div className="rounded-xl bg-rose-50/50 p-3 border border-rose-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700 mb-0.5">Failure Risks</p>
                      <ul className="text-rose-950 space-y-0.5">
                        {stage.risks.map((r, ri) => (
                          <li key={ri}>· {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting vertical gradient bar */}
              {i < STAGES.length - 1 && (
                <div className="ml-7 my-1 h-3 w-0.5 bg-gradient-to-b from-indigo-300 to-purple-300" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
