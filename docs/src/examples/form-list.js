export const basic = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'

const contacts = pulse([
  { name: 'Ada Lovelace', email: 'ada@example.com' },
])

export <view>
  <FormList
    :label=\${'Emergency contacts'}
    :fields=\${[
      { key: 'name', label: 'Name', placeholder: 'Full name' },
      { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
    ]}
    :min=\${1}
    :max=\${5}
    :addLabel=\${'Add contact'}
    :itemLabel=\${'Contact'}
    bind-value=\${contacts}
  />
</view>`

export const strings = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'

const tags = pulse(['Design', 'Accessibility'])

export <view>
  <FormList
    :label=\${'Skills'}
    :addLabel=\${'Add skill'}
    :itemLabel=\${'Skill'}
    :reorderable=\${true}
    bind-value=\${tags}
  />
</view>`

export const limits = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'

const dependents = pulse([{ name: '' }])

export <view>
  <FormList
    :label=\${'Dependents'}
    :fields=\${[{ key: 'name', label: 'Full name' }]}
    :min=\${1}
    :max=\${3}
    :hint=\${'Between 1 and 3 dependents'}
    bind-value=\${dependents}
  />
</view>`

export const fixedOrder = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'

const lineItems = pulse([
  { product: 'Starter kit', qty: '2' },
  { product: 'Support plan', qty: '1' },
])

export <view>
  <FormList
    :label=\${'Line items'}
    :fields=\${[
      { key: 'product', label: 'Product' },
      { key: 'qty', label: 'Qty', type: 'number' },
    ]}
    :reorderable=\${false}
    :addLabel=\${'Add line'}
    :itemLabel=\${'Line'}
    :hint=\${'reorderable=false hides move controls'}
    bind-value=\${lineItems}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'
import Stack from '@jacare/ui/Stack'

const hinted = pulse([{ name: 'Pat' }])
const invalid = pulse([])

export <view>
  <Stack :gap=\${'lg'}>
    <FormList
      :label=\${'Guests'}
      :fields=\${[{ key: 'name', label: 'Name' }]}
      :hint=\${'Add everyone who needs a badge'}
      :addLabel=\${'Add guest'}
      :itemLabel=\${'Guest'}
      bind-value=\${hinted}
    />
    <FormList
      :label=\${'Required attendees'}
      :fields=\${[{ key: 'name', label: 'Name' }]}
      :min=\${1}
      :error=\${'Add at least one attendee'}
      :addLabel=\${'Add attendee'}
      :itemLabel=\${'Attendee'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'

const locked = pulse([
  { name: 'Grace Hopper', email: 'grace@example.com' },
])

export <view>
  <FormList
    :label=\${'Archived contacts'}
    :fields=\${[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email', type: 'email' },
    ]}
    :disabled=\${true}
    :hint=\${'Locked while the roster is published'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import FormList from '@jacare/ui/FormList'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const rows = pulse([
  { name: 'Ada Lovelace', role: 'Engineer' },
])
const lastEvent = pulse('Idle')

export <view>
  <Stack :gap=\${'md'}>
    <FormList
      :label=\${'Team'}
      :fields=\${[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
      ]}
      :max=\${6}
      :addLabel=\${'Add member'}
      :itemLabel=\${'Member'}
      bind-value=\${rows}
      on-add=\${({ index }) => lastEvent.set('Added member ' + (index + 1))}
      on-remove=\${({ index }) => lastEvent.set('Removed index ' + index)}
      on-reorder=\${({ from, to }) => lastEvent.set('Moved ' + (from + 1) + ' → ' + (to + 1))}
    />
    <Text :tone=\${'muted'}>
      \${() => rows().length + ' member(s) · ' + lastEvent()}
    </Text>
  </Stack>
</view>`
