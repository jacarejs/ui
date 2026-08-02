export const basic = `import Gallery from '@jacare/ui/Gallery'
const images = [
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 240%27%3E%3Crect width=%27320%27 height=%27240%27 fill=%27%23dcefe8%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23235548%27 font-size=%2724%27%3EOne%3C/text%3E%3C/svg%3E',
    alt: 'Gallery image one',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 240%27%3E%3Crect width=%27320%27 height=%27240%27 fill=%27%23d7e8ff%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%231d4f91%27 font-size=%2724%27%3ETwo%3C/text%3E%3C/svg%3E',
    alt: 'Gallery image two',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 240%27%3E%3Crect width=%27320%27 height=%27240%27 fill=%27%23f6e8d7%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23864d1b%27 font-size=%2724%27%3EThree%3C/text%3E%3C/svg%3E',
    alt: 'Gallery image three',
  },
]

export <view>
<Gallery :images=\${images} />
</view>`

export const controlled = `import { pulse } from '@jacare/core'
import Gallery from '@jacare/ui/Gallery'
const images = [
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 240%27%3E%3Crect width=%27320%27 height=%27240%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E',
    alt: 'First image',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 240%27%3E%3Crect width=%27320%27 height=%27240%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E',
    alt: 'Second image',
  },
]
const activeIndex = pulse(1)
const open = pulse(false)

export <view>
<Gallery :images=\${images} bind-activeIndex=\${activeIndex} bind-open=\${open} />
</view>`

export const noThumbs = `import Gallery from '@jacare/ui/Gallery'
import Button from '@jacare/ui/Button'
import { pulse } from '@jacare/core'
const images = [
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 320 240%27%3E%3Crect width=%27320%27 height=%27240%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E',
    alt: 'Fullscreen image',
  },
]
const open = pulse(true)

export <view>
<Button on-click=\${() => open.set(true)}>Open gallery</Button>
<Gallery :images=\${images} :showThumbnails=\${false} bind-open=\${open} />
</view>`

export const customThumbs = `import Gallery from '@jacare/ui/Gallery'
const images = [
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 480%27%3E%3Crect width=%27640%27 height=%27480%27 fill=%27%23dcefe8%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23235548%27 font-size=%2748%27%3ELarge%3C/text%3E%3C/svg%3E',
    thumb: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 120 120%27%3E%3Crect width=%27120%27 height=%27120%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E',
    alt: 'Large preview',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 640 480%27%3E%3Crect width=%27640%27 height=%27480%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E',
    thumb: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 120 120%27%3E%3Crect width=%27120%27 height=%27120%27 fill=%27%23d7e8ff%27/%3E%3C/svg%3E',
    alt: 'Second preview',
  },
]

export <view>
<Gallery :images=\${images} />
</view>`

export const many = `import Gallery from '@jacare/ui/Gallery'
const fills = ['dcefe8', 'd7e8ff', 'f6e8d7', 'e8dff6', 'dff6e8', 'f6dfe8', 'dfe8f6', 'e8f6df']
const images = fills.map((fill, index) => ({
  src: \`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 240'%3E%3Crect width='320' height='240' fill='%23\${fill}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23235548' font-size='24'%3E\${index + 1}%3C/text%3E%3C/svg%3E\`,
  alt: \`Image \${index + 1}\`,
}))

export <view>
<Gallery :images=\${images} />
</view>`
