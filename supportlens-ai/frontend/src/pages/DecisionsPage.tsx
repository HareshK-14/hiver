import { PageHeader } from '../components/ui/PageHeader'

const DECISIONS = [
  {
    id: 1,
    title: 'App Factory Pattern for Express',
    phase: 'Phase 1',
    decision: 'createApp() returns the Express app; server.ts calls app.listen(). Tests use createApp() directly with supertest.',
    why: 'Allows unit/integration testing without binding a real TCP port. Standard pattern for robust Express microservices.',
    alternative: 'Export app from server.ts and call listen() there.',
    tradeoff: 'Slightly more indirection, but tests run isolated without port collision.',
    impact: 'All Jest tests run cleanly in CI and watch mode.',
  },
  {
    id: 2,
    title: 'Single Brand Strategy Over Cross-Brand Generic Model',
    phase: 'Phase 3',
    decision: 'Select ONE brand with high volume from the Twitter dataset and build the entire RAG copilot around that brand.',
    why: 'Cross-brand retrieval degrades evidence quality because brand return policies and workflows conflict.',
    alternative: 'Build a generic multi-brand index with noisy cross-company answers.',
    tradeoff: 'Less multi-tenant flexibility, but retrieved evidence is grounded and verifiable.',
    impact: 'Enables high precision retrieval and authentic evaluation.',
  },
  {
    id: 3,
    title: 'Tailwind v4 Utility Purity Without @apply',
    phase: 'Phase 1',
    decision: 'Use Tailwind utility classes directly in JSX. Strictly avoid @apply directives in CSS files.',
    why: 'Vite 8 Rolldown bundling and verbatimModuleSyntax throw silent build failures on dynamic CSS @apply rules.',
    alternative: 'Migrate to SCSS or styled-components.',
    tradeoff: 'Longer className attributes in JSX, but zero bundler failures and sub-second builds.',
    impact: 'Production builds run in < 1 second.',
  },
  {
    id: 4,
    title: 'Macro F1 as Headline Metric Over Accuracy',
    phase: 'Phase 15',
    decision: 'Intent Macro F1 is chosen as the primary model performance metric (not raw accuracy or weighted F1).',
    why: 'Customer support dataset distributions are heavily skewed towards shipping and login. Accuracy masks complete failure on rare intents.',
    alternative: 'Raw Accuracy (e.g. 91% accuracy while achieving 0% on fraud).',
    tradeoff: 'Macro F1 is more demanding on rare intent recall.',
    impact: 'Penalizes poor classification on rare, critical intent classes equally.',
  },
  {
    id: 5,
    title: 'False Auto-Handle Rate (FAHR) as Safety North Star',
    phase: 'Phase 12',
    decision: 'The primary automation safety metric is FAHR (target < 5%).',
    why: 'An incorrect autonomous response on a sensitive or billing inquiry is far more catastrophic than an unnecessary human escalation.',
    alternative: 'Escalation Precision or overall Automation Coverage %.',
    tradeoff: 'Minimizing FAHR slightly increases human review volume.',
    impact: 'Guarantees the system fails safely rather than catastrophically.',
  },
  {
    id: 6,
    title: 'Constrained Grounded Generation Over Creative Drafts',
    phase: 'Phase 13',
    decision: 'Reply generation is strictly conditioned on retrieved historical brand responses. Uncited statements are dropped.',
    why: 'LLMs naturally fabricate pleasant-sounding refund promises when unconstrained.',
    alternative: 'Creative few-shot prompting with post-hoc disclaimer tags.',
    tradeoff: 'Drafts may occasionally be more formal/conservative.',
    impact: 'Eliminates policy hallucinations that violate actual brand terms.',
  },
  {
    id: 7,
    title: 'Stratified Golden Set Held-Out Benchmark',
    phase: 'Phase 7',
    decision: 'Create a hand-labeled benchmark of 150–250 cases strictly isolated from vector index and prompt examples.',
    why: 'Evaluating RAG on training or retrieval corpus yields circular, meaningless 99% accuracy scores.',
    alternative: 'Random train/test split of tweets without duplicate checking.',
    tradeoff: 'Requires disciplined dataset curation and verification.',
    impact: 'Produces defensible, un-contaminated evaluation metrics.',
  },
  {
    id: 8,
    title: 'Human-Calibrated LLM-as-a-Judge',
    phase: 'Phase 20',
    decision: 'The automated LLM Judge must achieve Spearman correlation ≥ 0.70 against human review before benchmark scores are trusted.',
    why: 'Uncalibrated LLM judges suffer from position bias, verbosity bias, and leniency toward self-generated text.',
    alternative: 'Trusting uncalibrated GPT-4o-mini scores blindly.',
    tradeoff: 'Requires collecting 30+ human ratings for calibration.',
    impact: 'Establishes measurable statistical validity for evaluation scores.',
  },
  {
    id: 9,
    title: 'Deterministic Safety Overrides Before LLM Inference',
    phase: 'Phase 12',
    decision: 'Regex heuristics for PII, financial fraud, abusive language, and legal threats trigger escalation immediately without calling LLMs.',
    why: 'Faster (0ms latency, zero API cost) and deterministic (zero chance of LLM jailbreak or misunderstanding).',
    alternative: 'Asking the LLM in the prompt whether the query is safe.',
    tradeoff: 'Occasional keyword false alarms (e.g. customer saying "don\'t sue").',
    impact: 'Hard boundary protection for enterprise liability.',
  },
  {
    id: 10,
    title: 'Honest Zero-Data Representation Over Placeholders',
    phase: 'Phase 1',
    decision: 'All uncomputed metrics display as "—" and "Not evaluated yet". Zero fabricated mock values.',
    why: 'The core assignment evaluation criteria is proving the system works with measurable evidence, not demo marketing.',
    alternative: 'Populating the dashboard with hardcoded 94.2% numbers.',
    tradeoff: 'Dashboard shows empty states until pipelines run.',
    impact: 'Builds true user and stakeholder trust.',
  },
]

export function DecisionsPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Engineering Decision Log"
        subtitle="10 critical engineering decisions made during system architecture — detailing rationale, rejected alternatives, and trade-offs."
        badge={{ label: 'Architecture Records', color: 'blue' }}
      />

      <div className="space-y-4">
        {DECISIONS.map(d => (
          <div
            key={d.id}
            className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 shadow-2xs">
                  {d.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{d.title}</h3>
              </div>
              <span className="self-start sm:self-auto rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                {d.phase}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-800 mb-3">{d.decision}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Why this choice</p>
                <p className="text-slate-700 leading-relaxed">{d.why}</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Rejected Alternative</p>
                <p className="text-slate-700 leading-relaxed">{d.alternative}</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Engineering Trade-off</p>
                <p className="text-slate-700 leading-relaxed">{d.tradeoff}</p>
              </div>
              <div className="rounded-xl bg-emerald-50/60 border border-emerald-100 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5">Defensible Impact</p>
                <p className="text-emerald-950 font-medium leading-relaxed">{d.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
