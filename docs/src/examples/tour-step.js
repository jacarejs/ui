export const copy = `import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'

export <view>
   <Tour :open=\${true}>
    <TourStep :title=\${'Welcome'} :description=\${'This starts the guided flow.'} />
    <TourStep :title=\${'Next step'} :description=\${'Keep each step focused on one action.'} />
   </Tour>
</view>`

export const targeted = `import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'
import Button from '@jacare/ui/Button'

export <view>
  <div>
    <Button id="create-project">Create project</Button>
    <Tour :open=\${true}>
      <TourStep :selector=\${'#create-project'} :title=\${'Create a project'} :description=\${'Start by naming your workspace.'} />
    </Tour>
  </div>
</view>`

export const sequence = `import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'

export <view>
  <Tour :open=\${true}>
    <TourStep :selector=\${'#navigation'} :title=\${'Navigation'} :description=\${'Move between project areas.'} />
    <TourStep :selector=\${'#content'} :title=\${'Content'} :description=\${'Review the selected resource.'} />
    <TourStep :selector=\${'#actions'} :title=\${'Actions'} :description=\${'Save or publish your changes.'} />
  </Tour>
</view>`

export const optionalCopy = `import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'

export <view>
  <Tour :open=\${true}>
    <TourStep :title=\${'Keyboard shortcuts'} />
    <TourStep :description=\${'You can omit the title when the instruction stands on its own.'} />
  </Tour>
</view>`
