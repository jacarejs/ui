export function docsHref(path = '/') {
  const base = import.meta.env.BASE_URL || '/'
  const route = path.startsWith('/') ? path : `/${path}`
  if (!base || base === '/') return route === '/' ? '/' : route
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  if (route === '/') return `${prefix}/`
  return `${prefix}${route}`
}

export function assetUrl(path = '') {
  const base = import.meta.env.BASE_URL || '/'
  const file = String(path).replace(/^\//, '')
  if (!base || base === '/') return `/${file}`
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}${file}`
}

export function goDocs(path = '/') {
  history.pushState({}, '', docsHref(path))
  window.dispatchEvent(new PopStateEvent('popstate'))
}
