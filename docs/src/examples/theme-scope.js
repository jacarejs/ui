export const light = `import ThemeScope from '@jacare/ui/ThemeScope'
import Button from '@jacare/ui/Button'

export <view>
  <ThemeScope :mode=\${'light'}>
    <div style="padding:1rem">
      <Button>Light island</Button>
    </div>
  </ThemeScope>
</view>`

export const dark = `import ThemeScope from '@jacare/ui/ThemeScope'
import Button from '@jacare/ui/Button'

export <view>
  <ThemeScope :mode=\${'dark'}>
    <div style="padding:1rem">
      <Button>Dark island</Button>
    </div>
  </ThemeScope>
</view>`

export const system = `import ThemeScope from '@jacare/ui/ThemeScope'
import Button from '@jacare/ui/Button'

export <view>
  <ThemeScope :mode=\${'system'}>
    <div style="padding:1rem">
      <Button :variant=\${'secondary'}>Inherit system theme</Button>
    </div>
  </ThemeScope>
</view>`

export const nested = `import ThemeScope from '@jacare/ui/ThemeScope'
import Button from '@jacare/ui/Button'

export <view>
  <ThemeScope :mode=\${'dark'}>
    <div style="padding:1rem">
      <Button>Dark parent</Button>
      <ThemeScope :mode=\${'light'}>
        <div style="margin-top:1rem;padding:1rem">
          <Button :variant=\${'secondary'}>Light nested scope</Button>
        </div>
      </ThemeScope>
    </div>
  </ThemeScope>
</view>`
