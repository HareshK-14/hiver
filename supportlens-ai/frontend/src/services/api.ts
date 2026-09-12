// SupportLens AI — API Service Layer
// All endpoints are typed against src/types/index.ts
import type {
  HealthResponse, DashboardData, ConversationSummary, ConversationDetail,
  EvidenceCase, IntentMetrics, EscalationDecision, EvaluationSummary,
  BaselineComparison, IntentMetrics as IntentPerf, GoldenExample,
  FailureCase, DecisionEntry, AppSettings, AnalysisResult,
} from '../types'

const BASE = '/api'

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('supportlens_token') || sessionStorage.getItem('supportlens_token')
  const role = localStorage.getItem('supportlens_role') || sessionStorage.getItem('supportlens_role')
  const email = localStorage.getItem('supportlens_email') || sessionStorage.getItem('supportlens_email')
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (role) headers['x-user-role'] = role
  if (email) headers['x-user-email'] = email
  return headers
}

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = params
    ? `${BASE}${path}?${new URLSearchParams(params)}`
    : `${BASE}${path}`
  const res = await fetch(url, {
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`)
  return res.json() as Promise<T>
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`)
  return res.json() as Promise<T>
}

// ── Health ───────────────────────────────────────────────────────────────────
export const apiHealth = () => get<HealthResponse>('/health')

// ── Dashboard ────────────────────────────────────────────────────────────────
export const apiDashboard = () => get<DashboardData>('/dashboard')

// ── Analyze ──────────────────────────────────────────────────────────────────
export type AnalyzeRequest = { message: string; context?: string[] }
export const apiAnalyze = (body: AnalyzeRequest) => post<AnalysisResult>('/analyze', body)

// ── Conversations ────────────────────────────────────────────────────────────
export const apiConversations = (params?: Record<string, string>) =>
  get<{ conversations: ConversationSummary[]; total: number }>('/conversations', params)

export const apiConversation = (id: string) =>
  get<ConversationDetail>(`/conversations/${id}`)

// ── Evidence ─────────────────────────────────────────────────────────────────
export const apiEvidence = (q: string, k = '5') =>
  get<{ cases: EvidenceCase[]; total: number }>('/evidence', { q, k })

// ── Intents ──────────────────────────────────────────────────────────────────
export const apiIntents = () =>
  get<{ intents: IntentMetrics[]; status: string; message?: string }>('/intents')

export const apiIntent = (name: string) =>
  get<{ intent: IntentMetrics; examples: string[] }>(`/intents/${encodeURIComponent(name)}`)

// ── Escalations ──────────────────────────────────────────────────────────────
export const apiEscalations = (params?: Record<string, string>) =>
  get<{ escalations: Array<ConversationSummary & { decision: EscalationDecision | null }>; total: number }>(
    '/escalations', params
  )

// ── Evaluation ───────────────────────────────────────────────────────────────
export const apiEvaluationSummary = () => get<EvaluationSummary>('/evaluation/summary')
export const apiEvaluationBaselines = () => get<{ baselines: BaselineComparison[] }>('/evaluation/baselines')
export const apiEvaluationIntents = () => get<{ intents: IntentPerf[] }>('/evaluation/intents')
export const apiEvaluationFailures = () => get<{ failures: FailureCase[] }>('/evaluation/failures')

// ── Golden Set ───────────────────────────────────────────────────────────────
export const apiGoldenSet = (params?: Record<string, string>) =>
  get<{ examples: GoldenExample[]; total: number; stats: Record<string, number> }>('/golden-set', params)

// ── Decisions ────────────────────────────────────────────────────────────────
export const apiDecisions = () => get<{ decisions: DecisionEntry[] }>('/decisions')

// ── Settings ─────────────────────────────────────────────────────────────────
export const apiSettings = () => get<AppSettings>('/settings')

// ── Multi-Role Endpoints ──────────────────────────────────────────────────────
export const apiAdminOverview = () => get<any>('/admin/overview')
export const apiAdminUsers = () => get<any>('/admin/users')
export const apiAdminSettings = () => get<any>('/admin/ai-settings')
export const apiAdminAudit = () => get<any>('/admin/audit')

export const apiAgentOverview = () => get<any>('/agent/overview')
export const apiAgentFeedback = (body: { caseId: string; helpful: boolean; comments?: string }) =>
  post<any>('/agent/feedback', body)

export const apiAnalystOverview = () => get<any>('/analyst/overview')
