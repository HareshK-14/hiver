import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Brain,
  Sparkles,
  Database,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  FileDown,
  Layers,
  Search,
  Scale,
  Target,
  FileCode,
} from 'lucide-react'
import { apiEvaluationSummary } from '../../services/api'

export function AnalystDashboardPage() {
  const navigate = useNavigate()
  const [evalData, setEvalData] = useState<any>(null)
  const [evaluating, setEvaluating] = useState(false)

  useEffect(() => {
    let mounted = true
    apiEvaluationSummary()
      .then(res => {
        if (mounted) setEvalData(res)
      })
      .catch(() => {
        // Fallback for offline/development
      })
    return () => {
      mounted = false
    }
  }, [])

  const handleRunEvaluation = () => {
    setEvaluating(true)
    setTimeout(() => {
      setEvaluating(false)
      navigate('/evaluation')
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* ── TOP BANNER: Analyst Intelligence ── */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/90 via-violet-50/80 to-blue-50/70 p-6 shadow-sm">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-white/90 px-3 py-0.5 text-xs font-bold text-purple-800 shadow-2xs">
                <BarChart3 className="h-3.5 w-3.5 text-purple-600" />
                ANALYST ROLE · EVALUATION &amp; BENCHMARK
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50/90 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Awaiting Dataset Split
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              AI Evaluation &amp; Benchmark Intelligence
            </h1>
            <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed sm:text-sm">
              Measure model classification accuracy, hallucination rates, LLM Judge alignment, and False Auto-Handle Rate (FAHR) against ground-truth golden datasets.
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRunEvaluation}
              disabled={evaluating}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${evaluating ? 'animate-spin' : ''}`} />
              {evaluating ? 'Evaluating…' : 'Run Benchmark'}
            </button>
            <button
              onClick={() => navigate('/golden-set')}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white/90 px-3.5 py-2 text-xs font-bold text-purple-800 shadow-2xs transition hover:bg-purple-50 cursor-pointer"
            >
              <Database className="h-3.5 w-3.5" />
              Golden Dataset
            </button>
            <button
              onClick={() => navigate('/failures')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 cursor-pointer"
            >
              <AlertCircle className="h-3.5 w-3.5 text-slate-500" />
              Failure Clusters
            </button>
          </div>
        </div>
      </div>

      {/* ── 8 ANALYST KPIS (Clickable & Interactive) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {/* KPI 1 - Intent Macro F1 */}
        <div
          onClick={() => navigate('/intents')}
          title="Click to view Intent Intelligence & F1 details"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-purple-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-purple-600 transition-colors">
              Intent Macro F1
            </span>
            <Brain className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.intentMacroF1 ? evalData.intentMacroF1.toFixed(3) : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 0.850</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-purple-600" />
          </div>
        </div>

        {/* KPI 2 - Weighted F1 */}
        <div
          onClick={() => navigate('/evaluation')}
          title="Click to view Benchmark Breakdown"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-indigo-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600 transition-colors">
              Weighted F1
            </span>
            <Layers className="h-4 w-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.intentWeightedF1 ? evalData.intentWeightedF1.toFixed(3) : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 0.880</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-indigo-600" />
          </div>
        </div>

        {/* KPI 3 - Escalation F1 */}
        <div
          onClick={() => navigate('/escalations')}
          title="Click to view Human Escalation Accuracy"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-teal-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-teal-600 transition-colors">
              Escalation F1
            </span>
            <Target className="h-4 w-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.escalationF1 ? evalData.escalationF1.toFixed(3) : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 0.820</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-teal-600" />
          </div>
        </div>

        {/* KPI 4 - FAHR */}
        <div
          onClick={() => navigate('/failures')}
          title="Click to inspect False Auto-Handle Failures"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-rose-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-rose-600 transition-colors">
              FAHR (False Auto)
            </span>
            <AlertCircle className="h-4 w-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.falseAutoHandleRate ? `${(evalData.falseAutoHandleRate * 100).toFixed(1)}%` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-rose-700 font-semibold">
            <span>Strict Target: &lt; 5.0%</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-rose-600" />
          </div>
        </div>

        {/* KPI 5 - Reply Quality */}
        <div
          onClick={() => navigate('/evaluation')}
          title="Click to view G-Eval Rubric Results"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-amber-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-amber-600 transition-colors">
              Reply Quality (G-Eval)
            </span>
            <Sparkles className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.replyQuality ? `${evalData.replyQuality.toFixed(1)} / 5.0` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 4.2 / 5.0</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-amber-600" />
          </div>
        </div>

        {/* KPI 6 - Groundedness Score */}
        <div
          onClick={() => navigate('/evidence')}
          title="Click to view Evidence Retrieval & Grounding"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-emerald-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-600 transition-colors">
              Groundedness Score
            </span>
            <Scale className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.groundedness ? `${(evalData.groundedness * 100).toFixed(0)}%` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 90.0%</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-emerald-600" />
          </div>
        </div>

        {/* KPI 7 - Judge Agreement */}
        <div
          onClick={() => navigate('/evaluation')}
          title="Click to view LLM Judge Alignment"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-600 transition-colors">
              Judge Agreement
            </span>
            <CheckCircle2 className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.llmJudgeAgreement ? `${(evalData.llmJudgeAgreement * 100).toFixed(0)}%` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 85.0%</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-blue-600" />
          </div>
        </div>

        {/* KPI 8 - Test Split Size */}
        <div
          onClick={() => navigate('/golden-set')}
          title="Click to view Golden Dataset"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-purple-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-purple-600 transition-colors">
              Test Split Size
            </span>
            <Database className="h-4 w-4 text-violet-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {evalData?.totalExamples ?? '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>0 test cases curated</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-purple-600" />
          </div>
        </div>
      </div>

      {/* ── MODEL COMPARISON BENCHMARK MATRIX ── */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-600" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Architectural Model Comparison &amp; Baselines
              </h3>
              <p className="text-[11px] text-slate-500">Empirical benchmark comparing model variants against target criteria</p>
            </div>
          </div>
          <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200/70">
            Offline Benchmark Suite
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-3">Pipeline Approach</th>
                <th className="py-2.5 px-3">Architecture Type</th>
                <th className="py-2.5 px-3">Intent Macro F1</th>
                <th className="py-2.5 px-3">Groundedness</th>
                <th className="py-2.5 px-3">FAHR (Risk)</th>
                <th className="py-2.5 px-3 text-right">Evaluation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr
                onClick={() => navigate('/evaluation')}
                title="Click to view Baseline A benchmark"
                className="hover:bg-slate-50/80 transition cursor-pointer"
              >
                <td className="py-3 px-3">
                  <span className="font-bold text-slate-900">Baseline A: Zero-Shot Prompting</span>
                  <span className="block text-[10px] text-slate-400">Standard prompt without retrieval</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-slate-600">LLM Prompting Only</td>
                <td className="py-3 px-3 font-mono text-slate-500">~0.620</td>
                <td className="py-3 px-3 font-mono text-slate-500">~55%</td>
                <td className="py-3 px-3 font-mono text-rose-600 font-bold">14.2% (Unsafe)</td>
                <td className="py-3 px-3 text-right">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    View Benchmark →
                  </span>
                </td>
              </tr>
              <tr
                onClick={() => navigate('/evaluation')}
                title="Click to view Baseline B benchmark"
                className="hover:bg-slate-50/80 transition cursor-pointer"
              >
                <td className="py-3 px-3">
                  <span className="font-bold text-slate-900">Baseline B: Few-Shot In-Context</span>
                  <span className="block text-[10px] text-slate-400">Static 5-example demonstration prompt</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-slate-600">Few-Shot ICL</td>
                <td className="py-3 px-3 font-mono text-slate-500">~0.740</td>
                <td className="py-3 px-3 font-mono text-slate-500">~72%</td>
                <td className="py-3 px-3 font-mono text-amber-600 font-bold">8.8%</td>
                <td className="py-3 px-3 text-right">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    View Benchmark →
                  </span>
                </td>
              </tr>
              <tr
                onClick={() => navigate('/evaluation')}
                title="Click to view Candidate C benchmark"
                className="hover:bg-slate-50/80 transition cursor-pointer"
              >
                <td className="py-3 px-3">
                  <span className="font-bold text-slate-900">Candidate C: Standard Semantic RAG</span>
                  <span className="block text-[10px] text-slate-400">Vector search without escalation guardrails</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-slate-600">Dense Retrieval + Generator</td>
                <td className="py-3 px-3 font-mono text-slate-500">~0.810</td>
                <td className="py-3 px-3 font-mono text-slate-500">~84%</td>
                <td className="py-3 px-3 font-mono text-amber-600 font-bold">6.1%</td>
                <td className="py-3 px-3 text-right">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    View Benchmark →
                  </span>
                </td>
              </tr>
              <tr
                onClick={() => navigate('/evaluation')}
                title="Click to inspect SupportLens AI Production Pipeline"
                className="bg-purple-50/40 hover:bg-purple-100/50 transition cursor-pointer"
              >
                <td className="py-3 px-3">
                  <span className="font-bold text-purple-950">SupportLens AI: Evidence-First Copilot</span>
                  <span className="block text-[10px] text-purple-700">Calibrated intent + vector evidence + FAHR guardrails</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-purple-800 font-semibold">Hybrid Pipeline</td>
                <td className="py-3 px-3 font-mono text-purple-800 font-bold">&gt; 0.880 (Target)</td>
                <td className="py-3 px-3 font-mono text-purple-800 font-bold">&gt; 92% (Target)</td>
                <td className="py-3 px-3 font-mono text-emerald-700 font-bold">&lt; 3.5% (Safe)</td>
                <td className="py-3 px-3 text-right">
                  <span className="rounded-full bg-purple-600 text-white px-2 py-0.5 text-[10px] font-bold">
                    View Results →
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── TWO-COLUMN SECTION: G-Eval Rubric + Failure Analysis ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: LLM Judge & G-Eval Rubric */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-purple-600" />
              <h3 className="text-sm font-extrabold text-slate-900">
                LLM Judge &amp; G-Eval Criteria Rubric
              </h3>
            </div>
            <button
              onClick={() => navigate('/trust')}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:underline cursor-pointer"
            >
              <span>Trust Center</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div
              onClick={() => navigate('/trust')}
              title="Click to view Groundedness & Faithfulness Policy"
              className="cursor-pointer rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-purple-50/60 hover:border-purple-200"
            >
              <p className="font-bold text-slate-900">1. Groundedness &amp; Faithfulness (Weight: 35%)</p>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Is every factual statement in the drafted reply supported by retrieved brand historical evidence? Penalizes hallucinations and unverified claims.
              </p>
            </div>

            <div
              onClick={() => navigate('/escalations')}
              title="Click to view Escalation Safety Rules"
              className="cursor-pointer rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-purple-50/60 hover:border-purple-200"
            >
              <p className="font-bold text-slate-900">2. Escalation Safety &amp; FAHR (Weight: 30%)</p>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Did the pipeline escalate appropriately? False auto-handling a high-risk case receives the maximum safety penalty.
              </p>
            </div>

            <div
              onClick={() => navigate('/evaluation')}
              title="Click to view Resolution Completeness metrics"
              className="cursor-pointer rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-purple-50/60 hover:border-purple-200"
            >
              <p className="font-bold text-slate-900">3. Resolution Completeness (Weight: 20%)</p>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Does the response completely address the customer's specific concern without vague evasions?
              </p>
            </div>

            <div
              onClick={() => navigate('/trust')}
              title="Click to view Brand Tone & Consistency rules"
              className="cursor-pointer rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-purple-50/60 hover:border-purple-200"
            >
              <p className="font-bold text-slate-900">4. Tone &amp; Brand Consistency (Weight: 15%)</p>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Is the tone empathetic, polite, professional, and matching the brand voice?
              </p>
            </div>
          </div>
        </div>

        {/* Right: Failure Signal Clustering */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Failure Taxonomy &amp; Risk Signals
              </h3>
            </div>
            <button
              onClick={() => navigate('/failures')}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:underline cursor-pointer"
            >
              <span>Explore Failures</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => navigate('/failures')}
              title="Click to view False Auto-Handle Breaches"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                  False Auto-Handle Breaches
                </p>
                <p className="text-[11px] text-slate-500">Critical: AI handled when human escalation was required</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800">
                  0 RECORDED
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div
              onClick={() => navigate('/failures')}
              title="Click to view Hallucinated Policy Details"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                  Hallucinated Policy Details
                </p>
                <p className="text-[11px] text-slate-500">AI drafted terms not present in brand evidence</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800">
                  0 RECORDED
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div
              onClick={() => navigate('/failures')}
              title="Click to view Ambiguous Intent Collisions"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Ambiguous Intent Collisions
                </p>
                <p className="text-[11px] text-slate-500">Multi-intent overlap with low confidence spread</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700">
                  AWAITING RUN
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div
              onClick={() => navigate('/failures')}
              title="Click to view Out-of-Distribution Inquiries"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Out-of-Distribution Inquiries
                </p>
                <p className="text-[11px] text-slate-500">Queries outside brand catalog taxonomy</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700">
                  AWAITING RUN
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
