<p align="center">
  <strong>@jacare/ui</strong><br />
  Official UI component library for Jacaré
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@jacare/ui"><img alt="npm" src="https://img.shields.io/npm/v/@jacare/ui?color=189030" /></a>
  <a href="https://jacarejs.github.io/ui/"><img alt="docs" src="https://img.shields.io/badge/docs-GitHub%20Pages-78c018" /></a>
  <a href="https://github.com/jacarejs/ui/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/jacarejs/ui/ci.yml?branch=main&label=CI&color=78c018" /></a>
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-189030" /></a>
  <img alt="node" src="https://img.shields.io/badge/node-%3E%3D20-189030" />
</p>

Accessible, themeable Jacaré components powered by signals — no virtual DOM.

**Docs:** [https://jacarejs.github.io/ui/](https://jacarejs.github.io/ui/)

## Description (GitHub)

> Official UI component library for Jacaré — accessible, themeable components powered by signals, with no virtual DOM

## Install

```bash
yarn add @jacare/ui @jacare/core
```

Peer dependency: `@jacare/core` — always use the latest published release (minimum `^0.1.15`).

Import the theme once at your app entry, then boot theme / density / motion preferences:

```js
import '@jacare/ui/theme.css'
import { applyTheme, applyDensity, applyMotion } from '@jacare/ui/theme'

applyTheme('system')
applyDensity('comfortable')
applyMotion('system')
```

## i18n

Simple translations (vue-i18n-like, much smaller). Keep one file per locale, then boot once:

```text
src/
├── i18n.js
├── app.jcr
└── locales/
    ├── index.js
    ├── en.js
    └── pt-BR.js
```

```js
// locales/en.js
export default { hello: 'Hello, {name}!', save: 'Save', app: { title: 'My app' } }

// locales/pt-BR.js
export default { hello: 'Olá, {name}!', save: 'Salvar', app: { title: 'Meu app' } }

// locales/index.js
import en from './en.js'
import ptBR from './pt-BR.js'
export const messages = { en, 'pt-BR': ptBR }

// i18n.js
import { createI18n, t, setLocale } from '@jacare/ui/i18n'
import { messages } from './locales/index.js'

createI18n({ locale: 'en', fallbackLocale: 'en', messages })

t('hello', { name: 'Heber' }) // Hello, Heber!
setLocale('pt-BR')
```

In `.jcr` views use a getter so text updates when the locale changes: `${() => t('save')}`.
`LocaleToggle` switches locales; see the [i18n docs](https://jacarejs.github.io/ui/i18n).

## Usage

```javascript
import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Field from '@jacare/ui/Field'
import Card from '@jacare/ui/Card'

const name = pulse('')

export <view>
  <Card :title=${'Profile'}>
    <Field :label=${'Name'} bind-value=${name} />
    <Button :variant=${'primary'} on-press=${() => console.log(name())}>
      Save
    </Button>
  </Card>
</view>
```

Components ship as precompiled ESM modules (`mount` / `render` / `resume`). Your app still needs `@jacare/vite-plugin` (or the Jacaré CLI) to compile your own `.jcr` files.

Prefer deep imports such as `@jacare/ui/Button` — the same path used throughout the docs. The package barrel also re-exports named members.

## Components

Full catalog with live demos: [Components overview](https://jacarejs.github.io/ui/components).

| Component | Role |
|-----------|------|
| `Alert` | Inline status banner |
| `Autocomplete` | Text field with filtered suggestions |
| `Avatar` | Initials or image avatar |
| `Badge` | Compact tone pills |
| `Button` | Primary actions (`press` emit) |
| `Card` | Elevated surface with optional title |
| `Cascader` | Multi-level nested path picker |
| `Checkbox` | Two-way boolean control |
| `ColorPicker` | Hex + swatch color field |
| `ColorPickerPanel` | Standalone color panel |
| `Confirm` | Modal confirmation (`open` model) |
| `DatePicker` | Typed or calendar date / range picker |
| `DatePickerPanel` | Inline calendar surface |
| `DateTimePicker` | Composed `DatePicker` + `TimePicker` |
| `Dialog` | General modal (`open` model, body/footer slots) |
| `Divider` | Horizontal / vertical rule |
| `Field` | Labeled text input (`model` value) |
| `Flex` | Full flexbox positioning |
| `Form` / `FormItem` | Form layout and labeled rows |
| `Grid` | CSS grid tracks for layout |
| `Icon` | Stroke icon set (`name`, sizes, tones) |
| `Input` | Text field with clear, sizes, affixes |
| `InputNumber` | Numeric stepper |
| `InputOtp` | One-time code boxes |
| `InputTag` | Tag chips from keyboard input |
| `Mention` | Textarea with `@` suggestions |
| `Progress` | Signal-driven progress bar |
| `Radio` / `RadioGroup` | Single-choice controls |
| `Rate` | Star rating |
| `Select` / `SelectV2` | Dropdown select (virtualized option) |
| `Slider` | Continuous or range track |
| `Spinner` | Indeterminate loading indicator |
| `Stack` | Simple flex gap helper |
| `Switch` | Immediate on/off toggle |
| `Text` | Typography helper |
| `Textarea` | Multiline field with count |
| `ThemeScope` / `ThemeToggle` | Scoped theme + light/dark/system control |
| `LocaleToggle` | Switch active i18n locale |
| `TimePicker` / `TimeSelect` | Time spinners and discrete lists |
| `Transfer` | Move items between lists |
| `TreeSelect` | Select a node from a tree |
| `Upload` | File picker with list layouts |
| `VisuallyHidden` | Hide visually, keep for AT |

## Theme API

| Helper | Purpose |
|--------|---------|
| `applyTheme('light' \| 'dark' \| 'system')` | Resolve and apply `data-j-theme` |
| `applyDensity('compact' \| 'comfortable' \| 'spacious')` | Scale control height/padding via `--j-density` |
| `applyMotion('system' \| 'full' \| 'reduce')` | Honor or override reduced motion |

Core tokens live in `@jacare/ui/theme.css` (`--j-primary`, `--j-surface`, `--j-font`, `--j-duration-*`, …). Override any token on `:root` or a subtree. See the [Theme](https://jacarejs.github.io/ui/theme), [Token reference](https://jacarejs.github.io/ui/tokens), and docs tools (Theme Editor, Density Preview, Motion Lab, Viewport Lab).

## Local development

```bash
yarn install
yarn verify
yarn build
yarn test
yarn test:coverage
yarn docs:dev
```

| Script | Purpose |
|--------|---------|
| `yarn verify` | Compile every `.jcr` and validate contracts |
| `yarn build` | Emit `dist/` ESM + typings + theme |
| `yarn test` | Vitest + happy-dom component tests |
| `yarn test:coverage` | Unit tests with V8 coverage + thresholds |
| `yarn docs:dev` | Documentation site (local) |
| `yarn docs:build` | Build docs for GitHub Pages |

### Coverage

Latest `yarn test:coverage` result (scoped to theme helpers, docs stores, navigate, and related modules):

| Metric | Result |
|--------|--------|
| Statements | **100%** (1844/1844) |
| Branches | **100%** (355/355) |
| Functions | **100%** (83/83) |
| Lines | **100%** (1844/1844) |

Thresholds in `vitest.config.js`: lines/functions/statements ≥ 80, branches **100**.

Live docs: [https://jacarejs.github.io/ui/](https://jacarejs.github.io/ui/)

## Package layout

```text
src/
  components/*.jcr   # source of truth
  theme/             # tokens + applyTheme / density / motion
  internal/utils.js  # shared helpers
dist/                # published ESM build
docs/                # documentation site
```

## Related

- [Documentation](https://jacarejs.github.io/ui/)
- [Jacaré core](https://github.com/jacarejs/core)
- [Showcase](https://jacarejs.github.io/core/showcase/)
- [Lab](https://jacarejs.github.io/core/lab/)

## License

MIT © Heber Almeida
