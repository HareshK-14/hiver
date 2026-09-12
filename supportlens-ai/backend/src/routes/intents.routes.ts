// SupportLens AI — Intents Route (Phase 1 stub)
import { Router, Request, Response } from 'express';

export const intentsRouter = Router();

intentsRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Intent taxonomy will be populated in Phase 6 (Intent Discovery).',
    intents: [],
  });
});
