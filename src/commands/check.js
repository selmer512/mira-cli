import { spawn } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

export function checkCommand() {
  const cwd = process.cwd()
  if (!isMiraProject(cwd)) {
    console.error('Not inside a Mira project. Run this command from your mira project directory.')
    process.exit(1)
  }
  const tsx = path.join(cwd, 'node_modules', '.bin', 'tsx')
  if (!fs.existsSync(tsx)) {
    console.error('Dependencies not installed. Run `npm install` first.')
    process.exit(1)
  }
  const proc = spawn(tsx, ['scripts/check.js'], { cwd, stdio: 'inherit' })
  proc.on('exit', (code) => process.exit(code ?? 0))
}

function isMiraProject(dir) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    return pkg.name === 'mira'
  } catch { return false }
}
