export const shell = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:260px;overflow:hidden">
    <Container>
      <Header>Team workspace</Header>
      <Container :direction=\${'horizontal'}>
        <Aside :width=\${'176px'}>Projects and teams</Aside>
        <Main :padding=\${'1rem'}>Current project</Main>
      </Container>
      <Footer :height=\${'40px'}>Workspace footer</Footer>
    </Container>
  </div>
</view>`

export const widths = `import Container from '@jacare/ui/Container'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:200px;overflow:hidden">
    <Container :direction=\${'horizontal'}>
      <Aside :width=\${'120px'}>Compact nav</Aside>
      <Main :padding=\${'1rem'}>Content adapts to the remaining width.</Main>
    </Container>
  </div>
</view>`

export const inspector = `import Container from '@jacare/ui/Container'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:200px;overflow:hidden">
    <Container :direction=\${'horizontal'}>
      <Main :padding=\${'1rem'}>Canvas</Main>
      <Aside :width=\${'220px'}><div style="padding:1rem">Properties inspector</div></Aside>
    </Container>
  </div>
</view>`

export const scrolling = `import Container from '@jacare/ui/Container'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:180px;overflow:hidden">
    <Container :direction=\${'horizontal'}>
      <Aside :width=\${'180px'}><nav aria-label="Project files"><div style="height:360px;padding:1rem">Scrollable file navigation</div></nav></Aside>
      <Main :padding=\${'1rem'}>Editor stays in place</Main>
    </Container>
  </div>
</view>`
