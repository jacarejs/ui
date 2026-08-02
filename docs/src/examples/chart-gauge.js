export const basic = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${72}
    :min=\${0}
    :max=\${100}
    :label=\${'72%'}
    :title=\${'Gauge'}
    :caption=\${'Server CPU utilization'}
    :width=\${320}
    :height=\${220}
  />
</view>`

export const valueExample = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${86}
    :min=\${0}
    :max=\${100}
    :label=\${'86%'}
    :title=\${'High load'}
  />
</view>`

export const range = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${18}
    :min=\${0}
    :max=\${50}
    :label=\${'18°C'}
    :title=\${'Temperature'}
    :caption=\${'Custom min and max scale'}
  />
</view>`

export const titleExample = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge :value=\${72} :label=\${'72%'} :title=\${'CPU usage'} />
</view>`

export const caption = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${72}
    :label=\${'72%'}
    :title=\${'Gauge'}
    :caption=\${'Updated every 30 seconds'}
  />
</view>`

export const sized = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${72}
    :label=\${'72%'}
    :title=\${'Compact gauge'}
    :width=\${240}
    :height=\${160}
  />
</view>`

export const color = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${92}
    :label=\${'92%'}
    :title=\${'Critical'}
    :color=\${'#be185d'}
  />
</view>`

export const label = `import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <ChartGauge
    :value=\${72}
    :min=\${0}
    :max=\${100}
    :label=\${'Healthy'}
    :title=\${'Status'}
    :caption=\${'Explicit center label text'}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import ChartGauge from '@jacare/ui/ChartGauge'

export <view>
  <Card :title=\${'Infrastructure'} :subtitle=\${'Live metrics'}>
    <ChartGauge :value=\${72} :label=\${'72%'} :height=\${180} />
  </Card>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import ChartGauge from '@jacare/ui/ChartGauge'",
    '',
    'export <view>',
    '  <ChartGauge',
    '    :value=${' + state.value + '}',
  ]
  if (state.min !== 0) lines.push('    :min=${' + state.min + '}')
  if (state.max !== 100) lines.push('    :max=${' + state.max + '}')
  if (state.title) lines.push("    :title=${'" + state.title + "'}")
  if (state.caption) lines.push("    :caption=${'" + state.caption + "'}")
  if (state.label) lines.push("    :label=${'" + state.label + "'}")
  if (state.customColor) lines.push("    :color=${'" + state.color + "'}")
  lines.push('  />', '</view>')
  return lines.join('\n')
}
