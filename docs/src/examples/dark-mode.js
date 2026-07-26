export const themeScope = `import { applyTheme } from '@jacare/ui/theme'
import ThemeScope from '@jacare/ui/ThemeScope'
import Button from '@jacare/ui/Button'

applyTheme('dark')

export <view>
  <ThemeScope :mode=\${'dark'}>
    <Button>Scoped dark</Button>
  </ThemeScope>
</view>`
