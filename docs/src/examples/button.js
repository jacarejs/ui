export const basic = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-rows">
    <div class="docs-demo-row">
      <Button>Default</Button>
      <Button :variant=\${'primary'}>Primary</Button>
      <Button :variant=\${'success'}>Success</Button>
      <Button :variant=\${'info'}>Info</Button>
      <Button :variant=\${'warn'}>Warning</Button>
      <Button :variant=\${'danger'}>Danger</Button>
    </div>
    <div class="docs-demo-row">
      <Button :variant=\${'outline'}>Outline</Button>
      <Button :variant=\${'secondary'}>Secondary</Button>
      <Button :variant=\${'ghost'}>Ghost</Button>
    </div>
  </div>
</view>`

export const variants = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-row">
    <Button :variant=\${'primary'}>Primary</Button>
    <Button :variant=\${'secondary'}>Secondary</Button>
    <Button :variant=\${'ghost'}>Ghost</Button>
    <Button :variant=\${'outline'}>Outline</Button>
  </div>
</view>`

export const colors = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-row">
    <Button :variant=\${'primary'}>Primary</Button>
    <Button :variant=\${'success'}>Success</Button>
    <Button :variant=\${'warn'}>Warning</Button>
    <Button :variant=\${'danger'}>Danger</Button>
    <Button :variant=\${'info'}>Info</Button>
  </div>
</view>`

export const sizes = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-row">
    <Button :size=\${'sm'}>Small</Button>
    <Button :size=\${'md'}>Medium</Button>
    <Button :size=\${'lg'}>Large</Button>
  </div>
</view>`

export const shapes = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-row">
    <Button :shape=\${'pill'}>Pill</Button>
    <Button :shape=\${'rounded'}>Rounded</Button>
    <Button :shape=\${'circle'}>+</Button>
  </div>
</view>`

export const states = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-rows">
    <div class="docs-demo-row">
      <Button :loading=\${true}>Saving</Button>
      <Button :disabled=\${true}>Disabled</Button>
    </div>
    <Button :block=\${true}>Full width</Button>
  </div>
</view>`

export const types = `import Button from '@jacare/ui/Button'

export <view>
  <div class="docs-demo-row">
    <Button :type=\${'submit'} :variant=\${'primary'}>Submit</Button>
    <Button :type=\${'reset'} :variant=\${'secondary'}>Reset</Button>
    <Button :type=\${'button'} :variant=\${'ghost'}>Button</Button>
  </div>
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

export const icons = `import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'
import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'} :wrap=\${true}>
    <Button>
      <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
      Add item
    </Button>

    <Button :variant=\${'secondary'}>
      Continue
      <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Button>

    <Button :iconOnly=\${true} :shape=\${'circle'} :variant=\${'outline'}>
      <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <VisuallyHidden>Search</VisuallyHidden>
    </Button>

    <Button :iconOnly=\${true} :variant=\${'ghost'}>
      <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
      <VisuallyHidden>Open menu</VisuallyHidden>
    </Button>
  </Stack>
</view>`

export const iconStart = `import Button from '@jacare/ui/Button'

export <view>
  <Button>
    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
    Add item
  </Button>
</view>`

export const iconEnd = `import Button from '@jacare/ui/Button'

export <view>
  <Button :variant=\${'secondary'}>
    Continue
    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </Button>
</view>`

export const iconOnly = `import Button from '@jacare/ui/Button'
import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <Button :iconOnly=\${true} :shape=\${'circle'} :variant=\${'outline'}>
    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <VisuallyHidden>Search</VisuallyHidden>
  </Button>
</view>`

export const menu = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import VisuallyHidden from '@jacare/ui/VisuallyHidden'

const open = pulse(false)

export <view>
  <Button
    :variant=\${'ghost'}
    :iconOnly=\${true}
    on-press=\${() => open.set(!open())}
  >
    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
    <VisuallyHidden>Open menu</VisuallyHidden>
  </Button>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Button from '@jacare/ui/Button'",
  ]

  if (state.iconMode === 'only' || state.iconMode === 'menu') {
    lines.push("import VisuallyHidden from '@jacare/ui/VisuallyHidden'")
  }

  lines.push('', 'export <view>', '  <Button')
  lines.push(`    :variant=\${'${state.variant}'}`)
  lines.push(`    :size=\${'${state.size}'}`)
  lines.push(`    :shape=\${'${state.shape}'}`)
  lines.push(`    :type=\${'${state.type}'}`)

  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.loading) lines.push('    :loading=\${true}')
  if (state.block) lines.push('    :block=\${true}')
  if (state.iconMode === 'only' || state.iconMode === 'menu') {
    lines.push('    :iconOnly=\${true}')
  }
  lines.push(`    on-press=\${() => console.log('pressed')}`)
  lines.push('  >')

  if (state.iconMode === 'start') {
    lines.push('    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">')
    lines.push('      <path d="M12 5v14M5 12h14" />')
    lines.push('    </svg>')
    lines.push(`    ${quote(state.label) || 'Button'}`)
  } else if (state.iconMode === 'end') {
    lines.push(`    ${quote(state.label) || 'Button'}`)
    lines.push('    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">')
    lines.push('      <path d="M5 12h14M13 6l6 6-6 6" />')
    lines.push('    </svg>')
  } else if (state.iconMode === 'only') {
    lines.push('    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">')
    lines.push('      <circle cx="11" cy="11" r="7" />')
    lines.push('      <path d="m20 20-3.5-3.5" />')
    lines.push('    </svg>')
    lines.push(`    <VisuallyHidden>${quote(state.label) || 'Search'}</VisuallyHidden>`)
  } else if (state.iconMode === 'menu') {
    lines.push('    <svg class="jui-btn__icon" viewBox="0 0 24 24" aria-hidden="true">')
    lines.push('      <path d="M4 7h16M4 12h16M4 17h16" />')
    lines.push('    </svg>')
    lines.push('    <VisuallyHidden>Open menu</VisuallyHidden>')
  } else {
    lines.push(`    ${quote(state.label) || 'Button'}`)
  }

  lines.push('  </Button>', '</view>')
  return lines.join('\n')
}
