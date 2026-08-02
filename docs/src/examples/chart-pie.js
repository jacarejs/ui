export const basic = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie
    :data=\${data}
    :title=\${'Pie'}
    :caption=\${'Traffic share by channel'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const titleExample = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie :data=\${data} :title=\${'Traffic sources'} />
</view>`

export const caption = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie
    :data=\${data}
    :title=\${'Pie'}
    :caption=\${'Last 30 days — web analytics'}
  />
</view>`

export const sized = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie
    :data=\${data}
    :title=\${'Compact pie'}
    :width=\${280}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const colors = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#0f766e', '#1f6feb', '#c47a00']}
  />
</view>`

export const noLabels = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie :data=\${data} :title=\${'Legend only'} :showLabels=\${false} />
</view>`

export const noLegend = `import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartPie
    :data=\${data}
    :title=\${'Compact tile'}
    :caption=\${'Legend hidden for dense dashboards'}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartPie from '@jacare/ui/ChartPie'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <Card :title=\${'Acquisition'} :subtitle=\${'Channel mix'}>
    <ChartPie :data=\${data} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartPie from '@jacare/ui/ChartPie'",
    '',
    'const data = [ /* { label, value } */ ]',
    '',
    'export <view>',
    '  <ChartPie',
    '    :data=${data}',
  ]
  if (state.title) lines.push("    :title=${'" + state.title + "'}")
  if (state.caption) lines.push("    :caption=${'" + state.caption + "'}")
  if (state.showLabels === false) lines.push('    :showLabels=${false}')
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e', '#1f6feb', '#c47a00']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
