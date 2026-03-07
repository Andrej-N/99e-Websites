'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark'

export const THEMES: { value: Theme; label: string; emoji: string }[] = [
  { value: 'light', label: 'Light', emoji: '☀️' },
  { value: 'dark', label: 'Dark', emoji: '🌙' },
]

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: typeof THEMES
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => { },
  themes: THEMES,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as string | null
    const validThemes: Theme[] = ['light', 'dark']
    let initial: Theme = 'dark'

    if (stored === 'light' || stored === 'dark') {
      initial = stored as Theme
    } else if (stored) {
      // Clear old invalid themes like 'theme-cyber'
      localStorage.setItem('theme', 'dark')
    }

    setThemeState(initial)
    document.documentElement.setAttribute('data-theme', initial)
    document.body.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
