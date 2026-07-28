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

Peer dependency: `@jacare/core` `^0.1.12`.

Import the theme once in your app entry:

```js
import '@jacare/ui/theme.css'
```

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

## Components

| Component | Role |
|-----------|------|
| `Alert` | Inline status banner |
| `Avatar` | Initials / image avatar |
| `Badge` | Compact status label |
| `Button` | Primary actions (`press` emit) |
| `Card` | Surface with optional title |
| `Checkbox` | Two-way boolean control |
| `Divider` | Horizontal / vertical rule |
| `Field` | Labeled text input (`model` value) |
| `Flex` | Full flexbox positioning |
| `Grid` | CSS grid tracks for layout |
| `Progress` | Signal-driven progress bar |
| `Spinner` | Loading indicator |
| `Stack` | Simple flex gap helper |
| `Switch` | Toggle control |
| `Text` | Typography helper |

## Theme tokens

`@jacare/ui/theme.css` defines the official Jacaré `--j-*` tokens:

```css
--j-primary: #189030;
--j-lime: #78c018;
--j-forest: #003030;
--j-surface: #f4fbf6;
--j-border: #b8e0c4;
--j-radius: 12px;
```

Override any token on `:root` (or a subtree) to re-skin the kit.

## Local development

```bash
yarn install
yarn verify
yarn build
yarn test
yarn playground:dev
```

| Script | Purpose |
|--------|---------|
| `yarn verify` | Compile every `.jcr` and validate contracts |
| `yarn build` | Emit `dist/` ESM + typings + theme |
| `yarn test` | Vitest + happy-dom component tests |
| `yarn docs:dev` | Documentation site (local) |
| `yarn docs:build` | Build docs for GitHub Pages |
| `yarn playground:dev` | Interactive component gallery (`http://localhost:5181`) |

Live docs: [https://jacarejs.github.io/ui/](https://jacarejs.github.io/ui/)


## Package layout

```text
src/
  components/*.jcr   # source of truth
  theme.css          # design tokens
  internal/utils.js  # shared helpers
dist/                # published ESM build
playground/          # local gallery app
```

## Related

- [Documentation](https://jacarejs.github.io/ui/)
- [Jacaré Devtools (Chrome)](https://chromewebstore.google.com/detail/jacar%C3%A9-devtools/cjemkcfolgmpfkpkpiklmkijalpfmkcm)
- [Jacaré core](https://github.com/jacarejs/core)
- [Showcase](https://jacarejs.github.io/core/showcase/)
- [Lab](https://jacarejs.github.io/core/lab/)

## License

MIT © Heber Almeida
