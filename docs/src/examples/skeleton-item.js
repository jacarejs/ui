export const text = `import Skeleton from '@jacare/ui/Skeleton'
import SkeletonItem from '@jacare/ui/SkeletonItem'

export <view>
  <Skeleton :animated=\${true}>
    <div style="display:grid;gap:0.6rem">
      <SkeletonItem :variant=\${'text'} />
      <SkeletonItem :variant=\${'text'} />
      <SkeletonItem :variant=\${'text'} />
    </div>
  </Skeleton>
</view>`

export const mediaCard = `import Skeleton from '@jacare/ui/Skeleton'
import SkeletonItem from '@jacare/ui/SkeletonItem'

export <view>
  <Skeleton :animated=\${true}>
    <div style="display:grid;gap:0.75rem">
      <SkeletonItem :variant=\${'image'} />
      <SkeletonItem :variant=\${'text'} />
      <SkeletonItem :variant=\${'button'} />
    </div>
  </Skeleton>
</view>`

export const profile = `import Skeleton from '@jacare/ui/Skeleton'
import SkeletonItem from '@jacare/ui/SkeletonItem'

export <view>
  <Skeleton>
    <div style="display:flex;align-items:center;gap:0.75rem">
      <SkeletonItem :variant=\${'circle'} />
      <div style="display:grid;gap:0.5rem;flex:1">
        <SkeletonItem :variant=\${'text'} />
        <SkeletonItem :variant=\${'rect'} />
      </div>
    </div>
  </Skeleton>
</view>`
