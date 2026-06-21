import { useState, useCallback } from 'react'
import { translateToFarsi, getAIRecommendations } from '../services/aiService.js'

// ── ترجمه خلاصه مانگا ────────────────────────────────────────────────────────
export function useTranslation() {
  const [translated, setTranslated] = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  const translate = useCallback(async (text) => {
    if (!text || loading) return
    setLoading(true)
    setError(null)
    setTranslated(null)
    try {
      const result = await translateToFarsi(text)
      setTranslated(result)
    } catch (e) {
      setError(e.message || 'خطا در اتصال به سرویس ترجمه. دوباره امتحان کنید.')
    } finally {
      setLoading(false)
    }
  }, [loading])

  const reset = useCallback(() => {
    setTranslated(null)
    setError(null)
  }, [])

  return { translated, loading, error, translate, reset }
}

// ── پیشنهاد هوشمند ───────────────────────────────────────────────────────────
export function useAIRecommendations() {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const recommend = useCallback(async (userInput) => {
    if (!userInput?.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await getAIRecommendations(userInput)
      setResult(data)
    } catch (e) {
      setError(e.message || 'خطا در دریافت پیشنهادات. دوباره امتحان کنید.')
    } finally {
      setLoading(false)
    }
  }, [loading])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, recommend, reset }
}
