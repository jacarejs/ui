import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from '@jacare/compiler'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(root, 'src', 'components')
const outDir = join(root, 'docs', 'src', 'generated')

mkdirSync(outDir, { recursive: true })

const contracts = {}
const searchIndex = []

for (const file of readdirSync(componentsDir).filter((name) => name.endsWith('.jcr')).sort()) {
  const name = basename(file, '.jcr')
  const filename = join(componentsDir, file)
  const source = readFileSync(filename, 'utf8')
  const result = compile(source, { filename, mode: 'full', cpw: true, debug: false })
  contracts[name] = {
    props: result.contract?.props ?? {},
    pulses: result.contract?.pulses ?? {},
    slots: result.contract?.slots ?? [],
    emits: Object.keys(result.contract?.emits ?? {}),
  }
  searchIndex.push({
    title: name,
    section: 'Components',
    href: `/components/${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
    keywords: [name.toLowerCase(), ...Object.keys(contracts[name].props)],
  })
}

writeFileSync(join(outDir, 'contracts.json'), JSON.stringify(contracts, null, 2) + '\n')
writeFileSync(join(outDir, 'search-index.json'), JSON.stringify(searchIndex, null, 2) + '\n')
writeFileSync(
  join(outDir, 'contracts.js'),
  `import contracts from './contracts.json'\n\nexport function getContract(name) {\n  return contracts[name] || { props: {}, slots: [], emits: [] }\n}\n\nexport { contracts }\n`,
)

console.log(`generated contracts for ${Object.keys(contracts).length} components`)
