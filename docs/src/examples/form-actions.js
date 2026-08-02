export const basic = `import FormActions from '@jacare/ui/FormActions'

export <view>
  <FormActions
    on-cancel=\${() => console.log('cancel')}
    on-save=\${() => console.log('save')}
    on-submit=\${() => console.log('submit')}
  />
</view>`

export const loading = `import { pulse } from '@jacare/core'
import FormActions from '@jacare/ui/FormActions'
import Button from '@jacare/ui/Button'

const busy = pulse(false)

export <view>
  <FormActions
    :loading=\${busy}
    :submitLabel=\${'Publish'}
    on-submit=\${() => busy.set(true)}
  >
    <Button :variant=\${'outline'} on-press=\${() => busy.set(false)}>Reset</Button>
  </FormActions>
</view>`

export const between = `import FormActions from '@jacare/ui/FormActions'

export <view>
  <FormActions
    :align=\${'between'}
    :sticky=\${false}
    :saveLabel=\${'Save draft'}
    :submitLabel=\${'Continue'}
  />
</view>`
