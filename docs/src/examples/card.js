export const basic = `import Card from '@jacare/ui/Card'
import Text from '@jacare/ui/Text'

export <view>
  <Card>
    <Text>Card body</Text>
  </Card>
</view>`

export const titled = `import Card from '@jacare/ui/Card'
import Text from '@jacare/ui/Text'

export <view>
  <Card :title=\${'Project'} :subtitle=\${'Jacaré UI kit'}>
    <Text :tone=\${'muted'}>Group related content with a clear header.</Text>
  </Card>
</view>`

export const paddings = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Card :title=\${'Small'} :padding=\${'sm'}>
      <Text :size=\${'sm'}>Compact padding</Text>
    </Card>
    <Card :title=\${'Medium'} :padding=\${'md'}>
      <Text :size=\${'sm'}>Default padding</Text>
    </Card>
    <Card :title=\${'Large'} :padding=\${'lg'}>
      <Text :size=\${'sm'}>Roomy padding</Text>
    </Card>
  </Stack>
</view>`

export const shadows = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Card :title=\${'Always'} :shadow=\${'always'}>
      <Text :tone=\${'muted'}>Default elevated surface</Text>
    </Card>
    <Card :title=\${'Hover'} :shadow=\${'hover'}>
      <Text :tone=\${'muted'}>Shadow appears on hover</Text>
    </Card>
    <Card :title=\${'Never'} :shadow=\${'never'}>
      <Text :tone=\${'muted'}>Flat bordered panel</Text>
    </Card>
  </Stack>
</view>`

export const tones = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Card :title=\${'Default'} :tone=\${'default'}>
      <Text :tone=\${'muted'}>Neutral surface</Text>
    </Card>
    <Card :title=\${'Primary'} :tone=\${'primary'}>
      <Text :tone=\${'muted'}>Brand accent</Text>
    </Card>
    <Card :title=\${'Success'} :tone=\${'success'}>
      <Text :tone=\${'muted'}>Healthy status</Text>
    </Card>
    <Card :title=\${'Warn'} :tone=\${'warn'}>
      <Text :tone=\${'muted'}>Needs attention</Text>
    </Card>
    <Card :title=\${'Danger'} :tone=\${'danger'}>
      <Text :tone=\${'muted'}>Blocking issue</Text>
    </Card>
    <Card :title=\${'Info'} :tone=\${'info'}>
      <Text :tone=\${'muted'}>Helpful note</Text>
    </Card>
  </Stack>
</view>`

export const composition = `import Button from '@jacare/ui/Button'
import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Card :title=\${'Deploy'} :subtitle=\${'Ready to publish'}>
    <Text :tone=\${'muted'}>Ship the package and refresh the docs site.</Text>
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button :size=\${'sm'}>Publish</Button>
      <Button :size=\${'sm'} :variant=\${'secondary'}>Cancel</Button>
    </Stack>
  </Card>
</view>`

export const mediaExample = `import Button from '@jacare/ui/Button'
import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Tag from '@jacare/ui/Tag'
import Text from '@jacare/ui/Text'

const cover = 'data:image/svg+xml,...'

export <view>
  <Card
    :title=\${'Coastal trail'}
    :subtitle=\${'Weekend guide'}
    :cover=\${cover}
    :coverAlt=\${'Misty coastal trail'}
    :shadow=\${'hover'}
  >
    <Text :tone=\${'muted'}>A soft morning walk along the cliffs with quiet overlooks.</Text>
    <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
      <Tag :type=\${'success'}>Outdoors</Tag>
      <Tag :type=\${'info'}>2h</Tag>
    </Stack>
    <Button :size=\${'sm'}>Open guide</Button>
  </Card>
</view>`

export const mediaGrid = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Tag from '@jacare/ui/Tag'
import Text from '@jacare/ui/Text'

const forest = 'data:image/svg+xml,...'
const lake = 'data:image/svg+xml,...'
const dusk = 'data:image/svg+xml,...'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Card :title=\${'Forest cabin'} :padding=\${'sm'} :shadow=\${'hover'} :cover=\${forest} :coverAlt=\${'Pine forest cabin'}>
      <Tag :type=\${'success'}>Available</Tag>
      <Text :tone=\${'muted'} :size=\${'sm'}>Quiet stay among the pines.</Text>
    </Card>
    <Card :title=\${'Lake house'} :padding=\${'sm'} :shadow=\${'hover'} :cover=\${lake} :coverAlt=\${'Calm lake house'}>
      <Tag :type=\${'warning'}>2 left</Tag>
      <Text :tone=\${'muted'} :size=\${'sm'}>Sunset decks over still water.</Text>
    </Card>
    <Card :title=\${'Dusk loft'} :padding=\${'sm'} :shadow=\${'hover'} :cover=\${dusk} :coverAlt=\${'Warm dusk loft'}>
      <Tag :type=\${'danger'}>Sold out</Tag>
      <Text :tone=\${'muted'} :size=\${'sm'}>Warm loft with city glow.</Text>
    </Card>
  </Stack>
</view>`

export const headerFooter = `import Avatar from '@jacare/ui/Avatar'
import Badge from '@jacare/ui/Badge'
import Button from '@jacare/ui/Button'
import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Card :shadow=\${'hover'}>
    <Stack :gap=\${'md'}>
      <Stack :direction=\${'row'} :gap=\${'sm'} :align=\${'center'} :justify=\${'between'}>
        <Stack :direction=\${'row'} :gap=\${'sm'} :align=\${'center'}>
          <Avatar :name=\${'Ana Costa'} :size=\${'sm'} />
          <Stack :gap=\${'sm'}>
            <Text>Ana Costa</Text>
            <Text :tone=\${'muted'} :size=\${'sm'}>Product design</Text>
          </Stack>
        </Stack>
        <Badge :text=\${'Online'} :tone=\${'success'} :soft=\${true} :dot=\${true} />
      </Stack>
      <Text :tone=\${'muted'}>Shared a new moodboard for the summer release.</Text>
      <Stack :direction=\${'row'} :gap=\${'sm'}>
        <Button :size=\${'sm'} :variant=\${'secondary'}>Dismiss</Button>
        <Button :size=\${'sm'}>Open</Button>
      </Stack>
    </Stack>
  </Card>
</view>`

export const statusCards = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Card :title=\${'Build passed'} :subtitle=\${'main · 2m ago'} :tone=\${'success'}>
      <Text :tone=\${'muted'}>All checks are green.</Text>
    </Card>
    <Card :title=\${'Review needed'} :subtitle=\${'PR #482'} :tone=\${'warn'}>
      <Text :tone=\${'muted'}>Two reviewers still pending.</Text>
    </Card>
    <Card :title=\${'Deploy failed'} :subtitle=\${'staging'} :tone=\${'danger'}>
      <Text :tone=\${'muted'}>Rollback is available.</Text>
    </Card>
  </Stack>
</view>`

export const bodyImage = `import Card from '@jacare/ui/Card'
import Image from '@jacare/ui/Image'
import Text from '@jacare/ui/Text'

const art = 'data:image/svg+xml,...'

export <view>
  <Card :title=\${'Inset media'} :subtitle=\${'Image inside the body'}>
    <Image :src=\${art} :alt=\${'Soft landscape artwork'} />
    <Text :tone=\${'muted'}>Keep the media padded when the card should feel like an article block.</Text>
  </Card>
</view>`

export const toneCovers = `import Card from '@jacare/ui/Card'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const green = 'data:image/svg+xml,...'
const amber = 'data:image/svg+xml,...'
const rose = 'data:image/svg+xml,...'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Card :title=\${'Harvest'} :tone=\${'success'} :cover=\${green} :coverAlt=\${'Green fields'} :shadow=\${'never'}>
      <Text :tone=\${'muted'}>Season looks healthy.</Text>
    </Card>
    <Card :title=\${'Watchlist'} :tone=\${'warn'} :cover=\${amber} :coverAlt=\${'Warm dusk'} :shadow=\${'never'}>
      <Text :tone=\${'muted'}>Two plots need water.</Text>
    </Card>
    <Card :title=\${'Alert'} :tone=\${'danger'} :cover=\${rose} :coverAlt=\${'Storm sky'} :shadow=\${'never'}>
      <Text :tone=\${'muted'}>Storm path nearby.</Text>
    </Card>
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Card from '@jacare/ui/Card'",
    "import Text from '@jacare/ui/Text'",
    '',
    'export <view>',
    '  <Card',
  ]
  if (state.title) lines.push(`    :title=\${'${quote(state.title)}'}`)
  if (state.subtitle) lines.push(`    :subtitle=\${'${quote(state.subtitle)}'}`)
  if (state.padding && state.padding !== 'md') lines.push(`    :padding=\${'${state.padding}'}`)
  if (state.shadow && state.shadow !== 'always') lines.push(`    :shadow=\${'${state.shadow}'}`)
  if (state.tone && state.tone !== 'default') lines.push(`    :tone=\${'${state.tone}'}`)
  if (state.cover) {
    lines.push("    :cover=\${cover}")
    lines.push(`    :coverAlt=\${'${quote(state.coverAlt || 'Card cover')}'}`)
  }
  lines.push(
    '  >',
    `    <Text>${quote(state.body)}</Text>`,
    '  </Card>',
    '</view>',
  )
  if (state.cover) {
    lines.splice(3, 0, '', "const cover = 'data:image/svg+xml,...'", '')
  }
  return lines.join('\n')
}
