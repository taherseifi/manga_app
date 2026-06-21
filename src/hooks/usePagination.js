import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

/**
 * Hook that syncs current page with URL search params
 * and provides a goTo(page) helper that preserves other params.
 */
export function usePagination() {
  const [searchParams] = useSearchParams()
  const navigate       = useNavigate()
  const currentPage    = Number(searchParams.get('page')) || 1

  const goTo = useCallback((page) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(page))
    navigate({ search: next.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [searchParams, navigate])

  return { currentPage, goTo }
}
