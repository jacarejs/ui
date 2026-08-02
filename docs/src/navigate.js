export function docsHref(path = '/', base = import.meta.env.BASE_URL) {
  const route = path.startsWith('/') ? path : `/${path}`
  if (!base || base === '/') return route === '/' ? '/' : route
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  if (route === '/') return `${prefix}/`
  return `${prefix}${route}`
}

export function assetUrl(path = '', base = import.meta.env.BASE_URL) {
  const file = String(path).replace(/^\//, '')
  if (!base || base === '/') return `/${file}`
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}${file}`
}

export function scrollDocsToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  const main = document.getElementById('docs-content')
  if (main) main.scrollTop = 0
}

export function scrollDocsNavToActive() {
  if (typeof document === 'undefined') return
  const link = document.querySelector('.docs-sidebar a.jacare-here, .docs-nav a.jacare-here')
  if (!link || typeof link.scrollIntoView !== 'function') return
  link.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

export function goDocs(path = '/') {
  history.pushState({}, '', docsHref(path))
  window.dispatchEvent(new PopStateEvent('popstate'))
  scrollDocsToTop()
}
