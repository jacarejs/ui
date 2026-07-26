export const basic = `import Spinner from '@jacare/ui/Spinner'

export <view>
  <Spinner :label=\${'Loading'} />
</view>`

export const sizes = `import Spinner from '@jacare/ui/Spinner'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'lg'}>
    <Spinner :size=\${'sm'} :label=\${'Small'} />
    <Spinner :size=\${'md'} :label=\${'Medium'} />
    <Spinner :size=\${'lg'} :label=\${'Large'} />
  </Stack>
</view>`

export const withButton = `import Button from '@jacare/ui/Button'
import Spinner from '@jacare/ui/Spinner'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'md'}>
    <Button :loading=\${true}>Saving</Button>
    <Spinner :label=\${'Still working'} />
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  return [
    "import Spinner from '@jacare/ui/Spinner'",
    '',
    'export <view>',
    '  <Spinner',
    `    :size=\${'${state.size}'}`,
    `    :label=\${'${quote(state.label)}'}`,
    '  />',
    '</view>',
  ].join('\n')
}
