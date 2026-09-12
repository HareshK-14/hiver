import { useState } from 'react'
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  UserCheck,
  Bot,
  HelpCircle,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { DecisionBadge, EvidenceBadge, ConfidenceBar } from '../components/ui/StatusBadge'
import { EmptyState } from '../components/ui/EmptyState'
import { apiAnalyze } from '../services/api'
import type { AnalysisResult } from '../types'

const SAMPLE_MESSAGES = [
  { label: 'Refund Request', text: "I ordered a product 2 weeks ago and it arrived broken. I need a full refund immediately. My order number is #45892." },
  { label: 'Payment Issue', text: "I was charged twice for the same order on my credit card. I can see two identical charges of $49.99 from your company." },
  { label: 'Delivery Issue', text: "My package was supposed to arrive 5 days ago and tracking shows it's been stuck at the warehouse since Monday. What's going on?" },
  { label: 'Account Problem', text: "I cannot log into my account. I've tried resetting my password 3 times but I'm not receiving the reset email." },
]

// ── Progress Steps ────────────────────────────────────────────────────────────
const STEPS = ['Understanding message', 'Classifying intent', 'Searching historical evidence', 'Evaluating quality', 'Determining action', 'Drafting response']

function AnalysisProgress({ step }: { step: number }) {
  return (
    <div className="space-y-2.5">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
            i < step
              ? 'bg-emerald-100 text-emerald-700'
              : i === step
              ? 'bg-indigo-100 text-indigo-700 animate-pulse'
              : 'bg-slate-100 text-slate-400'
          }`}>
            {i < step ? '✓' : i + 1}
          </div>
          <span className={`text-xs ${i <= step ? 'font-semibold text-slate-800' : 'text-slate-400'}`}>{s}</span>
        </div>
      ))}
    </div>
  )
}

// ── Intent Card ───────────────────────────────────────────────────────────────
function IntentCard({ result }: { result: AnalysisResult }) {
  const [expanded, setExpanded] = useState(false)
  if (!result.intent) return null

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md border-t-4 border-t-purple-500">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Detected Intent</h3>
        <span className="rounded-full bg-purple-50 border border-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
          Intent Intelligence
        </span>
      </div>
      <p className="text-lg font-bold text-slate-900">{result.intent.name}</p>
      <div className="mt-2.5">
        <ConfidenceBar value={result.intent.confidence} label="Classifier Confidence" />
      </div>
      {result.intent.alternatives.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <p className="mb-1.5 text-xs font-semibold text-slate-500">Alternative Candidates</p>
          {result.intent.alternatives.map(alt => (
            <div key={alt.name} className="flex items-center justify-between py-1 text-xs">
              <span className="text-slate-600">{alt.name}</span>
              <span className="font-semibold text-slate-700">{(alt.confidence * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
      >
        <HelpCircle className="h-3.5 w-3.5" />
        <span>{expanded ? 'Hide explanation' : 'Why this intent?'}</span>
      </button>
      {expanded && (
        <div className="mt-2 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs text-slate-600 leading-relaxed">
          Intent was classified using multi-label TF-IDF keyword heuristics and historical embedding proximity.
          Full explainability traces will be emitted following Phase 11 (Intent Classifier) calibration.
        </div>
      )}
    </div>
  )
}

// ── Decision Card ─────────────────────────────────────────────────────────────
function DecisionCard({ result }: { result: AnalysisResult }) {
  const [expanded, setExpanded] = useState(false)
  if (!result.decision) return null
  const isEscalate = result.decision.decision === 'ESCALATE'

  return (
    <div
      className={`rounded-2xl border p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md border-t-4 ${
        isEscalate
          ? 'border-rose-200/90 bg-[#FFF1F2] border-t-rose-500'
          : 'border-emerald-200/90 bg-[#ECFDF5] border-t-emerald-500'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Decision Safety Action</h3>
        <DecisionBadge decision={result.decision.decision} size="sm" />
      </div>

      <div className="mt-2 space-y-1 text-xs">
        <div className="flex items-center justify-between py-0.5">
          <span className="text-slate-500">Decision Confidence:</span>
          <span className="font-bold text-slate-800">{(result.decision.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="flex items-center justify-between py-0.5">
          <span className="text-slate-500">Risk Assessment:</span>
          <span className={`font-bold ${isEscalate ? 'text-rose-700' : 'text-emerald-700'}`}>
            {result.decision.riskLevel}
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-white/80 p-3 border border-slate-200/60 shadow-2xs">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Decision Reason</p>
        <p className="mt-0.5 text-xs text-slate-700 font-medium">{result.decision.reason}</p>
      </div>

      {result.decision.riskSignals.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-bold text-slate-700">Observed Risk Signals</p>
          {result.decision.riskSignals.map((s, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5 text-xs">
              <span className={s.positive ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                {s.positive ? '✓' : '⚠'}
              </span>
              <span className="text-slate-600">{s.signal}</span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
      >
        <HelpCircle className="h-3.5 w-3.5" />
        <span>{expanded ? 'Hide policy' : 'Why this decision?'}</span>
      </button>
      {expanded && (
        <div className="mt-2 rounded-xl bg-white/90 p-3 border border-slate-200/60 text-xs text-slate-600 leading-relaxed">
          System policy: If evidence strength is WEAK, confidence is below 75%, or financial/PII terms are detected,
          escalation is mandatory to prevent false autonomous replies.
        </div>
      )}
    </div>
  )
}

// ── Reply Card ────────────────────────────────────────────────────────────────
function ReplyCard({ result }: { result: AnalysisResult }) {
  const [copied, setCopied] = useState(false)
  if (!result.reply) return null

  const copy = () => {
    navigator.clipboard.writeText(result.reply!.text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md border-t-4 border-t-blue-500">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Suggested Reply</h3>
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
          Grounded Draft
        </span>
      </div>
      <div className="min-h-24 rounded-xl border border-slate-200/70 bg-slate-50/60 p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
        {result.reply.text}
      </div>
      {!result.reply.grounded && (
        <p className="mt-2 text-xs text-amber-700 font-medium">⚠ This reply draft must be verified against brand policy.</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <button className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
          Edit
        </button>
        <div className="flex-1" />
        <span className="text-[11px] text-slate-400">Review before sending</span>
      </div>
    </div>
  )
}

// ── Evidence Panel ────────────────────────────────────────────────────────────
function EvidencePanel({ result }: { result: AnalysisResult }) {
  if (!result.evidence) return null

  return (
    <div className="space-y-4">
      {/* Evidence summary header */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-2xs border-t-4 border-t-cyan-500">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Evidence Strength</h3>
          <EvidenceBadge strength={result.evidence.strength} size="md" />
        </div>
        <p className="mt-2 text-xs text-slate-600">
          <strong>{result.evidence.totalSimilarCases}</strong> similar historical cases retrieved.
          {result.evidence.consistencyScore !== null && ` Resolution consistency: ${(result.evidence.consistencyScore * 100).toFixed(0)}%.`}
        </p>
      </div>

      {/* Evidence Cards: Clearly separating Customer message from Historical support response */}
      {result.evidence.cases.map((c, i) => (
        <div key={i} className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-700">Evidence #{i + 1}</span>
            <span className="rounded-full bg-cyan-50 border border-cyan-200 px-2 py-0.5 text-[11px] font-bold text-cyan-800">
              {(c.similarity * 100).toFixed(0)}% match
            </span>
          </div>
          <div className="space-y-2.5">
            {/* Customer Message (Light gray background as requested in Section 19) */}
            <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Historical Customer Message
              </p>
              <p className="text-xs text-slate-800 line-clamp-3">{c.customerMessage}</p>
            </div>

            {/* Historical Response (Light lavender background as requested in Section 19) */}
            <div className="rounded-xl bg-purple-50/60 border border-purple-100 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-1">
                Historical Brand Response
              </p>
              <p className="text-xs text-purple-950 line-clamp-3 font-medium">{c.historicalResponse}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Resolution: <strong className="text-slate-700">{c.resolution}</strong></span>
              <span className="font-mono text-[10px] text-slate-400">ID: {c.conversationId}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main Agent Page ───────────────────────────────────────────────────────────
export function AgentPage() {
  const [message, setMessage] = useState('')
  const [context, setContext] = useState<string[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(-1)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyze = async () => {
    if (!message.trim()) return
    setAnalyzing(true)
    setResult(null)
    setError(null)

    // Simulate step progression
    for (let i = 0; i <= STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 250))
      setAnalysisStep(i)
    }

    try {
      const res = await apiAnalyze({ message, context })
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setAnalyzing(false)
      setAnalysisStep(-1)
    }
  }

  const loadSample = (text: string) => {
    setMessage(text)
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="AI Support Copilot Workspace"
        subtitle="Analyze incoming support messages — classify intent, retrieve grounded historical evidence, decide escalation, draft reply."
        badge={{ label: 'Phase 1 Interface · Pipeline Phase 14', color: 'blue' }}
      />

      {/* Phase status note */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/60 p-3.5 text-xs text-indigo-900 shadow-2xs">
        <strong>Pipeline Status:</strong> Input interface is fully active. Backend pipeline stubs respond safely with execution IDs. Full RAG pipeline will connect in Phase 14.
      </div>

      {/* Three Column Support Workspace Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ── LEFT COLUMN: Customer Message & Context ──────────────────── */}
        <div className="xl:col-span-1 space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md border-t-4 border-t-indigo-500">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Customer Support Message</h2>

            {/* Quick Sample Chips */}
            <div className="mb-3.5 flex flex-wrap gap-1.5">
              {SAMPLE_MESSAGES.map(s => (
                <button
                  key={s.label}
                  onClick={() => loadSample(s.text)}
                  className="rounded-full border border-indigo-200/80 bg-indigo-50/60 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100 transition cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Paste or type incoming customer support message here…"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              rows={6}
            />
            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span>{message.length} characters</span>
              {message && (
                <button
                  onClick={() => {
                    setMessage('')
                    setResult(null)
                  }}
                  className="hover:text-slate-600 font-medium cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Optional Context */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">Thread Context (optional)</p>
                <button
                  onClick={() => setContext([...context, ''])}
                  className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                >
                  + Add Turn
                </button>
              </div>
              {context.map((c, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <input
                    value={c}
                    onChange={e => {
                      const n = [...context]
                      n[i] = e.target.value
                      setContext(n)
                    }}
                    placeholder="Previous customer/agent turn…"
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-indigo-400"
                  />
                  <button
                    onClick={() => setContext(context.filter((_, j) => j !== i))}
                    className="text-xs text-slate-400 hover:text-rose-500 px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={analyze}
              disabled={!message.trim() || analyzing}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:brightness-105 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>{analyzing ? 'Analyzing pipeline…' : 'Analyze Message'}</span>
            </button>
          </div>
        </div>

        {/* ── CENTER COLUMN: AI Pipeline Analysis ───────────────────────── */}
        <div className="xl:col-span-1 space-y-4">
          {analyzing && (
            <div className="rounded-2xl border border-indigo-100 bg-white/95 p-6 shadow-sm backdrop-blur-md">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-indigo-700">
                Pipeline Execution in Progress
              </h3>
              <AnalysisProgress step={analysisStep} />
            </div>
          )}

          {!analyzing && !result && !error && (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
              <EmptyState
                icon="🤖"
                title="Ready for Analysis"
                description="Input a customer message and click 'Analyze Message' to run the classification and evidence pipeline."
              />
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 shadow-sm">
              <p className="font-bold">Analysis pipeline error</p>
              <p className="mt-1 text-xs">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <IntentCard result={result} />
              <DecisionCard result={result} />
              <ReplyCard result={result} />
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: Historical Evidence & Decisions ─────────────── */}
        <div className="xl:col-span-1">
          {result ? (
            <EvidencePanel result={result} />
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
              <div className="border-b border-slate-100 px-5 py-4">
                <h3 className="text-sm font-bold text-slate-900">Historical Evidence Explorer</h3>
                <p className="text-xs text-slate-500">Brand-specific similar support cases</p>
              </div>
              <EmptyState
                icon="🔍"
                title="Evidence Appears Here"
                description="Once a message is analyzed, top-K similar cases from the target brand are retrieved with semantic similarity scores and resolution history."
                compact
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
