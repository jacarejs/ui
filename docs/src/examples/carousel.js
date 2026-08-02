const slide = (label, bg, color = 'var(--j-forest)') =>
  `<div style="display:grid;place-items:center;height:100%;background:${bg};color:${color};font-weight:800">${label}</div>`

export const basic = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :arrow=\${'always'}>
    <CarouselItem>${slide('Overview', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Usage', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Ship', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const autoplay = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${true} :interval=\${2000} :arrow=\${'hover'}>
    <CarouselItem>${slide('Overview', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Usage', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Ship', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const arrowAlways = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :arrow=\${'always'} :height=\${'180px'}>
    <CarouselItem>${slide('Always visible arrows', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Prev / Next stay on screen', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Good for touch and desktop', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const arrowHover = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :arrow=\${'hover'} :height=\${'180px'}>
    <CarouselItem>${slide('Hover to reveal arrows', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Default arrow mode', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Keeps the slide clean', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const arrowNever = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :arrow=\${'never'} :height=\${'180px'}>
    <CarouselItem>${slide('No arrows', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Use indicators or swipe', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Compact chrome', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const indicatorsInside = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :indicatorPosition=\${'inside'} :arrow=\${'always'} :height=\${'180px'}>
    <CarouselItem>${slide('Indicators inside', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Default placement', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Overlay on the slide', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const outside = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :indicatorPosition=\${'outside'} :arrow=\${'always'} :height=\${'180px'}>
    <CarouselItem>${slide('Indicators outside', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Dots sit below the track', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Useful with busy slides', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const indicatorsNone = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :indicatorPosition=\${'none'} :arrow=\${'always'} :height=\${'180px'}>
    <CarouselItem>${slide('No indicators', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Navigate with arrows', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Or swipe on touch', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const initial = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :initialIndex=\${1} :arrow=\${'always'}>
    <CarouselItem>${slide('Overview', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Usage', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Ship', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export const heights = `import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'
import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Stack :gap=\${'lg'}>
    <Text :weight=\${'bold'}>Compact 140px</Text>
    <Carousel :autoplay=\${false} :arrow=\${'always'} :height=\${'140px'}>
      <CarouselItem>${slide('Short', 'var(--j-mint)')}</CarouselItem>
      <CarouselItem>${slide('Hero strip', 'var(--j-surface-2)')}</CarouselItem>
    </Carousel>
    <Text :weight=\${'bold'}>Tall 260px</Text>
    <Carousel :autoplay=\${false} :arrow=\${'always'} :height=\${'260px'}>
      <CarouselItem>${slide('Feature', 'var(--j-mint)')}</CarouselItem>
      <CarouselItem>${slide('Campaign', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
    </Carousel>
  </Stack>
</view>`

export const cards = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Tag from '@jacare/ui/Tag'
import Text from '@jacare/ui/Text'
import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :arrow=\${'always'} :indicatorPosition=\${'outside'} :height=\${'220px'}>
    <CarouselItem>
      <div style="height:100%;padding:0.85rem;box-sizing:border-box">
        <Card :title=\${'Design tokens'} :subtitle=\${'Theme'} :shadow=\${'never'}>
          <Stack :gap=\${'sm'}>
            <Text :tone=\${'muted'}>Color, spacing, and typography primitives.</Text>
            <Tag :text=\${'stable'} :type=\${'success'} :size=\${'sm'} />
          </Stack>
        </Card>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div style="height:100%;padding:0.85rem;box-sizing:border-box">
        <Card :title=\${'Forms'} :subtitle=\${'Inputs'} :shadow=\${'never'}>
          <Stack :gap=\${'sm'}>
            <Text :tone=\${'muted'}>Validation helpers for settings screens.</Text>
            <Tag :text=\${'forms'} :type=\${'info'} :size=\${'sm'} />
          </Stack>
        </Card>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div style="height:100%;padding:0.85rem;box-sizing:border-box">
        <Card :title=\${'Feedback'} :subtitle=\${'Alerts'} :shadow=\${'never'}>
          <Stack :gap=\${'sm'}>
            <Text :tone=\${'muted'}>Toasts, dialogs, and inline status.</Text>
            <Tag :text=\${'ux'} :type=\${'warning'} :size=\${'sm'} />
          </Stack>
        </Card>
      </div>
    </CarouselItem>
  </Carousel>
</view>`

export const quotes = `import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'
import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${true} :interval=\${4000} :arrow=\${'hover'} :indicatorPosition=\${'outside'} :height=\${'200px'}>
    <CarouselItem>
      <div style="display:grid;place-items:center;height:100%;padding:1.25rem;box-sizing:border-box;background:color-mix(in srgb, var(--j-mint) 45%, var(--j-surface))">
        <Stack :gap=\${'sm'} style="max-width:28rem;text-align:center">
          <Text :weight=\${'bold'}>“Tokens made our themes boring in the best way.”</Text>
          <Text :tone=\${'muted'} :size=\${'sm'}>— Ada, Design Systems</Text>
        </Stack>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div style="display:grid;place-items:center;height:100%;padding:1.25rem;box-sizing:border-box;background:var(--j-surface-2)">
        <Stack :gap=\${'sm'} style="max-width:28rem;text-align:center">
          <Text :weight=\${'bold'}>“Carousel swipe just worked on the tablet demos.”</Text>
          <Text :tone=\${'muted'} :size=\${'sm'}>— Grace, Product</Text>
        </Stack>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div style="display:grid;place-items:center;height:100%;padding:1.25rem;box-sizing:border-box;background:color-mix(in srgb, var(--j-leaf) 18%, var(--j-surface))">
        <Stack :gap=\${'sm'} style="max-width:28rem;text-align:center">
          <Text :weight=\${'bold'}>“We ship FAQ and feature strips with the same API.”</Text>
          <Text :tone=\${'muted'} :size=\${'sm'}>— Lin, Frontend</Text>
        </Stack>
      </div>
    </CarouselItem>
  </Carousel>
</view>`

export const minimal = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :arrow=\${'never'} :indicatorPosition=\${'none'} :height=\${'160px'}>
    <CarouselItem>${slide('Overview', 'var(--j-mint)')}</CarouselItem>
    <CarouselItem>${slide('Usage', 'var(--j-surface-2)')}</CarouselItem>
    <CarouselItem>${slide('Ship', 'var(--j-leaf)', '#ffffff')}</CarouselItem>
  </Carousel>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import Carousel from '@jacare/ui/Carousel'",
    "import CarouselItem from '@jacare/ui/CarouselItem'",
    '',
    'export <view>',
    '  <Carousel',
  ]
  lines.push(`    :autoplay=\${${!!state.autoplay}}`)
  if (state.autoplay) lines.push(`    :interval=\${${Number(state.interval) || 3000}}`)
  if (state.arrow && state.arrow !== 'hover') lines.push(`    :arrow=\${'${state.arrow}'}`)
  if (state.indicatorPosition && state.indicatorPosition !== 'inside') {
    lines.push(`    :indicatorPosition=\${'${state.indicatorPosition}'}`)
  }
  if (state.height && state.height !== '200px') lines.push(`    :height=\${'${state.height}'}`)
  lines.push(
    '  >',
    '    <CarouselItem>…</CarouselItem>',
    '    <CarouselItem>…</CarouselItem>',
    '    <CarouselItem>…</CarouselItem>',
    '  </Carousel>',
    '</view>',
  )
  return lines.join('\n')
}
