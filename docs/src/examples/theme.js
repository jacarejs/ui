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
