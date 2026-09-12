# SupportLens AI — Evidence-First Customer Support Copilot

> **Hiver SDE Intern Take-Home Assignment**  
> An innovative, production-grade, technically defensible AI customer support platform built with a multi-role architecture (Admin, Support Agent, Analyst), grounded historical brand evidence retrieval, and human escalation safety guardrails.

---

## 🚀 Key Highlights

* **Evidence-First Decision Making**: Grounded retrieval from historical brand resolutions before drafting any response.
* **Three Dedicated Role Workspaces**:
  * **Admin (/admin/dashboard)**: Operations control center, services health, dataset ingestion, AI governance.
  * **Support Agent (/agent/dashboard)**: Live copilot triage, interactive drafted response preview, escalation override, AI feedback.
  * **Analyst (/analyst/dashboard)**: Model evaluation benchmarks, LLM Judge alignment (G-Eval), FAHR tracking, failure clustering.
* **Light Aurora Visual Theme**: Modern, elegant, clean enterprise SaaS aesthetic with role-specific color accents.
* **Rigorous Safety Boundaries**: Human escalation enforced whenever intent confidence < 70% or sentiment risk is elevated (target False Auto-Handle Rate < 5%).
* **Honest Metrics & Transparency**: Zero invented data; truthful states for uncomputed benchmark metrics.

---

## 📁 Repository Structure

`
hiver/
├── supportlens-ai/
│   ├── frontend/             # React 19 + TypeScript + Vite 8 + Tailwind CSS v4
│   │   ├── src/
│   │   │   ├── components/   # Layout, Auth guards, Navigation
│   │   │   ├── context/      # AuthContext (Multi-role demo auth), ThemeContext
│   │   │   ├── pages/        # Admin, Agent, Analyst dashboards & full copilot pages
│   │   │   ├── services/     # Typed API layer
│   │   │   └── types/        # TypeScript models & enums
│   │   └── ...
│   ├── backend/              # Node.js + Express + TypeScript
│   │   ├── src/
│   │   │   ├── middleware/   # requireAuth & requireRole authorization
│   │   │   ├── routes/       # Admin, Agent, Analyst, and AI pipeline endpoints
│   │   │   └── server.ts
│   │   ├── tests/            # Supertest & Jest authorization & health test suites
│   │   └── ...
│   ├── configs/              # Intent catalogs and policy configurations
│   ├── data/                 # Raw and processed datasets
│   ├── docs/                 # Architectural decision records & documentation
│   └── evaluation/           # Benchmark suites & evaluation scripts
└── README.md
`

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js 18+
- npm 9+

### 2. Backend Setup
`ash
cd supportlens-ai/backend
npm install
npm run dev
`
*Backend runs on http://localhost:3001*

### 3. Frontend Setup
`ash
cd supportlens-ai/frontend
npm install
npm run dev
`
*Frontend runs on http://localhost:5173*

---

## 👥 Demo Role Accounts

| Role | Email | Password | Primary Workspace |
| :--- | :--- | :--- | :--- |
| **Admin** | dmin@supportlens.ai | dmin123 | /admin/dashboard |
| **Support Agent** | gent@supportlens.ai | gent123 | /agent/dashboard |
| **Analyst** | nalyst@supportlens.ai | nalyst123 | /analyst/dashboard |

---

## 🧪 Testing

To run the backend test suite (including role authorization checks):
`ash
cd supportlens-ai/backend
npm test
`
