import AdmZip from 'adm-zip';
import fs from 'fs';

/**
 * @param {string} zipFilePath - 
 * @param {string} outputDir -
 * @returns {Promise<void>}
 */
function unzipFile(zipFilePath, outputDir) {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(zipFilePath)) {
        throw new Error(`File zip không tồn tại: ${zipFilePath}`);
      }

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(outputDir, true); 

      console.log(`File zip "${zipFilePath}" đã được giải nén thành công vào thư mục "${outputDir}".`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export { unzipFile };