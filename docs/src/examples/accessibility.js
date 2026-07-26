export const focus = `import Button from '@jacare/ui/Button'
import Field from '@jacare/ui/Field'
import Stack from '@jacare/ui/Stack'
import { pulse } from '@jacare/core'

const email = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <p>Press Tab to move focus. Rings use --j-focus.</p>
    <Field :label=\${'Email'} bind-value=\${email} />
    <Button>Continue</Button>
  </Stack>
</view>`

export const visuallyHidden = `import Button from '@jacare/ui/Button'
import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <Button :variant=\${'ghost'}>
    <span aria-hidden="true">✕</span>
    <VisuallyHidden>Close dialog</VisuallyHidden>
  </Button>
</view>`

export const themeToggle = `import ThemeToggle from '@jacare/ui/ThemeToggle'

export <view>
  <ThemeToggle />
</view>`

export const states = `import Button from '@jacare/ui/Button'
import Field from '@jacare/ui/Field'
import Stack from '@jacare/ui/Stack'
import { pulse } from '@jacare/core'

const name = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <Button :loading=\${true}>Saving</Button>
    <Field
      :label=\${'Display name'}
      :error=\${'Enter at least 2 characters'}
      bind-value=\${name}
    />
  </Stack>
</view>`
