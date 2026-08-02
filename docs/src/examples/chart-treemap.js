export const basic = `import ChartTreemap from '@jacare/ui/components/ChartTreemap.jcr'

const data = [
  { label: 'Checkout', value: 42 },
  { label: 'Catalog', value: 28 },
  { label: 'Support', value: 18 },
  { label: 'Billing', value: 12 },
]

export <view>
  <ChartTreemap
    :data=\${data}
    :title=\${'Treemap'}
    :caption=\${'Share by funnel step'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const traffic = `import ChartTreemap from '@jacare/ui/components/ChartTreemap.jcr'

const data = [
  { label: 'Organic', value: 520 },
  { label: 'Paid', value: 310 },
  { label: 'Referral', value: 180 },
  { label: 'Email', value: 95 },
  { label: 'Social', value: 72 },
]

export <view>
  <ChartTreemap :data=\${data} :title=\${'Traffic sources'} :caption=\${'Sessions this month'} />
</view>`

export const colors = `import ChartTreemap from '@jacare/ui/components/ChartTreemap.jcr'

const data = [
  { label: 'Checkout', value: 42 },
  { label: 'Catalog', value: 28 },
  { label: 'Support', value: 18 },
  { label: 'Billing', value: 12 },
]

export <view>
  <ChartTreemap
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb', '#0f766e', '#a16207']}
  />
</view>`

export const sized = `import ChartTreemap from '@jacare/ui/components/ChartTreemap.jcr'

const data = [
  { label: 'A', value: 24 },
  { label: 'B', value: 18 },
  { label: 'C', value: 12 },
]

export <view>
  <ChartTreemap
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartTreemap from '@jacare/ui/components/ChartTreemap.jcr'

const data = [
  { label: 'Checkout', value: 42 },
  { label: 'Catalog', value: 28 },
  { label: 'Support', value: 18 },
  { label: 'Billing', value: 12 },
]

export <view>
  <Card :title=\${'Funnel drop-off'} :subtitle=\${'Sessions by step'}>
    <ChartTreemap :data=\${data} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartTreemap from '@jacare/ui/components/ChartTreemap.jcr'",
    '',
    'const data = [ /* { label, value } */ ]',
    '',
    'export <view>',
    '  <ChartTreemap',
    '    :data=${data}',
    "    :title=${'Treemap'}",
  ]
  if (state.customColors) lines.push("    :colors=${['#be185d', '#1f6feb', '#0f766e', '#a16207']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
