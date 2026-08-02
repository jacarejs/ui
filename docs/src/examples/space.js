export const basic = `import Space from '@jacare/ui/Space'
import Button from '@jacare/ui/Button'

export <view>
      <Space><Button>Save</Button><Button :variant=\${'secondary'}>Cancel</Button><Button :variant=\${'ghost'}>Help</Button></Space>
</view>`

export const vertical = `import Space from '@jacare/ui/Space'
import Button from '@jacare/ui/Button'

export <view>
      <Space :direction=\${'vertical'} :size=\${'lg'} :align=\${'stretch'}>
        <Button>Primary action</Button><Button :variant=\${'secondary'}>Secondary action</Button><Button :variant=\${'ghost'}>Tertiary action</Button>
      </Space>
</view>`

export const wrap = `import Space from '@jacare/ui/Space'
import Button from '@jacare/ui/Button'

export <view>
      <Space :wrap=\${true} :size=\${'12px'} :align=\${'baseline'}>
        <Button :size=\${'sm'}>Small</Button><Button>Medium</Button><Button :size=\${'lg'}>Large</Button><Button :variant=\${'secondary'}>Another action</Button>
      </Space>
</view>`

export const sizes = `import Space from '@jacare/ui/Space'
import Button from '@jacare/ui/Button'

export <view>
  <Space :direction=\${'vertical'} :align=\${'start'}>
    <Space :size=\${'sm'}><Button :size=\${'sm'}>Small gap</Button><Button :size=\${'sm'}>Action</Button></Space>
    <Space :size=\${'md'}><Button :size=\${'sm'}>Medium gap</Button><Button :size=\${'sm'}>Action</Button></Space>
    <Space :size=\${'lg'}><Button :size=\${'sm'}>Large gap</Button><Button :size=\${'sm'}>Action</Button></Space>
  </Space>
</view>`
