import { input } from '@inquirer/prompts';
import { isNonEmpty } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'Texto plano',
  async generate() {
    const text = await input({
      message: 'Introduce el texto:',
      validate: (value) => isNonEmpty(value) || 'El texto no puede estar vacío',
      theme
    });
    return text;
  }
};