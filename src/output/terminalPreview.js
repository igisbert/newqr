import QRCode from 'qrcode';
import chalk from 'chalk';

export async function showTerminalPreview(payload) {
  try {
    const qr = await QRCode.toString(payload, { type: 'terminal', small: true, errorCorrectionLevel: 'H', margin: 1 });
    console.log('\n' + chalk.cyan('Preview del QR en terminal:'));
    console.log(qr);
  } catch (error) {
    console.error(chalk.red(`Error al generar preview: ${error.message}`));
  }
}