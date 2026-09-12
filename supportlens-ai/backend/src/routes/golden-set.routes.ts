// SupportLens AI — Golden Set Routes (Phase 7 stub)
import { Router, Request, Response } from 'express';

interface GoldenSetEntry {
  id: string;
  conversationId: string;
  label: string;
  annotatedBy: string;
  annotatedAt: string;
}

interface GoldenSetResponse {
  status: 'not_implemented';
  message: string;
  entries: GoldenSetEntry[];
  total: number;
}

export const goldenSetRouter = Router();

// GET /api/golden-set
goldenSetRouter.get('/', (_req: Request, res: Response<GoldenSetResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Golden set curation will be implemented in Phase 7 (Golden Set Builder).',
    entries: [],
    total: 0,
  });
});
