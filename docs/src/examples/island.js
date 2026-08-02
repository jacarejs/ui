export const install = `yarn add @jacare/ui @jacare/core
yarn add -D @jacare/vite-plugin @jacare/compiler vite`

export const viteConfig = `import { defineConfig } from 'vite'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [jacare()],
})`

export const viteReact = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [react(), jacare()],
})`

export const viteVue = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [vue(), jacare()],
})`

export const viteAngular = `import { defineConfig } from 'vite'
import analog from '@analogjs/platform'
import { jacare } from '@jacare/vite-plugin'

// Analog (or any Vite Angular setup) + Jacaré compiler for .jcr islands
export default defineConfig({
  plugins: [analog(), jacare()],
})`

export const viteSvelte = `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { jacare } from '@jacare/vite-plugin'

export default defineConfig({
  plugins: [svelte(), jacare()],
})`

export const themeBoot = `import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')`

export const uiImport = `import { Button, Card, ProgressCircle, Stack, Text } from '@jacare/ui'`

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

export const widget = `import { Button, Card, ProgressCircle, Stack, Text } from '@jacare/ui'

export <contract>
  props: {
    progress: { type: 'number', default: 0 }
    label: { type: 'string', default: 'Progress' }
    onContinue: { type: 'any', default: null }
  }
</contract>

function readProp(value) {
  return typeof value === 'function' && typeof value.set === 'function' ? value() : value
}

function continueCheckout() {
  const fn = readProp(onContinue)
  if (typeof fn === 'function') fn()
}

export <view>
  <Card>
    <Stack :gap=\${'md'} :align=\${'center'}>
      <Text :weight=\${'bold'}>\${label}</Text>
      <ProgressCircle :value=\${progress} />
      <Button :variant=\${'primary'} on-press=\${continueCheckout}>Continue</Button>
    </Stack>
  </Card>
</view>`

export const alertWidget = `import { Alert, Button, Stack } from '@jacare/ui'

export <contract>
  props: {
    title: { type: 'string', default: 'Saved' }
    message: { type: 'string', default: 'Your changes are live.' }
    onDismiss: { type: 'any', default: null }
  }
</contract>

function readProp(value) {
  return typeof value === 'function' && typeof value.set === 'function' ? value() : value
}

export <view>
  <Stack :gap=\${'md'}>
    <Alert :tone=\${'success'} :title=\${title} :dismissible=\${true}>
      \${message}
    </Alert>
    <Button
      :variant=\${'secondary'}
      :size=\${'sm'}
      on-press=\${() => {
        const fn = readProp(onDismiss)
        if (typeof fn === 'function') fn()
      }}
    >
      Dismiss
    </Button>
  </Stack>
</view>`

export const multiBoot = `import '@jacare/ui/theme.css'
import { applyTheme } from '@jacare/ui/theme'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'
import StatusIsland from './StatusIsland.jcr'

applyTheme('system')

const disposers = [
  mountIsland('#checkout-island', CheckoutIsland, {
    props: { progress: 72, label: 'Checkout' },
  }),
  mountIsland('#status-island', StatusIsland, {
    props: {
      title: 'Payment cleared',
      message: 'Receipt emailed to the customer.',
    },
  }),
]

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    for (const dispose of disposers) dispose()
  })
}`

export const liveUpdate = `let progress = 12

const island = mountIsland('#checkout-island', CheckoutIsland, {
  props: { progress, label: 'Uploading' },
})

const timer = setInterval(() => {
  progress = Math.min(100, progress + 8)
  island.update({
    progress,
    label: progress >= 100 ? 'Done' : 'Uploading',
  })
  if (progress >= 100) clearInterval(timer)
}, 400)

// Prefer update() over remounting — focus and local island state stay intact`

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
import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')

export function CheckoutSlot({ progress, label, onContinue }) {
  const hostRef = useRef(null)
  const islandRef = useRef(null)

  useEffect(() => {
    if (!hostRef.current) return
    const island = mountIsland(hostRef.current, CheckoutIsland, {
      props: { progress, label, onContinue },
    })
    islandRef.current = island
    return () => island()
  }, [])

  useEffect(() => {
    islandRef.current?.update({ progress, label })
  }, [progress, label])

  return <div ref={hostRef} />
}

// Usage: <CheckoutSlot progress={72} label="Checkout" onContinue={...} />`

export const vueHost = `<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')

const props = defineProps({
  progress: { type: Number, default: 0 },
  label: { type: String, default: 'Checkout' },
  onContinue: { type: Function, default: null },
})

const host = ref(null)
let island

onMounted(() => {
  island = mountIsland(host.value, CheckoutIsland, {
    props: {
      progress: props.progress,
      label: props.label,
      onContinue: props.onContinue,
    },
  })
})

watch(
  () => [props.progress, props.label],
  ([progress, label]) => island?.update({ progress, label }),
)

onBeforeUnmount(() => island?.())
</script>

<template>
  <div ref="host" />
</template>`

export const angularHost = `import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'
import { mountIsland, type IslandDispose } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')

@Component({
  selector: 'app-checkout-island',
  standalone: true,
  template: '<div #host class="island-host"></div>',
})
export class CheckoutIslandComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() progress = 0
  @Input() label = 'Checkout'
  @Output() continue = new EventEmitter<void>()

  @ViewChild('host', { static: true })
  host!: ElementRef<HTMLDivElement>

  private island?: IslandDispose

  ngAfterViewInit(): void {
    this.island = mountIsland(this.host.nativeElement, CheckoutIsland, {
      props: {
        progress: this.progress,
        label: this.label,
        onContinue: () => this.continue.emit(),
      },
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.island) return
    if (changes['progress'] || changes['label']) {
      this.island.update({ progress: this.progress, label: this.label })
    }
  }

  ngOnDestroy(): void {
    this.island?.()
    this.island = undefined
  }
}`

export const angularUsage = `<!-- parent template -->
<app-checkout-island
  [progress]="uploadProgress"
  [label]="uploadLabel"
  (continue)="advanceCheckout()"
/>`

export const svelteHost = `<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import '@jacare/ui/theme.css'
  import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'
  import { mountIsland } from '@jacare/core/island'
  import CheckoutIsland from './CheckoutIsland.jcr'

  applyTheme('system')
  applyDensity('comfortable')
  applyMotion('system')

  export let progress = 0
  export let label = 'Checkout'

  const dispatch = createEventDispatcher()
  let host
  let island

  onMount(() => {
    island = mountIsland(host, CheckoutIsland, {
      props: {
        progress,
        label,
        onContinue: () => dispatch('continue'),
      },
    })
  })

  $: island?.update({ progress, label })

  onDestroy(() => island?.())
</script>

<div bind:this={host}></div>`

export const anyHost = `// Rails / Laravel / WordPress / plain HTML — leave a slot, mount once.
// The host owns layout; the island is built with packaged @jacare/ui/*.

import '@jacare/ui/theme.css'
import { applyTheme } from '@jacare/ui/theme'
import { mountIsland } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

applyTheme('system')

const island = mountIsland('#checkout-island', CheckoutIsland, {
  props: {
    progress: 72,
    label: 'Checkout',
    onContinue: () => console.log('continue'),
  },
})

window.__checkout = island`
