import { useState, useEffect, useCallback } from 'react'
import { apiHealth } from '../services/api'
import type { HealthResponse, BackendStatus } from '../types'

export type UseHealthResult = {
  health: HealthResponse | null
  status: BackendStatus
  latencyMs: number | null
  error: string | null
  refresh: () => void
}

export function useHealth(): UseHealthResult {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [status, setStatus] = useState<BackendStatus>('loading')
  const [latencyMs, setLatencyMs] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    const t0 = Date.now()
    try {
      const data = await apiHealth()
      setHealth(data)
      setStatus('ok')
      setError(null)
      setLatencyMs(Date.now() - t0)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Connection failed')
      setLatencyMs(null)
    }
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 30_000)
    return () => clearInterval(id)
  }, [refresh])

  return { health, status, latencyMs, error, refresh }
}
