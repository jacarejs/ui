export const basic = `import PageHeader from '@jacare/ui/PageHeader'

export <view>
  <PageHeader :title=\${'Projects'} :content=\${'Release notes'} />
</view>`

export const body = `import PageHeader from '@jacare/ui/PageHeader'

export <view>
  <PageHeader :title=\${'Dashboard'} :content=\${'Account'}>
    <p>Manage profile, security, and notification preferences.</p>
  </PageHeader>
</view>`

export const without_icon = `import PageHeader from '@jacare/ui/PageHeader'

export <view>
  <PageHeader :title=\${'All projects'} :content=\${'Archived'} :showIcon=\${false} />
</view>`

export const back_event = `import { pulse } from '@jacare/core'
import PageHeader from '@jacare/ui/PageHeader'

const destination = pulse('Current page')

export <view>
  <PageHeader :title=\${'Back'} :content=\${destination} on-back=\${() => destination.set('Projects')} />
</view>`

export const complete = `import PageHeader from '@jacare/ui/PageHeader'

export <view>
  <PageHeader :title=\${'Projects'} :content=\${'Release 2.0'} :showIcon=\${true} on-back=\${() => history.back()}>
    <div>
      <p>Review the release summary before publishing.</p>
      <dl>
        <dt>Owner</dt><dd>Platform team</dd>
        <dt>Status</dt><dd>Ready for review</dd>
      </dl>
    </div>
  </PageHeader>
</view>`

export const text_only = `import PageHeader from '@jacare/ui/PageHeader'

export <view>
  <PageHeader :title=\${'Settings'} :showIcon=\${false}>
    <p>Choose a section from the navigation.</p>
  </PageHeader>
</view>`
