import { spawnSync, spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function startCommand() {
  const cwd = process.cwd()
  if (!isMiraProject(cwd)) {
    console.error('Not inside a Mira project. Run this command from your mira project directory.')
    process.exit(1)
  }
  if (!fs.existsSync(path.join(cwd, 'server', 'dist', 'index.js'))) {
    console.error('Server is not built. Run `npm run build:server` first.')
    process.exit(1)
  }
  const env = { ...process.env, MIRA_NODE_ENV: 'production' }
  const pre = spawnSync('node', ['server/dist/pre-check.js'], { cwd, stdio: 'inherit', env })
  if (pre.status !== 0) process.exit(pre.status ?? 1)
  const server = spawn('node', ['server/dist/index.js'], { cwd, stdio: 'inherit', env })
  server.on('exit', (code) => process.exit(code ?? 0))
}

function isMiraProject(dir) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    return pkg.name === 'mira'
  } catch { return false }
}
