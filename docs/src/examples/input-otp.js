export const basic = `import { pulse } from '@jacare/core'
import InputOtp from '@jacare/ui/InputOtp'

const value = pulse('')

export <view>
  <InputOtp :label=\${'Verification code'} :length=\${6} bind-value=\${value} />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import InputOtp from '@jacare/ui/InputOtp'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <InputOtp',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.length && Number(state.length) !== 6) lines.push(`    :length=\${${Number(state.length)}}`)
  if (state.mask) lines.push('    :mask=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
