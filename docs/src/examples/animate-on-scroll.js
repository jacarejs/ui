export const basic = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:280px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ Scroll inside this panel
    </div>
    <div style="padding:1rem;display:grid;gap:1rem">
      <Card><div style="padding:1rem">Always visible — keep scrolling ↓</div></Card>
      <div style="height:7rem" aria-hidden="true"></div>
      <AnimateOnScroll :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">First block fades up</div></Card>
      </AnimateOnScroll>
      <div style="height:5rem" aria-hidden="true"></div>
      <AnimateOnScroll :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">Second block fades up</div></Card>
      </AnimateOnScroll>
      <div style="height:5rem" aria-hidden="true"></div>
      <AnimateOnScroll :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">Third block fades up</div></Card>
      </AnimateOnScroll>
      <div style="height:6rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`

export const variants = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem">
    <AnimateOnScroll :variant=\${'fade'} :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">fade</div></Card>
    </AnimateOnScroll>
    <AnimateOnScroll :variant=\${'fade-up'} :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">fade-up</div></Card>
    </AnimateOnScroll>
    <AnimateOnScroll :variant=\${'fade-down'} :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">fade-down</div></Card>
    </AnimateOnScroll>
    <AnimateOnScroll :variant=\${'fade-left'} :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">fade-left</div></Card>
    </AnimateOnScroll>
    <AnimateOnScroll :variant=\${'fade-right'} :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">fade-right</div></Card>
    </AnimateOnScroll>
    <AnimateOnScroll :variant=\${'zoom'} :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">zoom</div></Card>
    </AnimateOnScroll>
  </div>
</view>`

export const threshold = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:260px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ Compare thresholds
    </div>
    <div style="padding:1rem;display:grid;gap:1rem">
      <div style="height:8rem" aria-hidden="true"></div>
      <AnimateOnScroll :threshold=\${0.5} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">threshold 0.5 — waits for half visibility</div></Card>
      </AnimateOnScroll>
      <div style="height:4rem" aria-hidden="true"></div>
      <AnimateOnScroll :threshold=\${0.05} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">threshold 0.05 — triggers early</div></Card>
      </AnimateOnScroll>
      <div style="height:8rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`

export const repeat = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:240px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ Scroll away and back to replay
    </div>
    <div style="padding:1rem">
      <div style="height:8rem" aria-hidden="true"></div>
      <AnimateOnScroll :once=\${false} :leaveClass=\${'jui-aos--out'} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">Scroll away and back — animation repeats</div></Card>
      </AnimateOnScroll>
      <div style="height:12rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`

export const once = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:240px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ once=true plays only the first time
    </div>
    <div style="padding:1rem">
      <div style="height:8rem" aria-hidden="true"></div>
      <AnimateOnScroll :once=\${true} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">Plays once, then stays visible</div></Card>
      </AnimateOnScroll>
      <div style="height:12rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`

export const customClass = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:240px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ Custom enter / leave classes
    </div>
    <div style="padding:1rem">
      <div style="height:8rem" aria-hidden="true"></div>
      <AnimateOnScroll :enterClass=\${'jui-aos--in'} :leaveClass=\${'jui-aos--out'} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">Custom enterClass / leaveClass</div></Card>
      </AnimateOnScroll>
      <div style="height:12rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`

export const disabled = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="display:grid;gap:0.75rem">
    <AnimateOnScroll :disabled=\${true}>
      <Card><div style="padding:1rem">disabled — visible immediately</div></Card>
    </AnimateOnScroll>
    <AnimateOnScroll :variant=\${'none'}>
      <Card><div style="padding:1rem">variant="none" — no motion</div></Card>
    </AnimateOnScroll>
  </div>
</view>`

export const rootMargin = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:240px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ rootMargin expands the trigger box
    </div>
    <div style="padding:1rem">
      <div style="height:8rem" aria-hidden="true"></div>
      <AnimateOnScroll :rootMargin=\${'80px 0px'} :once=\${false}>
        <Card><div style="padding:1rem">Triggers earlier with rootMargin 80px</div></Card>
      </AnimateOnScroll>
      <div style="height:12rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`

export const viewport = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="display:grid;gap:1rem">
    <p style="margin:0;color:var(--j-muted);font-size:0.9rem">Uses root="viewport" so the page scroll (not a nested panel) drives the reveal.</p>
    <div style="height:4rem" aria-hidden="true"></div>
    <AnimateOnScroll :root=\${'viewport'} :rootMargin=\${'0px'} :once=\${false}>
      <Card><div style="padding:1rem">Reveals when this block enters the viewport</div></Card>
    </AnimateOnScroll>
  </div>
</view>`

export const staggered = `import AnimateOnScroll from '@jacare/ui/AnimateOnScroll'
import Card from '@jacare/ui/Card'

export <view>
  <div style="height:280px;overflow-y:scroll;border:1px solid var(--j-border);border-radius:var(--j-radius)">
    <div style="position:sticky;top:0;z-index:1;padding:0.65rem 1rem;background:var(--j-surface);border-bottom:1px solid var(--j-border);color:var(--j-muted);font-size:0.875rem">
      ↓ Feature list with mixed variants
    </div>
    <div style="padding:1rem;display:grid;gap:0.75rem">
      <div style="height:6rem" aria-hidden="true"></div>
      <AnimateOnScroll :variant=\${'fade-up'} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">1 · Dashboard overview</div></Card>
      </AnimateOnScroll>
      <AnimateOnScroll :variant=\${'fade-left'} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">2 · Team activity</div></Card>
      </AnimateOnScroll>
      <AnimateOnScroll :variant=\${'fade-right'} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">3 · Billing settings</div></Card>
      </AnimateOnScroll>
      <AnimateOnScroll :variant=\${'zoom'} :once=\${false} :rootMargin=\${'0px'}>
        <Card><div style="padding:1rem">4 · Launch checklist</div></Card>
      </AnimateOnScroll>
      <div style="height:6rem" aria-hidden="true"></div>
    </div>
  </div>
</view>`
