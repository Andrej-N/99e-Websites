'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { en, type Translations } from '@/locales/en'
import { sr } from '@/locales/sr'

export type Language = 'en' | 'sr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null
    if (stored) setLanguageState(stored)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }, [])

  const t = language === 'sr' ? sr : en

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
