import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

async function configAPI(projectPath) {
  const configFilePath = path.join(projectPath, 'config.py');

  let existingConfig = {};
  if (fs.existsSync(configFilePath)) {
    const content = fs.readFileSync(configFilePath, 'utf8');
    existingConfig = parseConfigFile(content);
  }

  const questions = [
    {
      type: 'input',
      name: 'openweather',
      message: 'Nhập API key cho OpenWeather:',
      default: existingConfig.openweather || '',
    },
    {
      type: 'input',
      name: 'giphy',
      message: 'Nhập API key cho Giphy:',
      default: existingConfig.giphy || '', 
    },
    {
      type: 'input',
      name: 'orc_space',
      message: 'Nhập API key cho ORC Space:',
      default: existingConfig.orc_space || '',
    },
  ];

  const answers = await inquirer.prompt(questions);

  const updatedConfig = { ...existingConfig, ...answers };

  writeAPIConfig(configFilePath, updatedConfig);
  console.log('Cấu hình API đã được cập nhật vào config.py');
}

function parseConfigFile(content) {
  const config = {};
  const regex = /(\w+)\s*=\s*"([^"]*)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1].toLowerCase();
    const value = match[2];
    config[key] = value;
  }
  return config;
}

function writeAPIConfig(filePath, apiConfig) {
  const content = `# Cấu hình API
OPENWEATHER_API_KEY = "${apiConfig.openweather}"
GIPHY_API_KEY = "${apiConfig.giphy}"
ORC_SPACE_API_KEY = "${apiConfig.orc_space}"
`;

  fs.writeFileSync(filePath, content);
}

export { configAPI };