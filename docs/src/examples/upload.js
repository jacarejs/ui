export const basic = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload bind-value=\${files} />
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
  if (state.drag) lines.push('    :drag=\${true}')
  if (state.listType === 'picture') lines.push("    :listType=\${'picture'}")
  if (state.limit) lines.push(`    :limit=\${${Number(state.limit)}}`)
  if (state.accept) lines.push(`    :accept=\${'${String(state.accept).replace(/'/g, "\\'")}'}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${files}', '  />', '</view>')
  return lines.join('\n')
}
