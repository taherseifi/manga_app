// کامپوننت مشترک نمایش خطای AI
export default function AIErrorBox({ error, onRetry }) {
  if (!error) return null
  return (
    <div className="mt-4 p-4 rounded-xl bg-red-500/8 border border-red-500/20 text-right">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-lg flex-shrink-0">⚠️</span>
        <p className="text-sm text-red-400 leading-relaxed whitespace-pre-line">{error}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-bold text-red-400 border border-red-400/30
                     rounded-full px-3 py-1 hover:bg-red-500/10 transition-colors"
        >
          دوباره تلاش کن ↺
        </button>
      )}
    </div>
  )
}
