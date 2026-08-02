const companyTree = `{
  key: 'ceo',
  label: 'Alex Morgan',
  description: 'Chief Executive Officer',
  children: [
    {
      key: 'ops',
      label: 'Jordan Lee',
      description: 'Operations',
      children: [
        { key: 'support', label: 'Support', description: 'Customer success' },
        { key: 'logistics', label: 'Logistics', description: 'Fulfillment' },
      ],
    },
    {
      key: 'product',
      label: 'Sam Rivera',
      description: 'Product',
      children: [
        { key: 'design', label: 'Design', description: 'UX and brand' },
        { key: 'engineering', label: 'Engineering', description: 'Platform' },
      ],
    },
  ],
}`

export const basic = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = ${companyTree}

export <view>
  <OrganizationChart :value=\${value} />
</view>`

export const labelsOnly = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = {
  key: 'hq',
  label: 'Headquarters',
  children: [
    { key: 'sales', label: 'Sales' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'finance', label: 'Finance' },
  ],
}

export <view>
  <OrganizationChart :value=\${value} :collapsible=\${false} />
</view>`

export const deep = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = {
  key: 'ceo',
  label: 'Alex Morgan',
  description: 'CEO',
  children: [
    {
      key: 'cto',
      label: 'Riley Chen',
      description: 'CTO',
      children: [
        {
          key: 'platform',
          label: 'Platform',
          description: 'Core services',
          children: [
            { key: 'api', label: 'API', description: 'Public APIs' },
            { key: 'data', label: 'Data', description: 'Warehousing' },
          ],
        },
        {
          key: 'apps',
          label: 'Applications',
          description: 'Product UI',
          children: [
            { key: 'web', label: 'Web', description: 'Docs and app' },
            { key: 'mobile', label: 'Mobile', description: 'iOS / Android' },
          ],
        },
      ],
    },
  ],
}

export <view>
  <OrganizationChart :value=\${value} />
</view>`

export const wide = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = {
  key: 'pm',
  label: 'Sam Rivera',
  description: 'Product lead',
  children: [
    { key: 'research', label: 'Research', description: 'Discovery' },
    { key: 'design', label: 'Design', description: 'UX' },
    { key: 'frontend', label: 'Frontend', description: 'Web' },
    { key: 'backend', label: 'Backend', description: 'Services' },
    { key: 'qa', label: 'QA', description: 'Quality' },
  ],
}

export <view>
  <OrganizationChart :value=\${value} :collapsible=\${false} />
</view>`

export const selection = `import { pulse } from '@jacare/core'
import OrganizationChart from '@jacare/ui/OrganizationChart'
import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

const value = ${companyTree}
const selected = pulse(['product', 'design'])

export <view>
  <Stack :gap=\${'md'}>
    <OrganizationChart
      :value=\${value}
      :selectionMode=\${'multiple'}
      bind-selection=\${selected}
    />
    <Text :tone=\${'muted'}>
      Selected: \${() => selected().join(', ') || 'none'}
    </Text>
  </Stack>
</view>`

export const single = `import { pulse } from '@jacare/core'
import OrganizationChart from '@jacare/ui/OrganizationChart'
import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

const value = {
  key: 'ceo',
  label: 'Alex Morgan',
  description: 'CEO',
  children: [
    { key: 'ops', label: 'Operations', description: 'Jordan Lee' },
    { key: 'product', label: 'Product', description: 'Sam Rivera' },
    { key: 'finance', label: 'Finance', description: 'Casey Park' },
  ],
}
const selected = pulse(['ops'])

export <view>
  <Stack :gap=\${'md'}>
    <OrganizationChart
      :value=\${value}
      :selectionMode=\${'single'}
      bind-selection=\${selected}
    />
    <Text :tone=\${'muted'}>
      Active: \${() => selected()[0] || 'none'}
    </Text>
  </Stack>
</view>`

export const collapsed = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = ${companyTree}

export <view>
  <OrganizationChart :value=\${value} :collapsible=\${true} />
</view>`

export const staticTree = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = {
  key: 'ceo',
  label: 'Alex Morgan',
  children: [
    { key: 'ops', label: 'Operations' },
    { key: 'product', label: 'Product' },
  ],
}

export <view>
  <OrganizationChart :value=\${value} :collapsible=\${false} />
</view>`

export const departments = `import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = {
  key: 'company',
  label: 'Jacaré UI',
  description: 'Product company',
  children: [
    {
      key: 'design-system',
      label: 'Design System',
      description: 'Tokens and docs',
      children: [
        { key: 'tokens', label: 'Tokens', description: 'Color / space' },
        { key: 'docs', label: 'Docs', description: 'Guides' },
      ],
    },
    {
      key: 'components',
      label: 'Components',
      description: 'UI kit',
      children: [
        { key: 'forms', label: 'Forms', description: 'Inputs' },
        { key: 'display', label: 'Display', description: 'Tables' },
      ],
    },
  ],
}

export <view>
  <OrganizationChart :value=\${value} />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import OrganizationChart from '@jacare/ui/OrganizationChart'

const value = {
  key: 'ceo',
  label: 'Alex Morgan',
  description: 'CEO',
  children: [
    { key: 'ops', label: 'Operations', description: 'Jordan Lee' },
    { key: 'product', label: 'Product', description: 'Sam Rivera' },
  ],
}

export <view>
  <Card :title=\${'Leadership'} :subtitle=\${'Current org snapshot'}>
    <OrganizationChart :value=\${value} :collapsible=\${false} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import OrganizationChart from '@jacare/ui/OrganizationChart'",
    '',
    'const value = { /* company tree */ }',
    "const selected = pulse(['product'])",
    '',
    'export <view>',
    '  <OrganizationChart',
    '    :value=${value}',
  ]
  if (state.collapsible === false) lines.push('    :collapsible=${false}')
  if (state.selectionMode === 'single') {
    lines.push("    :selectionMode=${'single'}")
    lines.push('    bind-selection=${selected}')
  } else if (state.selectionMode === 'multiple') {
    lines.push("    :selectionMode=${'multiple'}")
    lines.push('    bind-selection=${selected}')
  }
  lines.push('  />', '</view>')
  return lines.join('\n')
}
