export const basic = `import Button from '@jacare/ui/Button'

export <view>
  <Button :variant=\${'primary'}>Continue</Button>
</view>`

export const variants = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Button :variant=\${'primary'}>Primary</Button>
    <Button :variant=\${'secondary'}>Secondary</Button>
    <Button :variant=\${'ghost'}>Ghost</Button>
    <Button :variant=\${'outline'}>Outline</Button>
  </Stack>
</view>`

export const colors = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Button :variant=\${'primary'}>Primary</Button>
    <Button :variant=\${'success'}>Success</Button>
    <Button :variant=\${'warn'}>Warning</Button>
    <Button :variant=\${'danger'}>Danger</Button>
    <Button :variant=\${'info'}>Info</Button>
  </Stack>
</view>`

export const sizes = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Button :size=\${'sm'}>Small</Button>
    <Button :size=\${'md'}>Medium</Button>
    <Button :size=\${'lg'}>Large</Button>
  </Stack>
</view>`

export const shapes = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Button :shape=\${'pill'}>Pill</Button>
    <Button :shape=\${'rounded'}>Rounded</Button>
    <Button :shape=\${'circle'}>+</Button>
  </Stack>
</view>`

export const states = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Button :loading=\${true}>Saving</Button>
    <Button :disabled=\${true}>Disabled</Button>
  </Stack>
  <Button :block=\${true}>Full width</Button>
</view>`

export const types = `import Button from '@jacare/ui/Button'

export <view>
  <form>
    <Button :type=\${'submit'} :variant=\${'primary'}>Submit</Button>
    <Button :type=\${'reset'} :variant=\${'secondary'}>Reset</Button>
    <Button :type=\${'button'} :variant=\${'ghost'}>Button</Button>
  </form>
</view>`

export const events = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

const count = pulse(0)

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Button on-press=\${() => count.set(count() + 1)}>Clicked \${() => count()}</Button>
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Button from '@jacare/ui/Button'",
    '',
    'export <view>',
    '  <Button',
    `    :variant=\${'${state.variant}'}`,
    `    :size=\${'${state.size}'}`,
    `    :shape=\${'${state.shape}'}`,
    `    :type=\${'${state.type}'}`,
  ]

  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.loading) lines.push('    :loading=\${true}')
  if (state.block) lines.push('    :block=\${true}')
  lines.push(`    on-press=\${() => console.log('pressed')}`)
  lines.push('  >')
  lines.push(`    ${quote(state.label) || 'Button'}`)
  lines.push('  </Button>')
  lines.push('</view>')
  return lines.join('\n')
}
