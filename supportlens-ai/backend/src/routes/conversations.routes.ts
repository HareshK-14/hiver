// SupportLens AI — Conversations Routes (Phase 3 stub)
import { Router, Request, Response } from 'express';

interface ConversationSummary {
  id: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface ConversationListResponse {
  status: 'not_implemented';
  message: string;
  conversations: ConversationSummary[];
  total: number;
}

interface ConversationDetailResponse {
  status: 'not_implemented';
  message: string;
  conversation: null;
}

export const conversationsRouter = Router();

// GET /api/conversations
conversationsRouter.get('/', (_req: Request, res: Response<ConversationListResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Conversation ingestion will be implemented in Phase 3 (Data Pipeline).',
    conversations: [],
    total: 0,
  });
});

// GET /api/conversations/:id
conversationsRouter.get('/:id', (req: Request<{ id: string }>, res: Response<ConversationDetailResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: `Conversation detail for id "${req.params.id}" will be available after Phase 3 (Data Pipeline).`,
    conversation: null,
  });
});
