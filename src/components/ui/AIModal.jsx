import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAIRecommendations } from '../../hooks/useAI.js'
import Spinner from './Spinner.jsx'
import AIErrorBox from './AIErrorBox.jsx'

export default function AIModal({ onClose }) {
  const [input, setInput]   = useState('')
  const navigate            = useNavigate()
  const { result, loading, error, recommend, reset } = useAIRecommendations()

  const handleSubmit = () => {
    if (input.trim()) recommend(input)
  }

  const handlePick = (searchQuery) => {
    onClose()
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto
                      bg-white dark:bg-ink-700
                      border border-gray-200 dark:border-white/10
                      rounded-2xl p-6 md:p-8
                      animate-slide-up shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center
                     rounded-full bg-gray-100 dark:bg-white/[0.08]
                     hover:bg-gray-200 dark:hover:bg-white/[0.14]
                     text-gray-600 dark:text-ink-300 transition-colors text-base"
        >✕</button>

        {/* Header */}
        <div className="mb-5 text-right">
          <h2 className="font-bebas text-3xl tracking-widest text-gray-900 dark:text-ink-50">🤖 جستجوی هوشمند</h2>
          <p className="text-sm text-gray-500 dark:text-ink-400 mt-1 leading-relaxed">
            به جای جستجوی معمولی، بگو دنبال چه <span className="text-accent font-semibold">حسی</span> هستی!
            <br />
            مثلاً: «یه چیزی مثل ناروتو ولی غمگین‌تر»
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 bg-gray-100 dark:bg-ink-600
                       border border-gray-200 dark:border-white/10
                       focus:border-accent rounded-full
                       px-4 py-2.5 text-sm text-right
                       text-gray-900 dark:text-ink-50
                       placeholder:text-gray-400 dark:placeholder:text-ink-400
                       outline-none transition-colors"
            placeholder="دنبال چه نوع مانگایی هستی؟"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'جستجو'}
          </button>
        </div>

        {/* Loading */}
        {loading && <Spinner text="Gemini در حال تحلیل..." />}

        {/* Error — ساده و خوانا */}
        <AIErrorBox
          error={error}
          onRetry={() => { reset(); recommend(input) }}
        />

        {/* Results */}
        {result && !loading && (
          <div className="animate-fade-in">
            {result.summary && (
              <div className="mb-3 p-3 rounded-xl bg-accent/5 border border-accent/15 text-sm text-gray-700 dark:text-ink-200 leading-relaxed text-right">
                💡 {result.summary}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {result.recommendations?.map((rec, i) => (
                <button
                  key={i}
                  onClick={() => handlePick(rec.searchQuery)}
                  className="text-right p-4 rounded-xl
                             bg-gray-50 dark:bg-ink-600
                             border border-gray-200 dark:border-white/[0.07]
                             hover:border-accent/50 dark:hover:border-accent/40
                             hover:bg-accent/5 dark:hover:bg-accent/10
                             transition-all duration-200 w-full cursor-pointer"
                >
                  <p className="font-bold text-sm text-gray-900 dark:text-ink-50 mb-1">
                    📚 {rec.title}
                    {rec.titleFa && <span className="text-gray-500 dark:text-ink-400 font-normal mr-1.5">({rec.titleFa})</span>}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-ink-400 leading-relaxed">{rec.reason}</p>
                  <p className="text-xs text-accent mt-1.5">← کلیک کن تا جستجو بشه</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
