export const managers = [
  {
    id: 'npm',
    label: 'npm',
    filename: 'npm',
    code: `npm install @jacare/ui @jacare/core`,
  },
  {
    id: 'yarn',
    label: 'yarn',
    filename: 'yarn',
    code: `yarn add @jacare/ui @jacare/core`,
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    filename: 'pnpm',
    code: `pnpm add @jacare/ui @jacare/core`,
  },
  {
    id: 'bun',
    label: 'bun',
    filename: 'bun',
    code: `bun add @jacare/ui @jacare/core`,
  },
]

export const themeImport = `import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')`

export const componentImports = `// Preferred deep import (matches every docs demo)
import Button from '@jacare/ui/Button'
import Field from '@jacare/ui/Field'

// Named barrel also works
import { Button, Field } from '@jacare/ui'`

export const viteConfig = `import { defineConfig } from 'vite'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [jacare()],
})`

export const peerNote = `@jacare/ui peers the latest @jacare/core (minimum ^0.1.15)
Install both packages together so pulses and mount APIs resolve.`
