export const basic = `import { pulse } from '@jacare/core'
import OrderList from '@jacare/ui/OrderList'

const value = pulse([
  { key: '1', label: 'Design system' },
  { key: '2', label: 'Documentation' },
  { key: '3', label: 'Components' },
  { key: '4', label: 'Theme tokens' },
])

export <view>
  <OrderList bind-value=\${value} header="Release checklist" />
</view>`

export const filterable = `import { pulse } from '@jacare/core'
import OrderList from '@jacare/ui/OrderList'

const value = pulse([
  { key: 'design', label: 'Design' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'finance', label: 'Finance' },
  { key: 'operations', label: 'Operations' },
])

export <view>
  <OrderList bind-value=\${value} :filterable=\${true} header="Team priorities" />
</view>`

export const disabledItems = `import { pulse } from '@jacare/core'
import OrderList from '@jacare/ui/OrderList'

const value = pulse([
  { key: '1', label: 'Public reports' },
  { key: '2', label: 'Private reports' },
  { key: '3', label: 'Billing', disabled: true },
])

export <view>
  <OrderList bind-value=\${value} header="Report order" />
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import OrderList from '@jacare/ui/OrderList'

const value = pulse([
  { key: '1', label: 'Intro' },
  { key: '2', label: 'Usage' },
])

export <view>
  <OrderList bind-value=\${value} :disabled=\${true} header="Locked order" />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import OrderList from '@jacare/ui/OrderList'",
    '',
    `const value = pulse(${JSON.stringify(state.value || [])})`,
    '',
    'export <view>',
    '  <OrderList',
    '    bind-value=\${value}',
    `    header=${JSON.stringify(state.header || 'Order list')}`,
  ]
  if (state.filterable) lines.push('    :filterable=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('  />', '</view>')
  return lines.join('\n')
}
