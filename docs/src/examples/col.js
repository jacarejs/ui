export const basic = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
      <Row :gutter=\${16}><Col :span=\${8}><div class="docs-panel">8</div></Col><Col :span=\${8}><div class="docs-panel">8</div></Col><Col :span=\${8}><div class="docs-panel">8</div></Col></Row>
</view>`

export const offset = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
      <Row :gutter=\${16}><Col :span=\${8} :offset=\${4}><div class="docs-panel">8 with offset 4</div></Col><Col :span=\${8}><div class="docs-panel">8</div></Col></Row>
</view>`

export const responsive = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
      <Row :gutter=\${16}>
        <Col :span=\${6} :xs=\${24} :sm=\${12} :md=\${8} :lg=\${6} :xl=\${4}><div class="docs-panel">Responsive A</div></Col>
        <Col :span=\${18} :xs=\${24} :sm=\${12} :md=\${16} :lg=\${18} :xl=\${20}><div class="docs-panel">Responsive B</div></Col>
      </Row>
</view>`

export const mixed = `import Row from '@jacare/ui/Row'
import Col from '@jacare/ui/Col'

export <view>
  <Row :gutter=\${'1rem'}>
    <Col :span=\${24} :sm=\${8}><div class="docs-panel">Navigation</div></Col>
    <Col :span=\${24} :sm=\${16}><div class="docs-panel">Content</div></Col>
  </Row>
</view>`
