export const basic = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Confirm from '@jacare/ui/Confirm'

const open = pulse(false)

export <view>
  <Button :variant=\${'danger'} on-press=\${() => open.set(true)}>Delete</Button>
  <Confirm
    bind-open=\${open}
    :title=\${'Delete item'}
    :message=\${'This cannot be undone.'}
    :danger=\${true}
    on-confirm=\${() => open.set(false)}
  />
</view>`

export const neutral = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Confirm from '@jacare/ui/Confirm'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Leave page</Button>
  <Confirm
    bind-open=\${open}
    :title=\${'Leave without saving?'}
    :message=\${'Unsaved changes will be lost.'}
    on-confirm=\${() => open.set(false)}
  />
</view>`

export const busy = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Confirm from '@jacare/ui/Confirm'

const open = pulse(false)
const busy = pulse(false)

function handleConfirm() {
  busy.set(true)
  setTimeout(() => {
    busy.set(false)
    open.set(false)
  }, 1200)
}

export <view>
  <Button :variant=\${'danger'} on-press=\${() => open.set(true)}>Delete</Button>
  <Confirm
    bind-open=\${open}
    :title=\${'Delete item'}
    :message=\${'Working…'}
    :danger=\${true}
    :busy=\${busy}
    on-confirm=\${handleConfirm}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Confirm from '@jacare/ui/Confirm'",
    '',
    `const open = pulse(${state.open ? 'true' : 'false'})`,
    '',
    'export <view>',
    '  <Confirm',
    '    bind-open=\${open}',
    `    :title=\${'${quote(state.title)}'}`,
    `    :message=\${'${quote(state.message)}'}`,
    `    :confirmLabel=\${'${quote(state.confirmLabel)}'}`,
    `    :cancelLabel=\${'${quote(state.cancelLabel)}'}`,
  ]
  if (state.danger) lines.push('    :danger=\${true}')
  if (state.busy) lines.push('    :busy=\${true}')
  lines.push('  />', '</view>')
  return lines.join('\n')
}
