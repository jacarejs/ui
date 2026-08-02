export const basic = `import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['Speed', 'Quality', 'Support', 'Features', 'Price'],
  series: [
    { name: 'Us', data: [80, 90, 70, 85, 60] },
    { name: 'Peer', data: [65, 75, 80, 70, 85] },
  ],
}

export <view>
  <ChartRadar
    :data=\${data}
    :title=\${'Radar'}
    :caption=\${'Multi-axis comparison'}
    :width=\${480}
    :height=\${320}
  />
</view>`

export const single = `import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['Design', 'Performance', 'Accessibility', 'Docs'],
  series: [{ name: 'Score', data: [88, 76, 92, 84] }],
}

export <view>
  <ChartRadar :data=\${data} :title=\${'Product scorecard'} :showLegend=\${false} />
</view>`

export const colors = `import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['UX', 'Reliability', 'Speed', 'Support'],
  series: [
    { name: 'Current', data: [72, 80, 68, 74] },
    { name: 'Target', data: [90, 88, 85, 82] },
  ],
}

export <view>
  <ChartRadar
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb']}
  />
</view>`

export const noLegend = `import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['A', 'B', 'C', 'D'],
  series: [{ name: 'NPS', data: [32, 38, 41, 45] }],
}

export <view>
  <ChartRadar
    :data=\${data}
    :title=\${'Compact'}
    :caption=\${'Legend hidden for dense dashboards'}
    :showLegend=\${false}
  />
</view>`

export const unfilled = `import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['Speed', 'Quality', 'Support', 'Features', 'Price'],
  series: [
    { name: 'Us', data: [80, 90, 70, 85, 60] },
    { name: 'Peer', data: [65, 75, 80, 70, 85] },
  ],
}

export <view>
  <ChartRadar :data=\${data} :title=\${'Stroke only'} :filled=\${false} />
</view>`

export const sized = `import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['A', 'B', 'C', 'D', 'E'],
  series: [{ name: 'Score', data: [8, 12, 10, 16, 14] }],
}

export <view>
  <ChartRadar
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${240}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'

const data = {
  axes: ['Speed', 'Quality', 'Support', 'Features', 'Price'],
  series: [
    { name: 'Us', data: [80, 90, 70, 85, 60] },
    { name: 'Peer', data: [65, 75, 80, 70, 85] },
  ],
}

export <view>
  <Card :title=\${'Benchmark'} :subtitle=\${'Us vs peer'}>
    <ChartRadar :data=\${data} :showLegend=\${true} :height=\${260} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartRadar from '@jacare/ui/components/ChartRadar.jcr'",
    '',
    'const data = { /* axes + series */ }',
    '',
    'export <view>',
    '  <ChartRadar',
    '    :data=${data}',
    "    :title=${'Radar'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.filled === false) lines.push('    :filled=${false}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
