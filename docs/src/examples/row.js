export const basic = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
      <Row :gutter=\${16}><Col :span=\${12}><div class="docs-panel">Half</div></Col><Col :span=\${12}><div class="docs-panel">Half</div></Col></Row>
</view>`

export const justify = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
      <Row :gutter=\${12} :justify=\${'between'}><Col :span=\${6}><div class="docs-panel">Start</div></Col><Col :span=\${6}><div class="docs-panel">End</div></Col></Row>
</view>`

export const align = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
      <Row :gutter=\${12} :align=\${'middle'}>
        <Col :span=\${8}><div class="docs-panel" style="min-height:48px">Short</div></Col>
        <Col :span=\${8}><div class="docs-panel" style="min-height:96px">Tall</div></Col>
        <Col :span=\${8}><div class="docs-panel" style="min-height:64px">Medium</div></Col>
      </Row>
</view>`

export const evenly = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
  <Row :gutter=\${'0.75rem'} :justify=\${'evenly'} :align=\${'bottom'}>
    <Col :span=\${5}><div class="docs-panel" style="min-height:48px">One</div></Col>
    <Col :span=\${5}><div class="docs-panel" style="min-height:80px">Two</div></Col>
    <Col :span=\${5}><div class="docs-panel" style="min-height:64px">Three</div></Col>
  </Row>
</view>`
