import MangaCard from './MangaCard.jsx'
import MangaCardSkeleton from './MangaCardSkeleton.jsx'

export default function MangaGrid({ items = [], loading = false, rankOffset = 0 }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <MangaCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
      {items.map((manga, i) => (
        <MangaCard
          key={manga.mal_id}
          manga={manga}
          rank={rankOffset ? rankOffset + i : undefined}
        />
      ))}
    </div>
  )
}
