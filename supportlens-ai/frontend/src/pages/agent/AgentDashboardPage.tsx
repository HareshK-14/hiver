import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Headphones,
  Sparkles,
  Inbox,
  CheckCircle2,
  AlertTriangle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Search,
  ArrowRight,
  ShieldCheck,
  Edit3,
  Bot,
  User,
} from 'lucide-react'

type SampleScenario = {
  id: string
  label: string
  customer: string
  message: string
  intent: string
  confidence: number
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  decision: 'AUTO_HANDLE' | 'ESCALATE'
  evidenceStrength: 'STRONG' | 'MEDIUM' | 'WEAK'
  groundedReply: string
}

const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'case-101',
    label: 'Duplicate Charge',
    customer: 'Sarah Jenkins (sarah.j@example.com)',
    message: 'I noticed two identical charges of $49.00 on my credit card statement yesterday. Can you please reverse one of them immediately?',
    intent: 'Billing / Duplicate Payment',
    confidence: 0.94,
    risk: 'LOW',
    decision: 'AUTO_HANDLE',
    evidenceStrength: 'STRONG',
    groundedReply: 'Hi Sarah, thank you for reaching out! We apologize for the confusion regarding the duplicate charge. I have verified your billing records and initiated a full refund of $49.00 for the second transaction. It should reflect on your card within 3-5 business days.',
  },
  {
    id: 'case-102',
    label: 'Login Password Reset',
    customer: 'David Chen (d.chen@enterprise.io)',
    message: 'I am locked out of my corporate workspace account and the password reset link is not arriving in my email. Need urgent access for an executive meeting.',
    intent: 'Account Access / Password Reset',
    confidence: 0.91,
    risk: 'MEDIUM',
    decision: 'AUTO_HANDLE',
    evidenceStrength: 'STRONG',
    groundedReply: 'Hello David, I understand this is urgent for your meeting. I have triggered a secure direct authentication token to your verified secondary contact. Please also check your spam/quarantine folder for security filter delays.',
  },
  {
    id: 'case-103',
    label: 'Hostile Cancellation',
    customer: 'Michael Vance (mvance@corporate.net)',
    message: 'Your system has been completely down for 2 hours during our peak sales window. This has cost us thousands! Cancel our annual contract right now and refund everything or our legal team will reach out.',
    intent: 'Subscription / Immediate Cancellation',
    confidence: 0.82,
    risk: 'HIGH',
    decision: 'ESCALATE',
    evidenceStrength: 'WEAK',
    groundedReply: 'Hello Michael, we sincerely apologize for the severe impact on your operations during today\'s disruption. Due to the contractual nature of your enterprise tier and the severity of the incident, I am escalating your file directly to our Senior Account Director and Operations Lead for priority handling within 15 minutes.',
  },
]

export function AgentDashboardPage() {
  const navigate = useNavigate()
  const [selectedScenario, setSelectedScenario] = useState<SampleScenario>(SAMPLE_SCENARIOS[0])
  const [editableReply, setEditableReply] = useState(SAMPLE_SCENARIOS[0].groundedReply)
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)
  const [thumbVote, setThumbVote] = useState<'up' | 'down' | null>(null)

  const handleSelectScenario = (sc: SampleScenario) => {
    setSelectedScenario(sc)
    setEditableReply(sc.groundedReply)
    setActionFeedback(null)
    setThumbVote(null)
  }

  const handleApproveReply = () => {
    setActionFeedback('Reply approved and dispatched to customer. Ticket marked RESOLVED.')
  }

  const handleEscalate = () => {
    setActionFeedback('Case routed to Tier 3 Senior Operations Lead for priority human handling.')
  }

  const handleVote = (vote: 'up' | 'down') => {
    setThumbVote(vote)
    setActionFeedback(
      vote === 'up'
        ? 'Feedback recorded: AI suggestion marked HELPFUL for model calibration.'
        : 'Feedback recorded: AI suggestion flagged for review by AI Analyst.'
    )
  }

  return (
    <div className="space-y-6">
      {/* ── TOP BANNER: Agent Workspace ── */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 via-cyan-50/80 to-blue-50/70 p-6 shadow-sm">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-200/40 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white/90 px-3 py-0.5 text-xs font-bold text-teal-800 shadow-2xs">
                <Headphones className="h-3.5 w-3.5 text-teal-600" />
                SUPPORT AGENT ROLE · WORKSPACE &amp; TRIAGE
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50/90 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Triage Queue Active
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Support Agent Workspace &amp; Triage
            </h1>
            <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed sm:text-sm">
              Review real-time AI suggestions, verify evidence groundedness against historical brand responses, and safely resolve or escalate customer inquiries.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/agent')}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-teal-500/20 transition hover:bg-teal-700 cursor-pointer"
            >
              <Bot className="h-3.5 w-3.5" />
              Open AI Copilot
            </button>
            <button
              onClick={() => navigate('/conversations')}
              className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white/90 px-3.5 py-2 text-xs font-bold text-teal-800 shadow-2xs transition hover:bg-teal-50 cursor-pointer"
            >
              <Inbox className="h-3.5 w-3.5" />
              View All Inbox
            </button>
            <button
              onClick={() => navigate('/evidence')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-slate-500" />
              Evidence Explorer
            </button>
          </div>
        </div>
      </div>

      {/* ── 6 AGENT KPIS (Clickable & Interactive) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div
          onClick={() => navigate('/conversations')}
          title="Click to view Assigned Conversations"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-teal-300 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-teal-700 transition-colors">
            Assigned Cases
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">0</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
            <span>Queue clear</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>

        <div
          onClick={() => navigate('/escalations')}
          title="Click to review Pending Escalations"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-amber-300 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-amber-700 transition-colors">
            Pending Review
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">0</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>0 escalated</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-amber-600" />
          </div>
        </div>

        <div
          onClick={() => navigate('/agent')}
          title="Click to open AI Copilot"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-teal-300 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-teal-700 transition-colors">
            AI Suggestions
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">100%</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-teal-600 font-semibold">
            <span>Ready</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>

        <div
          onClick={() => navigate('/escalations')}
          title="Click to view Escalation Center"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-amber-300 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-amber-700 transition-colors">
            Escalations Needed
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">0</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Normal safety</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-amber-600" />
          </div>
        </div>

        <div
          onClick={() => navigate('/conversations')}
          title="Click to view Reviewed Cases"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-teal-300 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-teal-700 transition-colors">
            Reviewed Today
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">0</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Shift active</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-teal-600" />
          </div>
        </div>

        <div
          onClick={() => navigate('/conversations')}
          title="Click to view Approved Replies"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-emerald-300 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700 transition-colors">
            Approved Replies
          </span>
          <p className="mt-2 text-2xl font-black text-emerald-600">0</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>0 edits required</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-emerald-600" />
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE LIVE COPILOT TRIAGE WORKSPACE ── */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Live Support Copilot &amp; Triage Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Select a sample customer inquiry to test the evidence-grounded AI decision and drafting pipeline
              </p>
            </div>
          </div>
          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-800 border border-teal-200/60 self-start sm:self-auto">
            Zero-Hallucination Pipeline
          </span>
        </div>

        {/* Sample scenario selector pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 mr-1">Load Scenario:</span>
          {SAMPLE_SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedScenario.id === sc.id
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Two-Column Triage View */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Customer Inquiry & AI Analysis (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            {/* Customer Message Box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {selectedScenario.customer}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  {selectedScenario.id}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-700 font-sans italic bg-white p-3 rounded-lg border border-slate-200/60">
                "{selectedScenario.message}"
              </p>
            </div>

            {/* AI Classification & Safety Decision */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Detected Intent
                </span>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200/60">
                  {selectedScenario.intent}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Confidence Score
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${selectedScenario.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-800">
                    {(selectedScenario.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Evidence Strength
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                    selectedScenario.evidenceStrength === 'STRONG'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedScenario.evidenceStrength}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Safety Recommendation
                </span>
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
                    selectedScenario.decision === 'AUTO_HANDLE'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {selectedScenario.decision === 'AUTO_HANDLE' ? '✓ Auto-Handle Safe' : '⚠️ Escalate to Human'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Grounded Draft & Actions (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-xl border border-teal-200/80 bg-teal-50/30 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Edit3 className="h-4 w-4 text-teal-700" />
                  <span className="text-xs font-bold text-teal-950">
                    Grounded AI Draft (Editable by Agent)
                  </span>
                </div>
                <span className="text-[10px] text-teal-700 font-semibold">
                  Evidence-Constrained
                </span>
              </div>

              <textarea
                rows={5}
                value={editableReply}
                onChange={e => setEditableReply(e.target.value)}
                className="w-full rounded-xl border border-teal-200 bg-white p-3 text-xs leading-relaxed text-slate-800 shadow-2xs outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

              {/* Action feedback alert */}
              {actionFeedback && (
                <div className="mt-3 rounded-xl border border-teal-300 bg-teal-100/70 p-3 text-xs font-semibold text-teal-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-700 flex-shrink-0" />
                  <span>{actionFeedback}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApproveReply}
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Approve &amp; Send
                  </button>

                  <button
                    onClick={handleEscalate}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-100 cursor-pointer"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    Escalate to Tier 3
                  </button>
                </div>

                {/* AI Quality Feedback buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1">AI Helpful?</span>
                  <button
                    onClick={() => handleVote('up')}
                    className={`rounded-lg p-1.5 transition cursor-pointer ${
                      thumbVote === 'up'
                        ? 'bg-teal-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                    title="Helpful AI response"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleVote('down')}
                    className={`rounded-lg p-1.5 transition cursor-pointer ${
                      thumbVote === 'down'
                        ? 'bg-rose-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                    title="Unhelpful AI response"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AGENT QUEUE TABLE ── */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Inbox className="h-4 w-4 text-teal-600" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Agent Triage Queue &amp; Escalation Inbox
              </h3>
              <p className="text-[11px] text-slate-500">Live feed of cases flagged for human agent verification</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200/60">
            0 Pending Escalations
          </span>
        </div>

        <div className="py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-800">
            Inbox Zero — All Cases Up To Date
          </h4>
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            All customer messages are currently handled within verified confidence boundaries or awaiting incoming brand dataset ingestion.
          </p>
          <button
            onClick={() => navigate('/conversations')}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline cursor-pointer"
          >
            <span>Browse All Historical Conversations</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
