export const shell = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'
import Footer from '@jacare/ui/Footer'

export <view>
  <div style="height:280px;overflow:hidden">
    <Container>
      <Header>Analytics workspace</Header>
      <Container :direction=\${'horizontal'}>
        <Aside :width=\${'180px'}>Navigation</Aside>
        <Main :padding=\${'1.25rem'}>Dashboard content</Main>
      </Container>
      <Footer :height=\${'44px'}>Last synced moments ago</Footer>
    </Container>
  </div>
</view>`

export const directions = `import Container from '@jacare/ui/Container'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:220px;overflow:hidden">
    <Container :direction=\${'horizontal'}>
      <Main :padding=\${'1rem'}>Primary workspace</Main>
      <Container>
        <Main :padding=\${'1rem'}>Inspector</Main>
        <Main :padding=\${'1rem'}>Activity</Main>
      </Container>
    </Container>
  </div>
</view>`

export const splitWorkspace = `import Container from '@jacare/ui/Container'
import Aside from '@jacare/ui/Aside'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:220px;overflow:hidden">
    <Container :direction=\${'horizontal'}>
      <Aside :width=\${'160px'}>Files</Aside>
      <Main :padding=\${'1rem'}>Editor</Main>
      <Aside :width=\${'200px'}>Inspector</Aside>
    </Container>
  </div>
</view>`

export const stacked = `import Container from '@jacare/ui/Container'
import Header from '@jacare/ui/Header'
import Main from '@jacare/ui/Main'

export <view>
  <div style="height:220px;overflow:hidden">
    <Container>
      <Header :height=\${'44px'}>Report</Header>
      <Main :padding=\${'1rem'}>Summary</Main>
      <Main :padding=\${'1rem'}>Details</Main>
    </Container>
  </div>
</view>`
