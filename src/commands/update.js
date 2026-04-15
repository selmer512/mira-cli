import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function updateCommand() {
  const cwd = process.cwd()
  if (!isMiraProject(cwd)) {
    console.error('Not inside a Mira project. Run this command from your mira project directory.')
    process.exit(1)
  }
  console.log('Pulling latest changes...')
  run('git', ['pull'], { cwd })
  console.log('Installing dependencies...')
  run('npm', ['install'], { cwd })
  console.log('\nMira is up to date.')
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', ...opts })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function isMiraProject(dir) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    return pkg.name === 'mira'
  } catch { return false }
}
