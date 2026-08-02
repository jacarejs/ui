import { describe, expect, it } from 'vitest'
import {
  componentGroupOrder,
  componentHref,
  componentsByGroup,
  coreRepoUrl,
  docsNav,
  docsSiteUrl,
  flatNavLinks,
  previousNext,
  shippedComponents,
  uiRepoUrl,
} from '../docs/src/nav-data.js'

describe('nav-data', () => {
  it('builds component hrefs from PascalCase names', () => {
    expect(componentHref('DatePicker')).toBe('/components/date-picker')
    expect(componentHref('Button')).toBe('/components/button')
    expect(componentHref('SelectV2')).toBe('/components/select-v2')
  })

  it('exposes repository and docs urls', () => {
    expect(docsSiteUrl).toContain('github.io')
    expect(uiRepoUrl).toContain('jacarejs/ui')
    expect(coreRepoUrl).toContain('jacarejs/core')
  })

  it('groups shipped components and hides primitives from the catalog', () => {
    const groups = componentsByGroup()
    expect(groups.map((group) => group.title)).toEqual(
      componentGroupOrder.filter((title) => groups.some((group) => group.title === title)),
    )
    const names = groups.flatMap((group) => group.items.map((item) => item.name))
    expect(names).not.toContain('ThemeScope')
    expect(names).not.toContain('VisuallyHidden')
    expect(names).toContain('Button')
    expect(names).toContain('FormItem')

    const onlyPrimitives = componentsByGroup(shippedComponents.map((item) => item.name))
    expect(onlyPrimitives).toEqual([])

    const hideActions = shippedComponents
      .filter((item) => item.group === 'Actions')
      .map((item) => item.name)
    const withoutActions = componentsByGroup(hideActions)
    expect(withoutActions.map((group) => group.title)).not.toContain('Actions')
  })

  it('keeps FormItem out of the docs nav component sections', () => {
    const componentLinks = docsNav
      .filter((section) => componentGroupOrder.includes(section.title))
      .flatMap((section) => section.items.map((item) => item.label))
    expect(componentLinks).not.toContain('FormItem')
    expect(componentLinks).toContain('Button')
  })

  it('includes Validation in Foundations', () => {
    const foundations = docsNav.find((section) => section.title === 'Foundations')
    expect(foundations?.items.some((item) => item.href === '/validation')).toBe(true)
    expect(previousNext('/i18n').next?.href).toBe('/validation')
    expect(previousNext('/validation').previous?.href).toBe('/i18n')
    expect(previousNext('/validation').next?.href).toBe('/tokens')
  })

  it('returns previous and next links for a route', () => {
    const links = flatNavLinks()
    expect(links.length).toBeGreaterThan(10)
    expect(shippedComponents.length).toBeGreaterThan(140)
    expect(new Set(shippedComponents.map((item) => item.name)).size).toBe(shippedComponents.length)

    const mid = links.find((item) => item.href === '/install')
    expect(mid).toBeTruthy()
    const around = previousNext('/install')
    expect(around.previous?.href).toBe('/')
    expect(around.next?.href).toBe('/quick-start')

    expect(previousNext('/missing')).toEqual({ previous: null, next: null })
    expect(previousNext(links[0].href).previous).toBeNull()
    expect(previousNext(links[links.length - 1].href).next).toBeNull()
  })
})
