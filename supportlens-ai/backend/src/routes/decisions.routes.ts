// SupportLens AI — Decisions Routes (Phase 11 stub)
import { Router, Request, Response } from 'express';

interface DecisionRecord {
  id: string;
  conversationId: string;
  decision: 'auto_handle' | 'escalate' | 'pending';
  confidence: number;
  decidedAt: string;
}

interface DecisionsResponse {
  status: 'not_implemented';
  message: string;
  decisions: DecisionRecord[];
  total: number;
}

export const decisionsRouter = Router();

// GET /api/decisions
decisionsRouter.get('/', (_req: Request, res: Response<DecisionsResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Auto-handle decision engine will be implemented in Phase 11 (Decision Engine).',
    decisions: [],
    total: 0,
  });
});
