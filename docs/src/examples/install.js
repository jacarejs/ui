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

export const imports = `import '@jacare/ui/theme.css'
import { Button } from '@jacare/ui'`

export const vitePlugin = `npm install -D @jacare/vite-plugin @jacare/compiler`
export const vitePluginYarn = `yarn add -D @jacare/vite-plugin @jacare/compiler`
export const vitePluginPnpm = `pnpm add -D @jacare/vite-plugin @jacare/compiler`
export const vitePluginBun = `bun add -d @jacare/vite-plugin @jacare/compiler`
