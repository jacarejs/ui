export const install = `npm install @jacare/ui @jacare/core
npm install -D @jacare/vite-plugin @jacare/compiler vite`

export const viteConfig = `import { defineConfig } from 'vite'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [jacare()],
})`

export const hostHtml = `<div id="checkout-island">
  <p>Loading checkout…</p>
</div>
<script type="module" src="/boot.js"></script>`

export const boot = `import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')

const island = mountIsland('#checkout-island', CheckoutIsland, {
  props: { progress: 72, label: 'Checkout' },
})

// Push new props without remounting (keeps focus / internal state)
island.update({ progress: 90 })

// Later: island() tears the mount down when the host removes the slot
`

export const widget = `import Button from '@jacare/ui/Button'
import Card from '@jacare/ui/Card'
import ProgressCircle from '@jacare/ui/ProgressCircle'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <contract>
  props: {
    progress: { type: 'number', default: 0 }
    label: { type: 'string', default: 'Progress' }
  }
</contract>

export <view>
  <Card>
    <Stack :gap=\${'md'} :align=\${'center'}>
      <Text :weight=\${'bold'}>\${label}</Text>
      <ProgressCircle :value=\${progress} />
      <Button :variant=\${'primary'}>Continue</Button>
    </Stack>
  </Card>
</view>`

export const shadowBoot = `import '@jacare/ui/theme.css'
import { applyTheme } from '@jacare/ui/theme'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

applyTheme('system')

mountIsland('#checkout-island', CheckoutIsland, {
  props: { progress: 72, label: 'Checkout' },
  shadow: true,
})`

export const reactHost = `import { useEffect, useRef } from 'react'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

export function CheckoutSlot({ progress, label }) {
  const hostRef = useRef(null)
  const islandRef = useRef(null)

  useEffect(() => {
    if (!hostRef.current) return
    const island = mountIsland(hostRef.current, CheckoutIsland, {
      props: { progress, label },
    })
    islandRef.current = island
    return () => island()
  }, [])

  useEffect(() => {
    islandRef.current?.update({ progress, label })
  }, [progress, label])

  return <div ref={hostRef} />
}`

export const vueHost = `import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

export default {
  props: { progress: Number, label: String },
  setup(props) {
    const host = ref(null)
    let island

    onMounted(() => {
      island = mountIsland(host.value, CheckoutIsland, {
        props: { progress: props.progress, label: props.label },
      })
    })

    watch(
      () => [props.progress, props.label],
      ([progress, label]) => island?.update({ progress, label }),
    )

    onBeforeUnmount(() => island?.())

    return { host }
  },
  template: '<div ref="host" />',
}`
