export const basic = `import { pulse } from '@jacare/core'
import TimePicker from '@jacare/ui/TimePicker'

const value = pulse('09:30')

export <view>
  <TimePicker :label=\${'Start time'} bind-value=\${value} />
</view>`

export const seconds = `import { pulse } from '@jacare/core'
import TimePicker from '@jacare/ui/TimePicker'

const value = pulse('09:30:45')

export <view>
  <TimePicker :label=\${'Precise start'} :hint=\${'A value with three segments enables seconds'} bind-value=\${value} />
</view>`

export const arrowControl = `import { pulse } from '@jacare/core'
import TimePicker from '@jacare/ui/TimePicker'

const value = pulse('14:20')

export <view>
  <TimePicker :label=\${'Reminder time'} :arrowControl=\${true} bind-value=\${value} />
</view>`

export const placeholder = `import { pulse } from '@jacare/core'
import TimePicker from '@jacare/ui/TimePicker'

const value = pulse('')

export <view>
  <TimePicker :label=\${'Optional time'} :placeholder=\${'No time selected'} :clearable=\${false} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import TimePicker from '@jacare/ui/TimePicker'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const disabled = pulse('18:30')

export <view>
  <Stack :gap=\${'md'}>
    <TimePicker :label=\${'Closing time'} :error=\${'Closing time is required'} bind-value=\${invalid} />
    <TimePicker :label=\${'Scheduled time'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
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
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.arrowControl) lines.push('    :arrowControl=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
