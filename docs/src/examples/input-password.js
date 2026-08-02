export const basic = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const password = pulse('')

export <view>
  <InputPassword :label=\${'Password'} :hint=\${'At least 8 characters'} bind-value=\${password} />
</view>`

export const comparison = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'
import InputPassword from '@jacare/ui/InputPassword'

const plain = pulse('secret')
const rich = pulse('secret')

export <view>
  <div class="docs-compare">
    <div class="docs-compare__pane">
      <p class="docs-compare__label">Input type=password</p>
      <Input :label=\${'Password'} :type=\${'password'} bind-value=\${plain} />
      <p style="margin:0;color:var(--j-muted);font-size:0.85rem">No show/hide toggle or strength meter.</p>
    </div>
    <div class="docs-compare__pane">
      <p class="docs-compare__label">InputPassword</p>
      <InputPassword :label=\${'Password'} bind-value=\${rich} />
      <p style="margin:0;color:var(--j-muted);font-size:0.85rem">Toggle + meter built in.</p>
    </div>
  </div>
</view>`

export const roles = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'
import Stack from '@jacare/ui/Stack'

const current = pulse('')
const next = pulse('')
const confirm = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputPassword
      :label=\${'Current password'}
      :autocomplete=\${'current-password'}
      :meter=\${false}
      :name=\${'current-password'}
      bind-value=\${current}
    />
    <InputPassword
      :label=\${'New password'}
      :autocomplete=\${'new-password'}
      :placeholder=\${'Create a strong password'}
      :name=\${'new-password'}
      bind-value=\${next}
    />
    <InputPassword
      :label=\${'Confirm new password'}
      :autocomplete=\${'new-password'}
      :meter=\${false}
      :name=\${'confirm-password'}
      bind-value=\${confirm}
    />
  </Stack>
</view>`

export const strengthLevels = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const weak = pulse('abcdefgh')
const fair = pulse('Abcdefgh')
const good = pulse('Abcdefgh1')
const strong = pulse('Abcdefgh1!')

export <view>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:0.85rem;width:100%">
    <InputPassword :label=\${'Weak'} :meter=\${true} bind-value=\${weak} />
    <InputPassword :label=\${'Fair'} :meter=\${true} bind-value=\${fair} />
    <InputPassword :label=\${'Good'} :meter=\${true} bind-value=\${good} />
    <InputPassword :label=\${'Strong'} :meter=\${true} bind-value=\${strong} />
  </div>
</view>`

export const confirmPair = `import { pulse, derive } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'
import Stack from '@jacare/ui/Stack'

const password = pulse('')
const confirm = pulse('')
const confirmError = derive(() => {
  if (!confirm()) return ''
  return confirm() === password() ? '' : 'Passwords do not match'
})

export <view>
  <Stack :gap=\${'md'}>
    <InputPassword
      :label=\${'Password'}
      :autocomplete=\${'new-password'}
      :required=\${true}
      :hint=\${'Use upper, lower, number, and symbol'}
      bind-value=\${password}
    />
    <InputPassword
      :label=\${'Confirm password'}
      :autocomplete=\${'new-password'}
      :meter=\${false}
      :required=\${true}
      :error=\${() => confirmError()}
      bind-value=\${confirm}
    />
  </Stack>
</view>`

export const meter = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const password = pulse('Jacare')

export <view>
  <InputPassword
    :label=\${'New password'}
    :meter=\${true}
    :placeholder=\${'Create a strong password'}
    bind-value=\${password}
  />
</view>`

export const noMeter = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const password = pulse('secret')

export <view>
  <InputPassword :label=\${'Current password'} :meter=\${false} :autocomplete=\${'current-password'} bind-value=\${password} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'
import Stack from '@jacare/ui/Stack'

const hinted = pulse('')
const invalid = pulse('123')
const locked = pulse('locked-value')

export <view>
  <Stack :gap=\${'md'}>
    <InputPassword :label=\${'Hinted'} :hint=\${'Use upper, lower, number, and symbol'} bind-value=\${hinted} />
    <InputPassword :label=\${'Too short'} :error=\${'Password must be at least 8 characters'} bind-value=\${invalid} />
    <InputPassword :label=\${'Disabled'} :disabled=\${true} bind-value=\${locked} />
  </Stack>
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'
import Stack from '@jacare/ui/Stack'

const sm = pulse('')
const md = pulse('')
const lg = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputPassword :label=\${'Small'} :size=\${'sm'} :meter=\${false} bind-value=\${sm} />
    <InputPassword :label=\${'Medium'} :size=\${'md'} :meter=\${false} bind-value=\${md} />
    <InputPassword :label=\${'Large'} :size=\${'lg'} :meter=\${false} bind-value=\${lg} />
  </Stack>
</view>`

export const clearableExample = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const password = pulse('temporary')

export <view>
  <InputPassword
    :label=\${'Temporary password'}
    :clearable=\${true}
    :meter=\${false}
    :hint=\${'clearable adds a clear control beside show/hide'}
    bind-value=\${password}
  />
</view>`

export const maxLengthExample = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const password = pulse('')

export <view>
  <InputPassword
    :label=\${'PIN-style password'}
    :maxLength=\${12}
    :meter=\${false}
    :hint=\${'maxLength caps input at 12 characters'}
    bind-value=\${password}
  />
</view>`

export const pin = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const pin = pulse('')

export <view>
  <InputPassword
    :label=\${'App PIN'}
    :placeholder=\${'6–12 characters'}
    :maxLength=\${12}
    :meter=\${false}
    :clearable=\${true}
    :autocomplete=\${'one-time-code'}
    :hint=\${'Short secrets often skip the strength meter'}
    bind-value=\${pin}
  />
</view>`

export const requiredExample = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'

const password = pulse('')

export <view>
  <InputPassword
    :label=\${'Password'}
    :required=\${true}
    :autocomplete=\${'new-password'}
    :hint=\${'Required fields show an asterisk'}
    bind-value=\${password}
  />
</view>`

export const strengthEvent = `import { pulse } from '@jacare/core'
import InputPassword from '@jacare/ui/InputPassword'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const password = pulse('')
const strength = pulse({ score: 0, label: '' })

export <view>
  <Stack :gap=\${'md'}>
    <InputPassword
      :label=\${'Account password'}
      :placeholder=\${'Type to score strength'}
      :autocomplete=\${'new-password'}
      bind-value=\${password}
      on-strength=\${(next) => strength.set(next)}
    />
    <Text :tone=\${'muted'}>
      \${() => {
        const next = strength() || { score: 0, label: '' }
        if (!next.score) return 'Strength idle'
        return 'Strength ' + next.label + ' (score ' + next.score + '/4)'
      }}
    </Text>
  </Stack>
</view>`
