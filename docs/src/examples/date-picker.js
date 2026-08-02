export const basic = `import { pulse } from '@jacare/core'
import DatePicker from '@jacare/ui/DatePicker'

const value = pulse('')

export <view>
  <DatePicker :label=\${'Birthday'} bind-value=\${value} />
</view>`

export const rangeExample = `import { pulse } from '@jacare/core'
import DatePicker from '@jacare/ui/DatePicker'

const value = pulse([])

export <view>
  <DatePicker :label=\${'Trip dates'} :range=\${true} bind-value=\${value} />
</view>`

export const bounds = `import { pulse } from '@jacare/core'
import DatePicker from '@jacare/ui/DatePicker'

const value = pulse('')

export <view>
  <DatePicker
    :label=\${'Appointment'}
    :min=\${'2026-01-01'}
    :max=\${'2026-12-31'}
    bind-value=\${value}
  />
</view>`

export const manualApply = `import { pulse } from '@jacare/core'
import DatePicker from '@jacare/ui/DatePicker'

const value = pulse([])

export <view>
  <DatePicker
    :label=\${'Billing period'}
    :range=\${true}
    :autoApply=\${false}
    bind-value=\${value}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import DatePicker from '@jacare/ui/DatePicker'
import Stack from '@jacare/ui/Stack'

const required = pulse('')
const errored = pulse('')
const disabled = pulse('2026-07-15')

export <view>
  <Stack :gap=\${'md'}>
    <DatePicker :label=\${'Required'} :required=\${true} bind-value=\${required} />
    <DatePicker :label=\${'Date'} :error=\${'Pick a valid date'} bind-value=\${errored} />
    <DatePicker :label=\${'Locked'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

export const fixedMonth = `import { pulse } from '@jacare/core'
import DatePicker from '@jacare/ui/DatePicker'

const value = pulse('2026-07-15')

export <view>
  <DatePicker
    :label=\${'July day'}
    :navigable=\${false}
    :min=\${'2026-07-01'}
    :max=\${'2026-07-31'}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import DatePicker from '@jacare/ui/DatePicker'",
    '',
    `const value = pulse(${state.range ? '[]' : `'${quote(state.value)}'`})`,
    '',
    'export <view>',
    '  <DatePicker',
    `    :label=\${'${quote(state.label)}'}`,
  ]
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.range) lines.push('    :range=\${true}')
  if (state.range && !state.autoApply) lines.push('    :autoApply=\${false}')
  if (state.navigable === false) lines.push('    :navigable=\${false}')
  if (state.min) lines.push(`    :min=\${'${quote(state.min)}'}`)
  if (state.max) lines.push(`    :max=\${'${quote(state.max)}'}`)
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
