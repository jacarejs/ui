export const basic = `import Text from '@jacare/ui/Text'

export <view>
  <Text :tone=\${'muted'}>Readable body copy</Text>
</view>`

export const headings = `import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'sm'}>
    <Text :as=\${'h1'}>Heading one</Text>
    <Text :as=\${'h2'}>Heading two</Text>
    <Text :as=\${'h3'}>Heading three</Text>
  </Stack>
</view>`

export const sizes = `import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'sm'}>
    <Text :size=\${'sm'}>Small body</Text>
    <Text :size=\${'md'}>Medium body</Text>
    <Text :size=\${'lg'}>Large body</Text>
  </Stack>
</view>`

export const tones = `import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'sm'}>
    <Text :tone=\${'default'}>Default tone</Text>
    <Text :tone=\${'muted'}>Muted tone</Text>
    <Text :tone=\${'primary'}>Primary tone</Text>
  </Stack>
</view>`

export const weights = `import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'sm'}>
    <Text :weight=\${'regular'}>Regular weight</Text>
    <Text :weight=\${'bold'}>Bold weight</Text>
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  return [
    "import Text from '@jacare/ui/Text'",
    '',
    'export <view>',
    '  <Text',
    `    :as=\${'${state.as}'}`,
    `    :size=\${'${state.size}'}`,
    `    :tone=\${'${state.tone}'}`,
    `    :weight=\${'${state.weight}'}`,
    `  >${quote(state.content)}</Text>`,
    '</view>',
  ].join('\n')
}
