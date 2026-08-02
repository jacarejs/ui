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

export const widget = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
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

const value = pulse(72)

function continueCheckout() {
  const next = Math.min(100, value() + 14)
  value.set(next >= 100 ? 0 : next)
}

export <view>
  <Card>
    <Stack :gap=\${'md'} :align=\${'center'}>
      <Text :weight=\${'bold'}>\${label}</Text>
      <ProgressCircle :value=\${value} />
      <Button :variant=\${'primary'} on-press=\${continueCheckout}>Continue</Button>
    </Stack>
  </Card>
</view>`

export const alertWidget = `import { pulse } from '@jacare/core'
import Alert from '@jacare/ui/Alert'
import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <contract>
  props: {
    title: { type: 'string', default: 'Saved' }
    message: { type: 'string', default: 'Your changes are live.' }
  }
</contract>

const open = pulse(true)

export <view>
  <Stack :gap=\${'md'}>
    #if open()
      <Alert
        :tone=\${'success'}
        :title=\${title}
        :dismissible=\${true}
        bind-open=\${open}
        on-dismiss=\${() => open.set(false)}
      >
        \${message}
      </Alert>
      <Button :variant=\${'secondary'} :size=\${'sm'} on-press=\${() => open.set(false)}>
        Dismiss
      </Button>
    #else
      <Button :variant=\${'secondary'} :size=\${'sm'} on-press=\${() => open.set(true)}>
        Show again
      </Button>
    #end
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

export const angularHost = `import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { mountIsland, type IslandDispose } from '@jacare/core/island'
import CheckoutIsland from './CheckoutIsland.jcr'

@Component({
  selector: 'app-checkout-island',
  standalone: true,
  template: '<div #host class="island-host"></div>',
})
export class CheckoutIslandComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() progress = 0
  @Input() label = 'Checkout'

  @ViewChild('host', { static: true })
  host!: ElementRef<HTMLDivElement>

  private island?: IslandDispose

  ngAfterViewInit(): void {
    this.island = mountIsland(this.host.nativeElement, CheckoutIsland, {
      props: { progress: this.progress, label: this.label },
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
/>`
