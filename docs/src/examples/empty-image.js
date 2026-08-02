export const basic = `import EmptyImage from '@jacare/ui/EmptyImage'

export <view>
  <EmptyImage
    :label=\${'Default scene'}
    :hint=\${'SVG data URL ready for Empty :image'}
  />
</view>`

export const types = `import EmptyImage from '@jacare/ui/EmptyImage'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <EmptyImage :label=\${'Default'} :type=\${'default'} :size=\${120} />
    <EmptyImage :label=\${'Search'} :type=\${'search'} :size=\${120} />
    <EmptyImage :label=\${'Inbox'} :type=\${'inbox'} :size=\${120} />
    <EmptyImage :label=\${'Error'} :type=\${'error'} :size=\${120} :color=\${'#c0392b'} />
    <EmptyImage :label=\${'Success'} :type=\${'success'} :size=\${120} :color=\${'#2f7d4a'} />
    <EmptyImage :label=\${'Box'} :type=\${'box'} :size=\${120} />
    <EmptyImage :label=\${'Folder'} :type=\${'folder'} :size=\${120} />
    <EmptyImage :label=\${'Cloud'} :type=\${'cloud'} :size=\${120} />
    <EmptyImage :label=\${'Files'} :type=\${'files'} :size=\${120} />
    <EmptyImage :label=\${'Users'} :type=\${'users'} :size=\${120} />
  </Stack>
</view>`

export const colors = `import EmptyImage from '@jacare/ui/EmptyImage'

export <view>
  <EmptyImage
    :label=\${'Brand tint'}
    :type=\${'cloud'}
    :color=\${'#1f6feb'}
    :background=\${'#eef5ff'}
    :hint=\${'color and background tint the generated SVG'}
  />
</view>`

export const downloadable = `import EmptyImage from '@jacare/ui/EmptyImage'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <EmptyImage
      :label=\${'SVG'}
      :type=\${'folder'}
      :downloadable=\${true}
      :downloadLabel=\${'Save SVG'}
    />
    <EmptyImage
      :label=\${'PNG'}
      :type=\${'box'}
      :downloadable=\${true}
      :downloadFormat=\${'png'}
      :downloadLabel=\${'Save PNG'}
    />
  </Stack>
</view>`

export const withEmpty = `import Empty from '@jacare/ui/Empty'
import EmptyImage from '@jacare/ui/EmptyImage'
import { pulse } from '@jacare/core'
import Stack from '@jacare/ui/Stack'

const image = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <EmptyImage
      :label=\${'Generator'}
      :type=\${'files'}
      :size=\${140}
      :color=\${'#235548'}
      on-ready=\${(url) => image.set(url)}
    />
    <Empty
      :title=\${'Nothing archived'}
      :description=\${'Feed Empty with the generated data URL.'}
      :image=\${image}
      :imageSize=\${96}
    />
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import EmptyImage from '@jacare/ui/EmptyImage'",
    '',
    'export <view>',
    '  <EmptyImage',
  ]
  if (state.type && state.type !== 'default') lines.push(`    :type=\${'${state.type}'}`)
  if (state.size && Number(state.size) !== 160) lines.push(`    :size=\${${Number(state.size) || 160}}`)
  if (state.color) lines.push(`    :color=\${'${quote(state.color)}'}`)
  if (state.background) lines.push(`    :background=\${'${quote(state.background)}'}`)
  if (state.halo === false) lines.push(`    :halo=\${false}`)
  if (state.downloadable) {
    lines.push(`    :downloadable=\${true}`)
    if (state.downloadFormat === 'png') lines.push(`    :downloadFormat=\${'png'}`)
  }
  lines.push(`    :label=\${'${quote(state.label || 'Preview')}'}`)
  lines.push('  />', '</view>')
  return lines.join('\n')
}
