// SupportLens AI — Navigation Bar
import { NavLink, useLocation } from 'react-router-dom';
import { useHealth } from '../hooks/useHealth';
import type { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Agent',
    path: '/',
    description: 'Analyze customer messages',
    phase: 'Phase 14',
    available: true,
  },
  {
    label: 'Evaluation',
    path: '/evaluation',
    description: 'Performance metrics and baselines',
    phase: 'Phase 20',
    available: false,
  },
  {
    label: 'Failures',
    path: '/failures',
    description: 'Failure mode analysis',
    phase: 'Phase 18',
    available: false,
  },
  {
    label: 'Architecture',
    path: '/architecture',
    description: 'System design overview',
    phase: 'Phase 1',
    available: true,
  },
];

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'ok' ? 'bg-emerald-400' :
    status === 'error' ? 'bg-red-400' :
    'bg-amber-400 animate-pulse';

  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${color}`}
      title={`Backend: ${status}`}
    />
  );
}

export function Navbar() {
  const { status, latencyMs } = useHealth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.346A3 3 0 0115 20H9a3 3 0 01-2.122-.879l-.348-.347z" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-slate-900">SupportLens AI</span>
            <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600">
              Phase 1
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            if (!item.available) {
              return (
                <span
                  key={item.path}
                  className="flex cursor-not-allowed items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-400"
                  title={`Coming in ${item.phase}`}
                >
                  {item.label}
                  <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-semibold uppercase text-slate-400">
                    {item.phase}
                  </span>
                </span>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Backend status */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <StatusDot status={status} />
          <span>
            {status === 'ok'
              ? `API ${latencyMs !== null ? `${latencyMs}ms` : 'online'}`
              : status === 'error'
              ? 'API offline'
              : 'Connecting…'}
          </span>
        </div>
      </div>
    </header>
  );
}
