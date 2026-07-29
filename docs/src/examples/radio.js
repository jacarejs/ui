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
