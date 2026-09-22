import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MangaCard({ manga, rank }) {
  const [imgErr, setImgErr] = useState(false)
  const cover = manga.images?.jpg?.large_image_url

  return (
    <Link
      to={`/manga/${manga.mal_id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden
                 bg-white dark:bg-ink-700
                 border border-gray-200 dark:border-white/[0.06]
                 hover:border-accent/50 dark:hover:border-accent/40
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10
                 transition-all duration-200 cursor-pointer"
    >
      {/* Rank badge */}
      {rank && (
        <span className="absolute top-2 right-2 z-10
                         bg-accent text-white text-xs font-bold font-estedad
                         tracking-wider px-2.5 py-0.5 rounded-full leading-5">
          #{rank}
        </span>
      )}

      {/* Cover image */}
      <div className="relative overflow-hidden aspect-[2/3]">
        {!imgErr && cover ? (
          <img
            src={cover}
            alt={manga.title}
            loading="lazy"
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center
                          bg-gray-100 dark:bg-ink-600 text-4xl">
            📖
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-ink-50
                       line-clamp-2 leading-snug">
          {manga.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-ink-400 mt-auto">
          {manga.score && (
            <span className="text-gold font-bold">⭐ {manga.score}</span>
          )}
          {manga.chapters && (
            <span>{manga.chapters} فصل</span>
          )}
          {manga.type && (
            <span className="ml-auto">{manga.type}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
