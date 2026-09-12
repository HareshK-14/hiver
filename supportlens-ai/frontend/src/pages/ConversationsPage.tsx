import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'

const FILTERS = ['All Cases', 'Auto-handled', 'Escalated', 'Low Confidence', 'Weak Evidence']

export function ConversationsPage() {
  const [activeFilter, setActiveFilter] = useState('All Cases')
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Support Conversations Inbox"
        subtitle="Browse analyzed support threads — filter by automation decision, evidence quality, or classifier confidence."
        badge={{ label: 'Phase 14 Records', color: 'blue' }}
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations…"
              className="rounded-xl border border-slate-200 bg-white/90 pl-9 pr-3 py-1.5 text-xs text-slate-900 outline-none transition focus:border-indigo-400 shadow-2xs w-60"
            />
          </div>
        }
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-white/90 p-1.5 shadow-2xs backdrop-blur-md">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeFilter === f
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Split view card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] backdrop-blur-md overflow-hidden min-h-[480px] grid grid-cols-1 md:grid-cols-12">
        {/* Left: conversation list */}
        <div className="border-r border-slate-100 p-4 md:col-span-4 flex items-center justify-center">
          <EmptyState
            icon="💬"
            title="No conversations yet"
            description="Analyze incoming customer messages using the AI Agent to generate conversation records."
            compact
          />
        </div>

        {/* Right: detail */}
        <div className="p-4 md:col-span-8 flex items-center justify-center bg-slate-50/40">
          <EmptyState
            icon="👈"
            title="Select a conversation"
            description="Choose a ticket from the left column to view the full analysis, intent confidence, retrieved evidence, and drafted reply."
          />
        </div>
      </div>
    </div>
  )
}
