export const sampleAvatar =
  'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 128 128%27%3E%3Ccircle cx=%2764%27 cy=%2764%27 r=%2764%27 fill=%27%2378b99f%27/%3E%3Ccircle cx=%2764%27 cy=%2750%27 r=%2722%27 fill=%27%23dcefe8%27/%3E%3Cpath d=%27M28 112c8-22 28-34 36-34s28 12 36 34%27 fill=%27%23dcefe8%27/%3E%3C/svg%3E'

export const basic = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'

const photo = pulse('')

export <view>
  <AvatarUpload
    :label=\${'Profile photo'}
    :hint=\${'PNG or JPG'}
    bind-value=\${photo}
  />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'
import Stack from '@jacare/ui/Stack'

const small = pulse('')
const medium = pulse('')
const large = pulse('')

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <AvatarUpload :label=\${'Small'} :name=\${'Ana Costa'} :size=\${64} bind-value=\${small} />
    <AvatarUpload :label=\${'Default'} :name=\${'João Pedro'} :size=\${96} bind-value=\${medium} />
    <AvatarUpload :label=\${'Large'} :name=\${'Lia Nunes'} :size=\${128} bind-value=\${large} />
  </Stack>
</view>`

export const prefills = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'

const photo = pulse('${sampleAvatar}')

export <view>
  <AvatarUpload
    :label=\${'Saved avatar'}
    :hint=\${'Replace or remove the current photo'}
    bind-value=\${photo}
  />
</view>`

export const acceptOnly = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'

const photo = pulse('')

export <view>
  <AvatarUpload
    :label=\${'PNG only'}
    :accept=\${'image/png'}
    :hint=\${'File picker accepts PNG images'}
    bind-value=\${photo}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const locked = pulse('${sampleAvatar}')

export <view>
  <Stack :gap=\${'lg'}>
    <AvatarUpload
      :label=\${'Required photo'}
      :error=\${'Upload a profile photo to continue'}
      bind-value=\${invalid}
    />
    <AvatarUpload
      :label=\${'Locked photo'}
      :disabled=\${true}
      :hint=\${'Editing is disabled for this account'}
      bind-value=\${locked}
    />
  </Stack>
</view>`

export const events = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'
import Text from '@jacare/ui/Text'

const photo = pulse('')
const status = pulse('Waiting for upload')

export <view>
  <AvatarUpload
    :label=\${'Team avatar'}
    :hint=\${'Emits change with a PNG data URL; clear when removed'}
    bind-value=\${photo}
    on-change=\${(next) => status.set(next ? \`Uploaded (\${Math.round(next.length / 1024)} KB data URL)\` : 'Cleared')}
    on-clear=\${() => status.set('Clear event fired')}
  />
  <Text :tone=\${'muted'}>\${status}</Text>
</view>`

export const withInitials = `import { pulse } from '@jacare/core'
import AvatarUpload from '@jacare/ui/AvatarUpload'
import Field from '@jacare/ui/Field'
import Stack from '@jacare/ui/Stack'

const photo = pulse('')
const fullName = pulse('Maria Silva')

export <view>
  <Stack :gap=\${'md'}>
    <Field :label=\${'Full name'} :hint=\${'Initials use the first and last name'} bind-value=\${fullName} />
    <AvatarUpload
      :label=\${'Profile photo'}
      :name=\${fullName}
      :hint=\${'Shows initials first; upload replaces them with a photo. Remove restores initials.'}
      bind-value=\${photo}
    />
  </Stack>
</view>`
