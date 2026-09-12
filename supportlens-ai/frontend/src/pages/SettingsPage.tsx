import { useState } from 'react'
import { Settings, Sliders, Database, ShieldCheck, Key } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

type SectionProps = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
        <Icon className="h-4 w-4 text-indigo-600" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}

type FieldProps = {
  label: string
  value: string | number
  note?: string
  type?: 'text' | 'number' | 'select'
  options?: string[]
}

function SettingsField({ label, value, note, type = 'text', options }: FieldProps) {
  const [v, setV] = useState(String(value))

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-xs font-bold text-slate-800">{label}</p>
        {note && <p className="text-[11px] text-slate-400 mt-0.5">{note}</p>}
      </div>
      {type === 'select' && options ? (
        <select
          value={v}
          onChange={e => setV(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-indigo-400 w-full sm:w-52"
        >
          {options.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={v}
          onChange={e => setV(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-indigo-400 w-full sm:w-52 text-left sm:text-right"
        />
      )}
    </div>
  )
}

export function SettingsPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="System Settings &amp; Configuration"
        subtitle="Manage model parameters, vector retrieval thresholds, brand selection, and escalation policy boundaries."
        badge={{ label: 'Environment Config', color: 'blue' }}
      />

      <div className="space-y-5">
        <Section title="Large Language Model Provider" icon={Sliders}>
          <SettingsField label="LLM Provider" value="openai" type="select" options={['openai', 'anthropic', 'ollama (local)']} note="Active inference backend" />
          <SettingsField label="Inference Model" value="gpt-4o-mini" note="Primary generation and classification model" />
          <SettingsField label="Max Context Tokens" value={2048} type="number" note="Budget allocated for retrieved evidence" />
          <SettingsField label="Temperature" value={0.2} type="number" note="Low temperature enforced to prevent creative hallucinations" />
        </Section>

        <Section title="Vector Embeddings &amp; Retrieval" icon={Database}>
          <SettingsField label="Embedding Model" value="all-MiniLM-L6-v2" note="Local 384-dimensional sentence transformer" />
          <SettingsField label="Top-K Retrieval" value={5} type="number" note="Number of past similar brand cases retrieved" />
          <SettingsField label="Cosine Similarity Threshold" value={0.60} type="number" note="Minimum score required for evidence consideration" />
          <SettingsField label="Lexical BM25 Hybrid Weight" value={0.4} type="number" note="Balance between keyword match and semantic vector search" />
        </Section>

        <Section title="Escalation &amp; Safety Thresholds" icon={ShieldCheck}>
          <SettingsField label="Auto-Handle Confidence Cutoff" value={0.75} type="number" note="Intent confidence below this forces human escalation" />
          <SettingsField label="Target False Auto-Handle Rate" value="< 5%" note="Safety performance budget" />
          <SettingsField label="Enforce Regex Financial Override" value="Enabled" type="select" options={['Enabled', 'Disabled']} note="Direct bypass for billing disputes" />
        </Section>

        <Section title="Target Brand Configuration" icon={Settings}>
          <SettingsField label="Selected Brand" value="Not configured" note="Selected during Phase 3 dataset exploration" />
          <SettingsField label="Dataset Path" value="data/raw/twcs.csv" note="Local Twitter customer support path" />
        </Section>
      </div>
    </div>
  )
}
