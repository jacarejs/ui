export const basic = `import { pulse } from '@jacare/core'
import Tree from '@jacare/ui/Tree'
const data = [
  {
    value: 'docs',
    label: 'Documentation',
    children: [
      { value: 'install', label: 'Installation' },
      { value: 'theme', label: 'Theme' },
      {
        value: 'components',
        label: 'Components',
        children: [
          { value: 'forms', label: 'Forms' },
          { value: 'display', label: 'Data display' },
        ],
      },
    ],
  },
  { value: 'changelog', label: 'Changelog' },
]
const selected = pulse('theme')

export <view>
<Tree :data=\${data} bind-value=\${selected} />
</view>`

export const expanded = `import Tree from '@jacare/ui/Tree'
const data = [
  {
    value: 'docs',
    label: 'Documentation',
    children: [
      { value: 'install', label: 'Installation' },
      { value: 'theme', label: 'Theme' },
      {
        value: 'components',
        label: 'Components',
        children: [
          { value: 'forms', label: 'Forms' },
          { value: 'display', label: 'Data display' },
        ],
      },
    ],
  },
  { value: 'changelog', label: 'Changelog' },
]

export <view>
<Tree :data=\${data} :value=\${'display'} :defaultExpandAll=\${true} />
</view>`

export const checkboxes = `import { pulse } from '@jacare/core'
import Tree from '@jacare/ui/Tree'
const data = [
  {
    value: 'docs',
    label: 'Documentation',
    children: [
      { value: 'install', label: 'Installation' },
      { value: 'theme', label: 'Theme' },
      {
        value: 'components',
        label: 'Components',
        children: [
          { value: 'forms', label: 'Forms' },
          { value: 'display', label: 'Data display' },
        ],
      },
    ],
  },
  { value: 'changelog', label: 'Changelog' },
]
const selected = pulse(['install', 'theme'])

export <view>
<Tree :data=\${data} bind-value=\${selected} :showCheckbox=\${true} :defaultExpandAll=\${true} />
</view>`

export const accordion = `import { pulse } from '@jacare/core'
import Tree from '@jacare/ui/Tree'
const data = [
  {
    value: 'docs',
    label: 'Documentation',
    children: [
      { value: 'install', label: 'Installation' },
      { value: 'theme', label: 'Theme' },
      {
        value: 'components',
        label: 'Components',
        children: [
          { value: 'forms', label: 'Forms' },
          { value: 'display', label: 'Data display' },
        ],
      },
    ],
  },
  { value: 'changelog', label: 'Changelog' },
]
const selected = pulse('theme')

export <view>
<Tree :data=\${data} bind-value=\${selected} :accordion=\${true} />
</view>`

export const compact = `import Tree from '@jacare/ui/Tree'
const data = [
  {
    value: 'docs',
    label: 'Documentation',
    children: [
      { value: 'install', label: 'Installation' },
      { value: 'theme', label: 'Theme' },
      {
        value: 'components',
        label: 'Components',
        children: [
          { value: 'forms', label: 'Forms' },
          { value: 'display', label: 'Data display' },
        ],
      },
    ],
  },
  { value: 'changelog', label: 'Changelog' },
]

export <view>
<Tree :data=\${data} :value=\${'changelog'} />
</view>`
