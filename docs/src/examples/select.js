export const basic = `import { pulse } from '@jacare/core'
import Select from '@jacare/ui/Select'

const value = pulse('')

export <view>
  <Select
    :label=\${'Fruit'}
    :options=\${['Apple', 'Banana', 'Cherry']}
    bind-value=\${value}
  />
</view>`

export const tags = `import { pulse } from '@jacare/core'
import Select from '@jacare/ui/Select'

const value = pulse('')

const plans = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro', tag: 'Popular' },
  { value: 'team', label: 'Team', tag: 'New' },
]

export <view>
  <Select :label=\${'Plan'} :options=\${plans} bind-value=\${value} />
</view>`

export const multiple = `import { pulse } from '@jacare/core'
import Select from '@jacare/ui/Select'

const value = pulse([])

export <view>
  <Select
    :label=\${'Roles'}
    :multiple=\${true}
    :options=\${['Admin', 'Editor', 'Viewer']}
    bind-value=\${value}
  />
</view>`

export const searchable = `import { pulse } from '@jacare/core'
import Select from '@jacare/ui/Select'

const value = pulse('')
const countries = ['Brazil', 'Canada', 'Germany', 'Japan', 'Portugal']

export <view>
  <Select
    :label=\${'Country'}
    :options=\${countries}
    :searchable=\${false}
    bind-value=\${value}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Select from '@jacare/ui/Select'
import Stack from '@jacare/ui/Stack'

const required = pulse('')
const errored = pulse('')
const disabled = pulse('pro')

export <view>
  <Stack :gap=\${'md'}>
    <Select :label=\${'Required'} :required=\${true} :options=\${['One', 'Two']} bind-value=\${required} />
    <Select :label=\${'Plan'} :error=\${'Choose a plan to continue'} :options=\${['free', 'pro']} bind-value=\${errored} />
    <Select :label=\${'Locked plan'} :disabled=\${true} :options=\${['free', 'pro']} bind-value=\${disabled} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const optionsLiteral = `[${state.options.map((option) => `'${quote(option)}'`).join(', ')}]`
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Select from '@jacare/ui/Select'",
    '',
    `const value = pulse(${state.multiple ? '[]' : `'${quote(state.value)}'`})`,
    '',
    'export <view>',
    '  <Select',
    `    :label=\${'${quote(state.label)}'}`,
    `    :options=\${${optionsLiteral}}`,
  ]
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (!state.searchable) lines.push('    :searchable=\${false}')
  if (state.multiple) lines.push('    :multiple=\${true}')
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
