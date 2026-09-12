// SupportLens AI — API Router (root aggregator)
import { Router } from 'express';
import { healthRouter } from './health.routes';
import { intentsRouter } from './intents.routes';
import { analyzeRouter } from './analyze.routes';
import { dashboardRouter } from './dashboard.routes';
import { conversationsRouter } from './conversations.routes';
import { evidenceRouter } from './evidence.routes';
import { escalationsRouter } from './escalations.routes';
import { evaluationRouter } from './evaluation.routes';
import { goldenSetRouter } from './golden-set.routes';
import { decisionsRouter } from './decisions.routes';
import { settingsRouter } from './settings.routes';
import { adminRouter } from './admin.routes';
import { agentRouter } from './agent.routes';
import { analystRouter } from './analyst.routes';

export const apiRouter = Router();

// Existing routes
apiRouter.use('/health', healthRouter);
apiRouter.use('/intents', intentsRouter);

// Phase stubs
apiRouter.use('/analyze', analyzeRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/conversations', conversationsRouter);
apiRouter.use('/evidence', evidenceRouter);
apiRouter.use('/escalations', escalationsRouter);
apiRouter.use('/evaluation', evaluationRouter);
apiRouter.use('/golden-set', goldenSetRouter);
apiRouter.use('/decisions', decisionsRouter);
apiRouter.use('/settings', settingsRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/agent', agentRouter);
apiRouter.use('/analyst', analystRouter);
