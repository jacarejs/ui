export const basic = `import ChartArea from '@jacare/ui/ChartArea'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export <view>
  <ChartArea
    :data=\${data}
    :title=\${'Area'}
    :caption=\${'Multi-series volume'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const single = `import ChartArea from '@jacare/ui/ChartArea'

const data = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 19 },
]

export <view>
  <ChartArea :data=\${data} :title=\${'Daily signups'} :showLegend=\${false} />
</view>`

export const colors = `import ChartArea from '@jacare/ui/ChartArea'

const data = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Product', data: [40, 52, 61, 74] },
    { name: 'Services', data: [22, 28, 35, 41] },
  ],
}

export <view>
  <ChartArea
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb']}
  />
</view>`

export const stacked = `import ChartArea from '@jacare/ui/ChartArea'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Direct', data: [18, 22, 24, 28, 30, 34] },
    { name: 'Organic', data: [14, 16, 18, 20, 22, 24] },
    { name: 'Referral', data: [8, 9, 10, 12, 13, 15] },
  ],
}

export <view>
  <ChartArea :data=\${data} :title=\${'Stacked channels'} :stacked=\${true} />
</view>`

export const noLegend = `import ChartArea from '@jacare/ui/ChartArea'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr'],
  series: [{ name: 'NPS', data: [32, 38, 41, 45] }],
}

export <view>
  <ChartArea
    :data=\${data}
    :title=\${'Compact'}
    :caption=\${'Legend hidden for dense dashboards'}
    :showLegend=\${false}
  />
</view>`

export const sized = `import ChartArea from '@jacare/ui/ChartArea'

const data = {
  categories: ['A', 'B', 'C', 'D', 'E'],
  series: [{ name: 'Score', data: [8, 12, 10, 16, 14] }],
}

export <view>
  <ChartArea
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartArea from '@jacare/ui/ChartArea'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export <view>
  <Card :title=\${'Finance'} :subtitle=\${'Monthly volume'}>
    <ChartArea :data=\${data} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartArea from '@jacare/ui/ChartArea'",
    '',
    'const data = { /* categories + series */ }',
    '',
    'export <view>',
    '  <ChartArea',
    '    :data=${data}',
    "    :title=${'Area'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.stacked) lines.push('    :stacked=${true}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
