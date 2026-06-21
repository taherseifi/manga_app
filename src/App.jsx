import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import AIModal from './components/ui/AIModal.jsx'

export default function App() {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-ink-900 text-gray-900 dark:text-ink-50 transition-colors duration-300">
      <ScrollRestoration />
      <Navbar onAIOpen={() => setAiOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {aiOpen && <AIModal onClose={() => setAiOpen(false)} />}
    </div>
  )
}
