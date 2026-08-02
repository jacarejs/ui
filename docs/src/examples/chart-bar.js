export const basic = `import ChartBar from '@jacare/ui/ChartBar'

const data = [
  { label: 'Product', value: 86 },
  { label: 'Sales', value: 72 },
  { label: 'Support', value: 64 },
  { label: 'Marketing', value: 51 },
]

export <view>
  <ChartBar
    :data=\${data}
    :title=\${'Bar'}
    :caption=\${'Department scores'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const categoriesSeries = `import ChartBar from '@jacare/ui/ChartBar'

const data = {
  categories: ['Product', 'Sales', 'Support', 'Marketing'],
  series: [{ name: 'Score', data: [86, 72, 64, 51] }],
}

export <view>
  <ChartBar :data=\${data} :title=\${'Ranked categories'} />
</view>`

export const colors = `import ChartBar from '@jacare/ui/ChartBar'

const data = [
  { label: 'North', value: 92 },
  { label: 'South', value: 78 },
  { label: 'East', value: 85 },
  { label: 'West', value: 68 },
]

export <view>
  <ChartBar
    :data=\${data}
    :title=\${'Custom color'}
    :colors=\${['#0f766e']}
  />
</view>`

export const noLegend = `import ChartBar from '@jacare/ui/ChartBar'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartBar
    :data=\${data}
    :title=\${'Traffic sources'}
    :caption=\${'Legend hidden for compact tiles'}
    :showLegend=\${false}
  />
</view>`

export const sized = `import ChartBar from '@jacare/ui/ChartBar'

const data = [
  { label: 'A', value: 8 },
  { label: 'B', value: 12 },
  { label: 'C', value: 10 },
  { label: 'D', value: 16 },
  { label: 'E', value: 14 },
]

export <view>
  <ChartBar
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${220}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartBar from '@jacare/ui/ChartBar'

const data = [
  { label: 'Product', value: 86 },
  { label: 'Sales', value: 72 },
  { label: 'Support', value: 64 },
  { label: 'Marketing', value: 51 },
]

export <view>
  <Card :title=\${'Departments'} :subtitle=\${'Q4 scores'}>
    <ChartBar :data=\${data} :showLegend=\${true} :height=\${260} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartBar from '@jacare/ui/ChartBar'",
    '',
    'const data = [ /* { label, value } */ ]',
    '',
    'export <view>',
    '  <ChartBar',
    '    :data=${data}',
    "    :title=${'Bar'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.customColors) lines.push("    :colors=${['#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
