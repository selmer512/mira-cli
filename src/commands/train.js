import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function trainCommand() {
  const cwd = process.cwd()
  if (!isMiraProject(cwd)) {
    console.error('Not inside a Mira project. Run this command from your mira project directory.')
    process.exit(1)
  }
  const proc = spawn('npm', ['run', 'train'], { cwd, stdio: 'inherit' })
  proc.on('exit', (code) => process.exit(code ?? 0))
}

function isMiraProject(dir) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    return pkg.name === 'mira'
  } catch { return false }
}
