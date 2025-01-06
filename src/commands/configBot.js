import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { validatePath, readBotConfig, writeBotConfig } from '../utils/fileUtils.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function configBot(projectPath) {
  console.log(projectPath);

  const templateDir = path.join(projectPath, 'template');
  const botConfigPath = path.join(templateDir, 'bot.json');

  if (!fs.existsSync(templateDir)) {
    console.error(`Thư mục template không tồn tại trong đường dẫn: ${templateDir}`);
    rl.close();
    return;
  }

  try {
    fs.accessSync(templateDir, fs.constants.R_OK | fs.constants.W_OK);
    console.log('Có quyền đọc/ghi thư mục template.');
  } catch (err) {
    console.error('Không có quyền đọc/ghi thư mục template.');
    rl.close();
    return;
  }

  if (!validatePath(botConfigPath)) {
    console.log('File bot.json không tồn tại. Tạo file mới...');
    const defaultConfig = {
      token: "",
      state: "online",
      version: "1.0.0",
      client_id: "",
      prefix: "!",
      name: "MyBot"
    };
    writeBotConfig(botConfigPath, defaultConfig);
  }

  let botConfig = readBotConfig(botConfigPath);

  const questions = [
    { field: 'token', question: 'Nhập Token bot: ' },
    { field: 'state', question: 'Nhập state bot: ' },
    { field: 'version', question: 'Nhập version bot: ' },
    { field: 'client_id', question: 'Nhập client_id: ' },
    { field: 'prefix', question: 'Nhập prefix: ' },
    { field: 'name', question: 'Nhập name bot: ' }
  ];

  for (const { field, question } of questions) {
    const answer = await askQuestion(question);
    botConfig[field] = answer || '';
  }

  writeBotConfig(botConfigPath, botConfig);
  console.log('Cấu hình đã được lưu vào bot.json');
  rl.close();
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

export { configBot }