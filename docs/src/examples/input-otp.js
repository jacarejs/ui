export const basic = `import { pulse } from '@jacare/core'
import InputOtp from '@jacare/ui/InputOtp'

const value = pulse('')

export <view>
  <InputOtp :label=\${'Verification code'} :length=\${6} bind-value=\${value} />
</view>`

export const lengths = `import { pulse } from '@jacare/core'
import InputOtp from '@jacare/ui/InputOtp'
import Stack from '@jacare/ui/Stack'

const shortCode = pulse('')
const recoveryCode = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputOtp :label=\${'Four-digit PIN'} :length=\${4} bind-value=\${shortCode} />
    <InputOtp :label=\${'Eight-digit recovery code'} :length=\${8} bind-value=\${recoveryCode} />
  </Stack>
</view>`

export const masked = `import { pulse } from '@jacare/core'
import InputOtp from '@jacare/ui/InputOtp'

const value = pulse('42')

export <view>
  <InputOtp :label=\${'Secure PIN'} :length=\${4} :mask=\${true} :hint=\${'Digits are hidden after entry'} bind-value=\${value} />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import InputOtp from '@jacare/ui/InputOtp'
import Stack from '@jacare/ui/Stack'

const sm = pulse('')
const md = pulse('')
const lg = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputOtp :label=\${'Small'} :length=\${4} :size=\${'sm'} bind-value=\${sm} />
    <InputOtp :label=\${'Medium'} :length=\${4} :size=\${'md'} bind-value=\${md} />
    <InputOtp :label=\${'Large'} :length=\${4} :size=\${'lg'} bind-value=\${lg} />
  </Stack>
</view>`

export const states = `import { pulse } from '@jacare/core'
import InputOtp from '@jacare/ui/InputOtp'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('1234')
const disabled = pulse('246810')
const hinted = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputOtp :label=\${'Confirmation code'} :hint=\${'Paste all six digits at once'} bind-value=\${hinted} />
    <InputOtp :label=\${'Expired code'} :length=\${4} :error=\${'Request a new verification code'} bind-value=\${invalid} />
    <InputOtp :label=\${'Used code'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
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
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${quote(state.size)}'}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
