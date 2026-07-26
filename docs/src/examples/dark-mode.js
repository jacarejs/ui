export const themeScope = `import ThemeScope from '@jacare/ui/ThemeScope'
import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <ThemeScope :mode=\${'light'}>
      <div style="padding:1rem;border-radius:12px;background:var(--j-surface)">
        <Button :variant=\${'primary'}>Light island</Button>
      </div>
    </ThemeScope>
    <ThemeScope :mode=\${'dark'}>
      <div style="padding:1rem;border-radius:12px;background:var(--j-surface)">
        <Button :variant=\${'primary'}>Dark island</Button>
      </div>
    </ThemeScope>
  </Stack>
</view>`

export const themeToggle = `import ThemeToggle from '@jacare/ui/ThemeToggle'

export <view>
  <ThemeToggle />
</view>`

export const applyThemeBoot = `import { applyTheme, readStoredTheme } from '@jacare/ui/theme'

const mode = readStoredTheme('system')
applyTheme(mode)`
