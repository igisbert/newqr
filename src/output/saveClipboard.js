import QRCode from 'qrcode';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { getDefaultFilename, getSavePath } from '../utils/paths.js';
import chalk from 'chalk';

const execAsync = promisify(exec);

async function copyToClipboardUnix(filePath) {
  try {
    await execAsync(`wl-copy --type image/png < "${filePath}"`);
    return true;
  } catch {
    try {
      await execAsync(`xclip -selection clipboard -t image/png -i "${filePath}"`);
      return true;
    } catch {
      return false;
    }
  }
}

async function copyToClipboardWindows(filePath) {
  const psCommand = `Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile('${filePath}'))`;
  await execAsync(`powershell -Command "${psCommand}"`);
  return true;
}

async function copyToClipboardMacOS(filePath) {
  await execAsync(`osascript -e 'set the clipboard to (read (POSIX file "${filePath}") as «class PNGf»)'`);
  return true;
}

export async function saveClipboard(payload) {
  const filename = getDefaultFilename('png');
  const filePath = getSavePath(filename);

  try {
    await QRCode.toFile(filePath, payload, { type: 'png' });

    const platform = process.platform;
    let success = false;

    if (platform === 'win32') {
      success = await copyToClipboardWindows(filePath);
    } else if (platform === 'darwin') {
      success = await copyToClipboardMacOS(filePath);
    } else {
      success = await copyToClipboardUnix(filePath);
    }

    if (success) {
      console.log('✅ QR copiado al portapapeles');
      console.log(chalk.gray(`  PNG guardado en: ${filePath}`));
    } else {
      console.log(chalk.yellow('⚠ No se pudo copiar al portapapeles'));
      console.log(chalk.gray(`  PNG guardado en: ${filePath}`));
      console.log(chalk.gray('  En Linux, instala xclip: sudo apt install xclip'));
    }

    return filePath;
  } catch (error) {
    console.error(chalk.red(`Error al copiar al portapapeles: ${error.message}`));
    return null;
  }
}