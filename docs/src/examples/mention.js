export const basic = `import { pulse } from '@jacare/core'
import Mention from '@jacare/ui/Mention'

const value = pulse('')
const options = [
  { value: 'ada', label: 'Ada' },
  { value: 'grace', label: 'Grace' },
  { value: 'alan', label: 'Alan' },
  { value: 'linus', label: 'Linus' },
]

export <view>
  <Mention
    :label=\${'Message'}
    :options=\${options}
    :placeholder=\${'Type @ to mention someone'}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Mention from '@jacare/ui/Mention'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    "const options = [{ value: 'ada', label: 'Ada' }, { value: 'grace', label: 'Grace' }]",
    '',
    'export <view>',
    '  <Mention',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('    :options=\${options}')
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.prefix && state.prefix !== '@') lines.push(`    :prefix=\${'${quote(state.prefix)}'}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
