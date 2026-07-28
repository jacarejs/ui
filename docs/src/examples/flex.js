export const basic = `import Badge from '@jacare/ui/Badge'
import Flex from '@jacare/ui/Flex'

export <view>
  <Flex :gap=\${'md'} :align=\${'center'}>
    <Badge :text=\${'Design'} :tone=\${'success'} />
    <Badge :text=\${'Docs'} :tone=\${'info'} />
    <Badge :text=\${'Ship'} />
  </Flex>
</view>`

export const directions = `import Badge from '@jacare/ui/Badge'
import Flex from '@jacare/ui/Flex'

export <view>
  <Flex :direction=\${'row'} :gap=\${'sm'}>
    <Badge :text=\${'Row'} :tone=\${'success'} />
    <Badge :text=\${'A'} />
    <Badge :text=\${'B'} />
  </Flex>
</view>`

export const gaps = `import Badge from '@jacare/ui/Badge'
import Flex from '@jacare/ui/Flex'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'lg'}>
    <Flex :gap=\${'sm'}><Badge :text=\${'sm'} /><Badge :text=\${'gap'} /></Flex>
    <Flex :gap=\${'md'}><Badge :text=\${'md'} /><Badge :text=\${'gap'} /></Flex>
    <Flex :gap=\${'lg'}><Badge :text=\${'lg'} /><Badge :text=\${'gap'} /></Flex>
    <Flex :gap=\${'xl'}><Badge :text=\${'xl'} /><Badge :text=\${'gap'} /></Flex>
  </Stack>
</view>`

export const align = `import Avatar from '@jacare/ui/Avatar'
import Flex from '@jacare/ui/Flex'
import Text from '@jacare/ui/Text'

export <view>
  <Flex :align=\${'center'} :gap=\${'md'}>
    <Avatar :name=\${'Jacaré UI'} :size=\${'lg'} />
    <Flex :direction=\${'column'} :gap=\${'sm'}>
      <Text :weight=\${'bold'}>Centered on the cross axis</Text>
      <Text :tone=\${'muted'} :size=\${'sm'}>align="center"</Text>
    </Flex>
  </Flex>
</view>`

export const justify = `import Button from '@jacare/ui/Button'
import Flex from '@jacare/ui/Flex'

export <view>
  <Flex :justify=\${'between'} :align=\${'center'} :gap=\${'md'}>
    <Button :variant=\${'ghost'}>Cancel</Button>
    <Button>Continue</Button>
  </Flex>
</view>`

export const wrap = `import Badge from '@jacare/ui/Badge'
import Flex from '@jacare/ui/Flex'

export <view>
  <Flex :gap=\${'sm'} :wrap=\${true}>
    <Badge :text=\${'Design'} />
    <Badge :text=\${'Docs'} :tone=\${'info'} />
    <Badge :text=\${'Playground'} :tone=\${'success'} />
    <Badge :text=\${'Theme'} :tone=\${'warn'} />
    <Badge :text=\${'Tokens'} />
    <Badge :text=\${'Layouts'} :tone=\${'info'} />
  </Flex>
</view>`

export const inline = `import Badge from '@jacare/ui/Badge'
import Flex from '@jacare/ui/Flex'

export <view>
  <p>
    Status stays in the sentence
    <Flex :inline=\${true} :align=\${'center'} :gap=\${'sm'}>
      <Badge :text=\${'Live'} :tone=\${'success'} :dot=\${true} />
    </Flex>
    without breaking the line.
  </p>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import Badge from '@jacare/ui/Badge'",
    "import Flex from '@jacare/ui/Flex'",
    '',
    'export <view>',
    '  <Flex',
    `    :direction=\${'${state.direction}'}`,
    `    :gap=\${'${state.gap}'}`,
    `    :align=\${'${state.align}'}`,
    `    :justify=\${'${state.justify}'}`,
  ]
  if (state.wrap) lines.push('    :wrap=\${true}')
  if (state.inline) lines.push('    :inline=\${true}')
  lines.push(
    '  >',
    "    <Badge :text=\${'One'} :tone=\${'success'} />",
    "    <Badge :text=\${'Two'} :tone=\${'info'} />",
    "    <Badge :text=\${'Three'} />",
    '  </Flex>',
    '</view>',
  )
  return lines.join('\n')
}
