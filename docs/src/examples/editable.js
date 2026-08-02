export const basic = `import { pulse } from '@jacare/core'
import Editable from '@jacare/ui/Editable'

const name = pulse('Canopy tokens')

export <view>
  <Editable bind-value=\${name} :placeholder=\${'Product name'} />
</view>`

export const placeholderExample = `import { pulse } from '@jacare/core'
import Editable from '@jacare/ui/Editable'

const title = pulse('')

export <view>
  <Editable
    :placeholder=\${'Click to name this row'}
    bind-value=\${title}
  />
</view>`

export const requiredExample = `import { pulse } from '@jacare/core'
import Editable from '@jacare/ui/Editable'

const owner = pulse('Heber')

export <view>
  <Editable
    :placeholder=\${'Owner'}
    :required=\${true}
    bind-value=\${owner}
  />
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import Editable from '@jacare/ui/Editable'

const locked = pulse('Read-only field')

export <view>
  <Editable
    :disabled=\${true}
    :placeholder=\${'Cannot edit'}
    bind-value=\${locked}
  />
</view>`

export const tableRow = `import { pulse } from '@jacare/core'
import Editable from '@jacare/ui/Editable'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const sku = pulse('SKU-1042')
const label = pulse('Forest green')
const notes = pulse('')

export <view>
  <Stack :gap=\${'sm'}>
    <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
      <Text :tone=\${'muted'}>SKU</Text>
      <Editable :placeholder=\${'SKU'} bind-value=\${sku} />
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
      <Text :tone=\${'muted'}>Label</Text>
      <Editable :placeholder=\${'Label'} bind-value=\${label} />
    </Stack>
    <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
      <Text :tone=\${'muted'}>Notes</Text>
      <Editable :placeholder=\${'Add a note'} bind-value=\${notes} />
    </Stack>
  </Stack>
</view>`

export const eventsExample = `import { pulse } from '@jacare/core'
import Editable from '@jacare/ui/Editable'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const name = pulse('Editable title')
const log = pulse('Idle')

export <view>
  <Stack :gap=\${'sm'}>
    <Editable
      :placeholder=\${'Title'}
      bind-value=\${name}
      on-start=\${() => log.set('Editing…')}
      on-change=\${(next) => log.set(\`Saved: \${next}\`)}
      on-cancel=\${() => log.set('Cancelled')}
    />
    <Text :tone=\${'muted'}>\${log}</Text>
  </Stack>
</view>`
