export const basic = `import { pulse } from '@jacare/core'
import InputTag from '@jacare/ui/InputTag'

const value = pulse(['vue', 'react'])

export <view>
  <InputTag :label=\${'Frameworks'} :placeholder=\${'Add a framework'} bind-value=\${value} />
</view>`

export const delimiter = `import { pulse } from '@jacare/core'
import InputTag from '@jacare/ui/InputTag'

const value = pulse(['design'])

export <view>
  <InputTag :label=\${'Skills'} :delimiter=\${','} :hint=\${'Press comma to add each skill'} bind-value=\${value} />
</view>`

export const limit = `import { pulse } from '@jacare/core'
import InputTag from '@jacare/ui/InputTag'

const value = pulse(['frontend', 'accessibility'])

export <view>
  <InputTag :label=\${'Topics'} :max=\${3} :placeholder=\${'Add one more topic'} :hint=\${'Maximum of three topics'} bind-value=\${value} />
</view>`

export const clearable = `import { pulse } from '@jacare/core'
import InputTag from '@jacare/ui/InputTag'
import Stack from '@jacare/ui/Stack'

const canClear = pulse(['vue', 'jacare'])
const fixed = pulse(['core', 'ui'])

export <view>
  <Stack :gap=\${'md'}>
    <InputTag :label=\${'Clearable'} :clearable=\${true} bind-value=\${canClear} />
    <InputTag :label=\${'No clear-all action'} :clearable=\${false} bind-value=\${fixed} />
  </Stack>
</view>`

export const states = `import { pulse } from '@jacare/core'
import InputTag from '@jacare/ui/InputTag'
import Stack from '@jacare/ui/Stack'

const required = pulse([])
const invalid = pulse(['draft'])
const disabled = pulse(['locked', 'archived'])

export <view>
  <Stack :gap=\${'md'}>
    <InputTag :label=\${'Required labels'} :required=\${true} :hint=\${'Add at least one label'} bind-value=\${required} />
    <InputTag :label=\${'Release labels'} :error=\${'Draft is not allowed here'} bind-value=\${invalid} />
    <InputTag :label=\${'Read-only labels'} :disabled=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const tags = Array.isArray(state.value) ? state.value : []
  const tagsLiteral = `[${tags.map((tag) => `'${quote(tag)}'`).join(', ')}]`
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import InputTag from '@jacare/ui/InputTag'",
    '',
    `const value = pulse(${tagsLiteral})`,
    '',
    'export <view>',
    '  <InputTag',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.max) lines.push(`    :max=\${${Number(state.max)}}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.delimiter && state.delimiter !== 'Enter') lines.push(`    :delimiter=\${'${quote(state.delimiter)}'}`)
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
