export const shell = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:260px;overflow:hidden">
    <Container>
      <Header>Operations console</Header>
      <Container :direction=\${'horizontal'}>
        <Aside :width=\${'150px'}>Navigation</Aside>
        <Main :padding=\${'1rem'}>Service health</Main>
      </Container>
      <Footer :height=\${'40px'}>All systems operational</Footer>
    </Container>
  </div>
</view>`

export const heights = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:200px;overflow:hidden">
    <Container>
      <Header :height=\${'48px'}>Compact project header</Header>
      <Main :padding=\${'1rem'}>Project overview</Main>
    </Container>
  </div>
</view>`

export const navigation = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:200px;overflow:hidden">
    <Container>
      <Header><strong>Jacaré Cloud</strong><nav aria-label="Primary" style="margin-left:auto">Projects · Team · Settings</nav></Header>
      <Main :padding=\${'1rem'}>Workspace content</Main>
    </Container>
  </div>
</view>`

export const actions = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Main from '@jacare/ui/Main'
import Button from '@jacare/ui/Button'

export <view>
  <div style="height:200px;overflow:hidden">
    <Container>
      <Header :height=\${'64px'}><strong>Draft article</strong><div style="margin-left:auto"><Button>Publish</Button></div></Header>
      <Main :padding=\${'1rem'}>Article editor</Main>
    </Container>
  </div>
</view>`
