export const basic = `import { pulse } from '@jacare/core'
import DatePickerPanel from '@jacare/ui/DatePickerPanel'

const value = pulse('2026-07-15')

export <view>
  <DatePickerPanel bind-value=\${value} />
</view>`

export const bounds = `import { pulse } from '@jacare/core'
import DatePickerPanel from '@jacare/ui/DatePickerPanel'

const value = pulse('2026-07-10')

export <view>
  <DatePickerPanel
    :min=\${'2026-07-05'}
    :max=\${'2026-07-25'}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import DatePickerPanel from '@jacare/ui/DatePickerPanel'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    '',
    'export <view>',
    '  <DatePickerPanel',
  ]
  if (state.min) lines.push(`    :min=\${'${quote(state.min)}'}`)
  if (state.max) lines.push(`    :max=\${'${quote(state.max)}'}`)
  if (state.border === false) lines.push('    :border=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
