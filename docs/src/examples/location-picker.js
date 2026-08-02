export const basic = `import { pulse } from '@jacare/core'
import LocationPicker from '@jacare/ui/LocationPicker'

const coords = pulse({ lat: -23.5505, lng: -46.6333 })

export <view>
  <LocationPicker :label=\${'Store location'} bind-value=\${coords} />
</view>`

export const empty = `import { pulse } from '@jacare/core'
import LocationPicker from '@jacare/ui/LocationPicker'

const coords = pulse(null)

export <view>
  <LocationPicker
    :label=\${'Delivery drop-off'}
    :hint=\${'Type coordinates or use the locate button — map link appears when both fields are set'}
    bind-value=\${coords}
  />
</view>`

export const locateLabel = `import { pulse } from '@jacare/core'
import LocationPicker from '@jacare/ui/LocationPicker'

const coords = pulse({ lat: -22.9068, lng: -43.1729 })

export <view>
  <LocationPicker
    :label=\${'Event venue'}
    :locateLabel=\${'Detect my position'}
    bind-value=\${coords}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import LocationPicker from '@jacare/ui/LocationPicker'
import Stack from '@jacare/ui/Stack'

const hinted = pulse(null)
const invalid = pulse({ lat: '', lng: '' })

export <view>
  <Stack :gap=\${'lg'}>
    <LocationPicker
      :label=\${'Warehouse'}
      :hint=\${'WGS84 decimals — OpenStreetMap opens when both values are present'}
      bind-value=\${hinted}
    />
    <LocationPicker
      :label=\${'Pickup point'}
      :error=\${'Latitude and longitude are required'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import LocationPicker from '@jacare/ui/LocationPicker'

const locked = pulse({ lat: -15.7939, lng: -47.8828 })

export <view>
  <LocationPicker
    :label=\${'HQ coordinates'}
    :disabled=\${true}
    :hint=\${'Locked after the site was verified'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import LocationPicker from '@jacare/ui/LocationPicker'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const coords = pulse({ lat: -3.119, lng: -60.0217 })

function summary(value) {
  if (!value || value.lat == null || value.lng == null || value.lat === '' || value.lng === '') {
    return 'No coordinates selected'
  }
  return \`lat \${value.lat}, lng \${value.lng}\`
}

export <view>
  <Stack :gap=\${'md'}>
    <LocationPicker
      :label=\${'Branch office'}
      :locateLabel=\${'Use device GPS'}
      bind-value=\${coords}
    />
    <Text :tone=\${'muted'}>
      \${() => summary(coords())}
    </Text>
  </Stack>
</view>`
