'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, Paintbrush, Code2, Rocket } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const ICON_MAP = {
  ClipboardList,
  Paintbrush,
  Code2,
  Rocket,
}

type IconName = keyof typeof ICON_MAP

/* ----------------------------------------------------------------
   Orbital ring — SVG circle path for each step
   ---------------------------------------------------------------- */
function OrbitalRing({ radius, opacity = 0.15 }: { radius: number; opacity?: number }) {
  const { theme } = useTheme()

  return (
    <circle
      cx="0"
      cy="0"
      r={radius}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 8"
      opacity={theme === 'light' ? opacity * 2 : opacity}
      className={theme === 'light' ? 'text-foreground' : 'text-primary'}
    />
  )
}

/* ----------------------------------------------------------------
   Orbital node — the step circle on its ring
   ---------------------------------------------------------------- */
interface NodeProps {
  angle: number
  radius: number
  step: { number: string; title: string; icon: string; duration: string }
  index: number
  isActive: boolean
  onClick: () => void
}

function OrbitalNode({ angle, radius, step, index, isActive, onClick }: NodeProps) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius
  const Icon = ICON_MAP[step.icon as IconName] ?? ClipboardList

  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.15, type: 'spring', stiffness: 200 }}
    >
      {/* Glow ring when active */}
      {isActive && (
        <motion.circle
          r={48}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={0.4}
          className="text-primary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Node circle */}
      <motion.circle
        r={36}
        fill={isActive ? 'rgb(var(--accent))' : 'rgb(var(--card-bg))'}
        stroke="rgb(var(--accent))"
        strokeWidth={isActive ? 2 : 1}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />

      {/* Step number label */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="18"
        fontWeight="700"
        fill={isActive ? 'white' : 'rgb(var(--accent))'}
        fontFamily="var(--font-mono, monospace)"
        dy={-12}
      >
        {step.number}
      </text>

      {/* Duration label below the node */}
      {step.duration && (
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill={isActive ? 'rgba(255,255,255,0.8)' : 'rgb(var(--text-muted))'}
          fontFamily="var(--font-mono, monospace)"
          dy={14}
        >
          {step.duration}
        </text>
      )}

      {/* Connector line to edge label */}
      <line
        x1={0}
        y1={0}
        x2={x > 0 ? 80 : -80}
        y2={0}
        stroke="rgb(var(--border))"
        strokeWidth="1"
      />
    </motion.g>
  )
}

/* ----------------------------------------------------------------
   Main RadialOrbitalTimeline
   ---------------------------------------------------------------- */
export function RadialOrbitalTimeline() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Auto-advance through steps
  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % t.process.steps.length)
    }, 2800)
    return () => clearInterval(id)
  }, [autoPlay, t.process.steps.length])

  const steps = t.process.steps
  const active = steps[activeStep]
  const Icon = ICON_MAP[active.icon as IconName] ?? ClipboardList

  // Orbital radii for 4 steps
  const orbits = [120, 210, 300, 390]
  // Angles so nodes are spread nicely (not all at same angle)
  const angles = [-60, -20, 20, 60]

  const viewSize = 900
  const cx = viewSize / 2

  return (
    <section id="process" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4 glow-text">
            {t.process.title}
          </h2>
          <p className="text-foreground-secondary text-lg">{t.process.subtitle}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ---- Orbital SVG diagram ---- */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <motion.div
              className="relative w-full max-w-sm sm:max-w-lg lg:max-w-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                viewBox={`0 0 ${viewSize} ${viewSize}`}
                className="w-full h-auto overflow-visible"
              >
                <g transform={`translate(${cx}, ${cx})`}>
                  {/* Orbital rings */}
                  {orbits.map((r, i) => (
                    <OrbitalRing key={i} radius={r} opacity={activeStep === i ? 0.3 : 0.12} />
                  ))}

                  {/* Center hub */}
                  <motion.circle
                    r={56}
                    fill="rgb(var(--accent))"
                    opacity={0.15}
                    animate={{ r: [56, 64, 56] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  />
                  <circle r={44} fill="rgb(var(--accent))" opacity={0.9} />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="24"
                    fontWeight="900"
                    fill="white"
                    fontFamily="var(--font-mono, monospace)"
                  >
                    {activeStep + 1}
                  </text>

                  {/* Step nodes */}
                  {steps.map((step, i) => (
                    <OrbitalNode
                      key={i}
                      angle={angles[i]}
                      radius={orbits[i]}
                      step={step}
                      index={i}
                      isActive={activeStep === i}
                      onClick={() => {
                        setActiveStep(i)
                        setAutoPlay(false)
                      }}
                    />
                  ))}

                  {/* Step title labels (outside the rings) */}
                  {steps.map((step, i) => {
                    const rad = (angles[i] * Math.PI) / 180
                    const lx = Math.cos(rad) * (orbits[i] + 90)
                    const ly = Math.sin(rad) * (orbits[i] + 90)
                    const anchor = lx > 0 ? 'start' : 'end'
                    return (
                      <text
                        key={i}
                        x={lx}
                        y={ly}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fontSize="26"
                        fontWeight={activeStep === i ? '700' : '400'}
                        fill={activeStep === i ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))'}
                        fontFamily="var(--font-sans, sans-serif)"
                        style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
                        onClick={() => {
                          setActiveStep(i)
                          setAutoPlay(false)
                        }}
                      >
                        {step.title}
                      </text>
                    )
                  })}
                </g>
              </svg>
            </motion.div>
          </div>

          {/* ---- Step detail panel ---- */}
          <div className="w-full lg:w-2/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'rounded-2xl border p-8',
                  'border-card-border',
                  'bg-card'
                )}
              >
                {/* Step number & duration */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-5xl font-black text-primary opacity-30">
                    {active.number}
                  </span>
                  {active.duration && (
                    <span className="text-xs font-mono text-foreground-secondary border border-card-border rounded-full px-3 py-1">
                      {active.duration}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                  {active.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed text-base">
                  {active.description}
                </p>

                {/* Step dots navigation */}
                <div className="flex items-center gap-2 mt-8">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveStep(i)
                        setAutoPlay(false)
                      }}
                      className={cn(
                        'rounded-full transition-all duration-300',
                        i === activeStep
                          ? 'w-8 h-2 bg-primary'
                          : 'w-2 h-2 bg-foreground-muted hover:bg-primary/50'
                      )}
                    />
                  ))}
                  <button
                    onClick={() => setAutoPlay((a) => !a)}
                    className="ml-auto text-xs text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {autoPlay ? '⏸ Pause' : '▶ Play'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section >
  )
}
