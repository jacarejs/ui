export const basic = `import Grid from '@jacare/ui/Grid'

export <view>
  <div class="docs-demo-rows">
    <Grid :columns=\${'1'} :gap=\${'md'}>
      <div class="docs-cell">24</div>
    </Grid>
    <Grid :columns=\${'2'} :gap=\${'md'}>
      <div class="docs-cell">12</div>
      <div class="docs-cell">12</div>
    </Grid>
    <Grid :columns=\${'3'} :gap=\${'md'}>
      <div class="docs-cell">8</div>
      <div class="docs-cell">8</div>
      <div class="docs-cell">8</div>
    </Grid>
    <Grid :columns=\${'4'} :gap=\${'md'}>
      <div class="docs-cell">6</div>
      <div class="docs-cell">6</div>
      <div class="docs-cell">6</div>
      <div class="docs-cell">6</div>
    </Grid>
    <Grid :columns=\${'6'} :gap=\${'md'}>
      <div class="docs-cell">4</div>
      <div class="docs-cell">4</div>
      <div class="docs-cell">4</div>
      <div class="docs-cell">4</div>
      <div class="docs-cell">4</div>
      <div class="docs-cell">4</div>
    </Grid>
  </div>
</view>`

export const columns = `import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'4'} :gap=\${'sm'}>
    <div class="docs-cell">A</div>
    <div class="docs-cell docs-cell--accent">B</div>
    <div class="docs-cell">C</div>
    <div class="docs-cell">D</div>
  </Grid>
</view>`

export const gaps = `import Grid from '@jacare/ui/Grid'

export <view>
  <div class="docs-demo-rows">
    <Grid :columns=\${'4'} :gap=\${'sm'}>
      <div class="docs-cell">sm</div>
      <div class="docs-cell">sm</div>
      <div class="docs-cell">sm</div>
      <div class="docs-cell">sm</div>
    </Grid>
    <Grid :columns=\${'4'} :gap=\${'lg'}>
      <div class="docs-cell">lg</div>
      <div class="docs-cell">lg</div>
      <div class="docs-cell">lg</div>
      <div class="docs-cell">lg</div>
    </Grid>
  </div>
</view>`

export const align = `import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'3'} :gap=\${'md'} :align=\${'center'}>
    <div class="docs-cell" style="min-height:4.5rem">Tall</div>
    <div class="docs-cell">Mid</div>
    <div class="docs-cell" style="min-height:2.5rem">Short</div>
  </Grid>
</view>`

export const auto = `import Card from '@jacare/ui/Card'
import Grid from '@jacare/ui/Grid'
import Text from '@jacare/ui/Text'

export <view>
  <Grid :columns=\${'auto'} :gap=\${'md'}>
    <Card :title=\${'Tokens'} :subtitle=\${'Foundations'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Brand and semantic colors</Text>
    </Card>
    <Card :title=\${'Flex'} :subtitle=\${'Layout'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Axis positioning</Text>
    </Card>
    <Card :title=\${'Grid'} :subtitle=\${'Layout'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Track positioning</Text>
    </Card>
  </Grid>
</view>`

export const dense = `import Grid from '@jacare/ui/Grid'

export <view>
  <Grid :columns=\${'4'} :gap=\${'sm'} :dense=\${true}>
    <div class="docs-cell docs-cell--accent" style="grid-column: span 2">Wide</div>
    <div class="docs-cell">1</div>
    <div class="docs-cell">2</div>
    <div class="docs-cell">3</div>
    <div class="docs-cell">4</div>
  </Grid>
</view>`

export function playgroundCode(state = {}) {
  const columns = state.columns ?? '3'
  const gap = state.gap ?? 'md'
  const align = state.align ?? 'stretch'
  const justify = state.justify ?? 'stretch'
  const dense = Boolean(state.dense)

  return `import Grid from '@jacare/ui/Grid'

export <view>
  <Grid
    :columns=\${'${columns}'}
    :gap=\${'${gap}'}
    :align=\${'${align}'}
    :justify=\${'${justify}'}
    :dense=\${${dense}}
  >
    <div class="docs-cell">A</div>
    <div class="docs-cell">B</div>
    <div class="docs-cell">C</div>
    <div class="docs-cell">D</div>
  </Grid>
</view>`
}
