'use client'

import { motion } from 'framer-motion'
import { useLanguage, type Language } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center rounded-lg border border-card-border overflow-hidden text-sm font-medium">
      {(['en', 'sr'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={cn(
            'relative px-3 py-2 transition-colors duration-200 uppercase tracking-wider text-xs',
            language === lang
              ? 'text-primary'
              : 'text-foreground-secondary hover:text-foreground'
          )}
        >
          {language === lang && (
            <motion.span
              layoutId="lang-indicator"
              className="absolute inset-0 bg-primary/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang}</span>
        </button>
      ))}
    </div>
  )
}
