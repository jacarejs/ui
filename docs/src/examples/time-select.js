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

export const intervals = `import { pulse } from '@jacare/core'
import TimeSelect from '@jacare/ui/TimeSelect'
import Stack from '@jacare/ui/Stack'

const quarterHour = pulse('08:15')
const hourly = pulse('10:00')

export <view>
  <Stack :gap=\${'md'}>
    <TimeSelect :label=\${'Quarter-hour slots'} :start=\${'08:00'} :end=\${'10:00'} :step=\${'00:15'} bind-value=\${quarterHour} />
    <TimeSelect :label=\${'Hourly slots'} :start=\${'09:00'} :end=\${'17:00'} :step=\${'01:00'} bind-value=\${hourly} />
  </Stack>
</view>`

export const placeholder = `import { pulse } from '@jacare/core'
import TimeSelect from '@jacare/ui/TimeSelect'

const value = pulse('')

export <view>
  <TimeSelect :label=\${'Delivery window'} :placeholder=\${'Choose a delivery time'} :clearable=\${false} bind-value=\${value} />
</view>`

export const clearable = `import { pulse } from '@jacare/core'
import TimeSelect from '@jacare/ui/TimeSelect'

const value = pulse('13:30')

export <view>
  <TimeSelect :label=\${'Optional break'} :clearable=\${true} :hint=\${'Choose the placeholder option to clear'} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import TimeSelect from '@jacare/ui/TimeSelect'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const disabled = pulse('16:00')

export <view>
  <Stack :gap=\${'md'}>
    <TimeSelect :label=\${'Interview'} :error=\${'Select an interview time'} bind-value=\${invalid} />
    <TimeSelect :label=\${'Confirmed time'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
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
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
