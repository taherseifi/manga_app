export default function MangaCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/[0.06]
                    bg-white dark:bg-ink-700">
      {/* Cover */}
      <div className="aspect-[2/3] skeleton" />
      {/* Body */}
      <div className="p-3 flex flex-col gap-2">
        <div className="skeleton h-4 rounded w-full" />
        <div className="skeleton h-3 rounded w-2/3" />
        <div className="skeleton h-3 rounded w-1/2 mt-1" />
      </div>
    </div>
  )
}
