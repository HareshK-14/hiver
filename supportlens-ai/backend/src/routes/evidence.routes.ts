// SupportLens AI — Evidence Routes (Phase 9 stub)
import { Router, Request, Response } from 'express';

interface EvidenceResult {
  id: string;
  snippet: string;
  score: number;
}

interface EvidenceResponse {
  status: 'not_implemented';
  message: string;
  query: string | null;
  results: EvidenceResult[];
}

export const evidenceRouter = Router();

// GET /api/evidence?q=<query>
evidenceRouter.get('/', (req: Request<object, EvidenceResponse, never, { q?: string }>, res: Response<EvidenceResponse>) => {
  const query = req.query.q ?? null;
  res.status(200).json({
    status: 'not_implemented',
    message: 'Evidence retrieval (RAG) will be implemented in Phase 9 (Retrieval Pipeline).',
    query,
    results: [],
  });
});
