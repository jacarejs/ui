export const basic = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload bind-value=\${files} />
</view>`

export const dragExample = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload
    :drag=\${true}
    :multiple=\${true}
    :accept=\${'image/*'}
    :hint=\${'PNG, JPG, or WebP'}
    bind-value=\${files}
  />
</view>`

export const pictureExample = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload
    :listType=\${'picture'}
    :multiple=\${true}
    :accept=\${'image/*'}
    :limit=\${4}
    bind-value=\${files}
  />
</view>`

export const pictureCardExample = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload
    :listType=\${'picture-card'}
    :multiple=\${true}
    :accept=\${'image/*'}
    :limit=\${6}
    bind-value=\${files}
  />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Upload from '@jacare/ui/Upload'",
    '',
    'const files = pulse([])',
    '',
    'export <view>',
    '  <Upload',
  ]
  if (state.multiple) lines.push('    :multiple=\${true}')
  if (state.drag !== false) lines.push('    :drag=\${true}')
  if (state.listType && state.listType !== 'text') lines.push(`    :listType=\${'${state.listType}'}`)
  if (state.limit) lines.push(`    :limit=\${${Number(state.limit)}}`)
  if (state.accept) lines.push(`    :accept=\${'${String(state.accept).replace(/'/g, "\\'")}'}`)
  if (state.hint) lines.push(`    :hint=\${'${String(state.hint).replace(/'/g, "\\'")}'}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${files}', '  />', '</view>')
  return lines.join('\n')
}
