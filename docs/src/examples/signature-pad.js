export const basic = `import { pulse } from '@jacare/core'
import SignaturePad from '@jacare/ui/SignaturePad'

const signature = pulse('')

export <view>
  <SignaturePad
    :label=\${'Sign here'}
    :hint=\${'Use a finger or stylus'}
    bind-value=\${signature}
  />
</view>`

export const tallPad = `import { pulse } from '@jacare/core'
import SignaturePad from '@jacare/ui/SignaturePad'

const signature = pulse('')

export <view>
  <SignaturePad
    :label=\${'Authorization'}
    :height=\${260}
    :hint=\${'Taller pad for tablet or stylus capture'}
    bind-value=\${signature}
  />
</view>`

export const clearLabelExample = `import { pulse } from '@jacare/core'
import SignaturePad from '@jacare/ui/SignaturePad'

const signature = pulse('')

export <view>
  <SignaturePad
    :label=\${'Cliente'}
    :clearLabel=\${'Limpar assinatura'}
    :hint=\${'clearLabel localizes the toolbar action'}
    bind-value=\${signature}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import SignaturePad from '@jacare/ui/SignaturePad'
import Stack from '@jacare/ui/Stack'

const hinted = pulse('')
const invalid = pulse('')

export <view>
  <Stack :gap=\${'lg'}>
    <SignaturePad
      :label=\${'Delivery receipt'}
      :hint=\${'Sign to confirm the package was received'}
      bind-value=\${hinted}
    />
    <SignaturePad
      :label=\${'Contract signature'}
      :error=\${'Signature is required before submitting'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import SignaturePad from '@jacare/ui/SignaturePad'

const locked = pulse('')

export <view>
  <SignaturePad
    :label=\${'Archived form'}
    :disabled=\${true}
    :hint=\${'Locked after the document was filed'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import SignaturePad from '@jacare/ui/SignaturePad'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const signature = pulse('')
const clears = pulse(0)

export <view>
  <Stack :gap=\${'md'}>
    <SignaturePad
      :label=\${'Witness'}
      :hint=\${'value is a PNG data URL after the stroke ends'}
      bind-value=\${signature}
      on-clear=\${() => clears.set(clears() + 1)}
    />
    <Text :tone=\${'muted'}>
      \${() => {
        const next = String(signature() || '')
        if (!next) return \`Empty · cleared \${clears()} time(s)\`
        return \`Signed · \${Math.round(next.length / 1024)} KB PNG · cleared \${clears()} time(s)\`
      }}
    </Text>
    #if signature()
      <img
        alt="Signature preview"
        src=\${signature}
        style="max-width:16rem;border:1px solid var(--j-border);border-radius:var(--j-radius-sm);background:var(--j-surface-2)"
      />
    #end
  </Stack>
</view>`
