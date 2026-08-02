export const basic = `import { pulse } from '@jacare/core'
import Card from '@jacare/ui/Card'
import Hover from '@jacare/ui/Hover'
import Text from '@jacare/ui/Text'

const hovered = pulse(false)

export <view>
  <div style="display:grid;gap:0.75rem">
    <Hover bind-value=\${hovered}>
      <Card :title=\${'Hover me'} :subtitle=\${() => (hovered() ? 'Hovered' : 'Idle')} />
    </Hover>
    <Text :tone=\${'muted'}>Model: \${() => (hovered() ? 'true' : 'false')}</Text>
  </div>
</view>`

export const disabled = `import Card from '@jacare/ui/Card'
import Hover from '@jacare/ui/Hover'

export <view>
  <Hover :disabled=\${true}>
    <Card :title=\${'Disabled'} :subtitle=\${'Hover state stays off'} />
  </Hover>
</view>`

export const focus = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Hover from '@jacare/ui/Hover'
import Text from '@jacare/ui/Text'

const hovered = pulse(false)

export <view>
  <div style="display:grid;gap:0.75rem">
    <Hover bind-value=\${hovered}>
      <Button>Tab to focus</Button>
    </Hover>
    <Text :tone=\${'muted'}>State: \${() => (hovered() ? 'active' : 'idle')}</Text>
  </div>
</view>`

export const styled = `import { pulse } from '@jacare/core'
import Hover from '@jacare/ui/Hover'
import Text from '@jacare/ui/Text'

const lift = pulse(false)
const scale = pulse(false)
const tint = pulse(false)
const glow = pulse(false)

export <view>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:0.85rem">
    <Hover bind-value=\${lift}>
      <div
        style="padding:1.1rem 1rem;border-radius:var(--j-radius);border:1px solid var(--j-border);background:var(--j-surface);transition:transform var(--j-duration-fast) var(--j-ease-out),box-shadow var(--j-duration-fast) var(--j-ease-out)"
        :style=\${() => lift()
          ? 'transform:translateY(-3px);box-shadow:var(--j-shadow-md, var(--j-shadow-sm))'
          : 'transform:none;box-shadow:none'}
      >
        <Text :weight=\${'bold'}>Lift</Text>
        <Text :tone=\${'muted'}>Shadow + raise</Text>
      </div>
    </Hover>
    <Hover bind-value=\${scale}>
      <div
        style="padding:1.1rem 1rem;border-radius:var(--j-radius);border:1px solid var(--j-border);background:var(--j-surface);transition:transform var(--j-duration-fast) var(--j-ease-out)"
        :style=\${() => scale() ? 'transform:scale(1.03)' : 'transform:none'}
      >
        <Text :weight=\${'bold'}>Scale</Text>
        <Text :tone=\${'muted'}>Slight grow</Text>
      </div>
    </Hover>
    <Hover bind-value=\${tint}>
      <div
        style="padding:1.1rem 1rem;border-radius:var(--j-radius);border:1px solid var(--j-border);transition:background var(--j-duration-fast) var(--j-ease-out),border-color var(--j-duration-fast) var(--j-ease-out)"
        :style=\${() => tint()
          ? 'background:color-mix(in srgb,var(--j-primary) 12%,var(--j-surface));border-color:color-mix(in srgb,var(--j-primary) 35%,var(--j-border))'
          : 'background:var(--j-surface);border-color:var(--j-border)'}
      >
        <Text :weight=\${'bold'}>Tint</Text>
        <Text :tone=\${'muted'}>Brand wash</Text>
      </div>
    </Hover>
    <Hover bind-value=\${glow}>
      <div
        style="padding:1.1rem 1rem;border-radius:var(--j-radius);border:1px solid var(--j-border);background:var(--j-surface);transition:box-shadow var(--j-duration-fast) var(--j-ease-out),border-color var(--j-duration-fast) var(--j-ease-out)"
        :style=\${() => glow()
          ? 'border-color:var(--j-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--j-primary) 22%,transparent)'
          : 'border-color:var(--j-border);box-shadow:none'}
      >
        <Text :weight=\${'bold'}>Ring</Text>
        <Text :tone=\${'muted'}>Focus halo</Text>
      </div>
    </Hover>
  </div>
</view>`

export const media = `import { pulse } from '@jacare/core'
import Hover from '@jacare/ui/Hover'
import Text from '@jacare/ui/Text'

const hovered = pulse(false)

export <view>
  <Hover bind-value=\${hovered}>
    <div
      style="position:relative;overflow:hidden;border-radius:var(--j-radius);border:1px solid var(--j-border);min-height:9rem;display:grid;place-items:end start;padding:1rem;background:linear-gradient(145deg,color-mix(in srgb,var(--j-primary) 18%,var(--j-surface)),var(--j-surface-2));transition:filter var(--j-duration-normal) var(--j-ease-out)"
      :style=\${() => hovered() ? 'filter:saturate(1.15) brightness(1.03)' : 'filter:none'}
    >
      <div style="display:grid;gap:0.2rem">
        <Text :weight=\${'bold'}>\${() => (hovered() ? 'Ready to open' : 'Project cover')}</Text>
        <Text :tone=\${'muted'}>Hover or focus to emphasize media</Text>
      </div>
    </div>
  </Hover>
</view>`
