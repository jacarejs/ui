const frameworks = [
  { id: 'jacare', label: 'Jacaré', language: 'jacare' },
  { id: 'vue', label: 'Vue', language: 'vue' },
  { id: 'react', label: 'React', language: 'tsx' },
  { id: 'angular', label: 'Angular', language: 'typescript' },
]

function moduleName(filename = 'example.jcr') {
  const name = String(filename || 'example.jcr')
  if (name.endsWith('.jcr')) return name
  return 'app.jcr'
}

function baseName(filename = 'example.jcr') {
  return moduleName(filename).replace(/\.jcr$/i, '')
}

function isJacareModule(filename = 'example.jcr') {
  return String(filename || '').endsWith('.jcr')
}

function vueSample(mod) {
  return `<script setup>
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import Example from './${mod}'
import '@jacare/ui/theme.css'

const host = useTemplateRef('host')
let dispose

onMounted(() => {
  dispose = Example(host.value)
})

onBeforeUnmount(() => dispose?.())
</script>

<template>
  <div ref="host" />
</template>`
}

function reactSample(mod) {
  return `import { useEffect, useRef } from 'react'
import Example from './${mod}'
import '@jacare/ui/theme.css'

export default function ExampleHost() {
  const host = useRef(null)

  useEffect(() => {
    if (!host.current) return undefined
    return Example(host.current)
  }, [])

  return <div ref={host} />
}`
}

function angularSample(mod) {
  return `import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import Example from './${mod}'
import '@jacare/ui/theme.css'

@Component({
  selector: 'app-example',
  standalone: true,
  template: '<div #host></div>',
})
export class ExampleComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true })
  host!: ElementRef<HTMLElement>

  private dispose?: () => void

  ngAfterViewInit() {
    this.dispose = Example(this.host.nativeElement)
  }

  ngOnDestroy() {
    this.dispose?.()
  }
}`
}

function stripThemeImport(code) {
  return String(code ?? '')
    .split('\n')
    .filter((line) => !line.includes("@jacare/ui/theme.css"))
    .join('\n')
    .trim()
}

function vueEntry(code) {
  const body = stripThemeImport(code)
  return `<script setup>
import '@jacare/ui/theme.css'
${body}
</script>`
}

function angularEntry(code) {
  const body = stripThemeImport(code)
  const hasTheme = body.includes('applyTheme')
  const statements = body
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('import '))
    .map((line) => `    ${line}`)
    .join('\n')
  const imports = body
    .split('\n')
    .filter((line) => line.startsWith('import '))
    .join('\n')

  return `import { Component, OnInit } from '@angular/core'
import '@jacare/ui/theme.css'
${imports ? `${imports}\n` : ''}${hasTheme && !imports.includes('applyTheme') ? "import { applyTheme } from '@jacare/ui/theme'\n" : ''}
@Component({
  selector: 'app-root',
  standalone: true,
  template: '',
})
export class AppComponent implements OnInit {
  ngOnInit() {
${statements || '    // boot'}
  }
}`
}

function reactEntryClean(code) {
  const raw = stripThemeImport(code)
  const imports = raw
    .split('\n')
    .filter((line) => line.startsWith('import '))
  const rest = raw
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('import '))

  const hasApply = rest.some((line) => line.includes('applyTheme'))
  if (hasApply) {
    return `import { useEffect } from 'react'
import '@jacare/ui/theme.css'
${imports.filter((line) => line.includes('applyTheme')).join('\n') || "import { applyTheme } from '@jacare/ui/theme'"}

export default function App() {
  useEffect(() => {
${rest.map((line) => `    ${line}`).join('\n')}
  }, [])

  return null
}`
  }

  return `import '@jacare/ui/theme.css'
${imports.join('\n')}

// Use compiled Jacaré views from your Vite + @jacare/vite-plugin setup.
export default function App() {
  return null
}`
}

export function frameworksFor(jacareCode, filename = 'example.jcr') {
  const source = String(jacareCode ?? '')
  const file = String(filename || 'example.jcr')

  if (!isJacareModule(file)) {
    const base = file.replace(/\.[^.]+$/, '') || 'app'
    return {
      jacare: {
        id: 'jacare',
        label: 'Jacaré',
        language: 'javascript',
        filename: file,
        code: source,
      },
      vue: {
        id: 'vue',
        label: 'Vue',
        language: 'vue',
        filename: `${base}.vue`,
        code: vueEntry(source),
      },
      react: {
        id: 'react',
        label: 'React',
        language: 'tsx',
        filename: `${base}.tsx`,
        code: reactEntryClean(source),
      },
      angular: {
        id: 'angular',
        label: 'Angular',
        language: 'typescript',
        filename: `${base}.component.ts`,
        code: angularEntry(source),
      },
    }
  }

  const mod = moduleName(file)
  const base = baseName(file)
  return {
    jacare: {
      id: 'jacare',
      label: 'Jacaré',
      language: 'jacare',
      filename: mod,
      code: source,
    },
    vue: {
      id: 'vue',
      label: 'Vue',
      language: 'vue',
      filename: `${base}.vue`,
      code: vueSample(mod),
    },
    react: {
      id: 'react',
      label: 'React',
      language: 'tsx',
      filename: `${base}.tsx`,
      code: reactSample(mod),
    },
    angular: {
      id: 'angular',
      label: 'Angular',
      language: 'typescript',
      filename: `${base}.component.ts`,
      code: angularSample(mod),
    },
  }
}

export function frameworkList(jacareCode, filename) {
  const map = frameworksFor(jacareCode, filename)
  return frameworks.map((item) => map[item.id])
}

export { frameworks }
