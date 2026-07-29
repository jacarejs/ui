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
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
