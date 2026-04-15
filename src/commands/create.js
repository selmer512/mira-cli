import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const REPO_URL = '<https://github.com/selmer512/mira.git>'

export function createCommand(type) {
  if (type !== 'birth') {
    console.error(`Unknown type "${type}". Use: mira create birth`)
    process.exit(1)
  }
  const dest = path.resolve(process.cwd(), 'mira')
  if (fs.existsSync(dest)) {
    console.error(`Directory already exists: ${dest}`)
    process.exit(1)
  }
  console.log('Cloning Mira...')
  run('git', ['clone', REPO_URL, dest])
  console.log('Installing dependencies...')
  run('npm', ['install'], { cwd: dest })
  console.log('\nDone! Run the following to get started:\n\n  cd mira\n  mira start\n')
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', ...opts })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
