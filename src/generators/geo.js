import { input } from '@inquirer/prompts';
import { isValidLatLon } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'Ubicación (GPS)',
  async generate() {
    const lat = await input({
      message: 'Latitud:',
      validate: (value) => isValidLatLon(value) || 'Introduce una latitud válida (-90 a 90)',
      theme
    });

    const lon = await input({
      message: 'Longitud:',
      validate: (value) => {
        const num = parseFloat(value);
        return (!isNaN(num) && num >= -180 && num <= 180) || 'Introduce una longitud válida (-180 a 180)';
      },
      theme
    });

    return `geo:${lat},${lon}`;
  }
};