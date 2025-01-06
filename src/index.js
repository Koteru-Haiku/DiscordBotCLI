#!/usr/bin/env node
import { program } from 'commander';
import { configBot } from './commands/configBot.js'
import { configAPI } from './commands/configAPI.js';
import { Zip } from './commands/zipFolder.js';
import { Unzip } from './commands/unzip.js';
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

program
  .command('zip')
  .description('Nén một folder thành file zip')
  .requiredOption('-i, --path-input <path>', 'Đường dẫn đến folder cần nén')
  .requiredOption('-o, --path-output <path>', 'Đường dẫn đến file zip đầu ra')
  .action(async (options) => {
    try {
      await Zip(options.pathInput, options.pathOutput);
    } catch (err) {
      console.log("Loi: ", err.message)
    }
  });

program
  .command('unzip')
  .description('Giải nén file zip')
  .requiredOption('-i, --path-input <path>', 'Đường dẫn đến file zip cần giải nén')
  .requiredOption('-o, --path-output <path>', 'Đường dẫn đến thư mục đầu ra')
  .action(async (options) => {
    if (!options.pathInput || !options.pathOutput) {
      console.error('Lỗi: Vui lòng cung cấp đầy đủ các options.');
      console.log('Ví dụ: chinh unzip -i ./file.zip -o ./output-folder');
      process.exit(1);
    }
    await Unzip(options.pathInput, options.pathOutput);
  });

program.parse(process.argv);