export const basic = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload bind-value=\${files} />
</view>`

export const single = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload
    :multiple=\${false}
    :drag=\${false}
    :accept=\${'.pdf'}
    :hint=\${'One PDF only'}
    bind-value=\${files}
  />
</view>`

export const documents = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload
    :multiple=\${true}
    :accept=\${'.pdf,.doc,.docx,.txt'}
    :hint=\${'Contracts and notes'}
    :limit=\${5}
    bind-value=\${files}
  />
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

export const limitExample = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const files = pulse([])
const status = pulse('Pick up to 2 images')

function onExceed(payload) {
  status.set('Limit exceeded: max ' + payload.limit + ' files')
}

function onChange(next) {
  status.set(next.length + ' file(s) ready')
}

export <view>
  <Stack :gap=\${'sm'}>
    <Upload
      :multiple=\${true}
      :accept=\${'image/*'}
      :limit=\${2}
      :hint=\${'Maximum 2 images'}
      bind-value=\${files}
      on-change=\${onChange}
      on-exceed=\${onExceed}
    />
    <Text :tone=\${'muted'}>\${() => status()}</Text>
  </Stack>
</view>`

export const events = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const files = pulse([])
const last = pulse('Waiting')

function onChange(next) {
  last.set('change: ' + next.length + ' file(s)')
}

function onRemove() {
  last.set('remove fired')
}

export <view>
  <Stack :gap=\${'sm'}>
    <Upload
      :multiple=\${true}
      :listType=\${'text'}
      bind-value=\${files}
      on-change=\${onChange}
      on-remove=\${onRemove}
    />
    <Text :tone=\${'muted'}>\${() => last()}</Text>
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload
    :disabled=\${true}
    :drag=\${true}
    :hint=\${'Uploads are locked for this draft'}
    bind-value=\${files}
  />
</view>`

export const slotExample = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Upload from '@jacare/ui/Upload'

const files = pulse([])

export <view>
  <Upload :multiple=\${true} :drag=\${false} bind-value=\${files}>
    <Button :variant=\${'secondary'}>Choose files</Button>
  </Upload>
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
