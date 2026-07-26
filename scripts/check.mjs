import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile, formatCompileError, JacareCompileError } from '@jacare/compiler'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(root, 'src', 'components')
const files = readdirSync(componentsDir)
  .filter((name) => name.endsWith('.jcr'))
  .sort()

let failed = 0

for (const file of files) {
  const filename = join(componentsDir, file)
  const source = readFileSync(filename, 'utf8')
  try {
    const result = compile(source, {
      filename,
      mode: 'full',
      cpw: true,
      debug: false,
    })
    if (!result.contract) {
      console.error(`✗ ${file}: missing <contract>`)
      failed++
      continue
    }
    console.log(`✓ ${basename(file, '.jcr')}`)
  } catch (error) {
    failed++
    if (error instanceof JacareCompileError) {
      console.error(formatCompileError(error))
    } else {
      console.error(`✗ ${file}`)
      console.error(error)
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} component(s) failed`)
  process.exit(1)
}

console.log(`\nchecked ${files.length} components`)
