import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { apiEvidence } from '../services/api'
import type { EvidenceCase } from '../types'

export function EvidencePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<EvidenceCase[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(false)
    try {
      const data = await apiEvidence(query)
      setResults(data.cases)
      setSearched(true)
    } catch {
      setResults([])
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Evidence Explorer"
        subtitle="Search historical brand support cases — inspect customer context, company responses, resolution tags, and similarity scores."
        badge={{ label: 'Phase 10 — Retrieval Index', color: 'blue' }}
      />

      {/* Search Input Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Search brand cases… e.g. 'refund duplicate charge' or 'package damaged during delivery'"
            className="w-full rounded-2xl border border-slate-200/80 bg-white/95 pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <button
          onClick={search}
          disabled={loading || !query.trim()}
          className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/20 hover:brightness-105 active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Searching…' : 'Search Evidence'}
        </button>
      </div>

      {/* Initial Empty State */}
      {!searched && !loading && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
          <EmptyState
            icon="🔍"
            title="Search Historical Brand Knowledge"
            description="Enter a query above to query the vector embedding index for similar support cases from the selected brand."
          />
        </div>
      )}

      {/* No Results */}
      {searched && results.length === 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
          <EmptyState
            icon="📭"
            title="No Matching Records"
            description="No historical cases met the cosine similarity threshold (0.60). This is expected prior to Phase 10 index construction."
          />
        </div>
      )}

      {/* Results List */}
      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-500">{results.length} historical cases retrieved for "{query}"</p>
          {results.map((c, i) => (
            <div key={i} className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-slate-800">Historical Case #{i + 1}</span>
                <span className="rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 text-xs font-bold text-cyan-800">
                  {(c.similarity * 100).toFixed(0)}% semantic match
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Customer Message
                  </p>
                  <p className="text-slate-800 leading-relaxed">{c.customerMessage}</p>
                </div>
                <div className="rounded-xl bg-purple-50/60 border border-purple-100 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-1">
                    Historical Brand Resolution
                  </p>
                  <p className="text-purple-950 font-medium leading-relaxed">{c.historicalResponse}</p>
                </div>
              </div>
              <div className="mt-3.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Resolution Tag: <strong className="text-slate-700">{c.resolution}</strong></span>
                <span className="font-mono text-slate-400">ID: {c.conversationId}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
