export const basic = `import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'

const data = {
  series: [
    {
      name: 'Team A',
      data: [
        { x: 12, y: 28, size: 10 },
        { x: 22, y: 36, size: 16 },
        { x: 34, y: 24, size: 12 },
        { x: 48, y: 42, size: 20 },
      ],
    },
    {
      name: 'Team B',
      data: [
        { x: 18, y: 18, size: 8 },
        { x: 30, y: 32, size: 14 },
        { x: 40, y: 46, size: 22 },
        { x: 52, y: 38, size: 18 },
      ],
    },
  ],
}

export <view>
  <ChartBubble
    :data=\${data}
    :title=\${'Bubble'}
    :caption=\${'Size encodes volume'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const single = `import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'

const data = [
  { x: 4, y: 12, size: 6 },
  { x: 8, y: 18, size: 10 },
  { x: 14, y: 16, size: 14 },
  { x: 20, y: 24, size: 18 },
  { x: 26, y: 22, size: 12 },
]

export <view>
  <ChartBubble :data=\${data} :title=\${'Market map'} :showLegend=\${false} />
</view>`

export const colors = `import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'

const data = {
  series: [
    {
      name: 'Alpha',
      data: [
        { x: 10, y: 20, size: 12 },
        { x: 24, y: 34, size: 20 },
        { x: 38, y: 28, size: 16 },
      ],
    },
    {
      name: 'Beta',
      data: [
        { x: 14, y: 16, size: 8 },
        { x: 28, y: 30, size: 18 },
        { x: 42, y: 40, size: 24 },
      ],
    },
  ],
}

export <view>
  <ChartBubble
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb']}
  />
</view>`

export const noLegend = `import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'

const data = {
  series: [
    {
      name: 'Regions',
      data: [
        { x: 12, y: 48, size: 14 },
        { x: 28, y: 62, size: 22 },
        { x: 44, y: 55, size: 18 },
      ],
    },
  ],
}

export <view>
  <ChartBubble
    :data=\${data}
    :title=\${'Compact'}
    :caption=\${'Legend hidden for dense dashboards'}
    :showLegend=\${false}
  />
</view>`

export const sized = `import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'

const data = {
  series: [
    {
      name: 'Points',
      data: [
        { x: 2, y: 8, size: 6 },
        { x: 6, y: 12, size: 10 },
        { x: 10, y: 10, size: 14 },
        { x: 14, y: 16, size: 8 },
      ],
    },
  ],
}

export <view>
  <ChartBubble
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'

const data = {
  series: [
    {
      name: 'Team A',
      data: [
        { x: 12, y: 28, size: 10 },
        { x: 22, y: 36, size: 16 },
        { x: 34, y: 24, size: 12 },
        { x: 48, y: 42, size: 20 },
      ],
    },
    {
      name: 'Team B',
      data: [
        { x: 18, y: 18, size: 8 },
        { x: 30, y: 32, size: 14 },
        { x: 40, y: 46, size: 22 },
        { x: 52, y: 38, size: 18 },
      ],
    },
  ],
}

export <view>
  <Card :title=\${'Portfolio'} :subtitle=\${'Risk vs return by size'}>
    <ChartBubble :data=\${data} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartBubble from '@jacare/ui/components/ChartBubble.jcr'",
    '',
    'const data = { /* series with size */ }',
    '',
    'export <view>',
    '  <ChartBubble',
    '    :data=${data}',
    "    :title=${'Bubble'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
