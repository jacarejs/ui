export const basic = `import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'

const data = {
  series: [
    {
      name: 'Team A',
      data: [
        { x: 12, y: 28 },
        { x: 22, y: 36 },
        { x: 34, y: 24 },
        { x: 48, y: 42 },
      ],
    },
    {
      name: 'Team B',
      data: [
        { x: 18, y: 18 },
        { x: 30, y: 32 },
        { x: 40, y: 46 },
        { x: 52, y: 38 },
      ],
    },
  ],
}

export <view>
  <ChartScatter
    :data=\${data}
    :title=\${'Scatter'}
    :caption=\${'X/Y correlation'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const single = `import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'

const data = [
  { x: 4, y: 12 },
  { x: 8, y: 18 },
  { x: 14, y: 16 },
  { x: 20, y: 24 },
  { x: 26, y: 22 },
]

export <view>
  <ChartScatter :data=\${data} :title=\${'Single cohort'} :showLegend=\${false} />
</view>`

export const colors = `import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'

const data = {
  series: [
    {
      name: 'Alpha',
      data: [
        { x: 10, y: 20 },
        { x: 24, y: 34 },
        { x: 38, y: 28 },
      ],
    },
    {
      name: 'Beta',
      data: [
        { x: 14, y: 16 },
        { x: 28, y: 30 },
        { x: 42, y: 40 },
      ],
    },
  ],
}

export <view>
  <ChartScatter
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#1f6feb']}
  />
</view>`

export const noLegend = `import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'

const data = {
  series: [
    {
      name: 'Latency',
      data: [
        { x: 12, y: 48 },
        { x: 28, y: 62 },
        { x: 44, y: 55 },
      ],
    },
  ],
}

export <view>
  <ChartScatter
    :data=\${data}
    :title=\${'Compact'}
    :caption=\${'Legend hidden for dense dashboards'}
    :showLegend=\${false}
  />
</view>`

export const sized = `import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'

const data = {
  series: [
    {
      name: 'Points',
      data: [
        { x: 2, y: 8 },
        { x: 6, y: 12 },
        { x: 10, y: 10 },
        { x: 14, y: 16 },
      ],
    },
  ],
}

export <view>
  <ChartScatter
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'

const data = {
  series: [
    {
      name: 'Team A',
      data: [
        { x: 12, y: 28 },
        { x: 22, y: 36 },
        { x: 34, y: 24 },
        { x: 48, y: 42 },
      ],
    },
    {
      name: 'Team B',
      data: [
        { x: 18, y: 18 },
        { x: 30, y: 32 },
        { x: 40, y: 46 },
        { x: 52, y: 38 },
      ],
    },
  ],
}

export <view>
  <Card :title=\${'Performance'} :subtitle=\${'Throughput vs latency'}>
    <ChartScatter :data=\${data} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartScatter from '@jacare/ui/components/ChartScatter.jcr'",
    '',
    'const data = { /* series */ }',
    '',
    'export <view>',
    '  <ChartScatter',
    '    :data=${data}',
    "    :title=${'Scatter'}",
  ]
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
