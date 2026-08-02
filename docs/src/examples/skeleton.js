export const basic = `import Skeleton from '@jacare/ui/Skeleton'

export <view>
  <Skeleton :rows=\${3} />
</view>`

export const animated = `import Skeleton from '@jacare/ui/Skeleton'

export <view>
  <Skeleton :rows=\${4} :animated=\${true} />
</view>`

export const count = `import Skeleton from '@jacare/ui/Skeleton'

export <view>
  <Skeleton :rows=\${2} :count=\${3} :animated=\${true} />
</view>`

export const sizes = `import Skeleton from '@jacare/ui/Skeleton'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'lg'}>
    <Skeleton :rows=\${3} :size=\${'sm'} :animated=\${true} />
    <Skeleton :rows=\${3} :size=\${'md'} :animated=\${true} />
    <Skeleton :rows=\${3} :size=\${'lg'} :animated=\${true} />
  </Stack>
</view>`

export const avatar = `import Skeleton from '@jacare/ui/Skeleton'

export <view>
  <Skeleton :avatar=\${true} :rows=\${2} :count=\${3} :animated=\${true} />
</view>`

export const loaded = `import Skeleton from '@jacare/ui/Skeleton'

export <view>
  <Skeleton :loading=\${false}>
    <article>
      <h3>Release ready</h3>
      <p>The loaded content replaces the placeholder.</p>
    </article>
  </Skeleton>
</view>`

export const variants = `import SkeletonItem from '@jacare/ui/SkeletonItem'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'md'}>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>text</Text>
      <SkeletonItem :variant=\${'text'} :animated=\${true} />
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'md'} :align=\${'center'} :wrap=\${true}>
      <Stack :gap=\${'sm'} :align=\${'center'}>
        <Text :tone=\${'muted'} :size=\${'sm'}>circle</Text>
        <SkeletonItem :variant=\${'circle'} :animated=\${true} />
      </Stack>
      <Stack :gap=\${'sm'}>
        <Text :tone=\${'muted'} :size=\${'sm'}>button</Text>
        <SkeletonItem :variant=\${'button'} :animated=\${true} />
      </Stack>
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>rect</Text>
      <SkeletonItem :variant=\${'rect'} :animated=\${true} />
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>image</Text>
      <SkeletonItem :variant=\${'image'} :animated=\${true} />
    </Stack>
  </Stack>
</view>`

export const custom = `import SkeletonItem from '@jacare/ui/SkeletonItem'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :align=\${'center'}>
    <SkeletonItem :variant=\${'circle'} :animated=\${true} />
    <Stack :gap=\${'sm'}>
      <SkeletonItem :variant=\${'text'} :animated=\${true} />
      <SkeletonItem :variant=\${'text'} :width=\${'70%'} :animated=\${true} />
    </Stack>
  </Stack>
</view>`

export const cardMedia = `import Card from '@jacare/ui/Card'
import SkeletonItem from '@jacare/ui/SkeletonItem'
import Stack from '@jacare/ui/Stack'

export <view>
  <Card :shadow=\${'hover'} :padding=\${'sm'}>
    <Stack :gap=\${'sm'}>
      <SkeletonItem :variant=\${'image'} :animated=\${true} />
      <SkeletonItem :variant=\${'text'} :animated=\${true} />
      <SkeletonItem :variant=\${'text'} :width=\${'72%'} :animated=\${true} />
      <SkeletonItem :variant=\${'button'} :size=\${'sm'} :animated=\${true} />
    </Stack>
  </Card>
</view>`

export const profileCard = `import Card from '@jacare/ui/Card'
import SkeletonItem from '@jacare/ui/SkeletonItem'
import Stack from '@jacare/ui/Stack'

export <view>
  <Card :title=\${'Member'} :shadow=\${'hover'}>
    <Stack :direction=\${'row'} :gap=\${'md'} :align=\${'center'}>
      <SkeletonItem :variant=\${'circle'} :size=\${'lg'} :animated=\${true} />
      <Stack :gap=\${'sm'}>
        <SkeletonItem :variant=\${'text'} :size=\${'lg'} :width=\${'11rem'} :animated=\${true} />
        <SkeletonItem :variant=\${'text'} :width=\${'8rem'} :animated=\${true} />
      </Stack>
    </Stack>
  </Card>
</view>`

export const dashboard = `import Skeleton from '@jacare/ui/Skeleton'
import SkeletonItem from '@jacare/ui/SkeletonItem'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'md'}>
    <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
      <SkeletonItem :variant=\${'rect'} :size=\${'sm'} :width=\${'8rem'} :animated=\${true} />
      <SkeletonItem :variant=\${'rect'} :size=\${'sm'} :width=\${'8rem'} :animated=\${true} />
      <SkeletonItem :variant=\${'rect'} :size=\${'sm'} :width=\${'8rem'} :animated=\${true} />
    </Stack>
    <SkeletonItem :variant=\${'image'} :size=\${'lg'} :animated=\${true} />
    <Skeleton :rows=\${3} :animated=\${true} />
  </Stack>
</view>`

export const itemSizes = `import SkeletonItem from '@jacare/ui/SkeletonItem'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :align=\${'end'} :wrap=\${true}>
    <SkeletonItem :variant=\${'circle'} :size=\${'sm'} :animated=\${true} />
    <SkeletonItem :variant=\${'circle'} :size=\${'md'} :animated=\${true} />
    <SkeletonItem :variant=\${'circle'} :size=\${'lg'} :animated=\${true} />
    <SkeletonItem :variant=\${'button'} :size=\${'sm'} :animated=\${true} />
    <SkeletonItem :variant=\${'button'} :size=\${'md'} :animated=\${true} />
    <SkeletonItem :variant=\${'button'} :size=\${'lg'} :animated=\${true} />
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Skeleton from '@jacare/ui/Skeleton'",
    '',
    'export <view>',
    '  <Skeleton',
    `    :rows=\${${Number(state.rows) || 3}}`,
  ]
  if (Number(state.count) > 1) lines.push(`    :count=\${${Number(state.count) || 1}}`)
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${state.size}'}`)
  if (state.avatar) lines.push('    :avatar=\${true}')
  if (state.animated) lines.push('    :animated=\${true}')
  if (state.loading === false) {
    lines.push(
      '    :loading=\${false}',
      '  >',
      '    <article>Loaded content</article>',
      '  </Skeleton>',
    )
  } else {
    lines.push('  />')
  }
  lines.push('</view>')
  return lines.join('\n')
}
