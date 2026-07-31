import chalk from 'chalk';
import { showMainMenu } from './mainMenu.js';
import { generators } from './generators/index.js';
import { confirmGeneration } from './output/confirm.js';
import { chooseOutputFormat } from './output/saveMenu.js';
import { savePng } from './output/savePng.js';
import { saveSvg } from './output/saveSvg.js';
import { saveClipboard } from './output/saveClipboard.js';
import { showTerminalPreview } from './output/terminalPreview.js';

async function main() {
  console.log(chalk.cyan.bold('\n🔲 newqr — Generador de códigos QR\n'));

  try {
    while (true) {
      const type = await showMainMenu();
      if (type === 'exit') break;
      const generator = generators[type];

      console.log(chalk.gray(`\nGenerando QR de tipo: ${generator.name}\n`));
      const payload = await generator.generate();

      console.log(chalk.yellow('\n--- Resumen ---'));
      console.log(chalk.white(payload));
      console.log(chalk.yellow('---------------\n'));

      const confirmar = await confirmGeneration();
      if (!confirmar) {
        console.log(chalk.gray('Operación cancelada. Volviendo al menú...\n'));
        continue;
      }

      const format = await chooseOutputFormat();

      let filePath = null;
      if (format === 'png') {
        filePath = await savePng(payload);
      } else if (format === 'svg') {
        filePath = await saveSvg(payload);
      } else if (format === 'clipboard') {
        filePath = await saveClipboard(payload);
      }

      await showTerminalPreview(payload);
      break;
    }
  } catch (error) {
    if (error.name === 'ExitPromptError') {
      console.log(chalk.gray('\nSaliendo...\n'));
    } else {
      console.error(chalk.red(`\nError inesperado: ${error.message}`));
      process.exit(1);
    }
  }
}

main();