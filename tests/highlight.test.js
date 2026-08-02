import { describe, expect, it } from 'vitest'
import { escapeHtml, highlightCode } from '../src/internal/highlight.js'

describe('highlightCode', () => {
  it('escapes html in plain text', () => {
    expect(escapeHtml('<script>"&')).toBe('&lt;script&gt;&quot;&amp;')
  })

  it('highlights json keys strings numbers and literals', () => {
    const html = highlightCode('{ "ok": true, "label": "hi", "n": 2 }', 'json')
    expect(html).toContain('jui-code-token--property')
    expect(html).toContain('jui-code-token--string')
    expect(html).toContain('jui-code-token--literal')
    expect(html).toContain('jui-code-token--number')
    expect(html).toContain('&quot;ok&quot;')
  })

  it('highlights javascript keywords and functions', () => {
    const html = highlightCode('export function sum(a) { return a }', 'javascript')
    expect(html).toContain('jui-code-token--keyword')
    expect(html).toContain('jui-code-token--function')
    expect(html).toContain('sum')
  })

  it('highlights css properties and colors', () => {
    const html = highlightCode('.card { color: #15803d; }', 'css')
    expect(html).toContain('jui-code-token--property')
    expect(html).toContain('jui-code-token--number')
  })

  it('highlights sql keywords case-insensitively', () => {
    const html = highlightCode('select id from users where active = true', 'sql')
    expect(html).toContain('jui-code-token--keyword')
  })

  it('highlights jacare tags attrs and directives', () => {
    const html = highlightCode("export <view>\n  <Button :label=${'Save'} />\n#if true\n#end\n</view>", 'jacare')
    expect(html).toContain('jui-code-token--tag')
    expect(html).toContain('jui-code-token--attr')
    expect(html).toContain('jui-code-token--keyword')
  })

  it('highlights vue tags and directives', () => {
    const html = highlightCode('<template>\n  <button @click="count++">{{ count }}</button>\n</template>', 'vue')
    expect(html).toContain('jui-code-token--tag')
    expect(html).toContain('jui-code-token--attr')
  })

  it('highlights react jsx tags', () => {
    const html = highlightCode('export function Hello() { return <h1 className="x">Hi</h1> }', 'react')
    expect(html).toContain('jui-code-token--tag')
    expect(html).toContain('jui-code-token--keyword')
  })

  it('highlights php variables and tags', () => {
    const html = highlightCode('<?php function greet($name) { echo $name; }', 'php')
    expect(html).toContain('jui-code-token--keyword')
    expect(html).toContain('jui-code-token--property')
    expect(html).toContain('$name')
  })

  it('highlights python keywords and decorators', () => {
    const html = highlightCode('@app.get\ndef greet(name):\n    return f"hi {name}"', 'python')
    expect(html).toContain('jui-code-token--keyword')
    expect(html).toContain('jui-code-token--decorator')
    expect(html).toContain('jui-code-token--string')
  })
})
