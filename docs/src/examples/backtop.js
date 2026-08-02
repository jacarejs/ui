export const basic = `import Backtop from '@jacare/ui/Backtop'

export <view>
  <p>Scroll the page beyond 200px to reveal the control.</p>
  <Backtop :visibilityHeight=\${200} :right=\${40} :bottom=\${40} />
</view>`

export const position = `import Backtop from '@jacare/ui/Backtop'

export <view>
  <p>right and bottom set the fixed inset from the viewport edges.</p>
  <Backtop :visibilityHeight=\${0} :right=\${24} :bottom=\${112} />
</view>`

export const target = `import Backtop from '@jacare/ui/Backtop'

export <view>
  <div class="backtop-demo-target" style="height:160px;overflow:auto;border:1px solid var(--j-border);padding:0.75rem">
    <div style="height:420px">Scroll this panel, then use the fixed back-to-top control.</div>
    <Backtop
      :visibilityHeight=\${80}
      :right=\${104}
      :bottom=\${40}
      :scrollTarget=\${'.backtop-demo-target'}
    />
  </div>
</view>`

export const immediate = `import Backtop from '@jacare/ui/Backtop'

export <view>
  <p>A zero threshold keeps the control available from the start.</p>
  <Backtop
    :visibilityHeight=\${0}
    :right=\${24}
    :bottom=\${112}
    on-click=\${() => console.log('Returned to top')}
  />
</view>`
