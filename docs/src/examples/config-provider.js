export const density = `import ConfigProvider from '@jacare/ui/ConfigProvider'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

export <view>
      <Space :direction=\${'vertical'} :align=\${'stretch'}>
        <ConfigProvider :size=\${'small'}><Button>Compact action</Button></ConfigProvider>
        <ConfigProvider :size=\${'default'}><Button>Comfortable action</Button></ConfigProvider>
        <ConfigProvider :size=\${'large'}><Button>Spacious action</Button></ConfigProvider>
      </Space>
</view>`

export const theme = `import ConfigProvider from '@jacare/ui/ConfigProvider'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

export <view>
      <Space :wrap=\${true} :align=\${'stretch'}>
        <ConfigProvider :theme=\${'light'}><div class="docs-panel"><Button>Light scope</Button></div></ConfigProvider>
        <ConfigProvider :theme=\${'dark'}><div class="docs-panel"><Button>Dark scope</Button></div></ConfigProvider>
      </Space>
</view>`

export const locale = `import ConfigProvider from '@jacare/ui/ConfigProvider'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

export <view>
      <Space :wrap=\${true}>
        <ConfigProvider :locale=\${'en-US'}><Button :variant=\${'secondary'}>English scope</Button></ConfigProvider>
        <ConfigProvider :locale=\${'pt-BR'}><Button :variant=\${'secondary'}>Escopo português</Button></ConfigProvider>
      </Space>
</view>`

export const combined = `import ConfigProvider from '@jacare/ui/ConfigProvider'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

export <view>
  <ConfigProvider :size=\${'small'} :theme=\${'dark'} :locale=\${'pt-BR'}>
    <div class="docs-panel">
      <Space><Button>Salvar</Button><Button :variant=\${'secondary'}>Cancelar</Button></Space>
    </div>
  </ConfigProvider>
</view>`
