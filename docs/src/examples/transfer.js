export const basic = `import { pulse } from '@jacare/core'
import Transfer from '@jacare/ui/Transfer'

const value = pulse(['2', '4'])
const data = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
  { key: '4', label: 'Option 4' },
  { key: '5', label: 'Option 5' },
]

export <view>
  <Transfer :data=\${data} bind-value=\${value} />
</view>`

export const filterable = `import { pulse } from '@jacare/core'
import Transfer from '@jacare/ui/Transfer'

const value = pulse(['design'])
const data = [
  { key: 'design', label: 'Design' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'finance', label: 'Finance' },
  { key: 'operations', label: 'Operations' },
]

export <view>
  <Transfer :data=\${data} :filterable=\${true} bind-value=\${value} />
</view>`

export const customLabels = `import { pulse } from '@jacare/core'
import Transfer from '@jacare/ui/Transfer'

const value = pulse(['viewer'])
const data = [
  { key: 'admin', label: 'Administrator' },
  { key: 'editor', label: 'Editor' },
  { key: 'viewer', label: 'Viewer' },
]

export <view>
  <Transfer
    :data=\${data}
    :titles=\${['Available roles', 'Assigned roles']}
    :buttonTexts=\${['Add', 'Remove']}
    bind-value=\${value}
  />
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import Transfer from '@jacare/ui/Transfer'

const value = pulse(['2'])
const data = [
  { key: '1', label: 'Public reports' },
  { key: '2', label: 'Private reports' },
  { key: '3', label: 'Billing', disabled: true },
]

export <view>
  <Transfer :data=\${data} :disabled=\${true} bind-value=\${value} />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Transfer from '@jacare/ui/Transfer'",
    '',
    `const value = pulse(${JSON.stringify(state.value || [])})`,
    'const data = [',
    "  { key: '1', label: 'Option 1' },",
    "  { key: '2', label: 'Option 2' },",
    "  { key: '3', label: 'Option 3' },",
    "  { key: '4', label: 'Option 4' },",
    "  { key: '5', label: 'Option 5' },",
    ']',
    '',
    'export <view>',
    '  <Transfer',
    '    :data=\${data}',
  ]
  if (state.filterable) lines.push('    :filterable=\${true}')
  if (state.titles) lines.push(`    :titles=\${${JSON.stringify(state.titles)}}`)
  if (state.buttonTexts) lines.push(`    :buttonTexts=\${${JSON.stringify(state.buttonTexts)}}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
