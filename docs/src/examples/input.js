export const basic = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'

const value = pulse('')

export <view>
  <Input :label=\${'Name'} :placeholder=\${'Jane Doe'} bind-value=\${value} />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'
import Stack from '@jacare/ui/Stack'

const sm = pulse('')
const md = pulse('')
const lg = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <Input :label=\${'Small'} :size=\${'sm'} :placeholder=\${'sm'} bind-value=\${sm} />
    <Input :label=\${'Medium'} :size=\${'md'} :placeholder=\${'md'} bind-value=\${md} />
    <Input :label=\${'Large'} :size=\${'lg'} :placeholder=\${'lg'} bind-value=\${lg} />
  </Stack>
</view>`

export const clearable = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'

const value = pulse('Clear me')

export <view>
  <Input :label=\${'Search'} :clearable=\${true} :placeholder=\${'Type then clear'} bind-value=\${value} />
</view>`

export const types = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'
import Stack from '@jacare/ui/Stack'

const email = pulse('')
const password = pulse('')
const url = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <Input :label=\${'Email'} :type=\${'email'} :placeholder=\${'you@example.com'} bind-value=\${email} />
    <Input :label=\${'Password'} :type=\${'password'} :placeholder=\${'••••••••'} bind-value=\${password} />
    <Input :label=\${'Website'} :type=\${'url'} :placeholder=\${'https://'} bind-value=\${url} />
  </Stack>
</view>`

export const states = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'
import Stack from '@jacare/ui/Stack'

const required = pulse('')
const errored = pulse('')
const disabled = pulse('Locked')
const hinted = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <Input :label=\${'Required'} :required=\${true} :placeholder=\${'Must fill'} bind-value=\${required} />
    <Input :label=\${'With error'} :error=\${'Enter a valid value'} bind-value=\${errored} />
    <Input :label=\${'With hint'} :hint=\${'Visible help text'} bind-value=\${hinted} />
    <Input :label=\${'Disabled'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

export const maxLength = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'

const value = pulse('')

export <view>
  <Input :label=\${'Handle'} :maxLength=\${12} :placeholder=\${'Up to 12 chars'} :hint=\${'maxLength=12'} bind-value=\${value} />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Input from '@jacare/ui/Input'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <Input',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${quote(state.size)}'}`)
  if (state.type && state.type !== 'text') lines.push(`    :type=\${'${quote(state.type)}'}`)
  if (state.clearable) lines.push('    :clearable=\${true}')
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.maxLength) lines.push(`    :maxLength=\${${Number(state.maxLength)}}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
