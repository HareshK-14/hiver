// SupportLens AI — Authentication & Role-Based Authorization Tests
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Role-Based Backend Authorization', () => {
  describe('Unauthenticated access', () => {
    it('returns 401 UNAUTHORIZED when no token/header is provided', async () => {
      const res = await request(app).get('/api/admin/overview');
      expect(res.status).toBe(401);
      expect(res.body.code).toBe('UNAUTHORIZED');
    });

    it('returns 401 for invalid Bearer token', async () => {
      const res = await request(app)
        .get('/api/admin/overview')
        .set('Authorization', 'Bearer invalid-token-xyz');
      expect(res.status).toBe(401);
      expect(res.body.code).toBe('UNAUTHORIZED');
    });
  });

  describe('ADMIN role permissions', () => {
    it('allows ADMIN to access /api/admin/overview via Bearer token', async () => {
      const res = await request(app)
        .get('/api/admin/overview')
        .set('Authorization', 'Bearer demo-token-admin');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.role).toBe('ADMIN');
    });

    it('allows ADMIN to access /api/admin/users', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', 'Bearer demo-token-admin');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('users');
      expect(res.body.users.length).toBeGreaterThan(0);
    });

    it('allows ADMIN to access agent endpoints as supervisor', async () => {
      const res = await request(app)
        .get('/api/agent/overview')
        .set('Authorization', 'Bearer demo-token-admin');
      expect(res.status).toBe(200);
      expect(res.body.role).toBe('ADMIN');
    });
  });

  describe('SUPPORT_AGENT role permissions & boundaries', () => {
    it('allows SUPPORT_AGENT to access /api/agent/overview', async () => {
      const res = await request(app)
        .get('/api/agent/overview')
        .set('Authorization', 'Bearer demo-token-agent');
      expect(res.status).toBe(200);
      expect(res.body.role).toBe('SUPPORT_AGENT');
    });

    it('allows SUPPORT_AGENT to record human review feedback', async () => {
      const res = await request(app)
        .post('/api/agent/feedback')
        .set('Authorization', 'Bearer demo-token-agent')
        .send({
          caseId: 'test-case-101',
          isCorrect: true,
          notes: 'Grounded reply approved by tier-2 specialist',
        });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('recorded');
    });

    it('rejects SUPPORT_AGENT from accessing /api/admin/overview with 403 FORBIDDEN', async () => {
      const res = await request(app)
        .get('/api/admin/overview')
        .set('Authorization', 'Bearer demo-token-agent');
      expect(res.status).toBe(403);
      expect(res.body.code).toBe('FORBIDDEN');
      expect(res.body.currentRole).toBe('SUPPORT_AGENT');
      expect(res.body.requiredRoles).toContain('ADMIN');
    });
  });

  describe('ANALYST role permissions & boundaries', () => {
    it('allows ANALYST to access /api/analyst/overview', async () => {
      const res = await request(app)
        .get('/api/analyst/overview')
        .set('Authorization', 'Bearer demo-token-analyst');
      expect(res.status).toBe(200);
      expect(res.body.role).toBe('ANALYST');
    });

    it('rejects ANALYST from writing agent review feedback with 403 FORBIDDEN', async () => {
      const res = await request(app)
        .post('/api/agent/feedback')
        .set('Authorization', 'Bearer demo-token-analyst')
        .send({
          caseId: 'test-case-101',
          isCorrect: false,
        });
      expect(res.status).toBe(403);
      expect(res.body.code).toBe('FORBIDDEN');
      expect(res.body.currentRole).toBe('ANALYST');
    });

    it('rejects ANALYST from accessing /api/admin/overview with 403 FORBIDDEN', async () => {
      const res = await request(app)
        .get('/api/admin/overview')
        .set('Authorization', 'Bearer demo-token-analyst');
      expect(res.status).toBe(403);
      expect(res.body.code).toBe('FORBIDDEN');
    });
  });
});
