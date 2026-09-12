// SupportLens AI — Shared Frontend Types
// All interfaces use `type` syntax for verbatimModuleSyntax compatibility.

// ── Status & Enum types ──────────────────────────────────────────────────────
export type BackendStatus = 'ok' | 'error' | 'loading'
export type EvidenceStrength = 'STRONG' | 'MEDIUM' | 'WEAK' | 'NONE'
export type DecisionType = 'AUTO_HANDLE' | 'ESCALATE'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type EscalationTendency = 'low' | 'medium' | 'high'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'ambiguous'

// ── Multi-Role Platform Roles ───────────────────────────────────────────────
export type UserRole = 'ADMIN' | 'SUPPORT_AGENT' | 'ANALYST'

export type User = {
  email: string
  name: string
  role: UserRole
  avatar: string
  isDemo: boolean
  token?: string
}

// ── Health ───────────────────────────────────────────────────────────────────
export type HealthResponse = {
  status: string
  service: string
  version: string
  phase: string
  timestamp: string
  uptime: number
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export type IntentDistributionItem = {
  intent: string
  count: number
  percentage: number
}

export type PerformanceTrendPoint = {
  date: string
  intentF1: number
  replyQuality: number
  groundedness: number
  escalationPrecision: number
}

export type FailureSignal = {
  type: string
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
}

export type DashboardData = {
  totalConversations: number | null
  autoHandleRate: number | null
  escalationRate: number | null
  intentMacroF1: number | null
  replyQuality: number | null
  groundedness: number | null
  falseAutoHandleRate: number | null
  recentCases: ConversationSummary[]
  intentDistribution: IntentDistributionItem[]
  performanceTrend: PerformanceTrendPoint[]
  failureSignals: FailureSignal[]
  datasetConfigured: boolean
  evaluationRun: boolean
  phase: string
  message: string
}

// ── Conversations ────────────────────────────────────────────────────────────
export type ConversationSummary = {
  id: string
  customerMessagePreview: string
  intent: string | null
  intentConfidence: number | null
  decision: DecisionType | null
  evidenceStrength: EvidenceStrength | null
  replyQuality: number | null
  timestamp: string
  status: 'analyzed' | 'pending' | 'escalated' | 'auto_handled'
}

export type ConversationMessage = {
  role: 'customer' | 'agent'
  text: string
  timestamp: string
}

export type ConversationDetail = ConversationSummary & {
  messages: ConversationMessage[]
  brand: string | null
  analysis: AnalysisResult | null
}

// ── AI Analysis ──────────────────────────────────────────────────────────────
export type IntentPrediction = {
  name: string
  confidence: number
  alternatives: Array<{ name: string; confidence: number }>
}

export type EvidenceCase = {
  conversationId: string
  customerMessage: string
  historicalResponse: string
  resolution: string
  similarity: number
  intent: string | null
  timestamp: string | null
}

export type EvidenceQuality = {
  strength: EvidenceStrength
  cases: EvidenceCase[]
  consistencyScore: number | null
  resolutionPattern: string | null
  totalSimilarCases: number
}

export type EscalationDecision = {
  decision: DecisionType
  confidence: number
  reason: string
  riskLevel: RiskLevel
  riskSignals: RiskSignal[]
}

export type RiskSignal = {
  signal: string
  positive: boolean
}

export type ReplyDraft = {
  text: string
  grounded: boolean
  evidenceIds: string[]
}

export type ReplyQualityScore = {
  overall: number | null
  correctness: number | null
  relevance: number | null
  helpfulness: number | null
  groundedness: number | null
  completeness: number | null
  unsupportedClaims: number | null
  evaluated: boolean
}

export type AnalysisResult = {
  message: string
  intent: IntentPrediction | null
  evidence: EvidenceQuality | null
  decision: EscalationDecision | null
  reply: ReplyDraft | null
  replyQuality: ReplyQualityScore | null
  metadata: {
    requestId: string
    latencyMs: number
    timestamp: string
    model: string | null
  }
}

// ── Intents ──────────────────────────────────────────────────────────────────
export type IntentDefinition = {
  name: string
  description: string
  examples: string[]
  negativeExamples: string[]
  commonKeywords: string[]
  escalationTendency: EscalationTendency
}

export type IntentMetrics = {
  intent: string
  support: number
  precision: number | null
  recall: number | null
  f1: number | null
  difficulty: Difficulty
  commonFailureMode: string | null
}

// ── Evaluation ───────────────────────────────────────────────────────────────
export type BaselineComparison = {
  metric: string
  trivialBaseline: number | null
  simpleBaseline: number | null
  supportLensAI: number | null
}

export type EvaluationSummary = {
  evaluated: boolean
  goldenSetSize: number | null
  intentAccuracy: number | null
  intentMacroF1: number | null
  intentWeightedF1: number | null
  escalationF1: number | null
  falseAutoHandleRate: number | null
  replyQualityAvg: number | null
  groundednessAvg: number | null
  judgeAgreement: number | null
  humanLabelCount: number | null
  runDate: string | null
  headlineMetric: 'intentMacroF1'
}

// ── Golden Set ───────────────────────────────────────────────────────────────
export type GoldenExample = {
  id: string
  customerMessage: string
  conversationContext: string[]
  trueIntent: string
  expectedDecision: DecisionType
  acceptableReplyCharacteristics: string
  difficulty: Difficulty
  notes: string
}

// ── Failures ─────────────────────────────────────────────────────────────────
export type FailureCase = {
  id: string
  failureType: string
  customerMessage: string
  predictedIntent: string | null
  correctIntent: string
  retrievedEvidence: EvidenceCase[]
  generatedReply: string | null
  expectedBehavior: string
  actualBehavior: string
  hypothesis: string
  potentialFix: string
  frequency: number | null
  percentage: number | null
}

// ── Decisions ────────────────────────────────────────────────────────────────
export type DecisionEntry = {
  id: number
  title: string
  decision: string
  why: string
  alternative: string
  tradeoff: string
  impact: string
  phase: string
}

// ── Settings ─────────────────────────────────────────────────────────────────
export type AppSettings = {
  llmProvider: string
  llmModel: string
  embeddingsModel: string
  retrievalTopK: number
  similarityThreshold: number
  intentConfidenceThreshold: number
  escalationThreshold: number
  targetBrand: string
  datasetConfigured: boolean
  nodeEnv: string
}

// ── API responses ─────────────────────────────────────────────────────────────
export type ApiResponse<T> = {
  data: T
  status: 'ok' | 'not_implemented' | 'error'
  message?: string
}

export type PaginatedResponse<T> = ApiResponse<T> & {
  total: number
  page: number
  pageSize: number
}
