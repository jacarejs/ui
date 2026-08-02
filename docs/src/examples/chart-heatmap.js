export const basic = `import ChartHeatmap from '@jacare/ui/components/ChartHeatmap.jcr'

const data = {
  x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  y: ['Morning', 'Afternoon', 'Evening'],
  values: [
    [12, 18, 22, 16, 10],
    [28, 34, 40, 36, 24],
    [16, 20, 18, 14, 12],
  ],
}

export <view>
  <ChartHeatmap
    :data=\${data}
    :title=\${'Heatmap'}
    :caption=\${'Session activity by day'}
    :width=\${480}
    :height=\${300}
  />
</view>`

export const points = `import ChartHeatmap from '@jacare/ui/components/ChartHeatmap.jcr'

const data = [
  { x: 'A', y: 'Row 1', value: 12 },
  { x: 'B', y: 'Row 1', value: 28 },
  { x: 'C', y: 'Row 1', value: 18 },
  { x: 'A', y: 'Row 2', value: 34 },
  { x: 'B', y: 'Row 2', value: 22 },
  { x: 'C', y: 'Row 2', value: 40 },
]

export <view>
  <ChartHeatmap :data=\${data} :title=\${'Point array'} :caption=\${'Sparse x/y/value rows'} />
</view>`

export const weekly = `import ChartHeatmap from '@jacare/ui/components/ChartHeatmap.jcr'

const data = {
  x: ['W1', 'W2', 'W3', 'W4'],
  y: ['North', 'South', 'East', 'West'],
  values: [
    [42, 38, 51, 47],
    [36, 44, 39, 41],
    [48, 52, 46, 50],
    [30, 34, 28, 32],
  ],
}

export <view>
  <ChartHeatmap
    :data=\${data}
    :title=\${'Regional weekly load'}
    :caption=\${'Higher values skew warm'}
  />
</view>`

export const sized = `import ChartHeatmap from '@jacare/ui/components/ChartHeatmap.jcr'

const data = {
  x: ['A', 'B', 'C'],
  y: ['1', '2'],
  values: [
    [8, 12, 10],
    [14, 16, 11],
  ],
}

export <view>
  <ChartHeatmap
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${320}
    :height=\${200}
  />
</view>`

export const titled = `import ChartHeatmap from '@jacare/ui/components/ChartHeatmap.jcr'

const data = {
  x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  y: ['Morning', 'Afternoon', 'Evening'],
  values: [
    [12, 18, 22, 16, 10],
    [28, 34, 40, 36, 24],
    [16, 20, 18, 14, 12],
  ],
}

export <view>
  <ChartHeatmap
    :data=\${data}
    :title=\${'Support queue depth'}
    :caption=\${'Warm cells = higher ticket volume'}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartHeatmap from '@jacare/ui/components/ChartHeatmap.jcr'

const data = {
  x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  y: ['Morning', 'Afternoon', 'Evening'],
  values: [
    [12, 18, 22, 16, 10],
    [28, 34, 40, 36, 24],
    [16, 20, 18, 14, 12],
  ],
}

export <view>
  <Card :title=\${'Engagement'} :subtitle=\${'By day and time slot'}>
    <ChartHeatmap :data=\${data} :height=\${260} />
  </Card>
</view>`
