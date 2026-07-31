import { select } from '@inquirer/prompts';
import { theme } from '../utils/theme.js';

export async function chooseOutputFormat() {
  return select({
    message: 'Formato de salida:',
    choices: [
      { name: 'PNG', value: 'png' },
      { name: 'SVG', value: 'svg' },
      { name: 'Copiar al portapapeles', value: 'clipboard' }
    ],
    pageSize: 20,
    theme
  });
}