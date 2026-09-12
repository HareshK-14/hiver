// SupportLens AI — Escalations Routes (Phase 12 stub)
import { Router, Request, Response } from 'express';

interface EscalationRecord {
  id: string;
  conversationId: string;
  reason: string;
  escalatedAt: string;
}

interface EscalationsResponse {
  status: 'not_implemented';
  message: string;
  escalations: EscalationRecord[];
  total: number;
}

export const escalationsRouter = Router();

// GET /api/escalations
escalationsRouter.get('/', (_req: Request, res: Response<EscalationsResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Escalation detection will be implemented in Phase 12 (Escalation Classifier).',
    escalations: [],
    total: 0,
  });
});
