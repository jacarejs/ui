export const basic = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Donut'}
    :caption=\${'Traffic share by channel'}
    :width=\${480}
    :height=\${280}
  />
</view>`

export const titleExample = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut :data=\${data} :title=\${'Traffic sources'} />
</view>`

export const caption = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Donut'}
    :caption=\${'Last 30 days — web analytics'}
  />
</view>`

export const sized = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Compact ring'}
    :width=\${280}
    :height=\${200}
    :showLegend=\${false}
  />
</view>`

export const colors = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Custom palette'}
    :colors=\${['#be185d', '#0f766e', '#1f6feb', '#c47a00']}
  />
</view>`

export const innerRatio = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Thin ring'}
    :innerRatio=\${0.72}
    :centerLabel=\${'100%'}
  />
</view>`

export const centerLabel = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Total visits'}
    :centerLabel=\${'12.4k'}
    :showLegend=\${false}
  />
</view>`

export const noLegend = `import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <ChartDonut
    :data=\${data}
    :title=\${'Compact tile'}
    :caption=\${'Legend hidden for dense dashboards'}
    :centerLabel=\${'44%'}
    :showLegend=\${false}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartDonut from '@jacare/ui/ChartDonut'

const data = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export <view>
  <Card :title=\${'Acquisition'} :subtitle=\${'Channel mix'}>
    <ChartDonut :data=\${data} :centerLabel=\${'12.4k'} :showLegend=\${true} :height=\${240} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartDonut from '@jacare/ui/ChartDonut'",
    '',
    'const data = [ /* { label, value } */ ]',
    '',
    'export <view>',
    '  <ChartDonut',
    '    :data=${data}',
  ]
  if (state.title) lines.push("    :title=${'" + state.title + "'}")
  if (state.caption) lines.push("    :caption=${'" + state.caption + "'}")
  if (state.centerLabel) lines.push("    :centerLabel=${'" + state.centerLabel + "'}")
  if (state.showLegend === false) lines.push('    :showLegend=${false}')
  if (state.customColors) lines.push("    :colors=${['#be185d', '#0f766e', '#1f6feb', '#c47a00']}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
