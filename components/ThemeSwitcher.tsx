'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
      <button
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border border-card-border text-foreground-secondary opacity-50"
        aria-label="Toggle theme"
        disabled
      >
        <Moon size={16} />
        <span className="hidden sm:inline capitalize">dark</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-background-secondary border border-card-border text-foreground-secondary hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline capitalize">{theme}</span>
    </button>
  )
}
