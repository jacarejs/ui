export const button = `import Button from '@jacare/ui/Button'
import Ripple from '@jacare/ui/Ripple'
import Space from '@jacare/ui/Space'

export <view>
  <Space :wrap=\${true}>
    <Ripple>
      <Button>Primary press</Button>
    </Ripple>
    <Ripple>
      <Button :variant=\${'secondary'}>Secondary</Button>
    </Ripple>
    <Ripple>
      <Button :variant=\${'ghost'}>Ghost</Button>
    </Ripple>
  </Space>
</view>`

export const card = `import Card from '@jacare/ui/Card'
import Ripple from '@jacare/ui/Ripple'

export <view>
  <Ripple>
    <Card>
      <div style="padding:1.25rem;min-width:14rem">Tap anywhere on this card</div>
    </Card>
  </Ripple>
</view>`

export const color = `import Button from '@jacare/ui/Button'
import Ripple from '@jacare/ui/Ripple'
import Space from '@jacare/ui/Space'

export <view>
  <Space :wrap=\${true}>
    <Ripple :color=\${'rgba(255,255,255,0.55)'}>
      <Button>Light ink</Button>
    </Ripple>
    <Ripple :color=\${'color-mix(in srgb, var(--j-primary) 45%, transparent)'}>
      <Button :variant=\${'secondary'}>Brand ink</Button>
    </Ripple>
    <Ripple :color=\${'rgba(0,0,0,0.2)'}>
      <Button :variant=\${'ghost'}>Dark ink</Button>
    </Ripple>
  </Space>
</view>`

export const centered = `import Button from '@jacare/ui/Button'
import Ripple from '@jacare/ui/Ripple'

export <view>
  <Ripple :centered=\${true}>
    <Button :variant=\${'secondary'}>Centered ripple</Button>
  </Ripple>
</view>`

export const disabled = `import Button from '@jacare/ui/Button'
import Ripple from '@jacare/ui/Ripple'

export <view>
  <Ripple :disabled=\${true}>
    <Button>Ripple disabled</Button>
  </Ripple>
</view>`

export const surface = `import Ripple from '@jacare/ui/Ripple'

export <view>
  <Ripple>
    <div style="padding:1.5rem;border:1px solid var(--j-border);border-radius:var(--j-radius);background:var(--j-surface-2);cursor:pointer;user-select:none;min-width:16rem">
      Custom surface with ripple feedback
    </div>
  </Ripple>
</view>`

export const tile = `import Ripple from '@jacare/ui/Ripple'
import Text from '@jacare/ui/Text'

export <view>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(8.5rem,1fr));gap:0.75rem;width:min(28rem,100%)">
    <Ripple :color=\${'color-mix(in srgb, var(--j-primary) 35%, transparent)'}>
      <div style="padding:1.15rem;border-radius:var(--j-radius);border:1px solid var(--j-border);background:var(--j-surface);cursor:pointer;user-select:none;display:grid;gap:0.25rem">
        <Text :weight=\${'bold'}>Inbox</Text>
        <Text :tone=\${'muted'}>12 new</Text>
      </div>
    </Ripple>
    <Ripple :color=\${'color-mix(in srgb, var(--j-primary) 35%, transparent)'}>
      <div style="padding:1.15rem;border-radius:var(--j-radius);border:1px solid var(--j-border);background:var(--j-surface);cursor:pointer;user-select:none;display:grid;gap:0.25rem">
        <Text :weight=\${'bold'}>Tasks</Text>
        <Text :tone=\${'muted'}>4 due</Text>
      </div>
    </Ripple>
    <Ripple :color=\${'color-mix(in srgb, var(--j-primary) 35%, transparent)'}>
      <div style="padding:1.15rem;border-radius:var(--j-radius);border:1px solid var(--j-border);background:var(--j-surface);cursor:pointer;user-select:none;display:grid;gap:0.25rem">
        <Text :weight=\${'bold'}>Team</Text>
        <Text :tone=\${'muted'}>Online</Text>
      </div>
    </Ripple>
  </div>
</view>`

export const block = `import Ripple from '@jacare/ui/Ripple'
import Text from '@jacare/ui/Text'

export <view>
  <Ripple :block=\${true} :color=\${'rgba(255,255,255,0.35)'}>
    <div style="padding:1.25rem 1.35rem;border-radius:var(--j-radius);background:var(--j-primary);color:#fff;cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center;gap:1rem">
      <div style="display:grid;gap:0.15rem">
        <Text :weight=\${'bold'}>Start onboarding</Text>
        <span style="opacity:0.85;font-size:0.9rem">Press for a full-width ripple</span>
      </div>
      <span aria-hidden="true">→</span>
    </div>
  </Ripple>
</view>`
