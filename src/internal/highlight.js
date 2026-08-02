export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function normalizeLanguage(value) {
  const next = String(value || 'text').trim().toLowerCase()
  if (next === 'js' || next === 'javascript' || next === 'ts' || next === 'typescript') return 'javascript'
  if (next === 'jsx' || next === 'tsx' || next === 'react') return 'react'
  if (next === 'vue' || next === 'vuejs') return 'vue'
  if (next === 'jacare' || next === 'jcr' || next === 'jui') return 'jacare'
  if (next === 'php') return 'php'
  if (next === 'py' || next === 'python') return 'python'
  if (next === 'json') return 'json'
  if (next === 'css' || next === 'scss') return 'css'
  if (next === 'sql') return 'sql'
  return 'text'
}

function wrap(type, value) {
  return `<span class="jui-code-token jui-code-token--${type}">${escapeHtml(value)}</span>`
}

function tokenizeGeneric(source, rules) {
  let index = 0
  let html = ''
  while (index < source.length) {
    let matched = null
    for (const rule of rules) {
      rule.pattern.lastIndex = index
      const hit = rule.pattern.exec(source)
      if (!hit || hit.index !== index) continue
      matched = { type: rule.type, value: hit[0] }
      break
    }
    if (!matched) {
      html += escapeHtml(source[index])
      index += 1
      continue
    }
    html += wrap(matched.type, matched.value)
    index += matched.value.length
  }
  return html
}

const JS_KEYWORDS = '\\b(?:async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|let|new|of|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|type|interface|enum|implements|readonly|as|satisfies)\\b'
const JS_LITERALS = '\\b(?:true|false|null|undefined|NaN|Infinity)\\b'

const MARKUP_TAG = /<\/?[A-Za-z_][\w.:-]*/y
const MARKUP_ATTR = /(?<=\s)(?:[:@#v-]?[A-Za-z_][\w.:-]*)(?==|\s|\/|>)/y
const MARKUP_CLOSE = /\/?>/y

function highlightJavascript(source) {
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
    { type: 'number', pattern: /\b(?:0[xX][\da-fA-F]+|0[bB][01]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/y },
    { type: 'literal', pattern: new RegExp(JS_LITERALS, 'y') },
    { type: 'keyword', pattern: new RegExp(JS_KEYWORDS, 'y') },
    { type: 'function', pattern: /\b[A-Za-z_$][\w$]*(?=\s*\()/y },
    { type: 'punctuation', pattern: /[{}[\](),.;:?]|=>|[+\-*/%=<>!&|^~]+/y },
  ])
}

function highlightReact(source) {
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
    { type: 'tag', pattern: MARKUP_TAG },
    { type: 'attr', pattern: MARKUP_ATTR },
    { type: 'punctuation', pattern: MARKUP_CLOSE },
    { type: 'number', pattern: /\b(?:0[xX][\da-fA-F]+|0[bB][01]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/y },
    { type: 'literal', pattern: new RegExp(JS_LITERALS, 'y') },
    { type: 'keyword', pattern: new RegExp(JS_KEYWORDS, 'y') },
    { type: 'function', pattern: /\b[A-Za-z_$][\w$]*(?=\s*\()/y },
    { type: 'punctuation', pattern: /[{}[\](),.;:?]|=>|[+\-*/%=<>!&|^~]+/y },
  ])
}

function highlightVue(source) {
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /<!--[\s\S]*?-->|\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
    { type: 'tag', pattern: MARKUP_TAG },
    { type: 'attr', pattern: /(?<=\s)(?:v-[\w.:-]+|[@:#][\w.:-]+|[A-Za-z_][\w.:-]*)(?==|\s|\/|>)/y },
    { type: 'punctuation', pattern: MARKUP_CLOSE },
    { type: 'keyword', pattern: /\b(?:script|setup|template|style|scoped|lang|const|let|var|function|return|import|export|from|ref|computed|watch|defineProps|defineEmits|if|else|for|of|in|true|false|null|undefined)\b/y },
    { type: 'number', pattern: /\b\d+(?:\.\d+)?\b/y },
    { type: 'function', pattern: /\b[A-Za-z_$][\w$]*(?=\s*\()/y },
    { type: 'punctuation', pattern: /\{\{|}}|[{}[\](),.;:?]|=>|[+\-*/%=<>!&|^~]+/y },
  ])
}

function highlightJacare(source) {
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
    { type: 'keyword', pattern: /#(if|elif|else|end|each|for)\b/y },
    { type: 'tag', pattern: /<\/?(?:contract|view|style|[A-Za-z_][\w.:-]*)/y },
    { type: 'attr', pattern: /(?<=\s)(?:bind-[\w-]+|on-[\w-]+|:[\w.-]+|[A-Za-z_][\w.:-]*)(?==|\s|\/|>)/y },
    { type: 'punctuation', pattern: MARKUP_CLOSE },
    { type: 'keyword', pattern: /\b(?:import|export|from|const|let|var|function|return|props|emits|type|default|model|required|true|false|null|undefined|async|await|if|else|for|of|in|new|typeof|class)\b/y },
    { type: 'number', pattern: /\b\d+(?:\.\d+)?\b/y },
    { type: 'function', pattern: /\b[A-Za-z_$][\w$]*(?=\s*\()/y },
    { type: 'property', pattern: /\b[A-Za-z_][\w]*(?=\s*:)/y },
    { type: 'punctuation', pattern: /\$\{|}|[{}[\](),.;:?]|=>|[+\-*/%=<>!&|^~]+/y },
  ])
}

function highlightPhp(source) {
  const keywords = '\\b(?:abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|use|var|while|xor|yield|true|false|null)\\b'
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /<<<['"]?\w+['"]?[\s\S]*?\n\w+;|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
    { type: 'keyword', pattern: /<\?(?:php|=)?|\?>/y },
    { type: 'property', pattern: /\$[A-Za-z_][\w]*/y },
    { type: 'number', pattern: /\b\d+(?:\.\d+)?\b/y },
    { type: 'keyword', pattern: new RegExp(keywords, 'iy') },
    { type: 'function', pattern: /\b[A-Za-z_][\w]*(?=\s*\()/y },
    { type: 'punctuation', pattern: /[{}[\](),.;:?]|=>|[+\-*/%=<>!&|^~.@\\]+/y },
  ])
}

function highlightPython(source) {
  const keywords = '\\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield|match|case)\\b'
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /#[^\n]*/y },
    { type: 'string', pattern: /(?:[fFrRbBuU]{0,2})("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/y },
    { type: 'number', pattern: /\b(?:0[xX][\da-fA-F]+|0[bB][01]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/y },
    { type: 'keyword', pattern: new RegExp(keywords, 'y') },
    { type: 'decorator', pattern: /@[A-Za-z_][\w.]*/y },
    { type: 'function', pattern: /\b[A-Za-z_][\w]*(?=\s*\()/y },
    { type: 'punctuation', pattern: /[{}[\](),.;:]|=>|[+\-*/%=<>!&|^~@]+/y },
  ])
}

function highlightJson(source) {
  return tokenizeGeneric(source, [
    { type: 'property', pattern: /"(?:\\.|[^"\\])*"(?=\s*:)/y },
    { type: 'string', pattern: /"(?:\\.|[^"\\])*"/y },
    { type: 'number', pattern: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
    { type: 'literal', pattern: /\b(?:true|false|null)\b/y },
    { type: 'punctuation', pattern: /[{}[\]:,]/y },
  ])
}

function highlightCss(source) {
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
    { type: 'keyword', pattern: /@[A-Za-z-]+/y },
    { type: 'number', pattern: /#(?:[\da-fA-F]{3,8})\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms)?\b/y },
    { type: 'property', pattern: /[A-Za-z-]+(?=\s*:)/y },
    { type: 'selector', pattern: /[.#]?[A-Za-z_][\w-]*/y },
    { type: 'punctuation', pattern: /[{}[\]();:,]|[!=>~|^$*]=|[+\-*/%]/y },
  ])
}

function highlightSql(source) {
  const keywords = '\\b(?:SELECT|FROM|WHERE|AND|OR|NOT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|DISTINCT|NULL|IS|IN|LIKE|BETWEEN|CASE|WHEN|THEN|ELSE|END|ASC|DESC|UNION|ALL|EXISTS)\\b'
  return tokenizeGeneric(source, [
    { type: 'comment', pattern: /--[^\n]*|\/\*[\s\S]*?\*\//y },
    { type: 'string', pattern: /'(?:''|[^'])*'|"(?:""|[^"])*"/y },
    { type: 'number', pattern: /\b\d+(?:\.\d+)?\b/y },
    { type: 'keyword', pattern: new RegExp(keywords, 'iy') },
    { type: 'literal', pattern: /\b(?:TRUE|FALSE|NULL)\b/iy },
    { type: 'punctuation', pattern: /[(),.;=<>!]+/y },
  ])
}

function highlightText(source) {
  return tokenizeGeneric(source, [
    { type: 'string', pattern: /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/y },
    { type: 'number', pattern: /\b\d+(?:\.\d+)?\b/y },
  ])
}

export function highlightCode(source, language) {
  const text = String(source ?? '')
  const lang = normalizeLanguage(language)
  if (!text) return '\n'
  let html = ''
  if (lang === 'json') html = highlightJson(text)
  else if (lang === 'javascript') html = highlightJavascript(text)
  else if (lang === 'react') html = highlightReact(text)
  else if (lang === 'vue') html = highlightVue(text)
  else if (lang === 'jacare') html = highlightJacare(text)
  else if (lang === 'php') html = highlightPhp(text)
  else if (lang === 'python') html = highlightPython(text)
  else if (lang === 'css') html = highlightCss(text)
  else if (lang === 'sql') html = highlightSql(text)
  else html = highlightText(text)
  return html.endsWith('\n') ? html : `${html}\n`
}
