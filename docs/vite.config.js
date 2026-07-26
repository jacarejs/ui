import { defineConfig } from 'vite'
import { jacare } from '@jacare/vite-plugin'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(docsRoot, '..')
const base = process.env.JACARE_BASE || '/'

export default defineConfig({
  root: docsRoot,
  base,
  cacheDir: resolve(repoRoot, 'node_modules/.vite/ui-docs'),
  plugins: [jacare()],
  resolve: {
    alias: [
      {
        find: '@jacare/ui/theme.css',
        replacement: resolve(repoRoot, 'src/theme/index.css'),
      },
      {
        find: '@jacare/ui',
        replacement: resolve(repoRoot, 'src'),
      },
    ],
  },
  server: {
    port: 5180,
    strictPort: false,
    fs: {
      allow: [repoRoot],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
