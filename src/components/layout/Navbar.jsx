import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Navbar({ onAIOpen }) {
  const [query, setQuery]           = useState('')
  const [menuOpen, setMenuOpen]     = useState(false)
  const navigate                    = useNavigate()
  const { theme, toggle }           = useTheme()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setQuery('')
      setMenuOpen(false)
    }
  }

  return (
    <header
      className="sticky top-0 z-40
                 bg-white/90 dark:bg-ink-900/95
                 backdrop-blur-md
                 border-b border-gray-200 dark:border-white/[0.07]"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="font-estedad text-2xl sm:text-3xl tracking-widest text-accent flex-shrink-0"
        >
          MANGA<span className="text-gray-900 dark:text-ink-50">VERSE</span>
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 max-w-md mx-auto items-center
                     bg-gray-100 dark:bg-ink-700
                     border border-gray-200 dark:border-white/10
                     focus-within:border-accent dark:focus-within:border-accent
                     rounded-full px-4 py-2 gap-2 transition-colors"
        >
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-right
                       text-gray-900 dark:text-ink-50
                       placeholder:text-gray-400 dark:placeholder:text-ink-400"
            placeholder="جستجوی مانگا..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="text-gray-400 hover:text-accent transition-colors text-base">
            🔍
          </button>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2 mr-auto">
          {/* AI Button */}
          <button
            onClick={onAIOpen}
            className="hidden sm:flex items-center gap-1.5
                       bg-gradient-to-r from-accent to-gold
                       text-white text-xs sm:text-sm font-bold
                       rounded-full px-3 sm:px-4 py-2
                       hover:opacity-90 transition-opacity flex-shrink-0"
          >
            🤖
            <span className="hidden md:inline">جستجوی هوشمند</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       bg-gray-100 dark:bg-ink-700
                       border border-gray-200 dark:border-white/10
                       hover:border-accent dark:hover:border-accent
                       text-gray-600 dark:text-ink-300
                       transition-all duration-200 text-base flex-shrink-0"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="sm:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5
                       rounded-full bg-gray-100 dark:bg-ink-700
                       border border-gray-200 dark:border-white/10"
          >
            <span className={`block w-4 h-0.5 bg-gray-600 dark:bg-ink-300 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-0.5 bg-gray-600 dark:bg-ink-300 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-gray-600 dark:bg-ink-300 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-white/[0.07]
                        bg-white dark:bg-ink-900 px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2
                       bg-gray-100 dark:bg-ink-700 rounded-full px-4 py-2.5
                       border border-gray-200 dark:border-white/10
                       focus-within:border-accent transition-colors">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm text-right
                         text-gray-900 dark:text-ink-50
                         placeholder:text-gray-400 dark:placeholder:text-ink-400"
              placeholder="جستجوی مانگا..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="text-gray-400 hover:text-accent text-base">🔍</button>
          </form>

          {/* Mobile AI button */}
          <button
            onClick={() => { onAIOpen(); setMenuOpen(false) }}
            className="flex items-center justify-center gap-2
                       bg-gradient-to-r from-accent to-gold
                       text-white font-bold rounded-full py-2.5 text-sm
                       hover:opacity-90 transition-opacity"
          >
            🤖 جستجوی هوشمند با AI
          </button>
        </div>
      )}
    </header>
  )
}
