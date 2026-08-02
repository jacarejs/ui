export const extendedLabel = `import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <button type="button">
    Search
    <VisuallyHidden> the documentation catalog</VisuallyHidden>
  </button>
</view>`

export const iconControl = `import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <button type="button">
    <span aria-hidden="true">×</span>
    <VisuallyHidden>Close dialog</VisuallyHidden>
  </button>
</view>`

export const context = `import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <p>
    4 new notifications
    <VisuallyHidden>, updated just now</VisuallyHidden>
  </p>
</view>`

export const status = `import VisuallyHidden from '@jacare/ui/VisuallyHidden'

export <view>
  <p>
    Build complete
    <VisuallyHidden>. Status: successful.</VisuallyHidden>
    <span aria-hidden="true"> ✓</span>
  </p>
</view>`
