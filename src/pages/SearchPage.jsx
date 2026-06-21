import { useLoaderData, useNavigation } from 'react-router-dom'
import MangaGrid from '../components/ui/MangaGrid.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import { usePagination } from '../hooks/usePagination.js'

export default function SearchPage() {
  const loaderData = useLoaderData()
  const navigation = useNavigation()
  const { goTo }   = usePagination()

  const isLoading   = navigation.state === 'loading'
  const manga       = loaderData?.data ?? []
  const query       = loaderData?.query ?? ''
  const total       = loaderData?.pagination?.last_visible_page ?? 1
  const totalItems  = loaderData?.pagination?.items?.total ?? 0
  const current     = loaderData?.currentPage ?? 1

  if (!loaderData && !isLoading) {
    return <ErrorMessage message="خطا در بارگذاری نتایج." />
  }

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-bebas text-3xl sm:text-4xl tracking-widest text-gray-900 dark:text-ink-50">
            نتایج جستجو برای:{' '}
            <span className="text-accent">«{query}»</span>
          </h2>
          {!isLoading && (
            <p className="text-sm text-gray-400 dark:text-ink-400 mt-1">
              {totalItems > 0
                ? `${totalItems.toLocaleString('fa-IR')} مانگا پیدا شد`
                : 'نتیجه‌ای پیدا نشد'}
            </p>
          )}
        </div>

        {/* Empty state */}
        {!isLoading && manga.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-3 text-center">
            <span className="text-5xl">🔍</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-ink-50">نتیجه‌ای پیدا نشد</h3>
            <p className="text-sm text-gray-500 dark:text-ink-400">
              جستجوی دیگری امتحان کن یا از جستجوی هوشمند AI استفاده کن
            </p>
          </div>
        )}

        <MangaGrid items={manga} loading={isLoading} />

        {!isLoading && manga.length > 0 && (
          <Pagination current={current} total={total} onPageChange={goTo} />
        )}
      </div>
    </section>
  )
}
