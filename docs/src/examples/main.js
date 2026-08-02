export const shell = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:260px;overflow:hidden">
    <Container>
      <Header>Content studio</Header>
      <Container :direction=\${'horizontal'}>
        <Aside :width=\${'150px'}>Sections</Aside>
        <Main :padding=\${'1.5rem'}>Editable article content</Main>
      </Container>
      <Footer :height=\${'40px'}>Draft saved</Footer>
    </Container>
  </div>
</view>`

export const padding = `import Container from '@jacare/ui/Container'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:180px;overflow:hidden">
    <Container :direction=\${'horizontal'}>
      <Main>Edge-to-edge canvas</Main>
      <Main :padding=\${'2rem'}>Padded reading surface</Main>
    </Container>
  </div>
</view>`

export const scrolling = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:200px;overflow:hidden">
    <Container>
      <Header :height=\${'44px'}>Fixed header</Header>
      <Main :padding=\${'1rem'}><div style="height:420px">Main scrolls while the shell stays bounded.</div></Main>
    </Container>
  </div>
</view>`

export const reading = `import Container from '@jacare/ui/Container'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:180px;overflow:hidden">
    <Container>
      <Main :padding=\${'clamp(1rem, 4vw, 3rem)'}><article><h2>Release notes</h2><p>Responsive CSS padding keeps reading content comfortable across widths.</p></article></Main>
    </Container>
  </div>
</view>`
