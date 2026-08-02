export const basic = `import ChartWaterfall from '@jacare/ui/components/ChartWaterfall.jcr'

const data = [
  { label: 'Start', value: 40 },
  { label: 'Sales', value: 28 },
  { label: 'Refunds', value: -12 },
  { label: 'Fees', value: -6 },
  { label: 'Total', type: 'total' },
]

export <view>
  <ChartWaterfall
    :data=\${data}
    :title=\${'Waterfall'}
    :caption=\${'Running total with gains and losses'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const budget = `import ChartWaterfall from '@jacare/ui/components/ChartWaterfall.jcr'

const data = [
  { label: 'Budget', value: 100 },
  { label: 'Payroll', value: -42 },
  { label: 'Infra', value: -18 },
  { label: 'Marketing', value: -12 },
  { label: 'Remaining', type: 'total' },
]

export <view>
  <ChartWaterfall :data=\${data} :title=\${'Budget burn'} :caption=\${'Quarter to date'} />
</view>`

export const colors = `import ChartWaterfall from '@jacare/ui/components/ChartWaterfall.jcr'

const data = [
  { label: 'Start', value: 40 },
  { label: 'Sales', value: 28 },
  { label: 'Refunds', value: -12 },
  { label: 'Fees', value: -6 },
  { label: 'Total', type: 'total' },
]

export <view>
  <ChartWaterfall
    :data=\${data}
    :title=\${'Custom total color'}
    :colors=\${['#1f6feb']}
  />
</view>`

export const sized = `import ChartWaterfall from '@jacare/ui/components/ChartWaterfall.jcr'

const data = [
  { label: 'Start', value: 40 },
  { label: 'Sales', value: 28 },
  { label: 'Total', type: 'total' },
]

export <view>
  <ChartWaterfall
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartWaterfall from '@jacare/ui/components/ChartWaterfall.jcr'

const data = [
  { label: 'Start', value: 40 },
  { label: 'Sales', value: 28 },
  { label: 'Refunds', value: -12 },
  { label: 'Fees', value: -6 },
  { label: 'Total', type: 'total' },
]

export <view>
  <Card :title=\${'Revenue bridge'} :subtitle=\${'Month over month'}>
    <ChartWaterfall :data=\${data} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartWaterfall from '@jacare/ui/components/ChartWaterfall.jcr'",
    '',
    'const data = [ /* steps */ ]',
    '',
    'export <view>',
    '  <ChartWaterfall',
    '    :data=${data}',
    "    :title=${'Waterfall'}",
  ]
  if (state.customColors) lines.push("    :colors=${['#1f6feb']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
