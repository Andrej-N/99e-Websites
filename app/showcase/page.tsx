'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Monitor, Smartphone, Tablet } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

type DeviceView = 'desktop' | 'tablet' | 'mobile'

export default function ShowcasePage() {
  const { t } = useLanguage()
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop')

  const items = t.showcase.items

  const deviceWidths: Record<DeviceView, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-card-border bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-foreground-secondary hover:text-primary transition-colors"
          >
            {t.showcase.backToHome}
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">W</span>
            </div>
            <span className="font-heading font-bold text-foreground">Web99</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 glow-text"
          >
            {t.showcase.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-foreground-secondary text-lg max-w-2xl mx-auto"
          >
            {t.showcase.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Grid of previews */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl border border-card-border bg-background-secondary overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Iframe thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <iframe
                  src={`/templates/html/${item.slug}.html`}
                  title={item.title}
                  className="w-[1280px] h-[800px] origin-top-left pointer-events-none"
                  style={{ transform: 'scale(0.3)', transformOrigin: 'top left' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                {/* Overlay to capture click */}
                <button
                  onClick={() => setActivePreview(item.slug)}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Maximize2 size={14} />
                    {t.showcase.viewFullscreen}
                  </span>
                </button>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {item.title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {activePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-card-border">
              <div className="flex items-center gap-4">
                <h3 className="font-heading font-bold text-foreground">
                  {items.find((it) => it.slug === activePreview)?.title}
                </h3>
                {/* Device switcher */}
                <div className="flex items-center gap-1 bg-background-secondary rounded-lg p-1">
                  {([
                    { key: 'desktop' as DeviceView, icon: Monitor },
                    { key: 'tablet' as DeviceView, icon: Tablet },
                    { key: 'mobile' as DeviceView, icon: Smartphone },
                  ]).map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setDeviceView(key)}
                      className={cn(
                        'p-1.5 rounded-md transition-colors',
                        deviceView === key
                          ? 'bg-primary text-white'
                          : 'text-foreground-secondary hover:text-foreground'
                      )}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setActivePreview(null)
                  setDeviceView('desktop')
                }}
                className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                {t.showcase.closePreview}
                <X size={18} />
              </button>
            </div>

            {/* Iframe container */}
            <div className="flex-1 flex items-start justify-center overflow-auto bg-neutral-900 p-4">
              <motion.div
                layout
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-lg overflow-hidden shadow-2xl h-full"
                style={{
                  width: deviceWidths[deviceView],
                  maxWidth: '100%',
                }}
              >
                <iframe
                  src={`/templates/html/${activePreview}.html`}
                  title="Preview"
                  className="w-full h-full border-0"
                  style={{ minHeight: 'calc(100vh - 80px)' }}
                  sandbox="allow-scripts allow-same-origin"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
