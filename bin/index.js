#!/usr/bin/env node
import { program } from 'commander'
import { createCommand } from '../src/commands/create.js'
import { startCommand } from '../src/commands/start.js'
import { checkCommand } from '../src/commands/check.js'
import { installCommand } from '../src/commands/install.js'
import { buildCommand } from '../src/commands/build.js'
import { trainCommand } from '../src/commands/train.js'
import { updateCommand } from '../src/commands/update.js'

program
  .name('mira')
  .description('Mira personal assistant CLI')
  .version('1.0.0')

program
  .command('create <type>')
  .description('Scaffold a new Mira instance (type: birth)')
  .action(createCommand)

program
  .command('install')
  .description('Install dependencies')
  .action(installCommand)

program
  .command('build')
  .description('Build Mira (server + app)')
  .option('--server', 'Build server only')
  .option('--app', 'Build app only')
  .action(buildCommand)

program
  .command('train')
  .description('Train the NLP models')
  .action(trainCommand)

program
  .command('update')
  .description('Pull latest changes and reinstall dependencies')
  .action(updateCommand)

program
  .command('start')
  .description('Start the Mira server')
  .action(startCommand)

program
  .command('check')
  .description('Run Mira health checks')
  .action(checkCommand)

program.parse()
