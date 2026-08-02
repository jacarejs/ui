const demoImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop stop-color=%22%23189030%22/%3E%3Cstop offset=%221%22 stop-color=%22%23003030%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22600%22 fill=%22url(%23g)%22/%3E%3Ccircle cx=%22220%22 cy=%22180%22 r=%22120%22 fill=%22%23ffffff%22 fill-opacity=%220.08%22/%3E%3Ccircle cx=%22960%22 cy=%22420%22 r=%22180%22 fill=%22%23ffffff%22 fill-opacity=%220.06%22/%3E%3C/svg%3E'

const warmImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Cdefs%3E%3ClinearGradient id=%22w%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop stop-color=%22%23c47a00%22/%3E%3Cstop offset=%221%22 stop-color=%22%235c2e00%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22600%22 fill=%22url(%23w)%22/%3E%3Ccircle cx=%22300%22 cy=%22240%22 r=%22140%22 fill=%22%23ffffff%22 fill-opacity=%220.1%22/%3E%3C/svg%3E'

const coolImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Cdefs%3E%3ClinearGradient id=%22c%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop stop-color=%22%231f6feb%22/%3E%3Cstop offset=%221%22 stop-color=%22%23091b3a%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22600%22 fill=%22url(%23c)%22/%3E%3Ccircle cx=%22900%22 cy=%22160%22 r=%22160%22 fill=%22%23ffffff%22 fill-opacity=%220.08%22/%3E%3C/svg%3E'

export { demoImage, warmImage, coolImage }

export const basic = `import Parallax from '@jacare/ui/Parallax'
import Text from '@jacare/ui/Text'

export <view>
  <Parallax
    :src=\${'${demoImage}'}
    :alt=\${'Forest gradient'}
    :height=\${320}
    :speed=\${0.45}
  >
    <Text :as=\${'h2'} :weight=\${'bold'}>Scroll to see depth</Text>
    <Text :tone=\${'muted'}>Background shifts as the band enters the viewport.</Text>
  </Parallax>
</view>`

export const overlay = `import Button from '@jacare/ui/Button'
import Parallax from '@jacare/ui/Parallax'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Parallax
    :src=\${'${demoImage}'}
    :alt=\${'Call to action'}
    :height=\${360}
    :speed=\${0.4}
  >
    <Text :as=\${'h2'} :weight=\${'bold'}>Build with Jacaré</Text>
    <Text :tone=\${'muted'}>Composable UI with tokens, motion, and accessible defaults.</Text>
    <Button>Get started</Button>
  </Parallax>
</view>`

export const reversed = `import Parallax from '@jacare/ui/Parallax'
import Text from '@jacare/ui/Text'

export <view>
  <Parallax
    :src=\${'${coolImage}'}
    :alt=\${'Reversed motion'}
    :height=\${280}
    :speed=\${0.55}
    :reversed=\${true}
  >
    <Text :as=\${'h2'} :weight=\${'bold'}>Reversed parallax</Text>
    <Text :tone=\${'muted'}>Motion runs opposite to scroll direction.</Text>
  </Parallax>
</view>`

export const speed = `import Parallax from '@jacare/ui/Parallax'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'lg'}>
    <Parallax :src=\${'${demoImage}'} :height=\${220} :speed=\${0.2}>
      <Text :weight=\${'bold'}>Mild (0.2)</Text>
    </Parallax>
    <Parallax :src=\${'${warmImage}'} :height=\${220} :speed=\${0.55}>
      <Text :weight=\${'bold'}>Medium (0.55)</Text>
    </Parallax>
    <Parallax :src=\${'${coolImage}'} :height=\${220} :speed=\${0.85}>
      <Text :weight=\${'bold'}>Strong (0.85)</Text>
    </Parallax>
  </Stack>
</view>`

export const heights = `import Parallax from '@jacare/ui/Parallax'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'lg'}>
    <Parallax :src=\${'${demoImage}'} :height=\${180} :speed=\${0.35}>
      <Text :weight=\${'bold'}>Compact band</Text>
    </Parallax>
    <Parallax :src=\${'${coolImage}'} :height=\${420} :speed=\${0.45}>
      <Text :as=\${'h2'} :weight=\${'bold'}>Tall feature band</Text>
      <Text :tone=\${'muted'}>Use taller heights for landing heroes.</Text>
    </Parallax>
  </Stack>
</view>`

export const scrims = `import Parallax from '@jacare/ui/Parallax'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'lg'}>
    <Parallax :src=\${'${demoImage}'} :height=\${220} :scrim=\${'dark'}>
      <Text :weight=\${'bold'}>Dark scrim</Text>
      <Text :tone=\${'muted'}>Default — light text on imagery.</Text>
    </Parallax>
    <Parallax :src=\${'${warmImage}'} :height=\${220} :scrim=\${'light'}>
      <Text :weight=\${'bold'}>Light scrim</Text>
      <Text :tone=\${'muted'}>Forest text on a washed surface.</Text>
    </Parallax>
    <Parallax :src=\${'${coolImage}'} :height=\${220} :scrim=\${'none'}>
      <Text :weight=\${'bold'}>No scrim</Text>
    </Parallax>
  </Stack>
</view>`

export const stacked = `import Parallax from '@jacare/ui/Parallax'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

export <view>
  <Stack :gap=\${'md'}>
    <Parallax :src=\${'${demoImage}'} :height=\${200} :speed=\${0.3}>
      <Text :weight=\${'bold'}>Tokens</Text>
    </Parallax>
    <Parallax :src=\${'${warmImage}'} :height=\${200} :speed=\${0.45} :reversed=\${true}>
      <Text :weight=\${'bold'}>Motion</Text>
    </Parallax>
    <Parallax :src=\${'${coolImage}'} :height=\${200} :speed=\${0.6}>
      <Text :weight=\${'bold'}>Accessibility</Text>
    </Parallax>
  </Stack>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import Button from '@jacare/ui/Button'",
    "import Parallax from '@jacare/ui/Parallax'",
    "import Text from '@jacare/ui/Text'",
    '',
    'export <view>',
    '  <Parallax',
    "    :src=${heroSrc}",
    `    :height=\${${Number(state.height) || 320}}`,
    `    :speed=\${${Number(state.speed) || 0.45}}`,
  ]
  if (state.reversed) lines.push('    :reversed=${true}')
  if (state.scrim && state.scrim !== 'dark') lines.push(`    :scrim=\${'${state.scrim}'}`)
  lines.push(
    '  >',
    "    <Text :as=${'h2'} :weight=${'bold'}>Scroll-linked imagery</Text>",
    "    <Text :tone=${'muted'}>Adjust speed, height, and scrim.</Text>",
    '    <Button>Explore docs</Button>',
    '  </Parallax>',
    '</view>',
  )
  return lines.join('\n')
}
