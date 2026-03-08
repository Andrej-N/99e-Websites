'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Shield,
  Check,
  ChevronDown,
  Phone,
  Mail,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

/* ---- Dynamic imports with ssr: false for WebGL / canvas components ---- */
const ShaderShowcase = dynamic(
  () => import('@/components/custom/ShaderShowcase').then((m) => m.ShaderShowcase),
  { ssr: false }
)

const RadialOrbitalTimeline = dynamic(
  () => import('@/components/custom/RadialOrbitalTimeline').then((m) => m.RadialOrbitalTimeline),
  { ssr: false }
)

const WarpBackground = dynamic(
  () => import('@/components/custom/WarpBackground').then((m) => m.WarpBackground),
  { ssr: false }
)


/* ----------------------------------------------------------------
   Stats section
   ---------------------------------------------------------------- */
function StatsSection() {
  const { t } = useLanguage()
  return (
    <section className="py-16 px-6 md:px-12 bg-background-secondary border-y border-card-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {t.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="font-heading font-black text-4xl md:text-5xl text-primary glow-text mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-foreground-secondary">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


/* ----------------------------------------------------------------
   Pricing section (inside WarpBackground)
   ---------------------------------------------------------------- */
function PricingSection() {
  const { t } = useLanguage()
  return (
    <section id="pricing" className="relative">
      <WarpBackground className="py-28 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4 glow-text">
              {t.pricing.title}
            </h2>
            <p className="text-foreground-secondary text-lg">{t.pricing.subtitle}</p>
          </motion.div>

          {/* Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="relative overflow-hidden glow-border">
              {/* Shimmer accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <CardHeader className="pt-8 pb-4 items-center text-center">
                <Badge variant="glow" className="mb-4">
                  {t.pricing.badge}
                </Badge>

                {/* Price display */}
                <div className="flex items-start justify-center gap-1 mb-2">
                  <span className="font-heading font-black text-foreground-secondary text-2xl mt-3">
                    {t.pricing.currency}
                  </span>
                  <span className="font-heading font-black text-7xl text-foreground glow-text">
                    {t.pricing.price}
                  </span>
                </div>

                <CardDescription className="text-base">
                  {t.pricing.period}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                {/* Includes list */}
                <ul className="space-y-3 mb-8">
                  {t.pricing.includes.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-primary" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <Button variant="glow" size="xl" className="w-full text-base font-bold">
                  {t.pricing.cta}
                </Button>

                <p className="text-center text-xs text-foreground-muted mt-4">
                  {t.pricing.note}
                </p>
              </CardContent>

              <CardFooter className="justify-center pb-6">
                <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                  <Shield size={12} className="text-primary" />
                  {t.pricing.guarantee}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </WarpBackground>
    </section>
  )
}

/* ----------------------------------------------------------------
   FAQ section
   ---------------------------------------------------------------- */
function FaqItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border border-card-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-background-secondary transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-foreground-secondary flex-shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-foreground-secondary leading-relaxed border-t border-card-border pt-4">
          {answer}
        </div>
      )}
    </motion.div>
  )
}

function FaqSection() {
  const { t } = useLanguage()
  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-background-secondary">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4 glow-text">
            {t.faq.title}
          </h2>
          <p className="text-foreground-secondary">{t.faq.subtitle}</p>
        </motion.div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact section
   ---------------------------------------------------------------- */
function ContactSection() {
  const { t } = useLanguage()
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4 glow-text">
            {t.contact.title}
          </h2>
          <p className="text-foreground-secondary text-lg">{t.contact.subtitle}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <motion.a
            href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 px-8 py-6 rounded-xl border border-card-border bg-background-secondary hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-foreground-secondary mb-1">{t.contact.phoneLabel}</div>
              <div className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {t.contact.phone}
              </div>
            </div>
          </motion.a>

          <motion.a
            href={`mailto:${t.contact.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 px-8 py-6 rounded-xl border border-card-border bg-background-secondary hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-foreground-secondary mb-1">{t.contact.emailLabel}</div>
              <div className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {t.contact.email}
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
   ---------------------------------------------------------------- */
function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="py-12 px-6 md:px-12 bg-background border-t border-card-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold font-mono">W</span>
          </div>
          <span className="font-heading font-bold text-foreground">Web99</span>
        </div>

        <p className="text-sm text-foreground-secondary text-center">{t.footer.tagline}</p>

        <div className="flex items-center gap-6 text-xs text-foreground-muted">
          <a href={`mailto:${t.footer.email}`} className="hover:text-primary transition-colors">
            {t.footer.email}
          </a>
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   Root page — assembles all sections
   ---------------------------------------------------------------- */
export default function Home() {
  return (
    <main>
      {/* 1. Hero — ShaderShowcase with header (lang toggle + theme switcher) */}
      <ShaderShowcase />

      {/* 2. Quick stats bar */}
      <StatsSection />

      {/* 4. How It Works — RadialOrbitalTimeline */}
      <RadialOrbitalTimeline />

      {/* 5. Pricing — WarpBackground + shadcn Card */}
      <PricingSection />

      {/* 6. FAQ */}
      <FaqSection />

      {/* 7. Contact */}
      <ContactSection />

      {/* 8. Footer */}
      <Footer />
    </main>
  )
}
