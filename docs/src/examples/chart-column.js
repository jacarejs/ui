export const basic = `import ChartColumn from '@jacare/ui/ChartColumn'

const data = [
  { label: 'Product', value: 86 },
  { label: 'Sales', value: 72 },
  { label: 'Support', value: 64 },
  { label: 'Marketing', value: 51 },
]

export <view>
  <ChartColumn
    :data=\${data}
    :title=\${'Column'}
    :caption=\${'Department scores'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const multiSeries = `import ChartColumn from '@jacare/ui/ChartColumn'

const data = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Product', data: [40, 52, 61, 74] },
    { name: 'Services', data: [22, 28, 35, 41] },
  ],
}

export <view>
  <ChartColumn :data=\${data} :title=\${'Grouped columns'} />
</view>`

export const colors = `import ChartColumn from '@jacare/ui/ChartColumn'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr'],
  series: [
    { name: 'Online', data: [32, 38, 41, 45] },
    { name: 'Retail', data: [24, 28, 30, 34] },
  ],
}

export <view>
  <ChartColumn
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb']}
  />
</view>`

export const stacked = `import ChartColumn from '@jacare/ui/ChartColumn'

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Direct', data: [18, 22, 24, 28, 30, 34] },
    { name: 'Organic', data: [14, 16, 18, 20, 22, 24] },
    { name: 'Referral', data: [8, 9, 10, 12, 13, 15] },
  ],
}

export <view>
  <ChartColumn :data=\${data} :title=\${'Stacked channels'} :stacked=\${true} />
</view>`

export const noLegend = `import ChartColumn from '@jacare/ui/ChartColumn'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartColumn
    :data=\${data}
    :title=\${'Traffic sources'}
    :caption=\${'Legend hidden for compact tiles'}
    :showLegend=\${false}
  />
</view>`

export const sized = `import ChartColumn from '@jacare/ui/ChartColumn'

const data = [
  { label: 'A', value: 8 },
  { label: 'B', value: 12 },
  { label: 'C', value: 10 },
  { label: 'D', value: 16 },
  { label: 'E', value: 14 },
]

export <view>
  <ChartColumn
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartColumn from '@jacare/ui/ChartColumn'

const data = [
  { label: 'Product', value: 86 },
  { label: 'Sales', value: 72 },
  { label: 'Support', value: 64 },
  { label: 'Marketing', value: 51 },
]

export <view>
  <Card :title=\${'Departments'} :subtitle=\${'Q4 scores'}>
    <ChartColumn :data=\${data} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartColumn from '@jacare/ui/ChartColumn'",
    '',
    'const data = [ /* { label, value } or categories + series */ ]',
    '',
    'export <view>',
    '  <ChartColumn',
    '    :data=${data}',
    "    :title=${'Column'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.stacked) lines.push('    :stacked=${true}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
