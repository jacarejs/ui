export const shell = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:260px;overflow:hidden">
    <Container>
      <Header>Deployment center</Header>
      <Container :direction=\${'horizontal'}>
        <Aside :width=\${'150px'}>Environments</Aside>
        <Main :padding=\${'1rem'}>Release details</Main>
      </Container>
      <Footer>Version 2.4.0 · Production</Footer>
    </Container>
  </div>
</view>`

export const heights = `import Container from '@jacare/ui/Container'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:180px;overflow:hidden">
    <Container>
      <Main :padding=\${'1rem'}>Checkout summary</Main>
      <Footer :height=\${'48px'}>Secure checkout · USD</Footer>
    </Container>
  </div>
</view>`

export const links = `import Container from '@jacare/ui/Container'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:180px;overflow:hidden">
    <Container>
      <Main :padding=\${'1rem'}>Account settings</Main>
      <Footer :height=\${'52px'}><span>© Jacaré</span><nav aria-label="Legal" style="margin-left:auto">Privacy · Terms</nav></Footer>
    </Container>
  </div>
</view>`

export const actions = `import Container from '@jacare/ui/Container'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'
import Button from '@jacare/ui/Button'

export <view>
  <div style="height:190px;overflow:hidden">
    <Container>
      <Main :padding=\${'1rem'}>Review the pending changes.</Main>
      <Footer :height=\${'64px'}><span>3 changes</span><div style="margin-left:auto"><Button>Save changes</Button></div></Footer>
    </Container>
  </div>
</view>`
