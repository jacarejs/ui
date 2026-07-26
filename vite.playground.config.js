import { defineConfig } from 'vite'
import { jacare } from '@jacare/vite-plugin'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = dirname(fileURLToPath(import.meta.url))
const playgroundRoot = resolve(repoRoot, 'playground')

export default defineConfig({
  root: playgroundRoot,
  cacheDir: resolve(repoRoot, 'node_modules/.vite/ui-playground'),
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
    port: 5173,
    strictPort: false,
    fs: {
      allow: [repoRoot],
    },
  },
})
