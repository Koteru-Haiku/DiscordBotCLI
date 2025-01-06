#!/usr/bin/env node
import { program } from 'commander';
import { configBot } from './commands/configBot.js'
import { configAPI } from './commands/configAPI.js';

program
  .command('config')
  .description('Configure the bot settings')
  .requiredOption('-p, --path <path>', 'Path to the project folder containing template/bot.json')
  .action((options) => {
    configBot(options.path);
  });

program
  .command('config-api')
  .description('Configure API settings')
  .requiredOption('-p, --path <path>', 'Path to the project folder containing config.py')
  .action((options) => {
    configAPI(options.path);
  });

program.parse(process.argv);