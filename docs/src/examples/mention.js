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

export const customPrefix = `import { pulse } from '@jacare/core'
import Mention from '@jacare/ui/Mention'

const value = pulse('')
const options = [{ value: 'urgent', label: 'urgent' }, { value: 'help', label: 'help' }]

export <view>
  <Mention :label=\${'Message'} :options=\${options} :prefix=\${'#'} :placeholder=\${'Type # for topics'} bind-value=\${value} />
</view>`

export const prefilled = `import { pulse } from '@jacare/core'
import Mention from '@jacare/ui/Mention'

const value = pulse('Thanks @Ada ')
const options = [{ value: 'ada', label: 'Ada' }, { value: 'grace', label: 'Grace' }]

export <view>
  <Mention :label=\${'Reply'} :options=\${options} :hint=\${'Type @ to add another teammate'} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Mention from '@jacare/ui/Mention'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const locked = pulse('Assigned to @Ada')
const options = [{ value: 'ada', label: 'Ada' }, { value: 'grace', label: 'Grace' }]

export <view>
  <Stack :gap=\${'md'}>
    <Mention :label=\${'Reviewer'} :options=\${options} :error=\${'Mention at least one reviewer'} bind-value=\${invalid} />
    <Mention :label=\${'Assignment'} :options=\${options} :disabled=\${true} bind-value=\${locked} />
  </Stack>
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
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
