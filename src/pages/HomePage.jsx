import { useState } from 'react'
import { useNavigate, useLoaderData, useNavigation } from 'react-router-dom'
import MangaGrid from '../components/ui/MangaGrid.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import { usePagination } from '../hooks/usePagination.js'

export default function HomePage() {
  const loaderData    = useLoaderData()
  const navigation    = useNavigation()
  const navigate      = useNavigate()
  const { goTo }      = usePagination()
  const [query, setQuery] = useState('')

  const isLoading = navigation.state === 'loading'
  const manga     = loaderData?.data ?? []
  const total     = loaderData?.pagination?.last_visible_page ?? 1
  const current   = loaderData?.currentPage ?? 1

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  if (!loaderData && !isLoading) {
    return <ErrorMessage message="خطا در بارگذاری. صفحه را رفرش کنید." />
  }

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white dark:bg-ink-900 bg-manga-grid">
        {/* glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px]
                          bg-accent/10 dark:bg-accent/15 rounded-full blur-3xl" />
        </div>

        {/* hero content — container handles side padding */}
        <div className="container relative z-10 py-16 sm:py-20 lg:py-28 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 mb-5
                             bg-accent/10 dark:bg-accent/15
                             border border-accent/25 dark:border-accent/30
                             rounded-full px-4 py-1 text-xs font-bold text-accent
                             tracking-[3px] uppercase">
              🗾 دروازه دنیای مانگا
            </span>

            <h1 className="font-estedad tracking-widest leading-none text-balance mb-4
                           text-[clamp(3rem,10vw,6rem)]
                           text-gray-900 dark:text-ink-50">
              کشف کن،{' '}
              <span className="text-accent">بخوان،</span>
              <br />عاشق بشو
            </h1>

            <p className="text-gray-500 dark:text-ink-400 text-sm sm:text-base font-light mb-8">
              هزاران مانگا در انتظار توست • از شونن تا سِینِن، از رمانتیک تا هرر
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex max-w-lg mx-auto overflow-hidden rounded-full
                         bg-gray-100 dark:bg-ink-700
                         border-2 border-gray-200 dark:border-white/[0.12]
                         focus-within:border-accent dark:focus-within:border-accent
                         focus-within:shadow-[0_0_0_4px_rgba(230,57,70,0.12)]
                         transition-all"
            >
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-right
                           px-5 py-3 sm:py-4 text-sm sm:text-base
                           text-gray-900 dark:text-ink-50
                           placeholder:text-gray-400 dark:placeholder:text-ink-400"
                placeholder="اسم مانگای موردنظرت رو بنویس..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-white
                           px-5 sm:px-6 text-xl transition-colors flex-shrink-0"
              >
                🔍
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── TOP MANGA ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-5 gap-2 flex-wrap">
            <h2 className="section-title">برترین مانگاها</h2>
            {!isLoading && (
              <span className="text-xs text-gray-400 dark:text-ink-400">
                صفحه {current} از {total}
              </span>
            )}
          </div>

          <MangaGrid
            items={manga}
            loading={isLoading}
            rankOffset={(current - 1) * 20 + 1}
          />

          <Pagination current={current} total={total} onPageChange={goTo} />
        </div>
      </section>
    </>
  )
}
