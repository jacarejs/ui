export const basic = `import { pulse } from '@jacare/core'
import TimeSelect from '@jacare/ui/TimeSelect'

const value = pulse('09:30')

export <view>
  <TimeSelect
    :label=\${'Appointment'}
    :start=\${'09:00'}
    :end=\${'18:00'}
    :step=\${'00:30'}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import TimeSelect from '@jacare/ui/TimeSelect'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    '',
    'export <view>',
    '  <TimeSelect',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.start) lines.push(`    :start=\${'${quote(state.start)}'}`)
  if (state.end) lines.push(`    :end=\${'${quote(state.end)}'}`)
  if (state.step) lines.push(`    :step=\${'${quote(state.step)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
