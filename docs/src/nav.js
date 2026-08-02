import { createNav, lazy, screen } from '@jacare/core'
import Shell from './shell.jcr'
import Home from './pages/home.jcr'
import NotFound from './pages/not-found.jcr'
import { componentHref, shippedComponents } from './nav-data.js'

const componentPages = import.meta.glob('./pages/components/*.jcr')

const componentScreens = Object.fromEntries(
  shippedComponents.map(({ name }) => {
    const slug = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const pagePath = `./pages/components/${slug}.jcr`
    const loader = componentPages[pagePath]
    if (!loader) {
      throw new Error(`Missing docs page for ${name}`)
    }
    return [
      componentHref(name),
      {
        use: lazy(loader),
        title: `${name} · Jacaré UI`,
      },
    ]
  }),
)

export const nav = createNav({
  base: import.meta.env.BASE_URL,
  layout: Shell,
  screens: {
    '/': { use: screen(Home), title: 'Jacaré UI' },
    '/install': { use: lazy(() => import('./pages/install.jcr')), title: 'Install · Jacaré UI' },
    '/quick-start': { use: lazy(() => import('./pages/quick-start.jcr')), title: 'Quick start · Jacaré UI' },
    '/island': { use: lazy(() => import('./pages/island.jcr')), title: 'Island · Jacaré UI' },
    '/theme': { use: lazy(() => import('./pages/theme.jcr')), title: 'Theme · Jacaré UI' },
    '/dark-mode': { use: lazy(() => import('./pages/dark-mode.jcr')), title: 'Dark mode · Jacaré UI' },
    '/i18n': { use: lazy(() => import('./pages/i18n.jcr')), title: 'i18n · Jacaré UI' },
    '/validation': { use: lazy(() => import('./pages/validation.jcr')), title: 'Validation · Jacaré UI' },
    '/tokens': { use: lazy(() => import('./pages/tokens.jcr')), title: 'Tokens · Jacaré UI' },
    '/layouts': { use: lazy(() => import('./pages/layouts.jcr')), title: 'Layouts · Jacaré UI' },
    '/accessibility': { use: lazy(() => import('./pages/accessibility.jcr')), title: 'Accessibility · Jacaré UI' },
    '/components': { use: lazy(() => import('./pages/components-index.jcr')), title: 'Components · Jacaré UI' },
    ...componentScreens,
    '/theme-editor': { use: lazy(() => import('./pages/theme-editor.jcr')), title: 'Theme Editor · Jacaré UI' },
    '/viewport-lab': { use: lazy(() => import('./pages/viewport-lab.jcr')), title: 'Viewport Lab · Jacaré UI' },
    '/density-preview': { use: lazy(() => import('./pages/density-preview.jcr')), title: 'Density Preview · Jacaré UI' },
    '/motion-lab': { use: lazy(() => import('./pages/motion-lab.jcr')), title: 'Motion Lab · Jacaré UI' },
    '/changelog': { use: lazy(() => import('./pages/changelog.jcr')), title: 'Changelog · Jacaré UI' },
  },
  missing: NotFound,
})
