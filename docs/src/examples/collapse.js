export const basic = `import { pulse } from '@jacare/core'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

const open = pulse(['overview'])

export <view>
  <Collapse bind-value=\${open}>
    <CollapseItem :name=\${'overview'} :title=\${'Overview'}>
      Package purpose and installation notes.
    </CollapseItem>
    <CollapseItem :name=\${'usage'} :title=\${'Usage'}>
      Component composition and binding patterns.
    </CollapseItem>
    <CollapseItem :name=\${'api'} :title=\${'API'}>
      Props, slots, and emitted events.
    </CollapseItem>
  </Collapse>
</view>`

export const multiple = `import { pulse } from '@jacare/core'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

const open = pulse(['overview', 'usage'])

export <view>
  <Collapse bind-value=\${open}>
    <CollapseItem :name=\${'overview'} :title=\${'Overview'}>
      Package purpose and installation notes.
    </CollapseItem>
    <CollapseItem :name=\${'usage'} :title=\${'Usage'}>
      Component composition and binding patterns.
    </CollapseItem>
    <CollapseItem :name=\${'api'} :title=\${'API'}>
      Props, slots, and emitted events.
    </CollapseItem>
  </Collapse>
</view>`

export const accordion = `import { pulse } from '@jacare/core'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

const open = pulse('overview')

export <view>
  <Collapse bind-value=\${open} :accordion=\${true}>
    <CollapseItem :name=\${'overview'} :title=\${'Overview'}>
      Package purpose and installation notes.
    </CollapseItem>
    <CollapseItem :name=\${'usage'} :title=\${'Usage'}>
      Component composition and binding patterns.
    </CollapseItem>
    <CollapseItem :name=\${'api'} :title=\${'API'}>
      Props, slots, and emitted events.
    </CollapseItem>
  </Collapse>
</view>`

export const collapsed = `import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

export <view>
  <Collapse :value=\${[]}>
    <CollapseItem :name=\${'overview'} :title=\${'Overview'}>
      Package purpose and installation notes.
    </CollapseItem>
    <CollapseItem :name=\${'usage'} :title=\${'Usage'}>
      Component composition and binding patterns.
    </CollapseItem>
    <CollapseItem :name=\${'api'} :title=\${'API'}>
      Props, slots, and emitted events.
    </CollapseItem>
  </Collapse>
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

const open = pulse(['ready'])

export <view>
  <Collapse bind-value=\${open}>
    <CollapseItem :name=\${'ready'} :title=\${'Ready'}>
      This panel can be opened.
    </CollapseItem>
    <CollapseItem :name=\${'locked'} :title=\${'Locked'} :disabled=\${true}>
      This panel is unavailable.
    </CollapseItem>
  </Collapse>
</view>`

export const faq = `import { pulse } from '@jacare/core'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'
import Text from '@jacare/ui/Text'

const open = pulse('shipping')

export <view>
  <Collapse bind-value=\${open} :accordion=\${true}>
    <CollapseItem :name=\${'shipping'} :title=\${'How long does shipping take?'}>
      <Text :tone=\${'muted'}>
        Standard orders ship in 2–4 business days. Express arrives next day in most regions.
      </Text>
    </CollapseItem>
    <CollapseItem :name=\${'returns'} :title=\${'What is the return policy?'}>
      <Text :tone=\${'muted'}>
        Unused items can be returned within 30 days. Print a prepaid label from your account.
      </Text>
    </CollapseItem>
    <CollapseItem :name=\${'billing'} :title=\${'Can I change my billing cycle?'}>
      <Text :tone=\${'muted'}>
        Yes. Switch monthly or yearly anytime; the next invoice reflects the new cycle.
      </Text>
    </CollapseItem>
  </Collapse>
</view>`

export const rich = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'
import Stack from '@jacare/ui/Stack'
import Tag from '@jacare/ui/Tag'
import Text from '@jacare/ui/Text'

const open = pulse(['tokens'])

export <view>
  <Collapse bind-value=\${open}>
    <CollapseItem :name=\${'tokens'} :title=\${'Design tokens'}>
      <Stack :gap=\${'sm'}>
        <Text :tone=\${'muted'}>Color, spacing, and typography primitives for product UI.</Text>
        <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
          <Tag :text=\${'theme'} :type=\${'info'} :size=\${'sm'} />
          <Tag :text=\${'stable'} :type=\${'success'} :size=\${'sm'} />
        </Stack>
        <Button :size=\${'sm'}>Open token reference</Button>
      </Stack>
    </CollapseItem>
    <CollapseItem :name=\${'forms'} :title=\${'Forms'}>
      <Stack :gap=\${'sm'}>
        <Text :tone=\${'muted'}>Validation helpers and labeled inputs for settings screens.</Text>
        <Tag :text=\${'forms'} :type=\${'warning'} :size=\${'sm'} />
      </Stack>
    </CollapseItem>
    <CollapseItem :name=\${'feedback'} :title=\${'Feedback'}>
      <Text :tone=\${'muted'}>Alerts, toasts, and dialogs for status and confirmations.</Text>
    </CollapseItem>
  </Collapse>
</view>`

export const inCard = `import { pulse } from '@jacare/core'
import Card from '@jacare/ui/Card'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'
import Text from '@jacare/ui/Text'

const open = pulse('profile')

export <view>
  <Card :title=\${'Account settings'} :subtitle=\${'Expand a section to edit'}>
    <Collapse bind-value=\${open} :accordion=\${true}>
      <CollapseItem :name=\${'profile'} :title=\${'Profile'}>
        <Text :tone=\${'muted'}>Name, avatar, and preferred language.</Text>
      </CollapseItem>
      <CollapseItem :name=\${'security'} :title=\${'Security'}>
        <Text :tone=\${'muted'}>Password, sessions, and two-factor authentication.</Text>
      </CollapseItem>
      <CollapseItem :name=\${'notifications'} :title=\${'Notifications'}>
        <Text :tone=\${'muted'}>Email and in-app alert preferences.</Text>
      </CollapseItem>
    </Collapse>
  </Card>
</view>`

export const controlled = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const open = pulse(['overview'])

function openAll() {
  open.set(['overview', 'usage', 'api'])
}

function closeAll() {
  open.set([])
}

export <view>
  <Stack :gap=\${'md'}>
    <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
      <Button :size=\${'sm'} on-press=\${() => openAll()}>Open all</Button>
      <Button :size=\${'sm'} :variant=\${'ghost'} on-press=\${() => closeAll()}>Close all</Button>
    </Stack>
    <Collapse bind-value=\${open}>
      <CollapseItem :name=\${'overview'} :title=\${'Overview'}>High-level package notes.</CollapseItem>
      <CollapseItem :name=\${'usage'} :title=\${'Usage'}>Composition and binding patterns.</CollapseItem>
      <CollapseItem :name=\${'api'} :title=\${'API'}>Props, slots, and events.</CollapseItem>
    </Collapse>
    <Text :tone=\${'muted'}>
      Open: \${() => (Array.isArray(open()) ? open().join(', ') || 'none' : String(open() || 'none'))}
    </Text>
  </Stack>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Collapse from '@jacare/ui/Collapse'",
    "import CollapseItem from '@jacare/ui/CollapseItem'",
    '',
    state.accordion ? "const open = pulse('overview')" : "const open = pulse(['overview'])",
    '',
    'export <view>',
    state.accordion
      ? '  <Collapse bind-value=${open} :accordion=${true}>'
      : '  <Collapse bind-value=${open}>',
    "    <CollapseItem :name=${'overview'} :title=${'Overview'}>…</CollapseItem>",
    "    <CollapseItem :name=${'usage'} :title=${'Usage'}>…</CollapseItem>",
    "    <CollapseItem :name=${'api'} :title=${'API'}>…</CollapseItem>",
    '  </Collapse>',
    '</view>',
  ]
  return lines.join('\n')
}
