export const basic = `import { pulse } from '@jacare/core'
import Field from '@jacare/ui/Field'

const value = pulse('')

export <view>
  <Field :label=\${'Email'} :placeholder=\${'you@jacare.dev'} bind-value=\${value} />
</view>`

export const types = `import { pulse } from '@jacare/core'
import Field from '@jacare/ui/Field'
import Stack from '@jacare/ui/Stack'

const email = pulse('')
const password = pulse('')
const search = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <Field :label=\${'Email'} :type=\${'email'} bind-value=\${email} />
    <Field :label=\${'Password'} :type=\${'password'} bind-value=\${password} />
    <Field :label=\${'Search'} :type=\${'search'} bind-value=\${search} />
  </Stack>
</view>`

export const hint = `import { pulse } from '@jacare/core'
import Field from '@jacare/ui/Field'

const value = pulse('')

export <view>
  <Field
    :label=\${'Username'}
    :hint=\${'Letters, numbers, and underscores'}
    :placeholder=\${'jacare'}
    bind-value=\${value}
  />
</view>`

export const error = `import { pulse } from '@jacare/core'
import Field from '@jacare/ui/Field'

const value = pulse('bad')

export <view>
  <Field
    :label=\${'Email'}
    :error=\${'Enter a valid email address'}
    bind-value=\${value}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Field from '@jacare/ui/Field'
import Stack from '@jacare/ui/Stack'

const required = pulse('')
const disabled = pulse('Locked value')

export <view>
  <Stack :gap=\${'md'}>
    <Field :label=\${'Required'} :required=\${true} bind-value=\${required} />
    <Field :label=\${'Disabled'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Field from '@jacare/ui/Field'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <Field',
    `    :label=\${'${quote(state.label)}'}`,
    `    :type=\${'${state.type}'}`,
  ]
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
