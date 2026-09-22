import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from '../hooks/useAI.js'
import Spinner from '../components/ui/Spinner.jsx'
import AIErrorBox from '../components/ui/AIErrorBox.jsx'
import { formatNumber, statusFa, statusColor } from '../utils/format.js'

export default function DetailPage() {
  const { manga, characters } = useLoaderData()
  const navigation = useNavigation()
  const navigate   = useNavigate()
  const { translated, loading: translating, error: transError, translate, reset: resetTranslation } = useTranslation()
  const [imgErr, setImgErr] = useState(false)

  if (navigation.state === 'loading') return <Spinner text="در حال بارگذاری..." size="lg" />
  if (!manga) return null

  const cover = manga.images?.jpg?.large_image_url

  const infoRows = [
    ['نوع',           manga.type],
    ['وضعیت',         statusFa(manga.status)],
    ['فصل‌ها',        manga.chapters],
    ['جلدها',         manga.volumes],
    ['شروع انتشار',   manga.published?.prop?.from?.year],
    ['نویسنده',       manga.authors?.map(a => a.name).join('، ')],
    ['ژانر',          manga.genres?.map(g => g.name).join('، ')],
    ['تم',            manga.themes?.map(t => t.name).join('، ')],
    ['دموگرافیک',     manga.demographics?.map(d => d.name).join('، ')],
    ['امتیازدهندگان', formatNumber(manga.scored_by)],
    ['محبوبیت',       manga.popularity ? `#${manga.popularity}` : null],
    ['علاقه‌مندان',   formatNumber(manga.favorites)],
  ].filter(([, v]) => v)

  return (
    <article>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden min-h-[280px] sm:min-h-[340px] md:min-h-[400px]">
        {cover && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${cover})`, filter: 'blur(20px) brightness(0.25) saturate(1.5)' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-ink-900/80 via-transparent to-transparent" />

        <div className="container relative z-10 flex gap-5 sm:gap-7 items-end flex-wrap sm:flex-nowrap pt-14 sm:pt-20 pb-8 sm:pb-10">
          <button onClick={() => navigate(-1)} className="absolute top-4 right-[clamp(1rem,4vw,3rem)] btn-ghost text-xs">
            ← برگشت
          </button>

          {/* Cover */}
          <div className="flex-shrink-0 mt-8 sm:mt-0">
            {!imgErr && cover ? (
              <img src={cover} alt={manga.title} onError={() => setImgErr(true)}
                className="w-28 sm:w-36 md:w-44 rounded-xl shadow-2xl" />
            ) : (
              <div className="w-28 sm:w-36 md:w-44 aspect-[2/3] rounded-xl bg-gray-200 dark:bg-ink-600 flex items-center justify-center text-4xl">📖</div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-estedad tracking-widest text-gray-900 dark:text-ink-50 text-[clamp(1.8rem,5vw,3.5rem)] leading-none mb-1">
              {manga.title}
            </h1>
            {manga.title_japanese && (
              <p className="text-sm text-gray-500 dark:text-ink-400 mb-3">{manga.title_japanese}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {manga.status && <span className={`badge ${statusColor(manga.status)}`}>{statusFa(manga.status)}</span>}
              {manga.type && <span className="badge bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400">{manga.type}</span>}
              {manga.genres?.slice(0, 3).map(g => (
                <span key={g.mal_id} className="badge bg-accent/10 border-accent/30 text-accent">{g.name}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 sm:gap-8">
              {[
                manga.score    && { val: `⭐ ${manga.score}`,          label: 'امتیاز', gold: true },
                manga.rank     && { val: `#${manga.rank}`,              label: 'رتبه' },
                manga.chapters && { val: manga.chapters,                label: 'فصل' },
                manga.volumes  && { val: manga.volumes,                 label: 'جلد' },
                manga.members  && { val: formatNumber(manga.members),   label: 'عضو' },
              ].filter(Boolean).map(({ val, label, gold }) => (
                <div key={label} className="text-center">
                  <p className={`font-estedad text-2xl sm:text-3xl tracking-wider ${gold ? 'text-gold' : 'text-gray-900 dark:text-ink-50'}`}>{val}</p>
                  <p className="text-[10px] text-gray-500 dark:text-ink-400 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* LEFT */}
            <div className="md:col-span-2 flex flex-col gap-5">

              {/* Synopsis */}
              {manga.synopsis && (
                <div className="card p-5">
                  <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <h2 className="font-estedad text-xl tracking-widest text-gray-900 dark:text-ink-50">
                      📖 خلاصه داستان
                    </h2>
                    <div className="flex gap-2">
                      {!translated && !translating && (
                        <button
                          onClick={() => translate(manga.synopsis)}
                          className="flex items-center gap-1.5 text-xs font-bold
                                     bg-gold/10 border border-gold/30 text-gold
                                     rounded-full px-3 py-1.5
                                     hover:bg-gold/20 active:scale-95 transition-all"
                        >
                          🪄 ترجمه به فارسی
                        </button>
                      )}
                      {translated && (
                        <button
                          onClick={resetTranslation}
                          className="text-xs text-gray-400 dark:text-ink-400 border border-gray-200
                                     dark:border-white/10 rounded-full px-3 py-1.5
                                     hover:bg-gray-100 dark:hover:bg-ink-600 transition-all"
                        >
                          ✕ بستن ترجمه
                        </button>
                      )}
                    </div>
                  </div>

                  {/* English text */}
                  <p dir="ltr" className="text-sm leading-relaxed text-gray-600 dark:text-ink-300 text-left">
                    {manga.synopsis}
                  </p>

                  {/* Spinner */}
                  {translating && <div className="mt-4"><Spinner text="Gemini در حال ترجمه..." size="sm" /></div>}

                  {/* Error */}
                  <AIErrorBox
                    error={transError}
                    onRetry={() => { resetTranslation(); translate(manga.synopsis) }}
                  />

                  {/* Result */}
                  {translated && (
                    <div className="mt-4 p-4 rounded-xl bg-gold/5 dark:bg-gold/[0.07] border border-gold/20">
                      <p className="text-xs font-bold text-gold mb-2">🇮🇷 ترجمه فارسی:</p>
                      <p className="text-sm leading-loose text-gray-700 dark:text-ink-200" dir="rtl">{translated}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Characters */}
              {characters?.length > 0 && (
                <div className="card p-5">
                  <h2 className="font-estedad text-xl tracking-widest text-gray-900 dark:text-ink-50 mb-4">👥 شخصیت‌ها</h2>
                  <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {characters.map(c => (
                      <div key={c.character.mal_id} className="text-center">
                        <img src={c.character.images?.jpg?.image_url} alt={c.character.name}
                          onError={e => { e.target.style.display = 'none' }}
                          className="w-14 h-14 rounded-full object-cover mx-auto mb-1.5 border-2 border-accent/25" />
                        <p className="text-xs font-semibold text-gray-800 dark:text-ink-50 leading-tight">{c.character.name}</p>
                        <p className="text-[10px] text-gray-400 dark:text-ink-400">{c.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="md:col-span-1">
              <div className="card p-5">
                <h2 className="font-estedad text-xl tracking-widest text-gray-900 dark:text-ink-50 mb-4">📋 اطلاعات</h2>
                <ul className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {infoRows.map(([key, val]) => (
                    <li key={key} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                      <span className="text-gray-400 dark:text-ink-400 flex-shrink-0">{key}:</span>
                      <span className="text-gray-800 dark:text-ink-100 font-medium text-left break-words max-w-[180px]">{String(val)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </article>
  )
}
