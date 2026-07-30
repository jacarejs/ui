import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/**/*.test.{js,mjs}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/theme/**/*.js',
        'src/i18n/**/*.js',
        'src/internal/**/*.js',
        'docs/src/theme-editor-store.js',
        'docs/src/navigate.js',
        'docs/src/nav-data.js',
        'docs/src/token-catalog.js',
        'docs/src/theme-presets.js',
        'docs/src/viewport-lab.js',
        'docs/src/density-preview.js',
        'docs/src/motion-lab.js',
      ],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.jacare/**',
        'docs/src/examples/**',
        'docs/src/generated/**',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
})
