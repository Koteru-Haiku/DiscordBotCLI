import fs from 'fs';
import archiver from 'archiver';

/**
 * @param {string} sourceDir - Duong dan folder can nen
 * @param {string} outPath - Duong dan file zip output
 * @returns {Promise<void>}
 */

async function zipFolder(sourceDir, outPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    output.on('close', () => {
      console.log(`Folder đã được nén thành công. Kích thước file zip: ${archive.pointer()} bytes`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    archive.directory(sourceDir, false);

    archive.finalize();
  }).catch((err) => console.log("Lỗi định dạng"));
}

export { zipFolder };