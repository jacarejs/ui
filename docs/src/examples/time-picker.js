export const basic = `import { pulse } from '@jacare/core'
import TimePicker from '@jacare/ui/TimePicker'

const value = pulse('09:30')

export <view>
  <TimePicker :label=\${'Start time'} bind-value=\${value} />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import TimePicker from '@jacare/ui/TimePicker'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    '',
    'export <view>',
    '  <TimePicker',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.arrowControl) lines.push('    :arrowControl=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
