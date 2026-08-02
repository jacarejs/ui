export const success = `import Button from '@jacare/ui/Button'
import Result from '@jacare/ui/Result'

export <view>
<Result :icon=\${'success'} :title=\${'Submitted'} :subTitle=\${'Your changes are saved.'}>
    <Button>Back to dashboard</Button>
  </Result>
</view>`

export const info = `import Result from '@jacare/ui/Result'

export <view>
<Result :icon=\${'info'} :title=\${'Update available'} :subTitle=\${'Version 2.4 can be installed now.'} />
</view>`

export const warning = `import Button from '@jacare/ui/Button'
import Result from '@jacare/ui/Result'

export <view>
<Result :icon=\${'warning'} :title=\${'Review required'} :subTitle=\${'Two fields need attention before publishing.'}>
    <Button>Review fields</Button>
  </Result>
</view>`

export const error = `import Button from '@jacare/ui/Button'
import Result from '@jacare/ui/Result'

export <view>
<Result :icon=\${'error'} :title=\${'Publish failed'} :subTitle=\${'Check your connection and try again.'}>
    <Button>Try again</Button>
  </Result>
</view>`

export const plain = `import Result from '@jacare/ui/Result'

export <view>
<Result :title=\${'All caught up'} :subTitle=\${'There are no pending reviews.'} />
</view>`
