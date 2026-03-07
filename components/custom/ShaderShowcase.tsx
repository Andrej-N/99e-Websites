'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

/* ----------------------------------------------------------------
   Animated shader canvas — draws a GPU-style animated noise field
   using the theme's accent color. Falls back gracefully.
   ---------------------------------------------------------------- */
function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const themeGradients: Record<string, [string, string, string]> = {
      light: ['#93c5fd', '#3b82f6', '#1d4ed8'],
      dark: ['#1e1b4b', '#312e81', '#818cf8'],
    }

    const getColors = () => themeGradients[theme] || themeGradients.dark

    const draw = () => {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      t += 0.004

      ctx.clearRect(0, 0, w, h)

      const [c1, c2, c3] = getColors()

      // Base gradient
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, c1)
      grad.addColorStop(0.5, c2)
      grad.addColorStop(1, c1)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Animated orbs
      const orbCount = 6
      for (let i = 0; i < orbCount; i++) {
        const ox = w * 0.5 + Math.sin(t * 0.7 + i * 1.2) * w * 0.35
        const oy = h * 0.5 + Math.cos(t * 0.5 + i * 0.9) * h * 0.3
        const r = Math.min(w, h) * (0.2 + 0.15 * Math.sin(t + i))
        const orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r)
        orbGrad.addColorStop(0, c3 + '44')
        orbGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = orbGrad
        ctx.beginPath()
        ctx.arc(ox, oy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Noise overlay — simple dithering
      const step = 8
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const n =
            Math.sin(x * 0.05 + t * 3) *
            Math.cos(y * 0.04 - t * 2) *
            Math.sin((x + y) * 0.02 + t)
          if (n > 0.6) {
            ctx.fillStyle = `rgba(255,255,255,${(n - 0.6) * 0.04})`
            ctx.fillRect(x, y, step, step)
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}

/* ----------------------------------------------------------------
   Main ShaderShowcase — Hero Section
   ---------------------------------------------------------------- */
export function ShaderShowcase() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Shader background */}
      <ShaderCanvas />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/95 z-10" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ---- HEADER ---- */}
      <header
        className={`relative z-20 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${scrolled ? 'bg-background/60 backdrop-blur-md border-b border-card-border' : ''
          }`}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-bold font-mono">W</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground glow-text">
            {t.nav.logo}
          </span>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <LanguageToggle />
          <ThemeSwitcher />
          <Button size="sm" variant="glow" className="hidden sm:flex">
            {t.nav.cta}
          </Button>
        </motion.div>
      </header>

      {/* ---- HERO CONTENT ---- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-6 md:px-12 py-20"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <Badge variant="glow" className="mb-6 gap-2">
            <Star size={12} className="fill-current" />
            {t.hero.badge}
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
        >
          <span className="text-foreground glow-text block">{t.hero.headline}</span>
          <span className="gradient-text block mt-1">{t.hero.headline2}</span>
          <span className="text-foreground glow-text block mt-1">{t.hero.headline3}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="text-foreground-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <Button size="xl" variant="glow" className="group w-full sm:w-auto">
            {t.hero.cta_primary}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
          <Button size="xl" variant="outline" className="w-full sm:w-auto">
            {t.hero.cta_secondary}
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-secondary"
        >
          {[t.hero.trust, t.hero.trust2].map((trust, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>{trust}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-20 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-foreground-muted"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
