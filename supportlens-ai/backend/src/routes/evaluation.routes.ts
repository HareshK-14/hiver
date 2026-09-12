// SupportLens AI — Evaluation Routes (Phase 5 stub)
import { Router, Request, Response } from 'express';

interface EvaluationSummaryResponse {
  status: 'not_implemented';
  message: string;
  summary: null;
}

interface EvaluationBaselinesResponse {
  status: 'not_implemented';
  message: string;
  baselines: [];
}

interface EvaluationIntentsResponse {
  status: 'not_implemented';
  message: string;
  intents: [];
}

interface EvaluationFailuresResponse {
  status: 'not_implemented';
  message: string;
  failures: [];
}

export const evaluationRouter = Router();

// GET /api/evaluation/summary
evaluationRouter.get('/summary', (_req: Request, res: Response<EvaluationSummaryResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Evaluation summary will be available after Phase 5 (Baseline Evaluation).',
    summary: null,
  });
});

// GET /api/evaluation/baselines
evaluationRouter.get('/baselines', (_req: Request, res: Response<EvaluationBaselinesResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Baseline metrics will be populated in Phase 5 (Baseline Evaluation).',
    baselines: [],
  });
});

// GET /api/evaluation/intents
evaluationRouter.get('/intents', (_req: Request, res: Response<EvaluationIntentsResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Per-intent evaluation metrics will be available after Phase 6 (Intent Discovery).',
    intents: [],
  });
});

// GET /api/evaluation/failures
evaluationRouter.get('/failures', (_req: Request, res: Response<EvaluationFailuresResponse>) => {
  res.status(200).json({
    status: 'not_implemented',
    message: 'Failure signal analysis will be implemented in Phase 8 (Failure Analysis).',
    failures: [],
  });
});
