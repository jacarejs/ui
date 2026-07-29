export const basic = `import { pulse } from '@jacare/core'
import Textarea from '@jacare/ui/Textarea'

const value = pulse('')

export <view>
  <Textarea :label=\${'Biography'} :placeholder=\${'A short intro'} bind-value=\${value} />
</view>`

export const count = `import { pulse } from '@jacare/core'
import Textarea from '@jacare/ui/Textarea'

const value = pulse('')

export <view>
  <Textarea
    :label=\${'Bio'}
    :maxLength=\${280}
    :showCount=\${true}
    :hint=\${'Keep it short'}
    bind-value=\${value}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Textarea from '@jacare/ui/Textarea'
import Stack from '@jacare/ui/Stack'

const required = pulse('')
const errored = pulse('too short')
const disabled = pulse('Locked notes')

export <view>
  <Stack :gap=\${'md'}>
    <Textarea :label=\${'Required'} :required=\${true} bind-value=\${required} />
    <Textarea :label=\${'Notes'} :error=\${'Add more detail'} bind-value=\${errored} />
    <Textarea :label=\${'Locked'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

export const resize = `import { pulse } from '@jacare/core'
import Textarea from '@jacare/ui/Textarea'

const value = pulse('')

export <view>
  <Textarea
    :label=\${'Fixed height'}
    :resize=\${'none'}
    :rows=\${5}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Textarea from '@jacare/ui/Textarea'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <Textarea',
    `    :label=\${'${quote(state.label)}'}`,
  ]
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.rows && state.rows !== 4) lines.push(`    :rows=\${${Number(state.rows)}}`)
  if (state.maxLength) lines.push(`    :maxLength=\${${Number(state.maxLength)}}`)
  if (state.showCount) lines.push('    :showCount=\${true}')
  if (state.resize && state.resize !== 'vertical') lines.push(`    :resize=\${'${quote(state.resize)}'}`)
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
