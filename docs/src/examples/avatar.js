export const basic = `import Avatar from '@jacare/ui/Avatar'

export <view>
  <Avatar :name=\${'Jacaré UI'} />
</view>`

export const sizes = `import Avatar from '@jacare/ui/Avatar'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Avatar :name=\${'Extra Small'} :size=\${'xs'} />
    <Avatar :name=\${'Small Avatar'} :size=\${'sm'} />
    <Avatar :name=\${'Medium Avatar'} :size=\${'md'} />
    <Avatar :name=\${'Large Avatar'} :size=\${'lg'} />
    <Avatar :name=\${'Extra Large'} :size=\${'xl'} />
  </Stack>
</view>`

export const shapes = `import Avatar from '@jacare/ui/Avatar'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'}>
    <Avatar :name=\${'Circle'} :shape=\${'circle'} :size=\${'lg'} />
    <Avatar :name=\${'Rounded'} :shape=\${'rounded'} :size=\${'lg'} />
    <Avatar :name=\${'Square'} :shape=\${'square'} :size=\${'lg'} />
  </Stack>
</view>`

export const tones = `import Avatar from '@jacare/ui/Avatar'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :wrap=\${true} :gap=\${'md'}>
    <Avatar :name=\${'Primary'} :tone=\${'primary'} />
    <Avatar :name=\${'Success'} :tone=\${'success'} />
    <Avatar :name=\${'Warning'} :tone=\${'warn'} />
    <Avatar :name=\${'Danger'} :tone=\${'danger'} />
    <Avatar :name=\${'Information'} :tone=\${'info'} />
    <Avatar :name=\${'Neutral'} :tone=\${'neutral'} />
    <Avatar :name=\${'Custom'} :color=\${'#7c4dff'} />
  </Stack>
</view>`

export const contentTypes = `import Avatar from '@jacare/ui/Avatar'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'}>
    <Avatar :name=\${'Jacaré UI'} :size=\${'lg'} />
    <Avatar :name=\${'Single'} :size=\${'lg'} />
    <Avatar :size=\${'lg'} />
    <Avatar
      :name=\${'Jacaré logo'}
      :src=\${'/jacare-logo.png'}
      :alt=\${'Jacaré logo'}
      :size=\${'lg'}
    />
  </Stack>
</view>`

export const statuses = `import Avatar from '@jacare/ui/Avatar'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'}>
    <Avatar :name=\${'Online User'} :status=\${'online'} :size=\${'lg'} />
    <Avatar :name=\${'Away User'} :status=\${'away'} :size=\${'lg'} />
    <Avatar :name=\${'Busy User'} :status=\${'busy'} :size=\${'lg'} />
    <Avatar :name=\${'Offline User'} :status=\${'offline'} :size=\${'lg'} />
  </Stack>
</view>`

export const bordered = `import Avatar from '@jacare/ui/Avatar'

export <view>
  <Avatar
    :name=\${'Featured User'}
    :tone=\${'info'}
    :bordered=\${true}
    :size=\${'lg'}
  />
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Avatar from '@jacare/ui/Avatar'",
    '',
    'export <view>',
    '  <Avatar',
    `    :name=\${'${quote(state.name)}'}`,
    `    :size=\${'${state.size}'}`,
    `    :shape=\${'${state.shape}'}`,
    `    :tone=\${'${state.tone}'}`,
  ]

  if (state.src) lines.push(`    :src=\${'${quote(state.src)}'}`)
  if (state.color) lines.push(`    :color=\${'${quote(state.color)}'}`)
  if (state.status) lines.push(`    :status=\${'${state.status}'}`)
  if (state.bordered) lines.push('    :bordered=\${true}')
  lines.push('  />')
  lines.push('</view>')
  return lines.join('\n')
}
