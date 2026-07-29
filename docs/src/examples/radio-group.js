export const basic = `import { pulse } from '@jacare/core'
import RadioGroup from '@jacare/ui/RadioGroup'

const plan = pulse('pro')

export <view>
  <RadioGroup
    :label=\${'Plan'}
    :options=\${[
      { value: 'free', label: 'Free', description: 'For trying things out' },
      { value: 'pro', label: 'Pro', description: 'For daily product work' },
      { value: 'team', label: 'Team', description: 'For growing squads' },
    ]}
    bind-value=\${plan}
  />
</view>`

export const cards = `import { pulse } from '@jacare/core'
import RadioGroup from '@jacare/ui/RadioGroup'

const plan = pulse('pro')

export <view>
  <RadioGroup
    :label=\${'Plan'}
    :layout=\${'cards'}
    :options=\${[
      { value: 'free', label: 'Free', description: 'Starter' },
      { value: 'pro', label: 'Pro', description: 'Popular' },
      { value: 'team', label: 'Team', description: 'Shared' },
    ]}
    bind-value=\${plan}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import RadioGroup from '@jacare/ui/RadioGroup'
import Stack from '@jacare/ui/Stack'

const required = pulse('')
const errored = pulse('')
const locked = pulse('pro')

export <view>
  <Stack :gap=\${'md'}>
    <RadioGroup
      :label=\${'Required'}
      :required=\${true}
      :options=\${['One', 'Two']}
      bind-value=\${required}
    />
    <RadioGroup
      :label=\${'Plan'}
      :error=\${'Choose a plan to continue'}
      :options=\${['free', 'pro']}
      bind-value=\${errored}
    />
    <RadioGroup
      :label=\${'Locked'}
      :disabled=\${true}
      :options=\${['free', 'pro']}
      bind-value=\${locked}
    />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import RadioGroup from '@jacare/ui/RadioGroup'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <RadioGroup',
    `    :label=\${'${quote(state.label)}'}`,
  ]
  if (state.layout === 'cards') lines.push("    :layout=\${'cards'}")
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push(
    '    :options=\${[',
    "      { value: 'free', label: 'Free', description: 'Starter' },",
    "      { value: 'pro', label: 'Pro', description: 'Popular' },",
    "      { value: 'team', label: 'Team', description: 'Shared' },",
    '    ]}',
    '    bind-value=\${value}',
    '  />',
    '</view>',
  )
  return lines.join('\n')
}
