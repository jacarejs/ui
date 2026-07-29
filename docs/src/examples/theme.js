export const themeBoot = `import '@jacare/ui/theme.css'
import { applyTheme } from '@jacare/ui/theme'

applyTheme('system')`

export const overrideTokens = `/* app.css */
:root {
  --j-primary: #0f766e;
  --j-leaf: #0d9488;
  --j-radius: 0.75rem;
}

[data-j-theme='dark'] {
  --j-primary: #2dd4bf;
  --j-leaf: #5eead4;
}`

export const semanticAliases = `/* Semantic aliases map brand tokens to roles */
--j-bg: var(--j-surface);
--j-fg: var(--j-text);
--j-accent: var(--j-primary);
--j-accent-hover: var(--j-leaf);
--j-ring: var(--j-focus);
--j-error: var(--j-danger);
--j-warning: var(--j-warn);`

export const applyModes = `import { applyTheme } from '@jacare/ui/theme'

applyTheme('light')
applyTheme('dark')
applyTheme('system')`

export const customFonts = `/* Load any webfont, then point Jacaré tokens at it */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --j-font: 'Outfit', system-ui, sans-serif;
  --j-font-mono: 'JetBrains Mono', ui-monospace, monospace;
}`

export const customFontsBody = `/* Optional: force the document to use the same stack */
html,
body {
  font-family: var(--j-font);
}`

export const tailwindBridge = `/* app.css — import Jacaré tokens first, then Tailwind */
@import '@jacare/ui/theme.css';
@import 'tailwindcss';

@theme {
  --font-sans: var(--j-font);
  --font-mono: var(--j-font-mono);
  --color-primary: var(--j-primary);
  --color-surface: var(--j-surface);
  --color-ink: var(--j-text);
  --color-muted: var(--j-muted);
  --color-danger: var(--j-danger);
  --radius-jui: var(--j-radius);
}`

export const tailwindV3Config = `// tailwind.config.js (Tailwind v3)
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jcr}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--j-primary)',
        surface: 'var(--j-surface)',
        ink: 'var(--j-text)',
        muted: 'var(--j-muted)',
        danger: 'var(--j-danger)',
      },
      fontFamily: {
        sans: ['var(--j-font)'],
        mono: ['var(--j-font-mono)'],
      },
      borderRadius: {
        jui: 'var(--j-radius)',
      },
    },
  },
  plugins: [],
}`

export const densityBoot = `import { applyDensity } from '@jacare/ui/theme'

applyDensity('comfortable')
applyDensity('compact')
applyDensity('spacious')

/* Or set an island attribute */
document.documentElement.dataset.jDensity = 'compact'`

export const motionBoot = `import { applyMotion } from '@jacare/ui/theme'

applyMotion('system')
applyMotion('full')
applyMotion('reduce')

/* data-j-motion="reduce" zeros --j-duration-* on that subtree */`

export const densityTokens = `:root {
  --j-density: 1;
  --j-control-height: calc(2.5rem * var(--j-density));
  --j-control-padding-x: calc(1.15rem * var(--j-density));
  --j-control-padding-y: calc(0.65rem * var(--j-density));
}

[data-j-density='compact'] { --j-density: 0.84; }
[data-j-density='spacious'] { --j-density: 1.12; }`

export const motionTokens = `:root {
  --j-duration-fast: 120ms;
  --j-duration-normal: 200ms;
  --j-duration-slow: 320ms;
  --j-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --j-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root:not([data-j-motion='full']) {
    --j-duration-fast: 0ms;
    --j-duration-normal: 0ms;
    --j-duration-slow: 0ms;
  }
}`
