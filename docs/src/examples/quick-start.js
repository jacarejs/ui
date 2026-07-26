export const install = `npm install @jacare/ui @jacare/core
npm install -D @jacare/vite-plugin @jacare/compiler`

export const viteConfig = `import { defineConfig } from 'vite'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [jacare()],
})`

export const boot = `import '@jacare/ui/theme.css'
import { applyTheme } from '@jacare/ui/theme'
import { mount } from './app.jcr'

applyTheme('system')
mount(document.querySelector('#app'))`

export const firstComponent = `import Button from '@jacare/ui/Button'

export <view>
  <Button :variant=\${'primary'}>Continue</Button>
</view>`
