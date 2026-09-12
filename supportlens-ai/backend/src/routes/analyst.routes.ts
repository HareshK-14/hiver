// SupportLens AI — Analyst Protected Routes
import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';

export const analystRouter = Router();

// Requires authentication
analystRouter.use(requireAuth);

// GET /api/analyst/overview (Accessible by ANALYST and ADMIN)
analystRouter.get('/overview', requireRole('ANALYST', 'ADMIN'), (req, res) => {
  res.json({
    status: 'ok',
    role: req.user?.role,
    data: {
      intentMacroF1: null,
      weightedF1: null,
      escalationF1: null,
      falseAutoHandleRate: null,
      replyQuality: null,
      groundedness: null,
      llmJudgeAgreement: null,
      message: 'Analyst evaluation harness active — run benchmark on Golden Set to populate statistics',
    },
  });
});
