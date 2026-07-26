export const basic = `import Progress from '@jacare/ui/Progress'

export <view>
  <Progress :value=\${64} />
</view>`

export const tones = `import Progress from '@jacare/ui/Progress'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :gap=\${'md'}>
    <Progress :value=\${40} :tone=\${'primary'} :label=\${'Primary'} />
    <Progress :value=\${72} :tone=\${'success'} :label=\${'Success'} />
    <Progress :value=\${55} :tone=\${'warn'} :label=\${'Warning'} />
    <Progress :value=\${28} :tone=\${'danger'} :label=\${'Danger'} />
  </Stack>
</view>`

export const labeled = `import Progress from '@jacare/ui/Progress'

export <view>
  <Progress :value=\${3} :max=\${5} :label=\${'Step 3 of 5'} />
</view>`

export const hideValue = `import Progress from '@jacare/ui/Progress'

export <view>
  <Progress :value=\${80} :label=\${'Uploading'} :showValue=\${false} />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import Progress from '@jacare/ui/Progress'",
    '',
    'export <view>',
    '  <Progress',
    `    :value=\${${Number(state.value) || 0}}`,
    `    :max=\${${Number(state.max) || 100}}`,
    `    :tone=\${'${state.tone}'}`,
  ]
  if (state.label) lines.push(`    :label=\${'${String(state.label).replace(/'/g, "\\'")}'}`)
  if (!state.showValue) lines.push('    :showValue=\${false}')
  lines.push('  />', '</view>')
  return lines.join('\n')
}
