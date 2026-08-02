export const countries = [
  {
    name: 'Australia',
    code: 'AU',
    states: [
      {
        name: 'New South Wales',
        code: 'NSW',
        cities: [
          { cname: 'Sydney', code: 'A-SY' },
          { cname: 'Newcastle', code: 'A-NE' },
          { cname: 'Wollongong', code: 'A-WO' },
        ],
      },
      {
        name: 'Queensland',
        code: 'QLD',
        cities: [
          { cname: 'Brisbane', code: 'A-BR' },
          { cname: 'Townsville', code: 'A-TO' },
        ],
      },
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    states: [
      {
        name: 'Quebec',
        code: 'QC',
        cities: [
          { cname: 'Montreal', code: 'C-MO' },
          { cname: 'Quebec City', code: 'C-QU' },
        ],
      },
      {
        name: 'Ontario',
        code: 'ON',
        cities: [
          { cname: 'Ottawa', code: 'C-OT' },
          { cname: 'Toronto', code: 'C-TO' },
        ],
      },
    ],
  },
  {
    name: 'Brazil',
    code: 'BR',
    states: [
      {
        name: 'São Paulo',
        code: 'SP',
        cities: [
          { cname: 'São Paulo', code: 'B-SP' },
          { cname: 'Campinas', code: 'B-CA' },
        ],
      },
      {
        name: 'Rio de Janeiro',
        code: 'RJ',
        cities: [
          { cname: 'Rio de Janeiro', code: 'B-RJ' },
          { cname: 'Niterói', code: 'B-NI' },
        ],
      },
    ],
  },
]

export const basic = `import { pulse } from '@jacare/core'
import CascadeSelect from '@jacare/ui/CascadeSelect'

const value = pulse(null)
const countries = ${JSON.stringify(countries, null, 2)}

export <view>
  <CascadeSelect
    :label=\${'City'}
    :placeholder=\${'Select a City'}
    :options=\${countries}
    :optionLabel=\${'cname'}
    :optionValue=\${'code'}
    :optionGroupLabel=\${'name'}
    :optionGroupChildren=\${['states', 'cities']}
    bind-value=\${value}
  />
</view>`

export const loadingExample = `import { pulse } from '@jacare/core'
import CascadeSelect from '@jacare/ui/CascadeSelect'

const value = pulse(null)
const countries = []

export <view>
  <CascadeSelect
    :label=\${'City'}
    :placeholder=\${'Select a City'}
    :options=\${countries}
    :loading=\${true}
    bind-value=\${value}
  />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import CascadeSelect from '@jacare/ui/CascadeSelect'
import Stack from '@jacare/ui/Stack'

const small = pulse(null)
const medium = pulse(null)
const large = pulse(null)
const countries = ${JSON.stringify(countries, null, 2)}

export <view>
  <Stack :gap=\${'md'}>
    <CascadeSelect
      :label=\${'Small'}
      :size=\${'sm'}
      :placeholder=\${'Select a City'}
      :options=\${countries}
      :optionLabel=\${'cname'}
      :optionValue=\${'code'}
      :optionGroupLabel=\${'name'}
      :optionGroupChildren=\${['states', 'cities']}
      bind-value=\${small}
    />
    <CascadeSelect
      :label=\${'Normal'}
      :placeholder=\${'Select a City'}
      :options=\${countries}
      :optionLabel=\${'cname'}
      :optionValue=\${'code'}
      :optionGroupLabel=\${'name'}
      :optionGroupChildren=\${['states', 'cities']}
      bind-value=\${medium}
    />
    <CascadeSelect
      :label=\${'Large'}
      :size=\${'lg'}
      :placeholder=\${'Select a City'}
      :options=\${countries}
      :optionLabel=\${'cname'}
      :optionValue=\${'code'}
      :optionGroupLabel=\${'name'}
      :optionGroupChildren=\${['states', 'cities']}
      bind-value=\${large}
    />
  </Stack>
</view>`

export const fluidExample = `import { pulse } from '@jacare/core'
import CascadeSelect from '@jacare/ui/CascadeSelect'

const value = pulse(null)
const countries = ${JSON.stringify(countries, null, 2)}

export <view>
  <CascadeSelect
    :label=\${'City'}
    :fluid=\${true}
    :placeholder=\${'Select a City'}
    :options=\${countries}
    :optionLabel=\${'cname'}
    :optionValue=\${'code'}
    :optionGroupLabel=\${'name'}
    :optionGroupChildren=\${['states', 'cities']}
    bind-value=\${value}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import CascadeSelect from '@jacare/ui/CascadeSelect'
import Stack from '@jacare/ui/Stack'

const invalid = pulse(null)
const locked = pulse('B-SP')
const countries = ${JSON.stringify(countries, null, 2)}

export <view>
  <Stack :gap=\${'md'}>
    <CascadeSelect
      :label=\${'Required city'}
      :placeholder=\${'Select a City'}
      :options=\${countries}
      :optionLabel=\${'cname'}
      :optionValue=\${'code'}
      :optionGroupLabel=\${'name'}
      :optionGroupChildren=\${['states', 'cities']}
      :error=\${'Choose a city to continue'}
      bind-value=\${invalid}
    />
    <CascadeSelect
      :label=\${'Locked city'}
      :placeholder=\${'Select a City'}
      :options=\${countries}
      :optionLabel=\${'cname'}
      :optionValue=\${'code'}
      :optionGroupLabel=\${'name'}
      :optionGroupChildren=\${['states', 'cities']}
      :disabled=\${true}
      bind-value=\${locked}
    />
  </Stack>
</view>`
