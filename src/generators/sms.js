import { input } from '@inquirer/prompts';
import { isValidPhone } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'SMS',
  async generate() {
    const phone = await input({
      message: 'Número de teléfono:',
      validate: (value) => isValidPhone(value) || 'Introduce un número válido',
      theme
    });

    const message = await input({ message: 'Mensaje predefinido (opcional, Enter para omitir):', theme });

    if (!message) return `SMSTO:${phone}`;
    return `SMSTO:${phone}:${message}`;
  }
};