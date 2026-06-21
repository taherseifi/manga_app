import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-4">
      <p className="text-7xl sm:text-8xl">📖</p>
      <h1 className="font-bebas text-5xl sm:text-6xl tracking-widest text-gray-900 dark:text-ink-50">
        404
      </h1>
      <p className="text-gray-500 dark:text-ink-400 text-sm sm:text-base max-w-xs">
        این صفحه وجود ندارد. شاید آدرس اشتباه وارد کردی!
      </p>
      <Link to="/" className="btn-primary mt-2">
        برگشت به خانه
      </Link>
    </div>
  )
}
