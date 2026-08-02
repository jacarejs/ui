export const basic = `import ChartCandlestick from '@jacare/ui/components/ChartCandlestick.jcr'

const data = [
  { label: 'Mon', open: 120, high: 132, low: 118, close: 128 },
  { label: 'Tue', open: 128, high: 136, low: 122, close: 124 },
  { label: 'Wed', open: 124, high: 130, low: 116, close: 118 },
  { label: 'Thu', open: 118, high: 140, low: 117, close: 136 },
  { label: 'Fri', open: 136, high: 142, low: 130, close: 134 },
]

export <view>
  <ChartCandlestick
    :data=\${data}
    :title=\${'Candlestick'}
    :caption=\${'Daily OHLC'}
    :width=\${520}
    :height=\${280}
  />
</view>`

export const weekly = `import ChartCandlestick from '@jacare/ui/components/ChartCandlestick.jcr'

const data = [
  { label: 'W1', open: 98, high: 104, low: 94, close: 102 },
  { label: 'W2', open: 102, high: 110, low: 99, close: 108 },
  { label: 'W3', open: 108, high: 112, low: 101, close: 103 },
  { label: 'W4', open: 103, high: 118, low: 100, close: 116 },
]

export <view>
  <ChartCandlestick :data=\${data} :title=\${'Weekly close'} :caption=\${'Four-week trend'} />
</view>`

export const volatile = `import ChartCandlestick from '@jacare/ui/components/ChartCandlestick.jcr'

const data = [
  { label: 'Mon', open: 210, high: 228, low: 198, close: 204 },
  { label: 'Tue', open: 204, high: 218, low: 186, close: 192 },
  { label: 'Wed', open: 192, high: 240, low: 188, close: 236 },
  { label: 'Thu', open: 236, high: 244, low: 214, close: 220 },
  { label: 'Fri', open: 220, high: 226, low: 202, close: 208 },
]

export <view>
  <ChartCandlestick
    :data=\${data}
    :title=\${'Volatile week'}
    :caption=\${'Green = close ≥ open, red = close < open'}
  />
</view>`

export const sized = `import ChartCandlestick from '@jacare/ui/components/ChartCandlestick.jcr'

const data = [
  { label: 'Mon', open: 120, high: 132, low: 118, close: 128 },
  { label: 'Tue', open: 128, high: 136, low: 122, close: 124 },
  { label: 'Wed', open: 124, high: 130, low: 116, close: 118 },
]

export <view>
  <ChartCandlestick
    :data=\${data}
    :title=\${'Compact size'}
    :width=\${360}
    :height=\${200}
  />
</view>`

export const inCard = `import Card from '@jacare/ui/components/Card.jcr'
import ChartCandlestick from '@jacare/ui/components/ChartCandlestick.jcr'

const data = [
  { label: 'Mon', open: 120, high: 132, low: 118, close: 128 },
  { label: 'Tue', open: 128, high: 136, low: 122, close: 124 },
  { label: 'Wed', open: 124, high: 130, low: 116, close: 118 },
  { label: 'Thu', open: 118, high: 140, low: 117, close: 136 },
  { label: 'Fri', open: 136, high: 142, low: 130, close: 134 },
]

export <view>
  <Card :title=\${'Ticker'} :subtitle=\${'Last five sessions'}>
    <ChartCandlestick :data=\${data} :height=\${240} />
  </Card>
</view>`
