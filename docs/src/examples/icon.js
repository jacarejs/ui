export const basic = `import Icon from '@jacare/ui/Icon'

export <view>
  <Icon :name=\${'check'} :label=\${'Done'} />
</view>`

export const sizes = `import Icon from '@jacare/ui/Icon'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :align=\${'center'}>
    <Icon :name=\${'search'} :size=\${'sm'} :label=\${'Search small'} />
    <Icon :name=\${'search'} :size=\${'md'} :label=\${'Search'} />
    <Icon :name=\${'search'} :size=\${'lg'} :label=\${'Search large'} />
  </Stack>
</view>`

export const tones = `import Icon from '@jacare/ui/Icon'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :align=\${'center'}>
    <Icon :name=\${'info'} :tone=\${'info'} :label=\${'Info'} />
    <Icon :name=\${'check'} :tone=\${'success'} :label=\${'Success'} />
    <Icon :name=\${'alert'} :tone=\${'warn'} :label=\${'Warn'} />
    <Icon :name=\${'close'} :tone=\${'danger'} :label=\${'Danger'} />
    <Icon :name=\${'user'} :tone=\${'muted'} :label=\${'User'} />
  </Stack>
</view>`

export const gallery = `import Icon from '@jacare/ui/Icon'

export <view>
  <div class="docs-icon-gallery">
    <Icon :name=\${'check'} :label=\${'check'} />
    <Icon :name=\${'search'} :label=\${'search'} />
    <Icon :name=\${'calendar'} :label=\${'calendar'} />
    <Icon :name=\${'menu'} :label=\${'menu'} />
  </div>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Icon from '@jacare/ui/Icon'",
    '',
    'export <view>',
    '  <Icon',
    `    :name=\${'${quote(state.name)}'}`,
  ]
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${quote(state.size)}'}`)
  if (state.tone) lines.push(`    :tone=\${'${quote(state.tone)}'}`)
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('  />', '</view>')
  return lines.join('\n')
}
