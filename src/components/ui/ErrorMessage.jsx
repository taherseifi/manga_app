export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-4">
      <span className="text-5xl">⚠️</span>
      <h3 className="text-lg font-bold text-gray-900 dark:text-ink-50">
        خطا در بارگذاری
      </h3>
      <p className="text-sm text-gray-500 dark:text-ink-400 max-w-xs">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-2 text-sm">
          تلاش مجدد
        </button>
      )}
    </div>
  )
}
