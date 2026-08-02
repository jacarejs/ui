export const basic = `import Image from '@jacare/ui/Image'
const src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 160%27%3E%3Crect width=%27320%27 height=%27160%27 rx=%2716%27 fill=%27%23dcefe8%27/%3E%3Ccircle cx=%2790%27 cy=%2770%27 r=%2732%27 fill=%27%2378b99f%27/%3E%3Cpath d=%27M0 150l95-70 55 38 62-55 108 87z%27 fill=%27%23235548%27/%3E%3C/svg%3E'

export <view>
<Image :src=\${src} :alt=\${'Abstract green landscape'} />
</view>`

export const fits = `import Image from '@jacare/ui/Image'
import Stack from '@jacare/ui/Stack'
const src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 160%27%3E%3Crect width=%27320%27 height=%27160%27 rx=%2716%27 fill=%27%23dcefe8%27/%3E%3Ccircle cx=%2790%27 cy=%2770%27 r=%2732%27 fill=%27%2378b99f%27/%3E%3Cpath d=%27M0 150l95-70 55 38 62-55 108 87z%27 fill=%27%23235548%27/%3E%3C/svg%3E'

export <view>
<Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Image :src=\${src} :alt=\${'Cover fit'} :fit=\${'cover'} />
    <Image :src=\${src} :alt=\${'Contain fit'} :fit=\${'contain'} />
  </Stack>
</view>`

export const lazy = `import Image from '@jacare/ui/Image'
const src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 160%27%3E%3Crect width=%27320%27 height=%27160%27 rx=%2716%27 fill=%27%23dcefe8%27/%3E%3Ccircle cx=%2790%27 cy=%2770%27 r=%2732%27 fill=%27%2378b99f%27/%3E%3Cpath d=%27M0 150l95-70 55 38 62-55 108 87z%27 fill=%27%23235548%27/%3E%3C/svg%3E'

export <view>
<Image :src=\${src} :alt=\${'Lazy-loaded landscape'} :lazy=\${true} />
</view>`

export const preview = `import Image from '@jacare/ui/Image'
const src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 160%27%3E%3Crect width=%27320%27 height=%27160%27 rx=%2716%27 fill=%27%23dcefe8%27/%3E%3Ccircle cx=%2790%27 cy=%2770%27 r=%2732%27 fill=%27%2378b99f%27/%3E%3Cpath d=%27M0 150l95-70 55 38 62-55 108 87z%27 fill=%27%23235548%27/%3E%3C/svg%3E'

export <view>
<Image :src=\${src} :alt=\${'Previewable landscape'} :preview=\${true} />
</view>`

export const fallback = `import Image from '@jacare/ui/Image'

export <view>
<Image :src=\${'data:image/png;base64,broken'} :alt=\${'Unavailable release artwork'}>
    Release artwork could not be loaded
  </Image>
</view>`
