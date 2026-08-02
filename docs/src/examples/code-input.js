export const basic = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'

const code = pulse('console.log("hello")')

export <view>
  <CodeInput
    :label=\${'Snippet'}
    :language=\${'javascript'}
    :theme=\${'dark'}
    :placeholder=\${'Paste a short script…'}
    bind-value=\${code}
  />
</view>`

export const themes = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'

const code = pulse('export function greet(name) {\\n  return \`hi \${name}\`\\n}')
const theme = pulse('dark')
const themeOptions = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
]

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${theme} :options=\${themeOptions} />
    <CodeInput
      :label=\${'Theme preview'}
      :language=\${'javascript'}
      :theme=\${theme}
      :rows=\${6}
      bind-value=\${code}
    />
  </Stack>
</view>`

export const jsonValidation = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'

const payload = pulse('{ "ok": true, "items": [1, 2, 3] }')

export <view>
  <CodeInput
    :label=\${'Webhook payload'}
    :language=\${'json'}
    :validateJson=\${true}
    :hint=\${'Invalid JSON shows an inline parse error'}
    bind-value=\${payload}
  />
</view>`

export const invalidJson = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'

const broken = pulse('{ "ok": true, }')

export <view>
  <CodeInput
    :label=\${'Broken payload'}
    :language=\${'json'}
    :validateJson=\${true}
    :rows=\${6}
    bind-value=\${broken}
  />
</view>`

export const jacareSample = `import Button from '@jacare/ui/Button'

const ready = true

<Button :label="Save" />
#if ready
  <Text>ok</Text>
#end`

export const vueSample = ['<script setup>', 'const count = ref(0)', '</scr' + 'ipt>', '', '<tem' + 'plate>', '  <button @click="count++">{{ count }}</button>', '</tem' + 'plate>'].join('\n')

export const reactSample = `export function Hello({ name }) {
  return <h1 className="title">Hi {name}</h1>
}`

export const phpSample = `<?php
function greet($name) {
  echo "Hello {$name}";
}`

export const pythonSample = `def greet(name: str) -> str:
    return f"hi {name}"`

export const languages = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'
import Stack from '@jacare/ui/Stack'

const jacare = pulse('import Button from \\'@jacare/ui/Button\\'\\n\\nexport <view>\\n  <Button :label=\\"Save\\" on-click={submit} />\\n#if ready\\n  <Text>ok</Text>\\n#end\\n</view>')
const vue = pulse('<script setup>\\nconst count = ref(0)\\n</script>\\n\\n<template>\\n  <button @click=\\"count++\\">{{ count }}</button>\\n</template>')
const react = pulse('export function Hello({ name }) {\\n  return <h1 className=\\"title\\">Hi {name}</h1>\\n}')
const php = pulse('<?php\\nfunction greet($name) {\\n  echo \\"Hello {$name}\\";\\n}')
const python = pulse('def greet(name: str) -> str:\\n    return f\\"hi {name}\\"')
const js = pulse('export function sum(a, b) {\\n  return a + b\\n}')
const css = pulse('.card {\\n  padding: 1rem;\\n  border-radius: 8px;\\n}')
const sql = pulse('SELECT id, name\\nFROM users\\nWHERE active = true;')

export <view>
  <Stack :gap=\${'md'}>
    <CodeInput :label=\${'Jacaré'} :language=\${'jacare'} :rows=\${6} bind-value=\${jacare} />
    <CodeInput :label=\${'Vue'} :language=\${'vue'} :rows=\${7} bind-value=\${vue} />
    <CodeInput :label=\${'React'} :language=\${'react'} :rows=\${5} bind-value=\${react} />
    <CodeInput :label=\${'PHP'} :language=\${'php'} :rows=\${5} bind-value=\${php} />
    <CodeInput :label=\${'Python'} :language=\${'python'} :rows=\${4} bind-value=\${python} />
    <CodeInput :label=\${'JavaScript'} :language=\${'javascript'} :rows=\${5} bind-value=\${js} />
    <CodeInput :label=\${'CSS'} :language=\${'css'} :rows=\${5} bind-value=\${css} />
    <CodeInput :label=\${'SQL'} :language=\${'sql'} :rows=\${5} bind-value=\${sql} />
  </Stack>
</view>`

export const rowsExample = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'
import Stack from '@jacare/ui/Stack'

const compact = pulse('ok')
const tall = pulse('line 1\\nline 2\\nline 3\\nline 4\\nline 5')

export <view>
  <Stack :gap=\${'md'}>
    <CodeInput :label=\${'Compact'} :language=\${'text'} :rows=\${3} bind-value=\${compact} />
    <CodeInput :label=\${'Tall'} :language=\${'text'} :rows=\${12} bind-value=\${tall} />
  </Stack>
</view>`

export const requiredHint = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'

const config = pulse('')

export <view>
  <CodeInput
    :label=\${'App config'}
    :language=\${'json'}
    :required=\${true}
    :validateJson=\${true}
    :placeholder=\${'{ "theme": "light" }'}
    :hint=\${'Required before saving the form'}
    :rows=\${6}
    bind-value=\${config}
  />
</view>`

export const validateEvent = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'
import Text from '@jacare/ui/Text'

const payload = pulse('{ "count": 2 }')
const status = pulse('Waiting for edits')

export <view>
  <CodeInput
    :label=\${'API body'}
    :language=\${'json'}
    :validateJson=\${true}
    :rows=\${6}
    bind-value=\${payload}
    on-validate=\${(result) => status.set(result.valid ? 'JSON is valid' : \`Invalid: \${result.error}\`)}
  />
  <Text :tone=\${'muted'}>\${status}</Text>
</view>`

export const states = `import { pulse } from '@jacare/core'
import CodeInput from '@jacare/ui/CodeInput'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('not-json')
const locked = pulse('SELECT 1;')

export <view>
  <Stack :gap=\${'md'}>
    <CodeInput
      :label=\${'Manual error'}
      :language=\${'json'}
      :error=\${'Payload must be an object'}
      :rows=\${4}
      bind-value=\${invalid}
    />
    <CodeInput
      :label=\${'Read-only query'}
      :language=\${'sql'}
      :disabled=\${true}
      :rows=\${4}
      bind-value=\${locked}
    />
  </Stack>
</view>`
