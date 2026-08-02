export const basic = `import { pulse } from '@jacare/core'
import DateTimePicker from '@jacare/ui/DateTimePicker'

const value = pulse('2026-07-28T14:30')

export <view>
  <DateTimePicker :label=\${'Schedule'} bind-value=\${value} />
</view>`

export const bounds = `import { pulse } from '@jacare/core'
import DateTimePicker from '@jacare/ui/DateTimePicker'

const value = pulse('2026-07-15T10:00')

export <view>
  <DateTimePicker
    :label=\${'Window'}
    :min=\${'2026-07-01T00:00'}
    :max=\${'2026-07-31T23:59'}
    :hint=\${'July only'}
    bind-value=\${value}
  />
</view>`

export const required = `import { pulse } from '@jacare/core'
import DateTimePicker from '@jacare/ui/DateTimePicker'

const value = pulse('')

export <view>
  <DateTimePicker :label=\${'Starts at'} :required=\${true} :hint=\${'Date and time are required'} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import DateTimePicker from '@jacare/ui/DateTimePicker'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const locked = pulse('2026-07-28T14:30')

export <view>
  <Stack :gap=\${'md'}>
    <DateTimePicker :label=\${'Schedule'} :clearable=\${false} :error=\${'Choose an available time'} bind-value=\${invalid} />
    <DateTimePicker :label=\${'Published at'} :disabled=\${true} bind-value=\${locked} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import DateTimePicker from '@jacare/ui/DateTimePicker'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    '',
    'export <view>',
    '  <DateTimePicker',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.min) lines.push(`    :min=\${'${quote(state.min)}'}`)
  if (state.max) lines.push(`    :max=\${'${quote(state.max)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
