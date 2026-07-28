import { createNav, lazy, screen } from '@jacare/core'
import Shell from './shell.jcr'
import Home from './pages/home.jcr'
import NotFound from './pages/not-found.jcr'

export const nav = createNav({
  base: import.meta.env.BASE_URL,
  layout: Shell,
  screens: {
    '/': { use: screen(Home), title: 'Jacaré UI' },
    '/install': { use: lazy(() => import('./pages/install.jcr')), title: 'Install · Jacaré UI' },
    '/quick-start': { use: lazy(() => import('./pages/quick-start.jcr')), title: 'Quick start · Jacaré UI' },
    '/theme': { use: lazy(() => import('./pages/theme.jcr')), title: 'Theme · Jacaré UI' },
    '/dark-mode': { use: lazy(() => import('./pages/dark-mode.jcr')), title: 'Dark mode · Jacaré UI' },
    '/tokens': { use: lazy(() => import('./pages/tokens.jcr')), title: 'Tokens · Jacaré UI' },
    '/layouts': { use: lazy(() => import('./pages/layouts.jcr')), title: 'Layouts · Jacaré UI' },
    '/accessibility': { use: lazy(() => import('./pages/accessibility.jcr')), title: 'Accessibility · Jacaré UI' },
    '/components': { use: lazy(() => import('./pages/components-index.jcr')), title: 'Components · Jacaré UI' },
    '/components/button': { use: lazy(() => import('./pages/components/button.jcr')), title: 'Button · Jacaré UI' },
    '/components/alert': { use: lazy(() => import('./pages/components/alert.jcr')), title: 'Alert · Jacaré UI' },
    '/components/avatar': { use: lazy(() => import('./pages/components/avatar.jcr')), title: 'Avatar · Jacaré UI' },
    '/components/badge': { use: lazy(() => import('./pages/components/badge.jcr')), title: 'Badge · Jacaré UI' },
    '/components/card': { use: lazy(() => import('./pages/components/card.jcr')), title: 'Card · Jacaré UI' },
    '/components/checkbox': { use: lazy(() => import('./pages/components/checkbox.jcr')), title: 'Checkbox · Jacaré UI' },
    '/components/color-picker': { use: lazy(() => import('./pages/components/color-picker.jcr')), title: 'ColorPicker · Jacaré UI' },
    '/components/divider': { use: lazy(() => import('./pages/components/divider.jcr')), title: 'Divider · Jacaré UI' },
    '/components/field': { use: lazy(() => import('./pages/components/field.jcr')), title: 'Field · Jacaré UI' },
    '/components/flex': { use: lazy(() => import('./pages/components/flex.jcr')), title: 'Flex · Jacaré UI' },
    '/components/grid': { use: lazy(() => import('./pages/components/grid.jcr')), title: 'Grid · Jacaré UI' },
    '/components/progress': { use: lazy(() => import('./pages/components/progress.jcr')), title: 'Progress · Jacaré UI' },
    '/components/spinner': { use: lazy(() => import('./pages/components/spinner.jcr')), title: 'Spinner · Jacaré UI' },
    '/components/stack': { use: lazy(() => import('./pages/components/stack.jcr')), title: 'Stack · Jacaré UI' },
    '/components/switch': { use: lazy(() => import('./pages/components/switch.jcr')), title: 'Switch · Jacaré UI' },
    '/components/text': { use: lazy(() => import('./pages/components/text.jcr')), title: 'Text · Jacaré UI' },
    '/theme-editor': { use: lazy(() => import('./pages/theme-editor.jcr')), title: 'Theme Editor · Jacaré UI' },
    '/playground': { use: lazy(() => import('./pages/playground.jcr')), title: 'Playground · Jacaré UI' },
    '/changelog': { use: lazy(() => import('./pages/changelog.jcr')), title: 'Changelog · Jacaré UI' },
  },
  missing: NotFound,
})
