export const basic = `import Badge from '@jacare/ui/Badge'
import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'3'} :gap=\${'md'}>
    <Badge :text=\${'1'} :tone=\${'success'} />
    <Badge :text=\${'2'} :tone=\${'info'} />
    <Badge :text=\${'3'} />
  </Grid>
</view>`

export const columns = `import Badge from '@jacare/ui/Badge'
import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'4'} :gap=\${'sm'}>
    <Badge :text=\${'A'} />
    <Badge :text=\${'B'} :tone=\${'info'} />
    <Badge :text=\${'C'} :tone=\${'success'} />
    <Badge :text=\${'D'} />
  </Grid>
</view>`

export const gaps = `import Badge from '@jacare/ui/Badge'
import Grid from '@jacare/ui/Grid'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'lg'}>
    <Text :size=\${'sm'} :tone=\${'muted'}>gap sm</Text>
    <Grid :columns=\${'3'} :gap=\${'sm'}>
      <Badge :text=\${'1'} />
      <Badge :text=\${'2'} />
      <Badge :text=\${'3'} />
    </Grid>
    <Text :size=\${'sm'} :tone=\${'muted'}>gap lg</Text>
    <Grid :columns=\${'3'} :gap=\${'lg'}>
      <Badge :text=\${'1'} />
      <Badge :text=\${'2'} />
      <Badge :text=\${'3'} />
    </Grid>
  </Stack>
</view>`

export const align = `import Badge from '@jacare/ui/Badge'
import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'3'} :gap=\${'md'} :align=\${'center'}>
    <Badge :text=\${'Tall'} :tone=\${'info'} />
    <Badge :text=\${'Mid'} />
    <Badge :text=\${'Short'} :tone=\${'success'} />
  </Grid>
</view>`

export const auto = `import Card from '@jacare/ui/Card'
import Grid from '@jacare/ui/Grid'
import Text from '@jacare/ui/Text'

export <view>
  <Grid :columns=\${'auto'} :gap=\${'md'}>
    <Card :title=\${'Tokens'} :subtitle=\${'Foundations'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Brand and semantic colors</Text>
    </Card>
    <Card :title=\${'Flex'} :subtitle=\${'Layout'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Axis positioning</Text>
    </Card>
    <Card :title=\${'Grid'} :subtitle=\${'Layout'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Track positioning</Text>
    </Card>
  </Grid>
</view>`

export const dense = `import Badge from '@jacare/ui/Badge'
import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'4'} :gap=\${'sm'} :dense=\${true}>
    <Badge :text=\${'Wide'} :tone=\${'success'} />
    <Badge :text=\${'2'} />
    <Badge :text=\${'3'} :tone=\${'info'} />
    <Badge :text=\${'4'} />
    <Badge :text=\${'5'} />
  </Grid>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import Badge from '@jacare/ui/Badge'",
    "import Grid from '@jacare/ui/Grid'",
    '',
    'export <view>',
    '  <Grid',
    `    :columns=\${'${state.columns}'}`,
    `    :gap=\${'${state.gap}'}`,
    `    :align=\${'${state.align}'}`,
    `    :justify=\${'${state.justify}'}`,
  ]
  if (state.dense) lines.push('    :dense=\${true}')
  lines.push(
    '  >',
    "    <Badge :text=\${'A'} :tone=\${'success'} />",
    "    <Badge :text=\${'B'} :tone=\${'info'} />",
    "    <Badge :text=\${'C'} />",
    "    <Badge :text=\${'D'} :tone=\${'warn'} />",
    '  </Grid>',
    '</view>',
  )
  return lines.join('\n')
}
