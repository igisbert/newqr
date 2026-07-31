import { select } from '@inquirer/prompts';
import { generatorList } from './generators/index.js';
import { theme } from './utils/theme.js';

export async function showMainMenu() {
  return select({
    message: '¿Qué tipo de QR quieres generar?',
    choices: [
      ...generatorList,
      { name: 'Salir', value: 'exit' }
    ],
    pageSize: 20,
    theme
  });
}