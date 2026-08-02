export const titles = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:8rem 1fr;gap:1rem;height:200px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :offset=\${12}>
      <AnchorLink :href=\${'#alink-intro'} :title=\${'Intro'} />
      <AnchorLink :href=\${'#alink-usage'} :title=\${'Usage'} />
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="alink-intro" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Intro</h4>
        <p style="margin:0;color:var(--j-muted)">Jump between sections in long documents.</p>
      </section>
      <section id="alink-usage" style="min-height:120px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Usage</h4>
        <p style="margin:0;color:var(--j-muted)">Anchor links can account for sticky headers with an offset.</p>
      </section>
    </div>
  </div>
</view>`

export const slotLabels = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;gap:0.75rem;height:180px;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">
    <Anchor :direction=\${'horizontal'} :type=\${'underline'} :offset=\${8}>
      <AnchorLink :href=\${'#alink-overview'}>Package overview</AnchorLink>
      <AnchorLink :href=\${'#alink-api'}>API reference</AnchorLink>
    </Anchor>
    <div style="overflow:auto;min-height:0">
      <section id="alink-overview" style="min-height:100px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">Package overview</h4>
        <p style="margin:0;color:var(--j-muted)">Omit title to render richer link text from the default slot.</p>
      </section>
      <section id="alink-api" style="min-height:100px;padding-bottom:1rem">
        <h4 style="margin:0 0 0.35rem">API reference</h4>
        <p style="margin:0;color:var(--j-muted)">Slot labels stay available to assistive tech.</p>
      </section>
    </div>
  </div>
</view>`

export const stickyOffset = `import Anchor from '@jacare/ui/Anchor'
import AnchorLink from '@jacare/ui/AnchorLink'

export <view>
  <div style="display:grid;grid-template-columns:9rem 1fr;height:220px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">
    <div style="padding:0.75rem;border-right:1px solid var(--j-border)">
      <Anchor :offset=\${48}>
        <AnchorLink :href=\${'#alink-install'} :title=\${'Install'} />
        <AnchorLink :href=\${'#alink-configure'} :title=\${'Configure'} />
        <AnchorLink :href=\${'#alink-ship'} :title=\${'Ship'} />
      </Anchor>
    </div>
    <div style="min-height:0;display:grid;grid-template-rows:auto 1fr">
      <div style="padding:0.55rem 0.75rem;background:var(--j-surface-2);border-bottom:1px solid var(--j-border);font-size:0.85rem;font-weight:600">
        Sticky header (offset 48)
      </div>
      <div style="overflow:auto;min-height:0;padding:0.75rem">
        <section id="alink-install" style="min-height:130px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">Install</h4>
          <p style="margin:0;color:var(--j-muted)">offset leaves room under sticky chrome.</p>
        </section>
        <section id="alink-configure" style="min-height:130px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">Configure</h4>
          <p style="margin:0;color:var(--j-muted)">Match offset to the sticky header height.</p>
        </section>
        <section id="alink-ship" style="min-height:130px;padding-bottom:1rem">
          <h4 style="margin:0 0 0.35rem">Ship</h4>
          <p style="margin:0;color:var(--j-muted)">Click through the steps to verify scroll + offset.</p>
        </section>
      </div>
    </div>
  </div>
</view>`
