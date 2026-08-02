export const basic = `import { pulse } from '@jacare/core'
import InputSearch from '@jacare/ui/InputSearch'

const query = pulse('')

export <view>
  <InputSearch :label=\${'Find teammates'} :placeholder=\${'Name or email'} bind-value=\${query} />
</view>`

export const withButton = `import { pulse } from '@jacare/core'
import InputSearch from '@jacare/ui/InputSearch'

const query = pulse('')

export <view>
  <InputSearch
    :label=\${'Catalog'}
    :showButton=\${true}
    :buttonLabel=\${'Filter'}
    :debounce=\${200}
    bind-value=\${query}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import InputSearch from '@jacare/ui/InputSearch'
import Stack from '@jacare/ui/Stack'

const hinted = pulse('')
const invalid = pulse('@@@')
const locked = pulse('archived')

export <view>
  <Stack :gap=\${'md'}>
    <InputSearch :label=\${'Hinted'} :hint=\${'Press Enter to search immediately'} bind-value=\${hinted} />
    <InputSearch :label=\${'Invalid'} :error=\${'Query is too short'} bind-value=\${invalid} />
    <InputSearch :label=\${'Disabled'} :disabled=\${true} bind-value=\${locked} />
  </Stack>
</view>`
