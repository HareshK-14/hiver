// SupportLens AI — Express App Factory
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from './routes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

export function createApp() {
  const app = express();

  // ── Middleware ─────────────────────────────────────────────────────────────
  app.use(cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('combined'));
  app.use(requestLogger);

  // ── Routes ─────────────────────────────────────────────────────────────────
  app.use('/api', apiRouter);

  // ── 404 ────────────────────────────────────────────────────────────────────
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  // ── Error handler ──────────────────────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
