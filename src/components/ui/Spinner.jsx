export default function Spinner({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-14 h-14 border-4',
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div
        className={`${sizes[size]} rounded-full border-gray-200 dark:border-white/10 border-t-accent animate-spin-slow`}
      />
      {text && (
        <p className="text-sm text-gray-400 dark:text-ink-400">{text}</p>
      )}
    </div>
  )
}
