export const basic = `import QrCode from '@jacare/ui/QrCode'

export <view>
  <QrCode
    :label=\${'Docs site'}
    :value=\${'https://jacarejs.github.io/ui/'}
    :hint=\${'Scan to open the Jacaré UI docs'}
  />
</view>`

export const sizes = `import QrCode from '@jacare/ui/QrCode'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <QrCode :label=\${'Compact'} :size=\${96} :value=\${'jacare'} />
    <QrCode :label=\${'Default'} :size=\${160} :value=\${'jacare'} />
    <QrCode :label=\${'Large'} :size=\${220} :value=\${'jacare'} />
  </Stack>
</view>`

export const levels = `import QrCode from '@jacare/ui/QrCode'
import Stack from '@jacare/ui/Stack'

const payload = 'https://jacarejs.github.io/ui/components/qr-code'

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <QrCode :label=\${'Level L'} :level=\${'L'} :value=\${payload} />
    <QrCode :label=\${'Level M'} :level=\${'M'} :value=\${payload} />
    <QrCode :label=\${'Level Q'} :level=\${'Q'} :value=\${payload} />
    <QrCode :label=\${'Level H'} :level=\${'H'} :value=\${payload} />
  </Stack>
</view>`

export const colors = `import QrCode from '@jacare/ui/QrCode'

export <view>
  <QrCode
    :label=\${'Brand colors'}
    :value=\${'https://jacarejs.github.io/ui/'}
    :darkColor=\${'#c45c26'}
    :lightColor=\${'#fff7f0'}
    :hint=\${'darkColor and lightColor tint the modules'}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'
import QrCode from '@jacare/ui/QrCode'
import Stack from '@jacare/ui/Stack'

const value = pulse('https://jacarejs.github.io/ui/')

export <view>
  <Stack :gap=\${'md'}>
    <Input :label=\${'Payload'} bind-value=\${value} />
    <QrCode
      :label=\${'Live preview'}
      :value=\${value}
      :downloadable=\${true}
      :hint=\${'Edit the field to regenerate the code'}
    />
  </Stack>
</view>`

export const downloadable = `import QrCode from '@jacare/ui/QrCode'

export <view>
  <QrCode
    :label=\${'Share link'}
    :value=\${'https://jacarejs.github.io/ui/'}
    :downloadable=\${true}
    :downloadLabel=\${'Save PNG'}
  />
</view>`
