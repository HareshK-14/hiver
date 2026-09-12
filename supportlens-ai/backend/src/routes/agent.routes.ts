// SupportLens AI — Support Agent Protected Routes
import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';

export const agentRouter = Router();

// Requires authentication
agentRouter.use(requireAuth);

// GET /api/agent/overview (Accessible by SUPPORT_AGENT and ADMIN)
agentRouter.get('/overview', requireRole('SUPPORT_AGENT', 'ADMIN'), (req, res) => {
  res.json({
    status: 'ok',
    role: req.user?.role,
    data: {
      assignedCases: 0,
      pendingReviews: 0,
      aiSuggestions: 0,
      escalations: 0,
      casesReviewedToday: 0,
      approvedReplies: 0,
      message: 'Support Agent workspace active — waiting for ticket stream or incoming customer messages',
    },
  });
});

// POST /api/agent/feedback (Write access restricted to SUPPORT_AGENT and ADMIN, rejects ANALYST)
agentRouter.post('/feedback', requireRole('SUPPORT_AGENT', 'ADMIN'), (req, res) => {
  const { caseId, isCorrect, feedbackCategory, notes } = req.body;

  if (isCorrect === undefined) {
    res.status(400).json({ error: 'Missing required field: isCorrect' });
    return;
  }

  res.json({
    status: 'recorded',
    feedbackId: `fb-${Date.now()}`,
    recordedBy: req.user?.email,
    timestamp: new Date().toISOString(),
    feedback: {
      caseId: caseId || 'demo-case',
      isCorrect,
      feedbackCategory: feedbackCategory || null,
      notes: notes || '',
    },
  });
});
