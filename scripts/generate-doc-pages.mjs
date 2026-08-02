import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { shippedComponents } from '../docs/src/nav-data.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(root, 'src', 'components')
const pagesDir = join(root, 'docs', 'src', 'pages', 'components')
const examplesDir = join(root, 'docs', 'src', 'examples')

const demoImageSrc = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 160%22%3E%3Crect width=%22320%22 height=%22160%22 rx=%2216%22 fill=%22%23dcefe8%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23235548%22 font-size=%2224%22 font-family=%22Arial%22%3EJacare UI%3C/text%3E%3C/svg%3E'

const groupA11y = {
  Actions: [
    'Keep the action label clear and specific',
    'Preserve keyboard focus styles and disabled states',
    'Do not rely on color alone to explain intent',
  ],
  Forms: [
    'Pair the control with a clear label and validation text when needed',
    'Keep keyboard and pointer interactions equivalent',
    'Expose errors and helper text in plain language',
  ],
  'Data display': [
    'Pair dense visual states with text when the meaning is important',
    'Keep empty, loading, and success states understandable without color alone',
    'Use semantic headings and surrounding context for complex data',
  ],
  Feedback: [
    'Make status text short and easy to scan',
    'Do not rely on animation alone to communicate progress',
    'Keep color usage paired with readable labels',
  ],
  Overlay: [
    'Move focus into the overlay and return it when closing',
    'Keep dismiss actions obvious for keyboard and pointer users',
    'Use concise titles and body copy for faster scanning',
  ],
  Layout: [
    'Use semantic landmarks that match the page structure',
    'Keep the reading order sensible on narrow viewports',
    'Avoid layout-only wrappers that hide important relationships',
  ],
  Navigation: [
    'Use descriptive labels so routes and actions are easy to scan',
    'Keep focus order aligned with the visual order',
    'Make active and disabled states obvious beyond color alone',
  ],
  Primitives: [
    'Use primitives to support semantics instead of replacing them',
    'Keep accessible names explicit when the UI is icon or state driven',
    'Prefer composition that preserves document structure',
  ],
}

const demos = {
  Affix: {
    imports: ['Affix', 'Button'],
    lines: [
      '<div style="height:180px;overflow:auto;border:1px solid var(--j-border);border-radius:var(--j-radius);padding:0.75rem">',
      "  <Affix :offset=${0}>",
      '    <Button>Sticky action</Button>',
      '  </Affix>',
      '  <div style="height:240px"></div>',
      '</div>',
    ],
  },
  Anchor: {
    imports: ['Anchor', 'AnchorLink'],
    lines: [
      '<div style="display:grid;gap:1rem">',
      "  <Anchor :offset=${12}>",
      "    <AnchorLink :href=${'#intro'} :title=${'Intro'} />",
      "    <AnchorLink :href=${'#usage'} :title=${'Usage'} />",
      '  </Anchor>',
      '  <section id="intro"><h3>Intro</h3><p>Jump between sections in long documents.</p></section>',
      '  <section id="usage"><h3>Usage</h3><p>Anchor links can account for sticky headers with an offset.</p></section>',
      '</div>',
    ],
  },
  AnchorLink: {
    imports: ['Anchor', 'AnchorLink'],
    lines: [
      '<div style="display:grid;gap:1rem">',
      "  <Anchor :offset=${12}>",
      "    <AnchorLink :href=${'#intro'} :title=${'Intro'} />",
      "    <AnchorLink :href=${'#usage'} :title=${'Usage'} />",
      '  </Anchor>',
      '  <section id="intro"><h3>Intro</h3><p>Jump between sections in long documents.</p></section>',
      '  <section id="usage"><h3>Usage</h3><p>Anchor links can account for sticky headers with an offset.</p></section>',
      '</div>',
    ],
  },
  Aside: {
    imports: ['Container', 'Header', 'Aside', 'Main', 'Footer'],
    lines: [
      '<div style="height:240px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Container>',
      '    <Header>Header</Header>',
      "    <Container :direction=${'horizontal'}>",
      "      <Aside :width=${'160px'}>Aside</Aside>",
      "      <Main :padding=${'1rem'}>Main content</Main>",
      '    </Container>',
      '    <Footer>Footer</Footer>',
      '  </Container>',
      '</div>',
    ],
  },
  Backtop: {
    imports: ['Backtop'],
    lines: [
      '<div style="height:160px">',
      "  <Backtop :visibilityHeight=${0} :right=${16} :bottom=${16} />",
      '</div>',
    ],
  },
  Breadcrumb: {
    imports: ['Breadcrumb', 'BreadcrumbItem'],
    lines: [
      '<Breadcrumb>',
      "  <BreadcrumbItem :href=${'#home'}>Home</BreadcrumbItem>",
      "  <BreadcrumbItem :href=${'#components'}>Components</BreadcrumbItem>",
      '  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>',
      '</Breadcrumb>',
    ],
  },
  BreadcrumbItem: {
    imports: ['Breadcrumb', 'BreadcrumbItem'],
    lines: [
      '<Breadcrumb>',
      "  <BreadcrumbItem :href=${'#home'}>Home</BreadcrumbItem>",
      "  <BreadcrumbItem :href=${'#components'}>Components</BreadcrumbItem>",
      '  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>',
      '</Breadcrumb>',
    ],
  },
  Calendar: {
    imports: ['Calendar'],
    lines: ["<Calendar :value=${'2026-08-01'} />"],
  },
  Carousel: {
    imports: ['Carousel', 'CarouselItem'],
    lines: [
      " <Carousel :autoplay=${false} :arrow=${'always'}>",
      '  <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-mint)">Overview</div></CarouselItem>',
      '  <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-surface-2)">Usage</div></CarouselItem>',
      '  <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-leaf);color:#ffffff">Ship</div></CarouselItem>',
      ' </Carousel>',
    ],
  },
  CarouselItem: {
    imports: ['Carousel', 'CarouselItem'],
    lines: [
      " <Carousel :autoplay=${false} :arrow=${'always'}>",
      '  <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-mint)">Overview</div></CarouselItem>',
      '  <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-surface-2)">Usage</div></CarouselItem>',
      '  <CarouselItem><div style="display:grid;place-items:center;height:100%;background:var(--j-leaf);color:#ffffff">Ship</div></CarouselItem>',
      ' </Carousel>',
    ],
  },
  Col: {
    imports: ['Row', 'Col'],
    lines: [
      " <Row :gutter=${16}>",
      "  <Col :span=${12}><div style=\"padding:0.75rem;border-radius:var(--j-radius-sm);background:var(--j-surface-2)\">Half</div></Col>",
      "  <Col :span=${12}><div style=\"padding:0.75rem;border-radius:var(--j-radius-sm);background:var(--j-mint)\">Half</div></Col>",
      ' </Row>',
    ],
  },
  Collapse: {
    imports: ['Collapse', 'CollapseItem'],
    lines: [
      " <Collapse :value=${['overview']}>",
      "  <CollapseItem :name=${'overview'} :title=${'Overview'}>Generated docs pages can stay intentionally short.</CollapseItem>",
      "  <CollapseItem :name=${'api'} :title=${'API'}>Use the contract table below for the full surface area.</CollapseItem>",
      ' </Collapse>',
    ],
  },
  CollapseItem: {
    imports: ['Collapse', 'CollapseItem'],
    lines: [
      " <Collapse :value=${['overview']}>",
      "  <CollapseItem :name=${'overview'} :title=${'Overview'}>Generated docs pages can stay intentionally short.</CollapseItem>",
      "  <CollapseItem :name=${'api'} :title=${'API'}>Use the contract table below for the full surface area.</CollapseItem>",
      ' </Collapse>',
    ],
  },
  ConfigProvider: {
    imports: ['ConfigProvider', 'Button'],
    lines: [
      " <ConfigProvider :size=${'small'} :theme=${'dark'}>",
      '  <div style="padding:1rem;border-radius:var(--j-radius);background:var(--j-deep);color:#ffffff">',
      '    <Button>Scoped action</Button>',
      '  </div>',
      ' </ConfigProvider>',
    ],
  },
  Container: {
    imports: ['Container', 'Header', 'Aside', 'Main', 'Footer'],
    lines: [
      '<div style="height:240px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Container>',
      '    <Header>Header</Header>',
      "    <Container :direction=${'horizontal'}>",
      "      <Aside :width=${'160px'}>Aside</Aside>",
      "      <Main :padding=${'1rem'}>Main content</Main>",
      '    </Container>',
      '    <Footer>Footer</Footer>',
      '  </Container>',
      '</div>',
    ],
  },
  Descriptions: {
    imports: ['Descriptions', 'DescriptionsItem'],
    lines: [
      " <Descriptions :title=${'Project details'} :column=${2} :border=${true}>",
      "  <DescriptionsItem :label=${'Owner'}>Jacare UI</DescriptionsItem>",
      "  <DescriptionsItem :label=${'Status'}>Beta</DescriptionsItem>",
      "  <DescriptionsItem :label=${'Package'} :span=${2}>@jacare/ui</DescriptionsItem>",
      ' </Descriptions>',
    ],
  },
  DescriptionsItem: {
    imports: ['Descriptions', 'DescriptionsItem'],
    lines: [
      " <Descriptions :title=${'Project details'} :column=${2} :border=${true}>",
      "  <DescriptionsItem :label=${'Owner'}>Jacare UI</DescriptionsItem>",
      "  <DescriptionsItem :label=${'Status'}>Beta</DescriptionsItem>",
      "  <DescriptionsItem :label=${'Package'} :span=${2}>@jacare/ui</DescriptionsItem>",
      ' </Descriptions>',
    ],
  },
  Dropdown: {
    imports: ['Dropdown', 'DropdownMenu', 'DropdownItem', 'Button'],
    lines: [
      ' <Dropdown>',
      '  <Button>Actions</Button>',
      '  <DropdownMenu slot="dropdown">',
      "    <DropdownItem :command=${'edit'}>Edit</DropdownItem>",
      "    <DropdownItem :command=${'archive'}>Archive</DropdownItem>",
      '  </DropdownMenu>',
      ' </Dropdown>',
    ],
  },
  DropdownItem: {
    imports: ['Dropdown', 'DropdownMenu', 'DropdownItem', 'Button'],
    lines: [
      ' <Dropdown>',
      '  <Button>Actions</Button>',
      '  <DropdownMenu slot="dropdown">',
      "    <DropdownItem :command=${'edit'}>Edit</DropdownItem>",
      "    <DropdownItem :command=${'archive'}>Archive</DropdownItem>",
      '  </DropdownMenu>',
      ' </Dropdown>',
    ],
  },
  DropdownMenu: {
    imports: ['Dropdown', 'DropdownMenu', 'DropdownItem', 'Button'],
    lines: [
      ' <Dropdown>',
      '  <Button>Actions</Button>',
      '  <DropdownMenu slot="dropdown">',
      "    <DropdownItem :command=${'edit'}>Edit</DropdownItem>",
      "    <DropdownItem :command=${'archive'}>Archive</DropdownItem>",
      '  </DropdownMenu>',
      ' </Dropdown>',
    ],
  },
  Empty: {
    imports: ['Empty', 'Button'],
    lines: [
      " <Empty :description=${'No projects yet'}>",
      '  <Button>Create project</Button>',
      ' </Empty>',
    ],
  },
  FormItem: {
    imports: ['Form', 'FormItem', 'Input'],
    lines: [
      ' <Form>',
      "  <FormItem :label=${'Project name'} :required=${true} :error=${'Required'}>",
      "    <Input :value=${'Jacare UI'} />",
      '  </FormItem>',
      ' </Form>',
    ],
  },
  Footer: {
    imports: ['Container', 'Header', 'Aside', 'Main', 'Footer'],
    lines: [
      '<div style="height:240px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Container>',
      '    <Header>Header</Header>',
      "    <Container :direction=${'horizontal'}>",
      "      <Aside :width=${'160px'}>Aside</Aside>",
      "      <Main :padding=${'1rem'}>Main content</Main>",
      '    </Container>',
      '    <Footer>Footer</Footer>',
      '  </Container>',
      '</div>',
    ],
  },
  Header: {
    imports: ['Container', 'Header', 'Aside', 'Main', 'Footer'],
    lines: [
      '<div style="height:240px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Container>',
      '    <Header>Header</Header>',
      "    <Container :direction=${'horizontal'}>",
      "      <Aside :width=${'160px'}>Aside</Aside>",
      "      <Main :padding=${'1rem'}>Main content</Main>",
      '    </Container>',
      '    <Footer>Footer</Footer>',
      '  </Container>',
      '</div>',
    ],
  },
  Image: {
    imports: ['Image'],
    lines: [`<Image :src=\${'${demoImageSrc}'} :alt=\${'Jacare UI demo'} />`],
  },
  InfiniteScroll: {
    imports: ['InfiniteScroll'],
    lines: [
      ' <InfiniteScroll style="height:180px;border:1px solid var(--j-border);border-radius:var(--j-radius)">',
      '  <div style="display:grid;gap:0.5rem;padding:0.75rem">',
      '    <div>Item 1</div>',
      '    <div>Item 2</div>',
      '    <div>Item 3</div>',
      '    <div>Item 4</div>',
      '    <div>Item 5</div>',
      '    <div>Item 6</div>',
      '    <div>Item 7</div>',
      '    <div>Item 8</div>',
      '  </div>',
      ' </InfiniteScroll>',
    ],
  },
  Link: {
    imports: ['Link'],
    lines: ["<Link :href=${'#docs'} :type=${'primary'}>Read docs</Link>"],
  },
  LocaleToggle: {
    imports: ['LocaleToggle'],
    lines: ['<LocaleToggle />'],
  },
  Main: {
    imports: ['Container', 'Header', 'Aside', 'Main', 'Footer'],
    lines: [
      '<div style="height:240px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Container>',
      '    <Header>Header</Header>',
      "    <Container :direction=${'horizontal'}>",
      "      <Aside :width=${'160px'}>Aside</Aside>",
      "      <Main :padding=${'1rem'}>Main content</Main>",
      '    </Container>',
      '    <Footer>Footer</Footer>',
      '  </Container>',
      '</div>',
    ],
  },
  Menu: {
    imports: ['Menu', 'MenuItem', 'SubMenu'],
    lines: [
      " <Menu :defaultActive=${'home'}>",
      "  <MenuItem :index=${'home'}>Home</MenuItem>",
      "  <SubMenu :index=${'guides'} :title=${'Guides'}>",
      "    <MenuItem :index=${'install'}>Install</MenuItem>",
      "    <MenuItem :index=${'theme'}>Theme</MenuItem>",
      '  </SubMenu>',
      ' </Menu>',
    ],
  },
  MenuItem: {
    imports: ['Menu', 'MenuItem', 'SubMenu'],
    lines: [
      " <Menu :defaultActive=${'home'}>",
      "  <MenuItem :index=${'home'}>Home</MenuItem>",
      "  <SubMenu :index=${'guides'} :title=${'Guides'}>",
      "    <MenuItem :index=${'install'}>Install</MenuItem>",
      "    <MenuItem :index=${'theme'}>Theme</MenuItem>",
      '  </SubMenu>',
      ' </Menu>',
    ],
  },
  Pagination: {
    imports: ['Pagination'],
    lines: ["<Pagination :total=${120} :currentPage=${2} :pageSize=${10} :background=${true} />"],
  },
  Result: {
    imports: ['Result', 'Button'],
    lines: [
      " <Result :icon=${'success'} :title=${'Submitted'} :subTitle=${'Your changes are saved.'}>",
      '  <Button>Back to dashboard</Button>',
      ' </Result>',
    ],
  },
  Row: {
    imports: ['Row', 'Col'],
    lines: [
      " <Row :gutter=${16}>",
      "  <Col :span=${12}><div style=\"padding:0.75rem;border-radius:var(--j-radius-sm);background:var(--j-surface-2)\">Half</div></Col>",
      "  <Col :span=${12}><div style=\"padding:0.75rem;border-radius:var(--j-radius-sm);background:var(--j-mint)\">Half</div></Col>",
      ' </Row>',
    ],
  },
  Scrollbar: {
    imports: ['Scrollbar'],
    lines: [
      " <Scrollbar :height=${'180px'}>",
      '  <div style="display:grid;gap:0.5rem;padding:0.75rem">',
      '    <div>Line 1</div>',
      '    <div>Line 2</div>',
      '    <div>Line 3</div>',
      '    <div>Line 4</div>',
      '    <div>Line 5</div>',
      '    <div>Line 6</div>',
      '    <div>Line 7</div>',
      '    <div>Line 8</div>',
      '  </div>',
      ' </Scrollbar>',
    ],
  },
  Segmented: {
    imports: ['Segmented'],
    lines: [
      " <Segmented",
      "  :value=${'week'}",
      "  :options=${[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]}",
      ' />',
    ],
  },
  Skeleton: {
    imports: ['Skeleton'],
    lines: ["<Skeleton :animated=${true} :rows=${3} />"],
  },
  SkeletonItem: {
    imports: ['SkeletonItem'],
    lines: ['<SkeletonItem />'],
  },
  Space: {
    imports: ['Space', 'Button'],
    lines: [
      ' <Space>',
      '  <Button>Back</Button>',
      '  <Button :variant=${\'secondary\'}>Save draft</Button>',
      '  <Button :variant=${\'primary\'}>Publish</Button>',
      ' </Space>',
    ],
  },
  Splitter: {
    imports: ['Splitter', 'SplitterPanel'],
    lines: [
      '<div style="height:180px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Splitter>',
      "    <SplitterPanel :size=${'40%'}><div style=\"padding:0.75rem\">Navigation</div></SplitterPanel>",
      "    <SplitterPanel><div style=\"padding:0.75rem\">Content</div></SplitterPanel>",
      '  </Splitter>',
      '</div>',
    ],
  },
  SplitterPanel: {
    imports: ['Splitter', 'SplitterPanel'],
    lines: [
      '<div style="height:180px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">',
      '  <Splitter>',
      "    <SplitterPanel :size=${'40%'}><div style=\"padding:0.75rem\">Navigation</div></SplitterPanel>",
      "    <SplitterPanel><div style=\"padding:0.75rem\">Content</div></SplitterPanel>",
      '  </Splitter>',
      '</div>',
    ],
  },
  Statistic: {
    imports: ['Statistic'],
    lines: ["<Statistic :title=${'Revenue'} :value=${12840.5} :prefix=${'$'} :precision=${1} />"],
  },
  SubMenu: {
    imports: ['Menu', 'MenuItem', 'SubMenu'],
    lines: [
      " <Menu :defaultActive=${'home'}>",
      "  <MenuItem :index=${'home'}>Home</MenuItem>",
      "  <SubMenu :index=${'guides'} :title=${'Guides'}>",
      "    <MenuItem :index=${'install'}>Install</MenuItem>",
      "    <MenuItem :index=${'theme'}>Theme</MenuItem>",
      '  </SubMenu>',
      ' </Menu>',
    ],
  },
  Table: {
    imports: ['Table'],
    lines: [
      ' <Table',
      "  :columns=${[{ prop: 'name', label: 'Name' }, { prop: 'status', label: 'Status' }]}",
      "  :data=${[{ name: 'API', status: 'Ready' }, { name: 'Docs', status: 'Draft' }]}",
      "  :border=${true}",
      ' />',
    ],
  },
  TableColumn: {
    imports: ['Table', 'TableColumn'],
    lines: [
      ' <Table',
      "  :columns=${[{ prop: 'name', label: 'Name' }, { prop: 'status', label: 'Status' }]}",
      "  :data=${[{ name: 'API', status: 'Ready' }, { name: 'Docs', status: 'Draft' }]}",
      ' >',
      "  <TableColumn :prop=${'name'} :label=${'Name'} />",
      "  <TableColumn :prop=${'status'} :label=${'Status'} />",
      ' </Table>',
    ],
  },
  TableV2: {
    imports: ['TableV2'],
    lines: [
      ' <TableV2',
      "  :columns=${[{ prop: 'name', label: 'Name' }, { prop: 'status', label: 'Status' }]}",
      "  :data=${[{ name: 'API', status: 'Ready' }, { name: 'Docs', status: 'Draft' }, { name: 'Site', status: 'Queued' }]}",
      "  :border=${true}",
      ' />',
    ],
  },
  Tag: {
    imports: ['Tag'],
    lines: ["<Tag :type=${'primary'}>Beta</Tag>"],
  },
  ThemeScope: {
    imports: ['ThemeScope', 'Button'],
    lines: [
      " <ThemeScope :theme=${'dark'}>",
      '  <div style="padding:1rem;border-radius:var(--j-radius);background:var(--j-deep);color:#ffffff">',
      '    <Button>Scoped theme</Button>',
      '  </div>',
      ' </ThemeScope>',
    ],
  },
  ThemeToggle: {
    imports: ['ThemeToggle'],
    lines: ['<ThemeToggle />'],
  },
  Timeline: {
    imports: ['Timeline', 'TimelineItem'],
    lines: [
      ' <Timeline>',
      "  <TimelineItem :timestamp=${'09:00'}>Design tokens updated</TimelineItem>",
      "  <TimelineItem :timestamp=${'12:00'} :type=${'success'}>Docs published</TimelineItem>",
      ' </Timeline>',
    ],
  },
  TimelineItem: {
    imports: ['Timeline', 'TimelineItem'],
    lines: [
      ' <Timeline>',
      "  <TimelineItem :timestamp=${'09:00'}>Design tokens updated</TimelineItem>",
      "  <TimelineItem :timestamp=${'12:00'} :type=${'success'}>Docs published</TimelineItem>",
      ' </Timeline>',
    ],
  },
  Tour: {
    imports: ['Tour', 'TourStep'],
    lines: [
      " <Tour :open=${true}>",
      "  <TourStep :title=${'Welcome'} :description=${'This starts the guided flow.'} />",
      "  <TourStep :title=${'Next step'} :description=${'Keep each step focused on one action.'} />",
      ' </Tour>',
    ],
  },
  TourStep: {
    imports: ['Tour', 'TourStep'],
    lines: [
      " <Tour :open=${true}>",
      "  <TourStep :title=${'Welcome'} :description=${'This starts the guided flow.'} />",
      "  <TourStep :title=${'Next step'} :description=${'Keep each step focused on one action.'} />",
      ' </Tour>',
    ],
  },
  Tree: {
    imports: ['Tree'],
    lines: [
      ' <Tree',
      "  :data=${[{ value: 'docs', label: 'Docs', children: [{ value: 'install', label: 'Install' }, { value: 'theme', label: 'Theme' }] }]}",
      '  :defaultExpandAll=${true}',
      "  :value=${'install'}",
      ' />',
    ],
  },
  TreeV2: {
    imports: ['TreeV2'],
    lines: [
      ' <TreeV2',
      "  :data=${[{ value: 'docs', label: 'Docs', children: [{ value: 'install', label: 'Install' }, { value: 'theme', label: 'Theme' }] }]}",
      '  :defaultExpandAll=${true}',
      "  :value=${'install'}",
      ' />',
    ],
  },
  VisuallyHidden: {
    imports: ['VisuallyHidden'],
    lines: [
      ' <button type="button" style="padding:0.5rem 0.75rem">',
      '  Search',
      '  <VisuallyHidden> the documentation catalog</VisuallyHidden>',
      ' </button>',
    ],
  },
}

function slugify(name) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function escapeTemplateLiteral(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function indent(lines, prefix) {
  return lines.map((line) => `${prefix}${line}`).join('\n')
}

function buildExample(imports, lines) {
  const importsBlock = imports
    .map((name) => `import ${name} from '@jacare/ui/components/${name}.jcr'`)
    .join('\n')
  const body = `${importsBlock}\n\nexport <view>\n${indent(lines, '  ')}\n</view>`
  return `export const basic = \`${escapeTemplateLiteral(body)}\`\n`
}

function buildPage(name, slug, meta, imports, lines) {
  const importsBlock = imports
    .map((componentName) => `import ${componentName} from '@jacare/ui/components/${componentName}.jcr'`)
    .join('\n')
  const a11y = groupA11y[meta.group] || groupA11y.Primitives
  const description = `${meta.blurb}. Beta docs coverage with one basic example, generated API data, and accessibility notes.`

  return `${importsBlock}
import DocsHero from '../../ui/DocsHero.jcr'
import Demo from '../../ui/Demo.jcr'
import DocsSection from '../../ui/DocsSection.jcr'
import PropsTable from '../../ui/PropsTable.jcr'
import PreviousNext from '../../ui/PreviousNext.jcr'
import AccessibilityChecklist from '../../ui/AccessibilityChecklist.jcr'
import { getContract } from '../../generated/contracts.js'
import { previousNext } from '../../nav-data.js'
import { basic } from '../../examples/${slug}.js'

const contract = getContract('${name}')
const navLinks = previousNext('/components/${slug}')
const a11y = ${JSON.stringify(a11y, null, 2)}

export <view>
  <article class="docs-page">
    <nav class="docs-breadcrumb" aria-label="Breadcrumb">
      <a jacare-go="/components" href="/components">Components</a>
      <span aria-hidden="true">/</span>
      <span>${name}</span>
    </nav>

    <DocsHero
      :kicker=\${'${meta.group}'}
      :title=\${'${name}'}
      :description=\${'${description.replace(/'/g, "\\'")}'}
      :status=\${'beta'}
    />

    <Demo :id=\${'basic'} :title=\${'Basic'} :code=\${basic} :filename=\${'${slug}-basic.jcr'}>
${indent(lines, '      ')}
    </Demo>

    <DocsSection :id=\${'accessibility'} :title=\${'Accessibility'}>
      <AccessibilityChecklist :items=\${a11y} />
    </DocsSection>

    <DocsSection :id=\${'api'} :title=\${'API'}>
      <PropsTable :contract=\${contract} />
    </DocsSection>

    <PreviousNext :previous=\${navLinks.previous} :next=\${navLinks.next} />
  </article>
</view>
`
}

mkdirSync(examplesDir, { recursive: true })
mkdirSync(pagesDir, { recursive: true })

const docsByName = new Map(
  shippedComponents.map((item) => [item.name, item]),
)

const existingPages = new Set(
  readdirSync(pagesDir)
    .filter((name) => name.endsWith('.jcr'))
    .map((name) => basename(name, '.jcr')),
)

const componentNames = readdirSync(componentsDir)
  .filter((name) => name.endsWith('.jcr'))
  .map((name) => basename(name, '.jcr'))
  .sort()

const missing = componentNames.filter((name) => !existingPages.has(slugify(name)))

const created = []

for (const name of missing) {
  const meta = docsByName.get(name)
  const demo = demos[name]
  if (!meta) throw new Error(`Missing shippedComponents metadata for ${name}`)
  if (!demo) throw new Error(`Missing demo config for ${name}`)

  const slug = slugify(name)
  const examplePath = join(examplesDir, `${slug}.js`)
  const pagePath = join(pagesDir, `${slug}.jcr`)

  if (!existsSync(examplePath)) {
    writeFileSync(examplePath, buildExample(demo.imports, demo.lines))
  }

  if (!existsSync(pagePath)) {
    writeFileSync(pagePath, buildPage(name, slug, meta, demo.imports, demo.lines))
  }

  created.push(`components/${slug}`)
}

console.log(`created ${created.length} docs pages`)
created.forEach((entry) => console.log(entry))
