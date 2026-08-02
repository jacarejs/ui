export const basic = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const features = pulse(['billing'])

export <view>
  <CheckboxGroup
    :label=\${'Features'}
    :options=\${[
      { value: 'billing', label: 'Billing', description: 'Invoices and receipts' },
      { value: 'reports', label: 'Reports', description: 'Weekly digests' },
      { value: 'sso', label: 'SSO', description: 'SAML and OIDC' },
    ]}
    bind-value=\${features}
  />
</view>`

export const strings = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const days = pulse(['Mon', 'Wed'])

export <view>
  <CheckboxGroup
    :label=\${'Weekdays'}
    :options=\${['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
    bind-value=\${days}
  />
</view>`

export const hint = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const topics = pulse(['product'])

export <view>
  <CheckboxGroup
    :label=\${'Newsletter topics'}
    :hint=\${'You can change these anytime'}
    :options=\${[
      { value: 'product', label: 'Product updates' },
      { value: 'security', label: 'Security advisories' },
      { value: 'events', label: 'Events' },
    ]}
    bind-value=\${topics}
  />
</view>`

export const selectAll = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const regions = pulse(['americas'])

export <view>
  <CheckboxGroup
    :label=\${'Regions'}
    :selectAll=\${true}
    :selectAllLabel=\${'All regions'}
    :options=\${[
      { value: 'americas', label: 'Americas' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia', label: 'Asia Pacific' },
    ]}
    bind-value=\${regions}
  />
</view>`

export const cards = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const channels = pulse(['email'])

export <view>
  <CheckboxGroup
    :label=\${'Channels'}
    :layout=\${'cards'}
    :options=\${[
      { value: 'email', label: 'Email', description: 'Daily digest' },
      { value: 'push', label: 'Push', description: 'Instant alerts' },
      { value: 'sms', label: 'SMS', description: 'Critical only' },
    ]}
    bind-value=\${channels}
  />
</view>`

export const optionDisabled = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const addons = pulse(['analytics'])

export <view>
  <CheckboxGroup
    :label=\${'Add-ons'}
    :hint=\${'Unavailable items stay visible'}
    :options=\${[
      { value: 'analytics', label: 'Analytics' },
      { value: 'audit', label: 'Audit log' },
      { value: 'legacy', label: 'Legacy export', disabled: true },
    ]}
    bind-value=\${addons}
  />
</view>`

export const change = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const selected = pulse(['email'])
const last = pulse('email')

function onChange(next) {
  last.set(Array.isArray(next) ? next.join(', ') : String(next))
}

export <view>
  <Stack :gap=\${'sm'}>
    <CheckboxGroup
      :label=\${'Channels'}
      :options=\${['email', 'push', 'sms']}
      bind-value=\${selected}
      on-change=\${onChange}
    />
    <Text :tone=\${'muted'}>Last change: \${() => last() || '—'}</Text>
  </Stack>
</view>`

export const required = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const value = pulse([])

export <view>
  <CheckboxGroup
    :label=\${'Required'}
    :required=\${true}
    :options=\${['One', 'Two', 'Three']}
    bind-value=\${value}
  />
</view>`

export const error = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const value = pulse([])

export <view>
  <CheckboxGroup
    :label=\${'Permissions'}
    :error=\${'Pick at least one permission'}
    :options=\${['read', 'write', 'admin']}
    bind-value=\${value}
  />
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import CheckboxGroup from '@jacare/ui/CheckboxGroup'

const value = pulse(['email'])

export <view>
  <CheckboxGroup
    :label=\${'Locked'}
    :disabled=\${true}
    :options=\${['email', 'push', 'sms']}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const selected = Array.isArray(state.value) ? state.value : []
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import CheckboxGroup from '@jacare/ui/CheckboxGroup'",
    '',
    `const value = pulse(${JSON.stringify(selected)})`,
    '',
    'export <view>',
    '  <CheckboxGroup',
    `    :label=\${'${quote(state.label)}'}`,
  ]
  if (state.layout === 'cards') lines.push("    :layout=\${'cards'}")
  if (state.selectAll) {
    lines.push('    :selectAll=\${true}')
    if (state.selectAllLabel) lines.push(`    :selectAllLabel=\${'${quote(state.selectAllLabel)}'}`)
  }
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  lines.push(
    '    :options=\${[',
    "      { value: 'billing', label: 'Billing', description: 'Invoices and receipts' },",
    "      { value: 'reports', label: 'Reports', description: 'Weekly digests' },",
    "      { value: 'sso', label: 'SSO', description: 'SAML and OIDC' },",
    '    ]}',
    '    bind-value=\${value}',
    '  />',
    '</view>',
  )
  return lines.join('\n')
}
