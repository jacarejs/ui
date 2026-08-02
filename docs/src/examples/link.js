export const basic = `import Link from '@jacare/ui/Link'

export <view>
<Link :href=\${'#api'} :type=\${'primary'}>Read the API</Link>
</view>`

export const types = `import Link from '@jacare/ui/Link'
import Stack from '@jacare/ui/Stack'

export <view>
<Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <Link :href=\${'#default'}>Default</Link>
    <Link :href=\${'#primary'} :type=\${'primary'}>Primary</Link>
    <Link :href=\${'#success'} :type=\${'success'}>Success</Link>
    <Link :href=\${'#warning'} :type=\${'warning'}>Warning</Link>
    <Link :href=\${'#danger'} :type=\${'danger'}>Danger</Link>
  </Stack>
</view>`

export const underline = `import Link from '@jacare/ui/Link'
import Stack from '@jacare/ui/Stack'

export <view>
<Stack :direction=\${'row'} :gap=\${'lg'}>
    <Link :href=\${'#hover'} :underline=\${'hover'}>Hover underline</Link>
    <Link :href=\${'#always'} :underline=\${'always'}>Always underlined</Link>
    <Link :href=\${'#never'} :underline=\${'never'}>Never underlined</Link>
  </Stack>
</view>`

export const target = `import Link from '@jacare/ui/Link'

export <view>
<Link :href=\${'https://github.com/jacarejs/ui'} :linkTarget=\${'_blank'}>Open repository</Link>
</view>`

export const disabled = `import Link from '@jacare/ui/Link'

export <view>
<Link :href=\${'#unavailable'} :disabled=\${true}>Unavailable link</Link>
</view>`
