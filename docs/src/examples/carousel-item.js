export const contentSlides = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
   <Carousel :autoplay=\${false} :arrow=\${'always'}>
    <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-mint)">Overview</div></CarouselItem>
    <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-surface-2)">Usage</div></CarouselItem>
    <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-leaf);color:#ffffff">Ship</div></CarouselItem>
   </Carousel>
</view>`

export const fixedHeight = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :height=\${'260px'} :autoplay=\${false} :indicatorPosition=\${'outside'}>
    <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-mint)">First release</div></CarouselItem>
    <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-surface-2)">Second release</div></CarouselItem>
  </Carousel>
</view>`

export const initialSlide = `import Carousel from '@jacare/ui/Carousel'
import CarouselItem from '@jacare/ui/CarouselItem'

export <view>
  <Carousel :autoplay=\${false} :initialIndex=\${1} :arrow=\${'always'}>
    <CarouselItem><div style="display:grid;place-items:center;height:100%">Draft</div></CarouselItem>
    <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-leaf);color:white">Published</div></CarouselItem>
    <CarouselItem><div style="display:grid;place-items:center;height:100%">Archived</div></CarouselItem>
  </Carousel>
</view>`
