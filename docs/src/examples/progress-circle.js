export const basic = `import ProgressCircle from '@jacare/ui/ProgressCircle'

export <view>
  <ProgressCircle :value=\${72} />
</view>`

export const sizes = `import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'
import ProgressCircle from '@jacare/ui/ProgressCircle'

export <view>
  <Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true} :align=\${'end'}>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${64} :size=\${'sm'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>sm</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${64} />
      <Text :tone=\${'muted'} :size=\${'sm'}>md</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${64} :size=\${'lg'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>lg</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${64} :size=\${'96px'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>96px</Text>
    </Stack>
  </Stack>
</view>`

export const tones = `import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'
import ProgressCircle from '@jacare/ui/ProgressCircle'

export <view>
  <Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${40} :tone=\${'primary'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>primary</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${72} :tone=\${'success'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>success</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${55} :tone=\${'warn'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>warn</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${28} :tone=\${'danger'} />
      <Text :tone=\${'muted'} :size=\${'sm'}>danger</Text>
    </Stack>
  </Stack>
</view>`

export const indeterminate = `import ProgressCircle from '@jacare/ui/ProgressCircle'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'sm'} :align=\${'center'}>
    <ProgressCircle :indeterminate=\${true} :label=\${'Loading profile'} />
    <Text :tone=\${'muted'} :size=\${'sm'}>Loading profile…</Text>
  </Stack>
</view>`

export const slot = `import ProgressCircle from '@jacare/ui/ProgressCircle'

export <view>
  <ProgressCircle :value=\${86} :showValue=\${false} :size=\${'lg'} :tone=\${'success'}>
    <span>OK</span>
  </ProgressCircle>
</view>`

export const thickness = `import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'
import ProgressCircle from '@jacare/ui/ProgressCircle'

export <view>
  <Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${50} :thickness=\${0.06} />
      <Text :tone=\${'muted'} :size=\${'sm'}>0.06</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${50} :thickness=\${0.1} />
      <Text :tone=\${'muted'} :size=\${'sm'}>0.1</Text>
    </Stack>
    <Stack :gap=\${'sm'} :align=\${'center'}>
      <ProgressCircle :value=\${50} :thickness=\${0.18} />
      <Text :tone=\${'muted'} :size=\${'sm'}>0.18</Text>
    </Stack>
  </Stack>
</view>`
