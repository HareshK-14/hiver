import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

type LayoutProps = {
  children: React.ReactNode
  targetBrand?: string | null
}

export function Layout({ children, targetBrand }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* ── LIGHT AURORA BACKGROUND LAYER ────────────────────────────────── */}
      {/* Aurora Radial Base */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-light-aurora" />

      {/* Floating Soft Ambient Aurora Blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[130px] filter" />
      <div className="pointer-events-none fixed top-10 -right-28 h-[550px] w-[550px] rounded-full bg-purple-200/45 blur-[140px] filter" />
      <div className="pointer-events-none fixed top-1/2 left-1/4 h-[450px] w-[450px] rounded-full bg-cyan-100/40 blur-[130px] filter" />
      <div className="pointer-events-none fixed -bottom-36 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-200/35 blur-[130px] filter" />

      {/* Extremely Subtle Technical Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── SIDEBAR NAVIGATION (LIGHT THEME) ────────────────────────────── */}
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── TOP BAR (TRANSLUCENT WHITE GLASS) ────────────────────────────── */}
      <TopBar onMenuClick={() => setSidebarOpen(true)} targetBrand={targetBrand} />

      {/* ── MAIN CONTENT AREA ────────────────────────────────────────────── */}
      <div className="relative z-10 pt-16 lg:pl-64">
        <main className="min-h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
