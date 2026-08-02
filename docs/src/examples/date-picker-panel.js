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

export const borderless = `import { pulse } from '@jacare/core'
import DatePickerPanel from '@jacare/ui/DatePickerPanel'

const value = pulse('2026-07-15')

export <view>
  <DatePickerPanel :border=\${false} bind-value=\${value} />
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import DatePickerPanel from '@jacare/ui/DatePickerPanel'

const value = pulse('2026-07-15')

export <view>
  <DatePickerPanel :disabled=\${true} bind-value=\${value} />
</view>`

export const range = `import { pulse } from '@jacare/core'
import DatePickerPanel from '@jacare/ui/DatePickerPanel'

const value = pulse(['2026-07-10', '2026-07-18'])

export <view>
  <DatePickerPanel :range=\${true} bind-value=\${value} />
</view>`

export const multiple = `import { pulse } from '@jacare/core'
import DatePickerPanel from '@jacare/ui/DatePickerPanel'

const value = pulse(['2026-07-08', '2026-07-15', '2026-07-22'])

export <view>
  <DatePickerPanel :multiple=\${true} bind-value=\${value} />
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
  if (state.range) lines.push('    :range=\${true}')
  if (state.multiple) lines.push('    :multiple=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
