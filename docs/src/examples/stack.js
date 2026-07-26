export const basic = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'md'}>
    <Button>One</Button>
    <Button :variant=\${'secondary'}>Two</Button>
  </Stack>
</view>`

export const directions = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'lg'}>
    <Stack :direction=\${'column'} :gap=\${'sm'}>
      <Badge :text=\${'Column'} :tone=\${'info'} />
      <Badge :text=\${'A'} />
      <Badge :text=\${'B'} />
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Badge :text=\${'Row'} :tone=\${'success'} />
      <Badge :text=\${'A'} />
      <Badge :text=\${'B'} />
    </Stack>
  </Stack>
</view>`

export const gaps = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'xl'}>
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button :size=\${'sm'}>sm</Button>
      <Button :size=\${'sm'}>gap</Button>
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'md'}>
      <Button :size=\${'sm'}>md</Button>
      <Button :size=\${'sm'}>gap</Button>
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'lg'}>
      <Button :size=\${'sm'}>lg</Button>
      <Button :size=\${'sm'}>gap</Button>
    </Stack>
  </Stack>
</view>`

export const align = `import Avatar from '@jacare/ui/Avatar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Avatar :name=\${'Jacaré UI'} :size=\${'lg'} />
    <Stack :gap=\${'sm'}>
      <Text :weight=\${'bold'}>Centered row</Text>
      <Text :tone=\${'muted'} :size=\${'sm'}>align center</Text>
    </Stack>
  </Stack>
</view>`

export const wrap = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <Badge :text=\${'Design'} />
    <Badge :text=\${'Docs'} :tone=\${'info'} />
    <Badge :text=\${'Playground'} :tone=\${'success'} />
    <Badge :text=\${'Theme'} :tone=\${'warn'} />
    <Badge :text=\${'Tokens'} :tone=\${'neutral'} />
  </Stack>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import Badge from '@jacare/ui/Badge'",
    "import Stack from '@jacare/ui/Stack'",
    '',
    'export <view>',
    '  <Stack',
    `    :direction=\${'${state.direction}'}`,
    `    :gap=\${'${state.gap}'}`,
    `    :align=\${'${state.align}'}`,
    `    :justify=\${'${state.justify}'}`,
  ]
  if (state.wrap) lines.push('    :wrap=\${true}')
  lines.push(
    '  >',
    "    <Badge :text=\${'One'} :tone=\${'success'} />",
    "    <Badge :text=\${'Two'} :tone=\${'info'} />",
    "    <Badge :text=\${'Three'} />",
    '  </Stack>',
    '</view>',
  )
  return lines.join('\n')
}
