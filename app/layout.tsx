import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display, Space_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'

/* ----------------------------------------------------------------
   Load all theme fonts — each becomes a CSS variable on <body>
   ---------------------------------------------------------------- */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Web99 — Your Website. 99€. Online in Days.',
  description:
    'Fast, modern, mobile-ready websites for small businesses and freelancers. Custom design, SEO optimized, delivered in 5–7 days for 99€.',
  keywords: ['web design', 'website', '99 euro', 'cheap website', 'fast website', 'web agency'],
  openGraph: {
    title: 'Web99 — Your Website. 99€.',
    description: 'Professional custom websites from concept to launch in 5–7 days.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        data-theme="dark"
        suppressHydrationWarning
        className={`
          ${inter.variable}
          ${jetbrainsMono.variable}
          ${playfairDisplay.variable}
          ${spaceMono.variable}
          antialiased
        `}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
