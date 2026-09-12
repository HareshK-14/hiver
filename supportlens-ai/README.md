# SupportLens AI

> **Evidence-First Customer Support Copilot**
> Hiver SDE Intern Take-Home Assignment

Not a chatbot. A support copilot that understands customer intent, retrieves brand-specific historical evidence, explains every decision, and proves that it works.

---

## Quick Start (< 15 minutes)

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Python | ≥ 3.10 |

### 1. Clone and install

```bash
git clone <repo-url>
cd supportlens-ai

# Backend
cd backend
cp ../.env.example .env          # Fill in OPENAI_API_KEY
npm install
npm run dev                       # Starts on http://localhost:3001

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev                       # Starts on http://localhost:5173
```

### 2. Verify health

```bash
curl http://localhost:3001/api/health
# Expected: {"status":"ok","service":"SupportLens AI Backend",...}
```

### 3. Run backend tests

```bash
cd backend
npm test
# Expected: 4 tests pass
```

### 4. Open the app

Navigate to **http://localhost:5173**

---

## Dataset Setup (Phase 2+)

The Twitter Customer Support dataset is not included in this repository.

**Download:**
```bash
# Option A — Kaggle CLI
kaggle datasets download thoughtvector/customer-support-on-twitter
unzip customer-support-on-twitter.zip -d data/raw/

# Option B — Manual download
# https://www.kaggle.com/datasets/thoughtvector/customer-support-on-twitter
# Place twcs.csv in data/raw/
```

Once downloaded, run the pipeline:
```bash
python scripts/explore_dataset.py    # Phase 2 — brand statistics
python scripts/prepare_dataset.py    # Phase 4 — data cleaning
python scripts/sample_dataset.py     # Phase 4/7 — splits
python scripts/build_index.py        # Phase 10 — retrieval index
```

---

## Project Structure

```
supportlens-ai/
├── frontend/         React + Vite + TypeScript + Tailwind
├── backend/          Node.js + Express + TypeScript
├── data/             raw / processed / sample
├── configs/          intents.yaml, config.yaml
├── evaluation/       golden_set.csv, evaluation scripts
├── scripts/          Python data pipeline scripts
├── reports/          report.md, decision_log.md
└── docs/             architecture.md, evaluation.md, etc.
```

---

## API Endpoints

| Method | Path | Phase | Description |
|--------|------|-------|-------------|
| GET | `/api/health` | 1 ✅ | Service liveness check |
| GET | `/api/intents` | 6 🔜 | Intent taxonomy |
| POST | `/api/analyze` | 14 🔜 | Full AI pipeline |
| GET | `/api/evaluation/summary` | 15 🔜 | Evaluation metrics |
| GET | `/api/evaluation/failures` | 18 🔜 | Failure examples |
| GET | `/api/evidence/:id` | 10 🔜 | Historical case details |

---

## Core Principle

```
MESSY DATA → DATA QUALITY → INTENT MODEL → HISTORICAL EVIDENCE
→ EVIDENCE QUALITY → AUTOMATION DECISION → GROUNDED RESPONSE
→ EVALUATION → FAILURE ANALYSIS → TRUST
```

**PROOF > COMPLEXITY. EVIDENCE > MARKETING. TRUST > AUTOMATION.**

---

## Current Status

| Phase | Name | Status |
|-------|------|--------|
| 1 | Project Setup | ✅ Complete |
| 2 | Dataset Exploration | ⏳ Next |
| 3–25 | ... | 🔜 Pending |

---

## No Fabricated Metrics

This project follows a strict policy:

> If something has not been measured, it says "Not evaluated yet."

No placeholder metrics. No invented evaluation results. No hypothetical failure examples.

---

## Security

- Never commit `.env` or API keys
- `.gitignore` excludes all secrets and raw data files
- See `.env.example` for required environment variables

---

## Citation

- Dataset: [Customer Support on Twitter](https://www.kaggle.com/datasets/thoughtvector/customer-support-on-twitter), Kaggle / thoughtvector
- Framework references and library citations: `docs/references.md` (populated progressively)
