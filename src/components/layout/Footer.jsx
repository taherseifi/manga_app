import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 dark:border-white/[0.07]
                       bg-gray-50 dark:bg-ink-900">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-estedad text-2xl tracking-widest text-accent">
          MANGA<span className="text-gray-900 dark:text-ink-50">VERSE</span>
        </Link>
        <p className="text-xs text-gray-400 dark:text-ink-400 text-center">
          Powered by{' '}
          <a className="text-accent hover:underline">
           TAHER SEIFI
          </a>
         
        </p>
        <p className="text-xs text-gray-400 dark:text-ink-400">ساخته شده با ❤️ برای دوره‌های کدینگ فرانت‌</p>
      </div>
    </footer>
  )
}
