import QRCode from "qrcode";
import { getDefaultFilename, getSavePath } from "../utils/paths.js";
import chalk from "chalk";

export async function savePng(payload) {
  const filename = getDefaultFilename("png");
  const filePath = getSavePath(filename);

  try {
    await QRCode.toFile(filePath, payload, { type: "png", width: 1024 });
    console.log('✅ QR guardado en: ' + filePath);
    return filePath;
  } catch (error) {
    console.error(chalk.red(`Error al guardar PNG: ${error.message}`));
    return null;
  }
}
