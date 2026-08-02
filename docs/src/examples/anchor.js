export const basic = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:9.5rem 1fr;gap:1rem;height:220px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :offset=\${12}>
      <AnchorLink :href=\${'#anchor-basic-overview'}>Overview</AnchorLink>
      <AnchorLink :href=\${'#anchor-basic-usage'}>Usage</AnchorLink>
      <AnchorLink :href=\${'#anchor-basic-api'}>API</AnchorLink>
    </Anchor>
    <div style="overflow:auto;min-height:0;padding-right:0.35rem">
      <section id="anchor-basic-overview" style="min-height:140px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Overview</h4>
        <p style="margin:0;color:var(--j-muted)">Click a link or scroll this panel.</p>
      </section>
      <section id="anchor-basic-usage" style="min-height:140px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Usage</h4>
        <p style="margin:0;color:var(--j-muted)">AnchorLink scrolls inside the nearest scroll container.</p>
      </section>
      <section id="anchor-basic-api" style="min-height:140px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">API</h4>
        <p style="margin:0;color:var(--j-muted)">Match each href to a unique section id.</p>
      </section>
    </div>
  </div>
</view>`

export const horizontal = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;gap:0.75rem;height:220px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :direction=\${'horizontal'} :offset=\${8} :marker=\${false}>
      <AnchorLink :href=\${'#anchor-h-overview'} :title=\${'Overview'} />
      <AnchorLink :href=\${'#anchor-h-api'} :title=\${'API'} />
      <AnchorLink :href=\${'#anchor-h-a11y'} :title=\${'Accessibility'} />
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="anchor-h-overview" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Overview</h4>
        <p style="margin:0;color:var(--j-muted)">Horizontal anchors sit above the content.</p>
      </section>
      <section id="anchor-h-api" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">API</h4>
        <p style="margin:0;color:var(--j-muted)">title labels the link when the slot is empty.</p>
      </section>
      <section id="anchor-h-a11y" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Accessibility</h4>
        <p style="margin:0;color:var(--j-muted)">Active links expose aria-current=location.</p>
      </section>
    </div>
  </div>
</view>`

export const underline = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;gap:0.75rem;height:200px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :direction=\${'horizontal'} :type=\${'underline'} :offset=\${8} :marker=\${false}>
      <AnchorLink :href=\${'#anchor-u-start'}>Start</AnchorLink>
      <AnchorLink :href=\${'#anchor-u-reference'}>Reference</AnchorLink>
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="anchor-u-start" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Start</h4>
        <p style="margin:0;color:var(--j-muted)">Underline type keeps a classic link look.</p>
      </section>
      <section id="anchor-u-reference" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Reference</h4>
        <p style="margin:0;color:var(--j-muted)">Scroll or click to move between sections.</p>
      </section>
    </div>
  </div>
</view>`

export const offset = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:11rem 1fr;gap:0;height:240px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">
    <div style="padding:0.75rem;border-right:1px solid var(--j-border)">
      <Anchor :offset=\${48}>
        <AnchorLink :href=\${'#anchor-off-overview'}>Overview</AnchorLink>
        <AnchorLink :href=\${'#anchor-off-api'}>API</AnchorLink>
      </Anchor>
    </div>
    <div style="position:relative;min-height:0;display:grid;grid-template-rows:auto 1fr">
      <div style="position:sticky;top:0;z-index:1;padding:0.55rem 0.75rem;background:var(--j-surface-2);border-bottom:1px solid var(--j-border);font-size:0.85rem;font-weight:600">
        Sticky header (offset 48)
      </div>
      <div style="overflow:auto;min-height:0;padding:0.75rem">
        <section id="anchor-off-overview" style="min-height:150px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">Overview</h4>
          <p style="margin:0;color:var(--j-muted)">offset keeps the heading clear of the sticky bar.</p>
        </section>
        <section id="anchor-off-api" style="min-height:150px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">API</h4>
          <p style="margin:0;color:var(--j-muted)">Use the same offset value as your sticky header height.</p>
        </section>
      </div>
    </div>
  </div>
</view>`

export const nested = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:11rem 1fr;gap:1rem;height:260px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :offset=\${12}>
      <AnchorLink :href=\${'#anchor-n-guide'}>Guide</AnchorLink>
      <AnchorLink :href=\${'#anchor-n-install'} :level=\${2}>Install</AnchorLink>
      <AnchorLink :href=\${'#anchor-n-configure'} :level=\${2}>Configure</AnchorLink>
      <AnchorLink :href=\${'#anchor-n-api'}>API</AnchorLink>
      <AnchorLink :href=\${'#anchor-n-props'} :level=\${2}>Props</AnchorLink>
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="anchor-n-guide" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Guide</h4>
        <p style="margin:0;color:var(--j-muted)">Top-level section.</p>
      </section>
      <section id="anchor-n-install" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Install</h4>
        <p style="margin:0;color:var(--j-muted)">Nested with level=2.</p>
      </section>
      <section id="anchor-n-configure" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Configure</h4>
        <p style="margin:0;color:var(--j-muted)">Another nested link.</p>
      </section>
      <section id="anchor-n-api" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">API</h4>
        <p style="margin:0;color:var(--j-muted)">Back to level 1.</p>
      </section>
      <section id="anchor-n-props" style="min-height:110px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Props</h4>
        <p style="margin:0;color:var(--j-muted)">Nested under API.</p>
      </section>
    </div>
  </div>
</view>`

export const affix = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:10rem 1fr;gap:1rem;height:260px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">
    <div style="overflow:auto;padding:0.75rem;border-right:1px solid var(--j-border)">
      <Anchor :affix=\${true} :offset=\${12}>
        <AnchorLink :href=\${'#anchor-a-one'}>One</AnchorLink>
        <AnchorLink :href=\${'#anchor-a-two'}>Two</AnchorLink>
        <AnchorLink :href=\${'#anchor-a-three'}>Three</AnchorLink>
      </Anchor>
      <p style="margin:8rem 0 0;color:var(--j-muted);font-size:0.8rem">Sidebar scroll filler</p>
    </div>
    <div style="overflow:auto;min-height:0;padding:0.75rem">
      <section id="anchor-a-one" style="min-height:140px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">One</h4>
        <p style="margin:0;color:var(--j-muted)">affix keeps the nav sticky while its column scrolls.</p>
      </section>
      <section id="anchor-a-two" style="min-height:140px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Two</h4>
        <p style="margin:0;color:var(--j-muted)">Active link still tracks the content scroller.</p>
      </section>
      <section id="anchor-a-three" style="min-height:140px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Three</h4>
        <p style="margin:0;color:var(--j-muted)">Pair affix with offset for sticky page headers.</p>
      </section>
    </div>
  </div>
</view>`

export const noMarker = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:9.5rem 1fr;gap:1rem;height:200px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :marker=\${false} :offset=\${8}>
      <AnchorLink :href=\${'#anchor-m-a'}>Alpha</AnchorLink>
      <AnchorLink :href=\${'#anchor-m-b'}>Beta</AnchorLink>
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="anchor-m-a" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Alpha</h4>
        <p style="margin:0;color:var(--j-muted)">marker=false removes the vertical rail.</p>
      </section>
      <section id="anchor-m-b" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Beta</h4>
        <p style="margin:0;color:var(--j-muted)">Active state still uses background highlight.</p>
      </section>
    </div>
  </div>
</view>`

export const bounds = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:9.5rem 1fr;gap:1rem;height:220px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :offset=\${8} :bounds=\${48}>
      <AnchorLink :href=\${'#anchor-b-start'}>Start</AnchorLink>
      <AnchorLink :href=\${'#anchor-b-middle'}>Middle</AnchorLink>
      <AnchorLink :href=\${'#anchor-b-end'}>End</AnchorLink>
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="anchor-b-start" style="min-height:130px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Start</h4>
        <p style="margin:0;color:var(--j-muted)">bounds adds slack before the next section becomes active.</p>
      </section>
      <section id="anchor-b-middle" style="min-height:130px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Middle</h4>
        <p style="margin:0;color:var(--j-muted)">Useful when headings sit under sticky chrome.</p>
      </section>
      <section id="anchor-b-end" style="min-height:130px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">End</h4>
        <p style="margin:0;color:var(--j-muted)">Scroll slowly to feel the delayed activation.</p>
      </section>
    </div>
  </div>
</view>`

export const changeEvent = `import { pulse } from '@jacare/core'
import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'
import Text from '@jacare/ui/Text'

const active = pulse('#anchor-c-intro')

export <view>
  <div style="display:grid;gap:0.75rem">
    <Text :tone=\${'muted'}>Active: \${() => active() || '—'}</Text>
    <div style="display:grid;grid-template-columns:9.5rem 1fr;gap:1rem;height:220px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
      <Anchor :offset=\${12} on-change=\${(href) => active.set(href)}>
        <AnchorLink :href=\${'#anchor-c-intro'}>Intro</AnchorLink>
        <AnchorLink :href=\${'#anchor-c-details'}>Details</AnchorLink>
        <AnchorLink :href=\${'#anchor-c-faq'}>FAQ</AnchorLink>
      </Anchor>
      <div style="overflow:auto;min-height:0">
        <section id="anchor-c-intro" style="min-height:130px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">Intro</h4>
          <p style="margin:0;color:var(--j-muted)">change emits the active href.</p>
        </section>
        <section id="anchor-c-details" style="min-height:130px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">Details</h4>
          <p style="margin:0;color:var(--j-muted)">Use it to sync secondary UI.</p>
        </section>
        <section id="anchor-c-faq" style="min-height:130px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">FAQ</h4>
          <p style="margin:0;color:var(--j-muted)">Fires on click and on scroll spy updates.</p>
        </section>
      </div>
    </div>
  </div>
</view>`
