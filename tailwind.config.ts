import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace'],
      },
      colors: {
        background: 'rgb(var(--bg-primary) / <alpha-value>)',
        'background-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
        'background-tertiary': 'rgb(var(--bg-tertiary) / <alpha-value>)',
        foreground: 'rgb(var(--text-primary) / <alpha-value>)',
        'foreground-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'foreground-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        primary: 'rgb(var(--accent) / <alpha-value>)',
        'primary-hover': 'rgb(var(--accent-hover) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        card: 'rgb(var(--card-bg) / <alpha-value>)',
        'card-border': 'rgb(var(--card-border) / <alpha-value>)',
        glow: 'var(--glow)',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px var(--glow)' },
          '50%': { boxShadow: '0 0 40px var(--glow), 0 0 80px var(--glow)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
