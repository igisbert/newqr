import QRCode from 'qrcode';
import fs from 'node:fs/promises';
import { getDefaultFilename, getSavePath } from '../utils/paths.js';
import chalk from 'chalk';

export async function saveSvg(payload) {
  const filename = getDefaultFilename('svg');
  const filePath = getSavePath(filename);

  try {
    const svg = await QRCode.toString(payload, { type: 'svg' });
    await fs.writeFile(filePath, svg, 'utf-8');
    console.log('✅ QR guardado en: ' + filePath);
    return filePath;
  } catch (error) {
    console.error(chalk.red(`Error al guardar SVG: ${error.message}`));
    return null;
  }
}