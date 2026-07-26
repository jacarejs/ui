export const basic = `import Divider from '@jacare/ui/Divider'

export <view>
  <p>Above</p>
  <Divider />
  <p>Below</p>
</view>`

export const labeled = `import Divider from '@jacare/ui/Divider'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'sm'}>
    <Text>Account details</Text>
    <Divider :label=\${'OR'} />
    <Text>Continue with SSO</Text>
  </Stack>
</view>`

export const vertical = `import Button from '@jacare/ui/Button'
import Divider from '@jacare/ui/Divider'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'sm'}>
    <Button :size=\${'sm'} :variant=\${'ghost'}>Edit</Button>
    <Divider :vertical=\${true} />
    <Button :size=\${'sm'} :variant=\${'ghost'}>Share</Button>
    <Divider :vertical=\${true} />
    <Button :size=\${'sm'} :variant=\${'ghost'}>Delete</Button>
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  if (state.vertical) {
    return [
      "import Button from '@jacare/ui/Button'",
      "import Divider from '@jacare/ui/Divider'",
      "import Stack from '@jacare/ui/Stack'",
      '',
      'export <view>',
      "  <Stack :direction=\${'row'} :align=\${'center'} :gap=\${'sm'}>",
      "    <Button :size=\${'sm'}>Left</Button>",
      '    <Divider :vertical=\${true} />',
      "    <Button :size=\${'sm'} :variant=\${'secondary'}>Right</Button>",
      '  </Stack>',
      '</view>',
    ].join('\n')
  }

  const lines = [
    "import Divider from '@jacare/ui/Divider'",
    "import Text from '@jacare/ui/Text'",
    "import Stack from '@jacare/ui/Stack'",
    '',
    'export <view>',
    "  <Stack :gap=\${'sm'}>",
    "    <Text>Above</Text>",
  ]
  if (state.label) {
    lines.push(`    <Divider :label=\${'${quote(state.label)}'} />`)
  } else {
    lines.push('    <Divider />')
  }
  lines.push("    <Text>Below</Text>", '  </Stack>', '</view>')
  return lines.join('\n')
}
