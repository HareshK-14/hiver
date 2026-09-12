import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Server,
  Database,
  Users,
  AlertTriangle,
  Cpu,
  ArrowRight,
  RefreshCw,
  Sliders,
  FileText,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { useHealth } from '../../hooks/useHealth'
import { apiAdminOverview } from '../../services/api'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const { status: healthStatus, latencyMs } = useHealth()
  const [adminData, setAdminData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    apiAdminOverview()
      .then(res => {
        if (mounted) setAdminData(res)
      })
      .catch(() => {
        // Fallback for development/offline
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* ── TOP BANNER: Admin Operations & Control Center ── */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 p-6 shadow-sm">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/90 px-3 py-0.5 text-xs font-bold text-indigo-700 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                ADMIN ROLE · OPERATIONS &amp; CONTROL
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50/90 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Live
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Operations &amp; Control Center
            </h1>
            <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed sm:text-sm">
              Manage system operations, pipeline performance, dataset ingestion, AI governance, and safety guardrails across the SupportLens AI ecosystem.
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/golden-set')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-700 cursor-pointer"
            >
              <Database className="h-3.5 w-3.5" />
              Configure Dataset
            </button>
            <button
              onClick={() => navigate('/evaluation')}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white/90 px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-2xs transition hover:bg-indigo-50 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Run Full Eval
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5 text-slate-500" />
              AI Settings
            </button>
          </div>
        </div>
      </div>

      {/* ── 8 ADMIN KPIS (Clickable & Interactive) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {/* KPI 1 - Total Users */}
        <div
          onClick={() => {
            const el = document.getElementById('workspaces-matrix')
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
          title="Click to view configured role workspaces"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-indigo-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600 transition-colors">
              Total Users
            </span>
            <Users className="h-4 w-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">3 Roles</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Admin · Agent · Analyst</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-indigo-600" />
          </div>
        </div>

        {/* KPI 2 - Total Conversations */}
        <div
          onClick={() => navigate('/conversations')}
          title="Click to view Conversations log"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-600 transition-colors">
              Total Conversations
            </span>
            <Activity className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {adminData?.metrics?.totalConversations ?? '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Awaiting brand dataset</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-blue-600" />
          </div>
        </div>

        {/* KPI 3 - Total AI Analyses */}
        <div
          onClick={() => navigate('/agent')}
          title="Click to open AI Copilot workspace"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-purple-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-purple-600 transition-colors">
              Total AI Analyses
            </span>
            <Sparkles className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {adminData?.metrics?.totalAnalyses ?? '0'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Live copilot ready</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-purple-600" />
          </div>
        </div>

        {/* KPI 4 - Auto-Handle Rate */}
        <div
          onClick={() => navigate('/decisions')}
          title="Click to view Decision Log & Automation Safety"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-emerald-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-600 transition-colors">
              Auto-Handle Rate
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {adminData?.metrics?.autoHandleRate ? `${(adminData.metrics.autoHandleRate * 100).toFixed(1)}%` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 40% safe</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-emerald-600" />
          </div>
        </div>

        {/* KPI 5 - Escalation Rate */}
        <div
          onClick={() => navigate('/escalations')}
          title="Click to view Escalation Center"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-amber-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-amber-600 transition-colors">
              Escalation Rate
            </span>
            <AlertTriangle className="h-4 w-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {adminData?.metrics?.escalationRate ? `${(adminData.metrics.escalationRate * 100).toFixed(1)}%` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &lt; 25%</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-amber-600" />
          </div>
        </div>

        {/* KPI 6 - Intent Macro F1 */}
        <div
          onClick={() => navigate('/intents')}
          title="Click to view Intent Intelligence"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-violet-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-violet-600 transition-colors">
              Intent Macro F1
            </span>
            <Cpu className="h-4 w-4 text-violet-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {adminData?.metrics?.intentMacroF1 ? adminData.metrics.intentMacroF1.toFixed(3) : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 0.850</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-violet-600" />
          </div>
        </div>

        {/* KPI 7 - Reply Groundedness */}
        <div
          onClick={() => navigate('/evidence')}
          title="Click to view Evidence Explorer"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-teal-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-teal-600 transition-colors">
              Reply Groundedness
            </span>
            <ShieldCheck className="h-4 w-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {adminData?.metrics?.groundedness ? `${(adminData.metrics.groundedness * 100).toFixed(0)}%` : '—'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: &gt; 90%</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-teal-600" />
          </div>
        </div>

        {/* KPI 8 - System Health */}
        <div
          onClick={() => navigate('/architecture')}
          title="Click to view Architecture & Service Details"
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-150 hover:border-emerald-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-600 transition-colors">
              System Health
            </span>
            <Server className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-600">
            {healthStatus === 'ok' ? '100%' : 'Offline'}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
            <span>{healthStatus === 'ok' ? `API Online (${latencyMs ?? 1}ms)` : 'Degraded'}</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-emerald-600" />
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN SECTION: Services + Pipeline Status ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: System Health & Pipeline Services */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Core Services &amp; Pipeline Status
              </h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
              4 Monitored
            </span>
          </div>

          <div className="space-y-3">
            {/* Service 1 */}
            <div
              onClick={() => navigate('/architecture')}
              title="Click to view API Architecture"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    API Gateway &amp; Auth Server
                  </p>
                  <p className="text-[11px] text-slate-500">Express / TypeScript · Port 3001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800">
                  ONLINE · {latencyMs ?? 1}ms
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            {/* Service 2 */}
            <div
              onClick={() => navigate('/evidence')}
              title="Click to explore Vector Evidence Retrieval"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Vector Evidence Retrieval
                  </p>
                  <p className="text-[11px] text-slate-500">In-Memory Cosine Similarity Matcher</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-800">
                  READY
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            {/* Service 3 */}
            <div
              onClick={() => navigate('/escalations')}
              title="Click to view Human Escalation Guardrails"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Human Escalation Guardrails
                  </p>
                  <p className="text-[11px] text-slate-500">Rule-based Safety &amp; FAHR &lt; 5% Target</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-indigo-100 px-2 py-1 text-[10px] font-bold text-indigo-800">
                  ENFORCED
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            {/* Service 4 */}
            <div
              onClick={() => navigate('/agent')}
              title="Click to view AI Copilot Pipeline"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    AI Model Pipeline
                  </p>
                  <p className="text-[11px] text-slate-500">Intent + Evidence + Reply Generation</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-800">
                  STANDBY (Phase 14)
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dataset & Ingestion Status */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-600" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Brand Dataset &amp; Catalog Status
              </h3>
            </div>
            <button
              onClick={() => navigate('/golden-set')}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              <span>Manage</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => navigate('/golden-set')}
              title="Click to configure brand conversation dataset"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Brand Conversation Dataset
                </p>
                <p className="text-[11px] text-slate-500">Format: JSONL / CSV (messy real-world support logs)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700">
                  NOT UPLOADED
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div
              onClick={() => navigate('/intents')}
              title="Click to view intent taxonomy catalog"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Intent Taxonomy Catalog
                </p>
                <p className="text-[11px] text-slate-500">Predefined business intents with risk mappings</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800">
                  12 LOADED
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div
              onClick={() => navigate('/golden-set')}
              title="Click to view Grounded Golden Benchmark"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Grounded Golden Benchmark
                </p>
                <p className="text-[11px] text-slate-500">Curated ground-truth test split for offline evals</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-800">
                  AWAITING SPLIT
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div
              onClick={() => navigate('/evidence')}
              title="Click to explore Historical Evidence Vector Store"
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 transition hover:bg-slate-100 hover:border-slate-300"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Historical Evidence Vector Store
                </p>
                <p className="text-[11px] text-slate-500">Indexed brand-specific resolution pairs</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700">
                  0 EMBEDDINGS
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ROLE & USER MANAGEMENT MATRIX ── */}
      <div id="workspaces-matrix" className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Configured Workspaces &amp; Role Access Matrix
              </h3>
              <p className="text-[11px] text-slate-500">Click any role to navigate directly to its dedicated dashboard</p>
            </div>
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200/70">
            3 Active Roles
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-3">Role Identity</th>
                <th className="py-2.5 px-3">Demo User</th>
                <th className="py-2.5 px-3">Primary Workspace</th>
                <th className="py-2.5 px-3">Permissions Scope</th>
                <th className="py-2.5 px-3 text-right">Switch Workspace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3">
                  <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    Admin
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-semibold text-slate-900">admin@supportlens.ai</span>
                  <span className="block text-[10px] text-slate-400">System Administrator</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-indigo-700">/admin/dashboard</td>
                <td className="py-3 px-3 text-slate-600">Full system control, dataset ingestion, AI settings, audit logs</td>
                <td className="py-3 px-3 text-right">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-bold text-indigo-800">
                    Current View
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition cursor-pointer" onClick={() => navigate('/agent/dashboard')}>
                <td className="py-3 px-3">
                  <span className="rounded-md bg-teal-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    Support Agent
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-semibold text-slate-900">agent@supportlens.ai</span>
                  <span className="block text-[10px] text-slate-400">Tier 2 Support Specialist</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-teal-700">/agent/dashboard</td>
                <td className="py-3 px-3 text-slate-600">Ticket triage, grounded reply review, escalation override, AI feedback</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/agent/dashboard')
                    }}
                    className="rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-800 hover:bg-teal-100 cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Open Agent</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition cursor-pointer" onClick={() => navigate('/analyst/dashboard')}>
                <td className="py-3 px-3">
                  <span className="rounded-md bg-purple-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    Analyst
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-semibold text-slate-900">analyst@supportlens.ai</span>
                  <span className="block text-[10px] text-slate-400">AI Evaluation Analyst</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-purple-700">/analyst/dashboard</td>
                <td className="py-3 px-3 text-slate-600">Offline benchmarks, LLM Judge, G-Eval, failure clustering, FAHR audits</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/analyst/dashboard')
                    }}
                    className="rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-800 hover:bg-purple-100 cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Open Analyst</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ESCALATION GUARDRAILS & AUDIT PREVIEW ── */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Escalation Guardrails &amp; Safety Audit
            </h3>
          </div>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
            Target FAHR &lt; 5%
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The human escalation safety engine enforces automated routing to a tier 2 support specialist whenever:
          (1) intent classification confidence falls below <strong>70%</strong>, (2) customer sentiment indicates severe churn risk,
          or (3) retrieved brand evidence strength is <strong>WEAK</strong> or <strong>NONE</strong>.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/decisions')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 cursor-pointer"
          >
            <span>View Architecture Decisions &amp; Safety Proof</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => navigate('/escalations')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 cursor-pointer"
          >
            <span>Review Escalation Queue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
