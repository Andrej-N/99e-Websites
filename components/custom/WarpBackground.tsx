'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

/* ----------------------------------------------------------------
   WarpBackground — canvas-based perspective grid that zooms toward
   the viewer, creating a warp-speed / hyperspace tunnel effect.
   The grid color tracks the current theme's accent.
   ---------------------------------------------------------------- */
function WarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let t = 0

    const accentColors: Record<string, string> = {
      light: '#4f46e5',
      dark: '#818cf8',
    }

    const bgColors: Record<string, string> = {
      light: '#f1f5f9',
      dark: '#0f172a',
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const COLS = 12
    const ROWS = 8

    const draw = () => {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      t += 0.012

      const accent = accentColors[theme] ?? '#818cf8'
      const bg = bgColors[theme] ?? '#0f172a'

      // Background
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Perspective warp grid
      ctx.strokeStyle = accent
      ctx.lineWidth = 0.6

      // Zoom cycle: 0 → 1
      const z = (t % 1)

      // Horizontal lines (converging to center)
      for (let row = -ROWS; row <= ROWS; row++) {
        const baseY = row / ROWS
        // Interpolate from horizon (center) to edge using z
        const progress = (Math.abs(baseY) * (1 - z) + z * Math.abs(baseY)) * (1 + z)
        const y = cy + baseY * cy * (1 + z * 1.5) * 1.2

        if (y < 0 || y > h) continue

        const alpha = Math.max(0, Math.min(0.6, 1 - Math.abs(baseY) * 0.8)) * (1 - z * 0.3)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
        void progress
      }

      // Vertical lines (converging to center)
      for (let col = -COLS; col <= COLS; col++) {
        const baseX = col / COLS
        const x = cx + baseX * cx * (1 + z * 1.5) * 1.2

        if (x < -50 || x > w + 50) continue

        const alpha = Math.max(0, Math.min(0.6, 1 - Math.abs(baseX) * 0.8)) * (1 - z * 0.3)
        ctx.globalAlpha = alpha

        // Perspective: converge toward center-y
        ctx.beginPath()
        ctx.moveTo(cx, cy) // vanishing point
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // Second layer — stars / dots rushing toward viewer
      ctx.globalAlpha = 1
      const starCount = 60
      for (let i = 0; i < starCount; i++) {
        const seed1 = Math.sin(i * 127.1 + Math.floor(t)) * 43758.5453
        const seed2 = Math.sin(i * 311.7 + Math.floor(t)) * 43758.5453
        const frac = (t % 1)

        const sx = cx + (seed1 - Math.floor(seed1) - 0.5) * w * (0.1 + frac * 1.5)
        const sy = cy + (seed2 - Math.floor(seed2) - 0.5) * h * (0.1 + frac * 1.5)
        const sr = frac * 2.5

        if (sx < 0 || sx > w || sy < 0 || sy > h) continue

        ctx.globalAlpha = frac * 0.7
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(sx, sy, sr, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // Radial vignette
      const vignette = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7)
      vignette.addColorStop(0, 'transparent')
      vignette.addColorStop(1, bg + 'dd')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
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
   WarpBackground — wrapper component
   Children are rendered above the canvas
   ---------------------------------------------------------------- */
interface WarpBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function WarpBackground({ children, className = '' }: WarpBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <WarpCanvas />
      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
