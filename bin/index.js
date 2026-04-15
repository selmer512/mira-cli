#!/usr/bin/env node
import { program } from 'commander'
import { createCommand } from '../src/commands/create.js'
import { startCommand } from '../src/commands/start.js'
import { checkCommand } from '../src/commands/check.js'

program.name('mira').description('Mira personal assistant CLI').version('1.0.0')
program.command('create <type>').description('Scaffold a new Mira instance (type: birth)').action(createCommand)
program.command('start').description('Start the Mira server').action(startCommand)
program.command('check').description('Run Mira health checks').action(checkCommand)
program.parse()
