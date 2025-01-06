import { zipFolder } from '../utils/zipUtils.js'

async function Zip(sourceDir, outPath) {
    try {
      await zipFolder(sourceDir, outPath);
      console.log(`Folder "${sourceDir}" đã được nén thành công thành file "${outPath}".`);
    } catch (err) {
      console.error('Lỗi khi nén folder:', err.message);
    }
}

export { Zip }