export const basic = `import Button from '@jacare/ui/Button'

export <view>
  <Button :variant=\${'primary'}>Continue</Button>
</view>`

export const variants = `import Button from '@jacare/ui/Button'

export <view>
  <Button :variant=\${'primary'}>Primary</Button>
  <Button :variant=\${'secondary'}>Secondary</Button>
  <Button :variant=\${'ghost'}>Ghost</Button>
  <Button :variant=\${'danger'}>Danger</Button>
</view>`

export const sizes = `import Button from '@jacare/ui/Button'

export <view>
  <Button :size=\${'sm'}>Small</Button>
  <Button :size=\${'md'}>Medium</Button>
  <Button :size=\${'lg'}>Large</Button>
</view>`

export const states = `import Button from '@jacare/ui/Button'

export <view>
  <Button :loading=\${true}>Saving</Button>
  <Button :disabled=\${true}>Disabled</Button>
  <Button :block=\${true}>Full width</Button>
</view>`
