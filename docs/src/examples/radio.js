export const basic = `import { pulse } from '@jacare/core'
import Radio from '@jacare/ui/Radio'
import Stack from '@jacare/ui/Stack'

const value = pulse('pro')

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'}>
    <Radio :label=\${'Free'} :value=\${'free'} :name=\${'plan'} bind-modelValue=\${value} />
    <Radio :label=\${'Pro'} :value=\${'pro'} :name=\${'plan'} bind-modelValue=\${value} />
    <Radio :label=\${'Team'} :value=\${'team'} :name=\${'plan'} bind-modelValue=\${value} />
  </Stack>
</view>`

export const group = `import { pulse } from '@jacare/core'
import RadioGroup from '@jacare/ui/RadioGroup'

const value = pulse('email')
const options = ['Email', 'SMS', 'Push']

export <view>
  <RadioGroup :label=\${'Notification channel'} :options=\${options} bind-value=\${value} />
</view>`

export const cards = `import { pulse } from '@jacare/core'
import RadioGroup from '@jacare/ui/RadioGroup'

const value = pulse('pro')
const plans = [
  { value: 'free', label: 'Free', description: 'For personal projects' },
  { value: 'pro', label: 'Pro', description: 'For growing products' },
  { value: 'team', label: 'Team', description: 'For collaborating teams' },
]

export <view>
  <RadioGroup :label=\${'Plan'} :layout=\${'cards'} :options=\${plans} bind-value=\${value} />
</view>`

export const disabledOption = `import { pulse } from '@jacare/core'
import RadioGroup from '@jacare/ui/RadioGroup'

const value = pulse('standard')
const options = [
  { value: 'standard', label: 'Standard shipping' },
  { value: 'express', label: 'Express shipping', disabled: true },
]

export <view>
  <RadioGroup :label=\${'Shipping'} :options=\${options} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Radio from '@jacare/ui/Radio'
import Stack from '@jacare/ui/Stack'

const value = pulse('enabled')

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'}>
    <Radio :label=\${'Enabled'} :value=\${'enabled'} :name=\${'state'} bind-modelValue=\${value} />
    <Radio :label=\${'Unavailable'} :value=\${'unavailable'} :name=\${'state'} :disabled=\${true} bind-modelValue=\${value} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const disabledAttr = state.disabled ? ' :disabled=\${true}' : ''
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Radio from '@jacare/ui/Radio'",
    "import Stack from '@jacare/ui/Stack'",
    '',
    `const value = pulse('${quote(state.value || 'pro')}')`,
    '',
    'export <view>',
    "  <Stack :direction=\${'row'} :gap=\${'lg'}>",
    `    <Radio :label=\${'Free'} :value=\${'free'} :name=\${'plan'}${disabledAttr} bind-modelValue=\${value} />`,
    `    <Radio :label=\${'Pro'} :value=\${'pro'} :name=\${'plan'}${disabledAttr} bind-modelValue=\${value} />`,
    `    <Radio :label=\${'Team'} :value=\${'team'} :name=\${'plan'}${disabledAttr} bind-modelValue=\${value} />`,
    '  </Stack>',
    '</view>',
  ]
  return lines.join('\n')
}
