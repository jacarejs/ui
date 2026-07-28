export const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/jacar%C3%A9-devtools/cjemkcfolgmpfkpkpiklmkijalpfmkcm'

export const connectHook = `import { connectJacareDevtools } from '@jacare/devtools'

if (import.meta.env.DEV) {
  connectJacareDevtools()
}`

export const viteNote = `// @jacare/vite-plugin installs the page hook in DEV when
// @jacare/devtools is present. Opt out with:
export default defineConfig({
  plugins: [jacare({ devtoolsHook: false })],
})`
