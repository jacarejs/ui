export const basic = `import Tag from '@jacare/ui/Tag'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <Tag>Default</Tag>
    <Tag :type=\${'primary'}>Primary</Tag>
    <Tag :type=\${'success'}>Success</Tag>
  </Stack>
</view>`

export const types = `import Tag from '@jacare/ui/Tag'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <Tag :type=\${'default'}>Default</Tag>
    <Tag :type=\${'primary'}>Primary</Tag>
    <Tag :type=\${'success'}>Success</Tag>
    <Tag :type=\${'info'}>Info</Tag>
    <Tag :type=\${'warning'}>Warning</Tag>
    <Tag :type=\${'danger'}>Danger</Tag>
  </Stack>
</view>`

export const appearances = `import Tag from '@jacare/ui/Tag'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'md'}>
    <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
      <Tag :type=\${'primary'} :appearance=\${'light'}>Light</Tag>
      <Tag :type=\${'success'} :appearance=\${'light'}>Light</Tag>
      <Tag :type=\${'danger'} :appearance=\${'light'}>Light</Tag>
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
      <Tag :type=\${'primary'} :appearance=\${'dark'}>Dark</Tag>
      <Tag :type=\${'success'} :appearance=\${'dark'}>Dark</Tag>
      <Tag :type=\${'danger'} :appearance=\${'dark'}>Dark</Tag>
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
      <Tag :type=\${'primary'} :appearance=\${'plain'}>Plain</Tag>
      <Tag :type=\${'success'} :appearance=\${'plain'}>Plain</Tag>
      <Tag :type=\${'danger'} :appearance=\${'plain'}>Plain</Tag>
    </Stack>
  </Stack>
</view>`

export const sizes = `import Tag from '@jacare/ui/Tag'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true} :align=\${'center'}>
    <Tag :type=\${'primary'} :size=\${'sm'}>Small</Tag>
    <Tag :type=\${'primary'} :size=\${'md'}>Medium</Tag>
    <Tag :type=\${'primary'} :size=\${'lg'}>Large</Tag>
  </Stack>
</view>`

export const round = `import Tag from '@jacare/ui/Tag'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <Tag :type=\${'info'} :round=\${true}>Rounded</Tag>
    <Tag :type=\${'warning'} :round=\${true} :appearance=\${'dark'}>Pill</Tag>
    <Tag :type=\${'success'} :round=\${true} :appearance=\${'plain'}>Outline</Tag>
  </Stack>
</view>`

export const closable = `import { pulse } from '@jacare/core'
import Tag from '@jacare/ui/Tag'
import Stack from '@jacare/ui/Stack'

const open = pulse(true)

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    #if open()
      <Tag :type=\${'primary'} :closable=\${true} on-close=\${() => open.set(false)}>
        Removable
      </Tag>
    #end
    <Tag :type=\${'danger'} :closable=\${true} :appearance=\${'dark'}>
      Closable
    </Tag>
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Tag from '@jacare/ui/Tag'",
    '',
    'export <view>',
    '  <Tag',
  ]
  if (state.type && state.type !== 'default') lines.push(`    :type=\${'${quote(state.type)}'}`)
  if (state.appearance && state.appearance !== 'light') {
    lines.push(`    :appearance=\${'${quote(state.appearance)}'}`)
  }
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${quote(state.size)}'}`)
  if (state.round) lines.push('    :round=\${true}')
  if (state.closable) lines.push('    :closable=\${true}')
  lines.push(`  >${quote(state.text || 'Tag')}</Tag>`, '</view>')
  return lines.join('\n')
}
