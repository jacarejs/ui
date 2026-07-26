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
  lines.push(
    `    :padding=\${'${state.padding}'}`,
    '  >',
    `    <Text>${quote(state.body)}</Text>`,
    '  </Card>',
    '</view>',
  )
  return lines.join('\n')
}
