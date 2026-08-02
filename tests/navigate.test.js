import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { assetUrl, docsHref, goDocs, scrollDocsNavToActive, scrollDocsToTop } from '../docs/src/navigate.js'

describe('navigate', () => {
  beforeEach(() => {
    vi.stubGlobal('history', {
      pushState: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('builds docs hrefs for absolute and relative paths', () => {
    expect(docsHref('/')).toBe('/')
    expect(docsHref('/theme-editor')).toBe('/theme-editor')
    expect(docsHref('install')).toBe('/install')
    expect(docsHref()).toBe('/')
  })

  it('prefixes docs hrefs when a base path is provided', () => {
    expect(docsHref('/', '/ui/')).toBe('/ui/')
    expect(docsHref('/theme', '/ui/')).toBe('/ui/theme')
    expect(docsHref('install', '/docs')).toBe('/docs/install')
    expect(docsHref('/', '')).toBe('/')
  })

  it('builds asset urls', () => {
    expect(assetUrl('jacare-logo.svg')).toBe('/jacare-logo.svg')
    expect(assetUrl('/icons/check.svg')).toBe('/icons/check.svg')
    expect(assetUrl()).toBe('/')
  })

  it('prefixes asset urls when a base path is provided', () => {
    expect(assetUrl('logo.png', '/ui/')).toBe('/ui/logo.png')
    expect(assetUrl('/icons/check.svg', '/docs')).toBe('/docs/icons/check.svg')
    expect(assetUrl('x.png', '')).toBe('/x.png')
  })

  it('navigates with history and popstate', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent')
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    goDocs('/tokens')
    expect(history.pushState).toHaveBeenCalledWith({}, '', '/tokens')
    expect(dispatch).toHaveBeenCalledWith(expect.any(PopStateEvent))
    expect(scroll).toHaveBeenCalled()
  })

  it('scrolls the window and docs content to the top', () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const main = document.createElement('main')
    main.id = 'docs-content'
    main.scrollTop = 420
    document.body.appendChild(main)
    document.documentElement.scrollTop = 120
    document.body.scrollTop = 80

    scrollDocsToTop()

    expect(scroll).toHaveBeenCalledWith(0, 0)
    expect(main.scrollTop).toBe(0)
    main.remove()
  })

  it('scrolls safely when docs content is missing', () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    scrollDocsToTop()
    expect(scroll).toHaveBeenCalledWith(0, 0)
  })

  it('no-ops scroll when window is unavailable', () => {
    const original = globalThis.window
    vi.stubGlobal('window', undefined)
    expect(() => scrollDocsToTop()).not.toThrow()
    vi.stubGlobal('window', original)
  })

  it('scrolls the active docs nav link into view', () => {
    const link = document.createElement('a')
    link.className = 'jacare-here'
    link.scrollIntoView = vi.fn()
    const nav = document.createElement('nav')
    nav.className = 'docs-sidebar'
    nav.appendChild(link)
    document.body.appendChild(nav)

    scrollDocsNavToActive()
    expect(link.scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' })
    nav.remove()
  })

  it('no-ops nav scroll when no active link exists', () => {
    expect(() => scrollDocsNavToActive()).not.toThrow()
  })

  it('no-ops nav scroll when document is unavailable', () => {
    const original = globalThis.document
    vi.stubGlobal('document', undefined)
    expect(() => scrollDocsNavToActive()).not.toThrow()
    vi.stubGlobal('document', original)
  })
})
