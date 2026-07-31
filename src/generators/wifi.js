import { input, select } from '@inquirer/prompts';
import { isNonEmpty } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

function escapeWifi(str) {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/"/g, '\\"').replace(/:/g, '\\:');
}

export default {
  name: 'WiFi',
  async generate() {
    const ssid = await input({
      message: 'SSID (nombre de la red):',
      validate: (value) => isNonEmpty(value) || 'El SSID no puede estar vacío',
      theme
    });

    const security = await select({
      message: 'Tipo de seguridad:',
      choices: [
        { name: 'WPA/WPA2', value: 'WPA' },
        { name: 'WEP', value: 'WEP' },
        { name: 'Ninguna', value: 'nopass' }
      ],
      theme
    });

    let password = '';
    if (security !== 'nopass') {
      password = await input({
        message: 'Contraseña:',
        validate: (value) => isNonEmpty(value) || 'La contraseña no puede estar vacía',
        theme
      });
    }

    return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(password)};;`;
  }
};