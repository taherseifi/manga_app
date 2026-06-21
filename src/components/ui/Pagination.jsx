export default function Pagination({ current, total, onPageChange }) {
  if (total <= 1) return null

  const delta = 2
  const pages = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    pages.push(i)
  }

  const btnBase =
    'min-w-[38px] h-[38px] flex items-center justify-center px-3 rounded-lg text-sm font-medium transition-all duration-150 border cursor-pointer'
  const btnDefault =
    'bg-white dark:bg-ink-700 border-gray-200 dark:border-white/10 text-gray-700 dark:text-ink-50 hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent'
  const btnActive =
    'bg-accent border-accent text-white'
  const btnDisabled =
    'opacity-30 cursor-not-allowed'

  return (
    <div className="flex items-center justify-center flex-wrap gap-1.5 py-8">
      {/* First */}
      <button
        className={`${btnBase} ${current === 1 ? btnDisabled : btnDefault}`}
        onClick={() => onPageChange(1)}
        disabled={current === 1}
      >«</button>

      {/* Prev */}
      <button
        className={`${btnBase} ${current === 1 ? btnDisabled : btnDefault}`}
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >‹</button>

      {/* Ellipsis left */}
      {pages[0] > 1 && (
        <span className="text-gray-400 dark:text-ink-400 px-1">...</span>
      )}

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          className={`${btnBase} ${p === current ? btnActive : btnDefault}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {/* Ellipsis right */}
      {pages[pages.length - 1] < total && (
        <span className="text-gray-400 dark:text-ink-400 px-1">...</span>
      )}

      {/* Next */}
      <button
        className={`${btnBase} ${current === total ? btnDisabled : btnDefault}`}
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
      >›</button>

      {/* Last */}
      <button
        className={`${btnBase} ${current === total ? btnDisabled : btnDefault}`}
        onClick={() => onPageChange(total)}
        disabled={current === total}
      >»</button>
    </div>
  )
}
