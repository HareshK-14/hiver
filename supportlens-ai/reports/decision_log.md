# Decision Log — SupportLens AI

This document records 10–15 non-obvious engineering decisions made during the project.
Each entry captures the decision, the reasoning, the alternative considered, and the trade-off accepted.

Decisions are added incrementally as each phase completes.
No decision is recorded here unless it was actually made.

---

## Decision 1 — App Factory Pattern for Express

**Decision**: Export `createApp()` that returns an `app` instance; `server.ts` calls `app.listen()` separately.

**Why**: This separation lets tests import `createApp()` and pass it directly to `supertest` without binding a port. Port conflicts in CI are eliminated. The pattern is standard in production Node.js codebases.

**Alternative**: A single `app.ts` that calls `app.listen()` at module load time.

**Trade-off**: Slightly more files. The testability gain far exceeds the cost.

---

## Decision 2 — Vite Proxy for Local Dev

**Decision**: Configure Vite's `server.proxy` to forward `/api/*` to `localhost:3001`.

**Why**: Avoids CORS configuration during development. Frontend makes calls to `/api/health` (same origin from its perspective) and Vite transparently routes to the backend. In production, a reverse proxy (nginx / cloud LB) would handle this identically.

**Alternative**: Configure CORS on the backend to allow `localhost:5173`.

**Trade-off**: The proxy is a dev-only convenience. CORS is still configured on the backend for cases where the proxy is not used (e.g., direct API calls from external clients).

---

## Decision 3 — Structured JSON Logging

**Decision**: All backend logs are emitted as JSON objects to stdout.

**Why**: Structured logs are machine-parseable. In any real deployment, they would be ingested by a log aggregation system (Datadog, CloudWatch, GCP Logging). Human-readable logs are a development luxury; structured logs are a production requirement.

**Alternative**: `console.log` with template strings.

**Trade-off**: Slightly harder to read locally. Compensated by the `morgan` middleware which prints readable HTTP access logs in parallel.

---

## Decision 4 — useHealth Polling Every 30 Seconds

**Decision**: The `useHealth` hook polls the backend every 30 seconds rather than using WebSockets.

**Why**: Phase 1 only needs a simple liveness indicator. WebSocket overhead is not justified. The 30s interval is long enough to avoid request noise but short enough to detect a restart.

**Alternative**: WebSocket-based server-sent events for real-time status.

**Trade-off**: Polling adds a small, predictable load. Acceptable for a status indicator.

---

*Additional decisions will be documented as Phases 2–25 complete.*
