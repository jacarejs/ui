export const basic = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'

const value = pulse('')
const bigOptions = Array.from({ length: 200 }, (_, i) => ({
  value: \`option-\${i + 1}\`,
  label: \`Option \${i + 1}\`,
}))

export <view>
  <SelectV2
    :label=\${'Large list'}
    :options=\${bigOptions}
    :searchable=\${true}
    bind-value=\${value}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import SelectV2 from '@jacare/ui/SelectV2'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    'const bigOptions = Array.from({ length: 200 }, (_, i) => ({',
    "  value: `option-${i + 1}`,",
    "  label: `Option ${i + 1}`,",
    '}))',
    '',
    'export <view>',
    '  <SelectV2',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('    :options=\${bigOptions}')
  if (state.searchable === false) lines.push('    :searchable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
