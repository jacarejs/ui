export const basic = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Dialog from '@jacare/ui/Dialog'
import Text from '@jacare/ui/Text'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open dialog</Button>
  <Dialog bind-open=\${open} :title=\${'Project details'}>
    <Text>Use Dialog for general content. Confirm stays for destructive choices.</Text>
    <div class="jui-dialog__actions">
      <Button :variant=\${'secondary'} on-press=\${() => open.set(false)}>Close</Button>
      <Button :variant=\${'primary'} on-press=\${() => open.set(false)}>Save</Button>
    </div>
  </Dialog>
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Dialog from '@jacare/ui/Dialog'
import Stack from '@jacare/ui/Stack'

const open = pulse(false)
const size = pulse('md')

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <Button :size=\${'sm'} on-press=\${() => { size.set('sm'); open.set(true) }}>Small</Button>
    <Button :size=\${'sm'} on-press=\${() => { size.set('md'); open.set(true) }}>Medium</Button>
    <Button :size=\${'sm'} on-press=\${() => { size.set('lg'); open.set(true) }}>Large</Button>
  </Stack>
  <Dialog bind-open=\${open} :title=\${'Sized dialog'} :size=\${size}>
    <p>Dialog width follows the size prop.</p>
  </Dialog>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  return [
    "import { pulse } from '@jacare/core'",
    "import Dialog from '@jacare/ui/Dialog'",
    '',
    `const open = pulse(${state.open ? 'true' : 'false'})`,
    '',
    'export <view>',
    '  <Dialog',
    '    bind-open=\${open}',
    `    :title=\${'${quote(state.title)}'}`,
    state.size && state.size !== 'md' ? `    :size=\${'${quote(state.size)}'}` : '',
    '  >',
    '    <p>Dialog body content</p>',
    '  </Dialog>',
    '</view>',
  ].filter(Boolean).join('\n')
}
