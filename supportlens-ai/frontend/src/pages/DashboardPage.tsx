import { useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { Sparkles, Radio, ShieldAlert, ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { MetricCard } from '../components/ui/MetricCard'
import { EmptyState, CardSkeleton } from '../components/ui/EmptyState'
import { useDashboard } from '../hooks/useDashboard'

// ── Setup Banner ──────────────────────────────────────────────────────────────
function SetupBanner({ onSetup }: { onSetup: () => void }) {
  return (
    <div className="mb-6 rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/60 to-purple-50/50 p-4 shadow-2xs backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Radio className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              Dataset Not Configured
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              Connect the Twitter Customer Support dataset to activate Support Intelligence.
              The dashboard will populate with real data once the dataset is configured and evaluation is run.
            </p>
          </div>
        </div>
        <button
          onClick={onSetup}
          className="flex-shrink-0 self-start sm:self-auto rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-98 transition cursor-pointer"
        >
          View Setup Guide →
        </button>
      </div>
    </div>
  )
}

// ── Automation Safety Section ─────────────────────────────────────────────────
function AutomationSafety({
  autoHandleRate,
  falseAutoHandleRate,
  escalationRate,
}: {
  autoHandleRate: number | null
  falseAutoHandleRate: number | null
  escalationRate: number | null
}) {
  const safetyLevel =
    falseAutoHandleRate === null
      ? null
      : falseAutoHandleRate <= 0.02
      ? 'SAFE'
      : falseAutoHandleRate <= 0.05
      ? 'CAUTION'
      : 'REVIEW REQUIRED'

  const safetyStyle =
    safetyLevel === 'SAFE'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : safetyLevel === 'CAUTION'
      ? 'bg-amber-50 border-amber-200 text-amber-800'
      : safetyLevel === 'REVIEW REQUIRED'
      ? 'bg-rose-50 border-rose-200 text-rose-800'
      : 'bg-slate-100 border-slate-200 text-slate-600'

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Automation Safety</h2>
          <p className="text-xs text-slate-500">
            Safety thresholds and risk containment for autonomous customer support replies
          </p>
        </div>
        {safetyLevel ? (
          <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${safetyStyle}`}>
            {safetyLevel}
          </span>
        ) : (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            NOT EVALUATED
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: 'Auto-Handle Rate',
            value: autoHandleRate !== null ? `${(autoHandleRate * 100).toFixed(1)}%` : null,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50/50 border-emerald-100',
            desc: 'Percentage of customer queries handled without human intervention',
          },
          {
            label: 'Escalation Rate',
            value: escalationRate !== null ? `${(escalationRate * 100).toFixed(1)}%` : null,
            color: 'text-amber-700',
            bg: 'bg-amber-50/50 border-amber-100',
            desc: 'Queries safely handed off to human support specialists',
          },
          {
            label: 'False Auto-Handle Rate',
            value: falseAutoHandleRate !== null ? `${(falseAutoHandleRate * 100).toFixed(1)}%` : null,
            color: 'text-rose-700',
            bg: 'bg-rose-50/50 border-rose-100',
            desc: 'Critical safety metric: auto-handled cases that required human escalation',
          },
        ].map(item => (
          <div
            key={item.label}
            className={`rounded-xl border ${item.bg} p-4`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {item.label}
            </p>
            <p className={`mt-1.5 text-2xl font-extrabold tracking-tight ${item.value ? item.color : 'text-slate-300'}`}>
              {item.value ?? '—'}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {!safetyLevel && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 p-3 text-xs text-amber-800">
          <ShieldAlert className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Safety status requires Golden Set evaluation data.</strong> Safety status will transition to SAFE, CAUTION, or REVIEW REQUIRED only after Phase 15 evaluation runs.
          </span>
        </div>
      )}
    </div>
  )
}

// ── Recent Cases Table ────────────────────────────────────────────────────────
function RecentCasesTable() {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Recent Support Cases</h2>
          <p className="text-xs text-slate-500">Analyzed customer messages with intent &amp; decisions</p>
        </div>
        <button
          onClick={() => navigate('/conversations')}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <EmptyState
        icon="💬"
        title="No cases analyzed yet"
        description="Analyze customer messages using the AI Agent workspace to generate case records with grounded evidence and decision traces."
        action={{ label: 'Open AI Agent', onClick: () => navigate('/agent') }}
        compact
      />
    </div>
  )
}

// ── Failure Signals ───────────────────────────────────────────────────────────
function FailureSignals() {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Current Failure Signals</h2>
          <p className="text-xs text-slate-500">Top failure patterns and risk boundaries from evaluation</p>
        </div>
        <button
          onClick={() => navigate('/failures')}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
        >
          <span>Failure Center</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <EmptyState
        icon="🔬"
        title="No failure signals yet"
        description="Run evaluation on the Golden Set benchmark to surface intent ambiguity, weak retrieval, or policy drift signals."
        compact
      />
    </div>
  )
}

// ── Performance Chart ─────────────────────────────────────────────────────────
function PerformanceTrend({ data }: { data: unknown[] }) {
  const navigate = useNavigate()

  if (!data.length) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">AI Performance Trend</h2>
          <p className="text-xs text-slate-500">Intent F1, Reply Quality, and Groundedness over time</p>
        </div>
        <EmptyState
          icon="📊"
          title="No evaluation history yet"
          description="Performance trends will populate once benchmark evaluation runs are executed against the Golden Set."
          action={{ label: 'Run Evaluation →', onClick: () => navigate('/evaluation') }}
          compact
        />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">AI Performance Trend</h2>
          <p className="text-xs text-slate-500">Metrics evaluated across historical benchmark runs</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 1]} stroke="#cbd5e1" />
          <Tooltip />
          <Line type="monotone" dataKey="intentF1" stroke="#4f46e5" name="Intent F1" dot={false} strokeWidth={2.5} />
          <Line type="monotone" dataKey="replyQuality" stroke="#10b981" name="Reply Quality" dot={false} strokeWidth={2.5} />
          <Line type="monotone" dataKey="groundedness" stroke="#06b6d4" name="Groundedness" dot={false} strokeWidth={2.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Intent Distribution ───────────────────────────────────────────────────────
function IntentDistribution({ data }: { data: unknown[] }) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">Customer Intent Distribution</h2>
          <p className="text-xs text-slate-500">Discovered customer intent taxonomy frequencies</p>
        </div>
        <EmptyState
          icon="🧩"
          title="No intent data yet"
          description="Intent taxonomy distribution will appear here following dataset cleaning (Phase 4) and intent discovery (Phase 6)."
          compact
        />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900">Customer Intent Distribution</h2>
        <p className="text-xs text-slate-500">Breakdown of support tickets by classified intent</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
          <YAxis dataKey="intent" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={120} stroke="#cbd5e1" />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export function DashboardPage() {
  const { data, loading } = useDashboard()
  const navigate = useNavigate()

  // 7 KPIs with specific color accents as instructed in Section 12
  const kpis = [
    {
      label: 'Total Conversations',
      value: data?.totalConversations ?? null,
      accent: 'blue' as const,
      icon: 'messages' as const,
      description: 'Historical brand dataset volume',
    },
    {
      label: 'Auto-Handle Rate',
      value:
        data?.autoHandleRate !== null && data?.autoHandleRate !== undefined
          ? `${(data.autoHandleRate * 100).toFixed(1)}%`
          : null,
      accent: 'green' as const,
      icon: 'bot' as const,
      description: 'Safely resolved without human triage',
    },
    {
      label: 'Intent Macro F1',
      value: data?.intentMacroF1 ?? null,
      accent: 'violet' as const,
      icon: 'target' as const,
      description: 'Penalizes poor rare-intent accuracy',
    },
    {
      label: 'Reply Quality',
      value:
        data?.replyQuality !== null && data?.replyQuality !== undefined
          ? `${data.replyQuality.toFixed(1)} / 5`
          : null,
      accent: 'cyan' as const,
      icon: 'sparkles' as const,
      description: 'LLM-as-Judge 5-point rubric average',
    },
    {
      label: 'Groundedness',
      value:
        data?.groundedness !== null && data?.groundedness !== undefined
          ? `${(data.groundedness * 100).toFixed(0)}%`
          : null,
      accent: 'teal' as const,
      icon: 'shield' as const,
      description: 'Replies strictly citing retrieved evidence',
    },
    {
      label: 'False Auto-Handle Rate',
      value:
        data?.falseAutoHandleRate !== null && data?.falseAutoHandleRate !== undefined
          ? `${(data.falseAutoHandleRate * 100).toFixed(1)}%`
          : null,
      accent: 'rose' as const,
      icon: 'alert' as const,
      description: 'Safety boundary (target &lt; 5%)',
    },
    {
      label: 'Escalation Rate',
      value:
        data?.escalationRate !== null && data?.escalationRate !== undefined
          ? `${(data.escalationRate * 100).toFixed(1)}%`
          : null,
      accent: 'amber' as const,
      icon: 'userCheck' as const,
      description: 'Human handoff queue proportion',
    },
  ]

  return (
    <div className="space-y-6 pb-12">
      {/* ── 1. Page Header (Information Dense) ─────────────────────────── */}
      <PageHeader
        title="Support Intelligence Dashboard"
        subtitle="Monitor AI support decisions, evidence quality, automation safety, and response performance."
        badge={{ label: 'Phase 1 — Setup', color: 'amber' }}
        actions={
          <button
            onClick={() => navigate('/agent')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:brightness-105 active:scale-98 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Analyze Message</span>
          </button>
        }
      />

      {/* Setup banner if dataset is not yet configured */}
      {(!data || !data.datasetConfigured) && (
        <SetupBanner onSetup={() => navigate('/settings')} />
      )}

      {/* ── 2. KPI Cards Grid ──────────────────────────────────────────── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Key Performance Indicators
          </h2>
          <span className="text-[11px] text-slate-400">
            Evidence &amp; Decision Benchmarks
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kpis.map(kpi => (
              <MetricCard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                accent={kpi.accent}
                icon={kpi.icon}
                description={kpi.description}
                action={
                  kpi.value === null
                    ? { label: 'Run evaluation →', onClick: () => navigate('/evaluation') }
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ── 3. Performance Trend + Intent Distribution Charts ─────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PerformanceTrend data={data?.performanceTrend ?? []} />
        <IntentDistribution data={data?.intentDistribution ?? []} />
      </div>

      {/* ── 4. Automation Safety Section ───────────────────────────────── */}
      <AutomationSafety
        autoHandleRate={data?.autoHandleRate ?? null}
        falseAutoHandleRate={data?.falseAutoHandleRate ?? null}
        escalationRate={data?.escalationRate ?? null}
      />

      {/* ── 5. Recent Cases & Failure Signals ──────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RecentCasesTable />
        <FailureSignals />
      </div>

      {/* ── 6. Build Progress & Roadmap ────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Build Progress &amp; Architecture Roadmap</h2>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            Phase 1 Setup Complete
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { phase: 'Phase 1', name: 'Project Setup & Shell', done: true },
            { phase: 'Phase 2–4', name: 'Dataset Exploration', done: false },
            { phase: 'Phase 6–7', name: 'Intents & Golden Set', done: false },
            { phase: 'Phase 10–14', name: 'AI Copilot Pipeline', done: false },
            { phase: 'Phase 15–20', name: 'Evaluation Harness', done: false },
          ].map(item => (
            <div
              key={item.phase}
              className={`rounded-xl p-3.5 text-center transition ${
                item.done
                  ? 'bg-emerald-50/70 border border-emerald-200/80'
                  : 'bg-slate-50/70 border border-slate-100'
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {item.phase}
              </p>
              <p
                className={`mt-1 text-xs font-bold ${
                  item.done ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {item.done ? '✓ ' : ''}
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
