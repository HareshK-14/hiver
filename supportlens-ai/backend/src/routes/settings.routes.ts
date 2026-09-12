import { Router } from 'express';

export const settingsRouter = Router();

settingsRouter.get('/', (_req, res) => {
  res.json({
    llmProvider: process.env['LLM_PROVIDER'] ?? 'openai',
    llmModel: process.env['LLM_MODEL'] ?? 'gpt-4o-mini',
    embeddingsModel: process.env['EMBEDDING_MODEL'] ?? 'all-MiniLM-L6-v2',
    retrievalTopK: 5,
    similarityThreshold: 0.6,
    intentConfidenceThreshold: 0.75,
    escalationThreshold: 0.5,
    targetBrand: process.env['TARGET_BRAND'] ?? null,
    datasetConfigured: false,
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
  });
});
