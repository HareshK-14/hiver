// SupportLens AI — Health Route
import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'SupportLens AI Backend',
    version: '0.1.0',
    phase: 'Phase 1 — Project Setup',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
