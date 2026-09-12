import { useState, useEffect } from 'react'
import { apiDashboard } from '../services/api'
import type { DashboardData } from '../types'

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiDashboard()
      .then(d => { if (mounted) { setData(d); setLoading(false) } })
      .catch(e => { if (mounted) { setError(e.message); setLoading(false) } })
    return () => { mounted = false }
  }, [])

  return { data, loading, error }
}
