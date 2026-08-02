export const basic = `import { pulse } from '@jacare/core'
import InputNumber from '@jacare/ui/InputNumber'

const value = pulse(3)

export <view>
  <InputNumber :label=\${'Quantity'} :min=\${0} :max=\${10} bind-value=\${value} />
</view>`

export const steps = `import { pulse } from '@jacare/core'
import InputNumber from '@jacare/ui/InputNumber'
import Stack from '@jacare/ui/Stack'

const integer = pulse(10)
const decimal = pulse(1.25)

export <view>
  <Stack :gap=\${'md'}>
    <InputNumber :label=\${'Tickets'} :step=\${5} bind-value=\${integer} />
    <InputNumber :label=\${'Price'} :step=\${0.25} :precision=\${2} bind-value=\${decimal} />
  </Stack>
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import InputNumber from '@jacare/ui/InputNumber'
import Stack from '@jacare/ui/Stack'

const sm = pulse(1)
const md = pulse(2)
const lg = pulse(3)

export <view>
  <Stack :gap=\${'md'}>
    <InputNumber :label=\${'Small'} :size=\${'sm'} bind-value=\${sm} />
    <InputNumber :label=\${'Medium'} :size=\${'md'} bind-value=\${md} />
    <InputNumber :label=\${'Large'} :size=\${'lg'} bind-value=\${lg} />
  </Stack>
</view>`

export const withoutControls = `import { pulse } from '@jacare/core'
import InputNumber from '@jacare/ui/InputNumber'

const value = pulse(12)

export <view>
  <InputNumber :label=\${'Guests'} :controls=\${false} :placeholder=\${'Enter a number'} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import InputNumber from '@jacare/ui/InputNumber'
import Stack from '@jacare/ui/Stack'

const required = pulse(0)
const invalid = pulse(14)
const disabled = pulse(8)

export <view>
  <Stack :gap=\${'md'}>
    <InputNumber :label=\${'Seats'} :required=\${true} :hint=\${'Choose at least one seat'} bind-value=\${required} />
    <InputNumber :label=\${'Age'} :error=\${'Age must be 18 or older'} bind-value=\${invalid} />
    <InputNumber :label=\${'Locked quantity'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import InputNumber from '@jacare/ui/InputNumber'",
    '',
    `const value = pulse(${Number(state.value) || 0})`,
    '',
    'export <view>',
    '  <InputNumber',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.min !== '' && state.min !== null && state.min !== undefined) lines.push(`    :min=\${${Number(state.min)}}`)
  if (state.max !== '' && state.max !== null && state.max !== undefined) lines.push(`    :max=\${${Number(state.max)}}`)
  if (state.step && Number(state.step) !== 1) lines.push(`    :step=\${${Number(state.step)}}`)
  if (state.precision !== '' && state.precision !== null && state.precision !== undefined) lines.push(`    :precision=\${${Number(state.precision)}}`)
  if (state.controls === false) lines.push('    :controls=\${false}')
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${quote(state.size)}'}`)
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
