import { input } from '@inquirer/prompts';
import { isNonEmpty, isValidUrl } from '../utils/validators.js';
import { ensureHttps } from '../utils/paths.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'URL',
  async generate() {
    const url = await input({
      message: 'Introduce la URL:',
      validate: (value) => {
        if (!isNonEmpty(value)) return 'La URL no puede estar vacía';
        return isValidUrl(value) || 'Introduce una URL válida';
      },
      theme
    });
    return ensureHttps(url);
  }
};