# Web99 — Landing Page: What Was Built

## Overview

A full-stack, high-converting landing page for a web development agency offering custom websites for **99€**. Built from scratch with Next.js 15, React 19, TypeScript, Tailwind CSS, and a suite of animation and UI libraries.

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| Next.js | 15.5.x (App Router) | Framework |
| React | 19 | UI runtime |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| framer-motion | 11.x | Animations |
| @paper-design/shaders-react | 0.0.71 | Shader library (installed, ready to integrate) |
| lucide-react | 0.469 | Icons |
| class-variance-authority | 0.7 | Component variants (shadcn pattern) |
| @radix-ui/react-slot | 1.1 | Polymorphic component base |
| clsx + tailwind-merge | 2.x | Class name utilities |
| next/font/google | built-in | Font loading & CSS variable injection |

---

## File Structure (21 files created)

```
sajt_99e_sajtovi/
├── package.json                          — all dependencies
├── next.config.ts                        — Next.js config
├── tsconfig.json                         — TypeScript config
├── tailwind.config.ts                    — Tailwind with theme color/font CSS vars
├── postcss.config.mjs                    — PostCSS (tailwind + autoprefixer)
│
├── app/
│   ├── globals.css                       — 5 theme definitions + base styles
│   ├── layout.tsx                        — Root layout: fonts, providers, metadata
│   └── page.tsx                          — Main page: assembles all sections
│
├── context/
│   ├── ThemeContext.tsx                  — Theme state, setTheme, localStorage persist
│   └── LanguageContext.tsx              — Language state (en/sr), t() accessor
│
├── locales/
│   ├── en.ts                             — Full English copy (all sections)
│   └── sr.ts                             — Full Serbian copy (all sections)
│
├── lib/
│   └── utils.ts                          — cn() utility (clsx + tailwind-merge)
│
└── components/
    ├── ui/
    │   ├── button.tsx                    — shadcn Button (5 variants, 5 sizes)
    │   ├── badge.tsx                     — shadcn Badge (4 variants)
    │   └── card.tsx                      — shadcn Card + sub-components
    ├── ThemeSwitcher.tsx                 — Dropdown theme picker with color swatches
    ├── LanguageToggle.tsx                — EN / SR pill toggle with motion indicator
    └── custom/
        ├── ShaderShowcase.tsx            — Hero section (canvas shader + header)
        ├── RadialOrbitalTimeline.tsx     — Process section (SVG orbital UI)
        └── WarpBackground.tsx            — Pricing background (canvas warp grid)
```

---

## Core Feature: 5-Theme System

Themes are applied via `data-theme` attribute on `<body>`. Each theme defines its own set of **color variables** AND **font variables**, so switching theme changes both the color palette and the typeface simultaneously.

### Theme Definitions (`app/globals.css`)

| Theme | Key Colors | Font |
|---|---|---|
| `light` | White bg, indigo accent | Inter (sans-serif) |
| `dark` | Slate-900 bg, indigo/violet accent | Inter (sans-serif) |
| `theme-cyber` | Black bg, cyan + green accent | JetBrains Mono (monospace) |
| `theme-minimal` | Stone-50 bg, near-black accent | Playfair Display (serif) |
| `theme-neon` | Deep purple bg, hot-pink accent | Space Mono (monospace) |

### CSS Variable Pattern

Every component uses semantic CSS variables (never hardcoded colors):

```css
[data-theme="theme-cyber"] {
  --bg-primary: #000000;
  --text-primary: #00ff9f;
  --accent: #00ffff;
  --font-sans: var(--font-jetbrains, monospace);
  --font-heading: var(--font-jetbrains, monospace);
  /* ... */
}
```

Tailwind is configured to consume these variables:

```ts
// tailwind.config.ts
colors: {
  background: 'var(--bg-primary)',
  primary: 'var(--accent)',
  foreground: 'var(--text-primary)',
  // ...
},
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui'],
  heading: ['var(--font-heading)', 'system-ui'],
}
```

### Font Loading (`app/layout.tsx`)

All 4 fonts are loaded via `next/font/google` and injected as CSS variables onto `<body>`:

```tsx
const inter = Inter({ variable: '--font-inter', ... })
const jetbrainsMono = JetBrains_Mono({ variable: '--font-jetbrains', ... })
const playfairDisplay = Playfair_Display({ variable: '--font-playfair', ... })
const spaceMono = Space_Mono({ variable: '--font-space-mono', ... })
```

When a theme activates, `--font-sans` and `--font-heading` point to the correct loaded font variable — the typeface swaps instantly with zero layout shift.

### Theme Switching Logic (`context/ThemeContext.tsx`)

- On mount: reads from `localStorage`, defaults to `dark`
- On change: sets `data-theme` on both `document.documentElement` and `document.body`, persists to `localStorage`
- `ThemeProvider` returns `null` until mounted to prevent hydration mismatch

---

## Core Feature: Bilingual Support (EN / SR)

### How it works

- `LanguageContext` provides a `t` object (the active translation)
- Every component calls `const { t } = useLanguage()` — no prop drilling
- Language persists to `localStorage`
- The entire translation object is typed: `sr.ts` implements the same `Translations` type exported from `en.ts`, so TypeScript catches any missing keys

### Coverage

All copy is translated in both languages:
- Navigation
- Hero section (headline, subheadline, CTAs, trust indicators)
- Stats bar
- Features section (title, subtitle, all 10 feature labels)
- Process section (title, subtitle, all 4 step titles/descriptions/durations)
- Pricing section (title, badge, price period, all 10 includes, CTA, note, guarantee)
- FAQ section (6 questions + answers)
- Footer (tagline, copyright, email, links)

---

## Page Sections

### 1. Hero — `ShaderShowcase`

**Location:** `components/custom/ShaderShowcase.tsx`
**Section:** Full-screen hero, top of page

**What it does:**
- Renders an animated canvas background (GPU-style animated noise with orbital gradient orbs, themed per active theme)
- Floating header bar with: logo | `LanguageToggle` | `ThemeSwitcher` | CTA button
- The header gains a frosted-glass `backdrop-blur` effect on scroll
- Headline animates in with staggered `framer-motion` `container`/`item` variants
- Three-line headline: plain → gradient → plain for visual hierarchy
- Two CTAs (primary glow button + outline button) and 3 trust indicators below
- Animated scroll chevron at the bottom
- Dynamically imported with `ssr: false` to avoid hydration errors from canvas/window APIs

**Canvas animation algorithm:**
1. Fills with a theme-matched linear gradient (3-stop)
2. Draws 6 animated radial gradient "orbs" that orbit using `sin`/`cos` with time offset
3. Overlays a noise dither pass (8×8 grid, sin/cos noise function)
4. Result: a living, breathing animated background that reacts to theme changes

---

### 2. Stats Bar — inline in `page.tsx`

Quick social proof: `50+ Websites | 7 Days | 99€ | 100%`. Staggered fade-in on scroll via `whileInView`.

---

### 3. Features — inline in `page.tsx`

Grid of 10 feature cards (2 cols mobile → 3 → 5). Each card has a lucide-react icon in a themed pill container, hover lift animation.

---

### 4. Process — `RadialOrbitalTimeline`

**Location:** `components/custom/RadialOrbitalTimeline.tsx`
**Section:** "How It Works"

**What it does:**
- SVG-based orbital diagram: a central W99 hub surrounded by 4 orbital rings at increasing radii (80, 140, 200, 260px)
- 4 step nodes positioned along the rings at staggered angles so they don't overlap
- Each node shows: step number + duration inside the circle, step title outside the ring as a text label
- Active node gets a pulsing glow ring (framer-motion infinite animation)
- Clicking a node activates it; clicking the text label does too
- Right panel: animated `AnimatePresence` step detail card — shows step number watermark, icon, title, description
- Auto-plays through all 4 steps every 2.8s; can be paused with the "⏸ Pause" button
- Dot pagination at bottom of detail card
- Dynamically imported with `ssr: false`

---

### 5. Pricing — `WarpBackground` + shadcn `Card`

**Location:** `components/custom/WarpBackground.tsx` (wrapper) + `page.tsx` (content)
**Section:** Pricing / CTA

**WarpBackground canvas algorithm:**
1. Draws a perspective grid: horizontal lines converging from `y=center` outward, vertical lines converging to a vanishing point at `(cx, cy)`
2. Each frame, `t` increments → `z = t % 1` creates a looping "zoom" cycle where the grid appears to rush toward the viewer
3. 60 "stars" (dots) scatter outward from the center each cycle, growing in size as they approach the edge
4. Radial vignette gradient is applied last to darken the edges, keeping focus on center content
5. Colors pulled from per-theme accent and background values

**Pricing Card (shadcn `Card`):**
- Gradient shimmer bar across the top
- `Badge` with "Most Popular" / "Najpopularnije"
- Large price display: `€` superscript + `99` in 7xl font
- Checklist of 10 included items (each animates in on scroll with staggered delay)
- Full-width glow CTA button
- Guarantee badge in footer

---

### 6. FAQ — inline in `page.tsx`

Accordion: 6 Q&As, each toggles open/closed with a chevron rotate animation. Fully translated.

---

### 7. Footer — inline in `page.tsx`

Logo, tagline, email link, copyright. Responsive flex layout.

---

## shadcn/ui Components (manually scaffolded)

All three components follow the shadcn pattern (CVA variants, Radix Slot, forwardRef):

### Button
5 variants: `default`, `outline`, `ghost`, `link`, `glow`
5 sizes: `sm`, `default`, `lg`, `xl`, `icon`
The `glow` variant adds `box-shadow` using `var(--glow)` so it pulses differently per theme.

### Badge
4 variants: `default`, `outline`, `glow`, `solid`

### Card
Full shadcn Card family: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

---

## SSR Safety

All three custom components use the WebGL canvas or `window` APIs, which don't exist on the server. They are imported with:

```tsx
const ShaderShowcase = dynamic(
  () => import('@/components/custom/ShaderShowcase').then(m => m.ShaderShowcase),
  { ssr: false }
)
```

This ensures Next.js never tries to server-render them, eliminating hydration errors.

---

## Build Output

```
Route (app)               Size    First Load JS
┌ ○ /                   52.7 kB      155 kB
└ ○ /_not-found           992 B      103 kB
```

- Zero TypeScript errors
- Zero lint errors
- Statically prerendered

---

## Running the Project

```bash
# Development
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm run start
```

---

## Notes & Next Steps

- **`@paper-design/shaders-react`** is installed at `0.0.71` (latest). The `ShaderShowcase` currently uses a custom canvas implementation for maximum control. To integrate the library's actual shader components, import from `@paper-design/shaders-react` and replace the `<ShaderCanvas />` internals once you've reviewed their API at that version.
- The **theme switcher** and **language toggle** are embedded inside `ShaderShowcase`'s header. They are also independently importable for use in any other layout.
- All section IDs (`#features`, `#process`, `#pricing`, `#faq`) are set for smooth-scroll anchor navigation.
