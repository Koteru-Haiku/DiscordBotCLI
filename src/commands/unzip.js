import { unzipFile } from '../utils/unzipUtils.js';
import fs from 'fs';

/**
 * @param {string} zipFilePath 
 * @param {string} outputDir 
 */
async function Unzip(zipFilePath, outputDir) {
  console.log('zipFilePath:', zipFilePath);
  console.log('outputDir:', outputDir);

  if (!fs.existsSync(zipFilePath)) {
    console.error('Lỗi: File zip không tồn tại.');
    console.log('Vui lòng kiểm tra lại đường dẫn:', zipFilePath);
    process.exit(1);
  }

  try {
    const stats = fs.statSync(outputDir);
    if (!stats.isDirectory()) {
      console.error('Lỗi: Đường dẫn đầu ra phải là thư mục.');
      console.log('Vui lòng cung cấp đường dẫn thư mục (ví dụ: ./output-folder).');
      process.exit(1);
    }
  } catch (err) {
    console.log(`Thư mục đầu ra không tồn tại. Tạo thư mục mới: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await unzipFile(zipFilePath, outputDir);
    console.log(`File zip "${zipFilePath}" đã được giải nén thành công vào thư mục "${outputDir}".`);
  } catch (err) {
    console.error('Lỗi khi giải nén file zip:', err.message);
    console.log('Vui lòng kiểm tra lại đường dẫn và quyền truy cập.');
    process.exit(1);
  }
}

export { Unzip };