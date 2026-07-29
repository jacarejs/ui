export const basic = `import { pulse } from '@jacare/core'
import InputNumber from '@jacare/ui/InputNumber'

const value = pulse(3)

export <view>
  <InputNumber :label=\${'Quantity'} :min=\${0} :max=\${10} bind-value=\${value} />
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
  if (state.controls === false) lines.push('    :controls=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
