export const basic = `import Badge from '@jacare/ui/Badge'

export <view>
  <Badge :text=\${'New'} :tone=\${'success'} />
  <Badge :text=\${'Beta'} :tone=\${'info'} :soft=\${true} />
</view>`

export const variants = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Badge :text=\${'Solid'} :tone=\${'success'} :variant=\${'solid'} />
    <Badge :text=\${'Soft'} :tone=\${'success'} :variant=\${'soft'} />
    <Badge :text=\${'Outline'} :tone=\${'success'} :variant=\${'outline'} />
  </Stack>
</view>`

export const tones = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Badge :text=\${'Default'} />
    <Badge :text=\${'Success'} :tone=\${'success'} />
    <Badge :text=\${'Warning'} :tone=\${'warn'} />
    <Badge :text=\${'Danger'} :tone=\${'danger'} />
    <Badge :text=\${'Info'} :tone=\${'info'} />
    <Badge :text=\${'Neutral'} :tone=\${'neutral'} />
    <Badge :text=\${'Custom'} :color=\${'#7c4dff'} />
  </Stack>
</view>`

export const sizes = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Badge :text=\${'Small'} :tone=\${'info'} :size=\${'sm'} />
    <Badge :text=\${'Medium'} :tone=\${'info'} :size=\${'md'} />
    <Badge :text=\${'Large'} :tone=\${'info'} :size=\${'lg'} />
  </Stack>
</view>`

export const shapes = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'}>
    <Badge :text=\${'Pill'} :tone=\${'success'} :shape=\${'pill'} />
    <Badge :text=\${'Rounded'} :tone=\${'success'} :shape=\${'rounded'} />
  </Stack>
</view>`

export const dot = `import Badge from '@jacare/ui/Badge'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Badge :text=\${'Online'} :tone=\${'success'} :dot=\${true} :variant=\${'soft'} />
    <Badge :text=\${'Away'} :tone=\${'warn'} :dot=\${true} :variant=\${'soft'} />
    <Badge :text=\${'Offline'} :tone=\${'neutral'} :dot=\${true} :variant=\${'soft'} />
  </Stack>
</view>`

export const dismissible = `import { pulse } from '@jacare/core'
import Badge from '@jacare/ui/Badge'

const open = pulse(true)

export <view>
  <Badge
    :text=\${'Dismissible'}
    :tone=\${'info'}
    :dismissible=\${true}
    bind-open=\${open}
    on-dismiss=\${() => open.set(false)}
  />
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = []

  if (state.dismissible) {
    lines.push("import { pulse } from '@jacare/core'")
  }
  lines.push("import Badge from '@jacare/ui/Badge'", '')
  if (state.dismissible) {
    lines.push('const open = pulse(true)', '')
  }
  lines.push(
    'export <view>',
    '  <Badge',
    `    :text=\${'${quote(state.text)}'}`,
    `    :tone=\${'${state.tone}'}`,
    `    :variant=\${'${state.variant}'}`,
    `    :size=\${'${state.size}'}`,
    `    :shape=\${'${state.shape}'}`,
  )

  if (state.color) lines.push(`    :color=\${'${quote(state.color)}'}`)
  if (state.dot) lines.push('    :dot=\${true}')
  if (state.dismissible) {
    lines.push('    :dismissible=\${true}')
    lines.push('    bind-open=\${open}')
  }
  lines.push('  />', '</view>')
  return lines.join('\n')
}
