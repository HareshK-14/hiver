// SupportLens AI — Health Endpoint Test (Phase 1)
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /api/health', () => {
  it('returns 200 with service metadata', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('SupportLens AI Backend');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
  });

  it('contains phase information', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.phase).toMatch(/Phase 1/);
  });
});

describe('GET /api/intents (stub)', () => {
  it('returns 200 with empty intents array', async () => {
    const res = await request(app).get('/api/intents');
    expect(res.status).toBe(200);
    expect(res.body.intents).toEqual([]);
    expect(res.body.status).toBe('not_implemented');
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route-that-does-not-exist');
    expect(res.status).toBe(404);
  });
});
