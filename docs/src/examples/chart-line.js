export const basic = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export <view>
  <ChartLine
    :data=\${data}
    :title=\${'Line'}
    :caption=\${'Multi-series trend'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const single = `import ChartLine from '@jacare/ui/ChartLine'

const data = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 19 },
]

export <view>
  <ChartLine :data=\${data} :title=\${'Daily signups'} :showLegend=\${false} />
</view>`

export const colors = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Product', data: [40, 52, 61, 74] },
    { name: 'Services', data: [22, 28, 35, 41] },
  ],
}

export <view>
  <ChartLine
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb']}
  />
</view>`

export const noDots = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [{ name: 'Visitors', data: [120, 140, 132, 168, 190, 210] }],
}

export <view>
  <ChartLine :data=\${data} :title=\${'Smooth read'} :showDots=\${false} />
</view>`

export const tooltip = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export <view>
  <ChartLine
    :data=\${data}
    :title=\${'Point tooltips'}
    :showTooltip=\${true}
    :showDots=\${true}
  />
</view>`

export const noTooltip = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [{ name: 'Visitors', data: [120, 140, 132, 168, 190, 210] }],
}

export <view>
  <ChartLine
    :data=\${data}
    :title=\${'No tooltips'}
    :showTooltip=\${false}
  />
</view>`

export const curved = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export <view>
  <ChartLine :data=\${data} :title=\${'Curved'} :curved=\${true} />
</view>`

export const noLegend = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr'],
  series: [{ name: 'NPS', data: [32, 38, 41, 45] }],
}

export <view>
  <ChartLine
    :data=\${data}
    :title=\${'Compact'}
    :caption=\${'Legend hidden for dense dashboards'}
    :showLegend=\${false}
  />
</view>`

export const sized = `import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['A', 'B', 'C', 'D', 'E'],
  series: [{ name: 'Score', data: [8, 12, 10, 16, 14] }],
}

export <view>
  <ChartLine
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartLine from '@jacare/ui/ChartLine'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export <view>
  <Card :title=\${'Finance'} :subtitle=\${'Monthly trend'}>
    <ChartLine :data=\${data} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartLine from '@jacare/ui/ChartLine'",
    '',
    'const data = { /* categories + series */ }',
    '',
    'export <view>',
    '  <ChartLine',
    '    :data=${data}',
    "    :title=${'Line'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.showDots === false) lines.push('    :showDots=${false}')
  if (state.showTooltip === false) lines.push('    :showTooltip=${false}')
  if (state.curved) lines.push('    :curved=${true}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
