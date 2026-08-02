export const basic = `import Compare from '@jacare/ui/Compare'
const beforeSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23dcefe8%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23235548%27 font-size=%2748%27 font-family=%27Arial%27%3EBefore%3C/text%3E%3C/svg%3E'
const afterSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23d7e8ff%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%231d4f91%27 font-size=%2748%27 font-family=%27Arial%27%3EAfter%3C/text%3E%3C/svg%3E'

export <view>
<Compare :beforeSrc=\${beforeSrc} :afterSrc=\${afterSrc} />
</view>`

export const labels = `import Compare from '@jacare/ui/Compare'
const beforeSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E'
const afterSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E'

export <view>
<Compare
    :beforeSrc=\${beforeSrc}
    :afterSrc=\${afterSrc}
    :beforeLabel=\${'Original'}
    :afterLabel=\${'Retouched'}
  />
</view>`

export const vertical = `import Compare from '@jacare/ui/Compare'
const beforeSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 640%27%3E%3Crect width=%27400%27 height=%27640%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E'
const afterSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 640%27%3E%3Crect width=%27400%27 height=%27640%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E'

export <view>
<Compare :beforeSrc=\${beforeSrc} :afterSrc=\${afterSrc} :orientation=\${'vertical'} :value=\${35} />
</view>`

export const hover = `import Compare from '@jacare/ui/Compare'
const beforeSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E'
const afterSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E'

export <view>
<Compare :beforeSrc=\${beforeSrc} :afterSrc=\${afterSrc} :slideOnHover=\${true} />
</view>`

export const bound = `import { pulse } from '@jacare/core'
import Compare from '@jacare/ui/Compare'
const position = pulse(62)
const beforeSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E'
const afterSrc = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 400%27%3E%3Crect width=%27640%27 height=%27400%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E'

export <view>
<Compare :beforeSrc=\${beforeSrc} :afterSrc=\${afterSrc} bind-value=\${position} />
</view>`
