export const basic = `import Alert from '@jacare/ui/Alert'

export <view>
  <Alert :tone=\${'info'} :title=\${'Heads up'}>
    Something useful happened.
  </Alert>
</view>`

export const tones = `import Alert from '@jacare/ui/Alert'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'md'}>
    <Alert :tone=\${'info'} :title=\${'Info'}>Neutral status update.</Alert>
    <Alert :tone=\${'success'} :title=\${'Success'}>Saved successfully.</Alert>
    <Alert :tone=\${'warn'} :title=\${'Warning'}>Check this before continuing.</Alert>
    <Alert :tone=\${'danger'} :title=\${'Danger'}>Something needs attention now.</Alert>
  </Stack>
</view>`

export const titleOnly = `import Alert from '@jacare/ui/Alert'

export <view>
  <Alert :tone=\${'success'} :title=\${'Profile updated'}></Alert>
</view>`

export const bodyOnly = `import Alert from '@jacare/ui/Alert'

export <view>
  <Alert :tone=\${'info'}>
    Inline tip without a title — good for short helpers.
  </Alert>
</view>`

export const compact = `import Alert from '@jacare/ui/Alert'

export <view>
  <Alert :tone=\${'warn'} :compact=\${true} :title=\${'Compact'}>
    Denser padding for tight layouts and toolbars.
  </Alert>
</view>`

export const dismissible = `import Alert from '@jacare/ui/Alert'
import { pulse } from '@jacare/core'

const open = pulse(true)

export <view>
  <Alert
    :tone=\${'info'}
    :title=\${'Dismissible'}
    :dismissible=\${true}
    bind-open=\${open}
  >
    Click the × or listen to on-dismiss.
  </Alert>
</view>`

export const timer = `import Alert from '@jacare/ui/Alert'
import Button from '@jacare/ui/Button'
import { pulse } from '@jacare/core'

const open = pulse(true)

export <view>
  <Alert
    :tone=\${'success'}
    :title=\${'Auto dismiss'}
    :dismissible=\${true}
    :duration=\${4000}
    bind-open=\${open}
    on-dismiss=\${() => open.set(false)}
  >
    This alert hides after 4 seconds.
  </Alert>

  <Button on-press=\${() => open.set(true)}>Show again</Button>
</view>`

export const roles = `import Alert from '@jacare/ui/Alert'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'md'}>
    <Alert :tone=\${'info'} :role=\${'status'} :title=\${'Status'}>
      Polite live region for non-critical updates.
    </Alert>
    <Alert :tone=\${'danger'} :role=\${'alert'} :title=\${'Alert'}>
      Assertive role for urgent messages.
    </Alert>
  </Stack>
</view>`

export function playgroundCode(state) {
  const tone = state.tone
  const title = String(state.title || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const body = String(state.body || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const dismissibleFlag = !!state.dismissible
  const compactFlag = !!state.compact
  const duration = Number(state.duration) > 0 ? Number(state.duration) : 0
  const role = state.role || ''
  const lines = [
    "import Alert from '@jacare/ui/Alert'",
    "import { pulse } from '@jacare/core'",
    '',
    'const open = pulse(true)',
    '',
    'export <view>',
    '  <Alert',
    `    :tone=\${'${tone}'}`,
  ]
  if (title) lines.push(`    :title=\${'${title}'}`)
  if (compactFlag) lines.push('    :compact=\${true}')
  if (dismissibleFlag) lines.push('    :dismissible=\${true}')
  if (duration > 0) lines.push(`    :duration=\${${duration}}`)
  if (role) lines.push(`    :role=\${'${role}'}`)
  if (dismissibleFlag || duration > 0) lines.push('    bind-open=\${open}')
  lines.push('  >')
  lines.push(`    ${body}`)
  lines.push('  </Alert>')
  lines.push('</view>')
  return lines.join('\n')
}
