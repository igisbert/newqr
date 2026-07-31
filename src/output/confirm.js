import { confirm } from '@inquirer/prompts';
import { theme } from '../utils/theme.js';

export async function confirmGeneration() {
  return confirm({
    message: '¿Generar el QR?',
    default: true,
    theme
  });
}