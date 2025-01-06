import fs from 'fs'

function validatePath(filePath) {
  return fs.existsSync(filePath);
}

function readBotConfig(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeBotConfig(filePath, config) {
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
}

function writeAPIConfig(filepath, apiConfig) {
  fs.writeFile(filepath, apiConfig);
}

export {
  validatePath,
  readBotConfig,
  writeBotConfig,
  writeAPIConfig
};