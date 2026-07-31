import { input } from '@inquirer/prompts';
import { isValidPhone } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'Teléfono',
  async generate() {
    const phone = await input({
      message: 'Número de teléfono:',
      validate: (value) => isValidPhone(value) || 'Introduce un número válido',
      theme
    });

    return `tel:${phone}`;
  }
};