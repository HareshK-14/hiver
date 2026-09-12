import { Navigate, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="relative flex h-screen w-screen items-center justify-center bg-slate-50 font-sans text-slate-900 bg-light-aurora">
        {/* Soft ambient blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-200/50 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-6 w-6" />
            <div className="absolute inset-0 animate-ping rounded-2xl bg-indigo-400 opacity-20" />
          </div>
          <p className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Loading SupportLens AI…
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
