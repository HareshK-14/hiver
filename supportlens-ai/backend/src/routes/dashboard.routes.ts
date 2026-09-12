// SupportLens AI — Dashboard Route (Phase 1 stub)
import { Router, Request, Response } from 'express';

interface DashboardData {
  totalConversations: null;
  autoHandleRate: null;
  escalationRate: null;
  intentMacroF1: null;
  replyQuality: null;
  groundedness: null;
  falseAutoHandleRate: null;
  recentCases: [];
  intentDistribution: [];
  performanceTrend: [];
  failureSignals: [];
  datasetConfigured: boolean;
  evaluationRun: boolean;
  phase: string;
  message: string;
}

export const dashboardRouter = Router();

dashboardRouter.get('/', (_req: Request, res: Response<DashboardData>) => {
  res.status(200).json({
    totalConversations: null,
    autoHandleRate: null,
    escalationRate: null,
    intentMacroF1: null,
    replyQuality: null,
    groundedness: null,
    falseAutoHandleRate: null,
    recentCases: [],
    intentDistribution: [],
    performanceTrend: [],
    failureSignals: [],
    datasetConfigured: false,
    evaluationRun: false,
    phase: 'Phase 1 — Setup',
    message: 'Configure dataset and run evaluation to populate dashboard',
  });
});
