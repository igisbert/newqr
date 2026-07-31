import { input } from '@inquirer/prompts';
import { isNonEmpty } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'Contacto (vCard)',
  async generate() {
    const name = await input({
      message: 'Nombre (obligatorio):',
      validate: (value) => isNonEmpty(value) || 'El nombre no puede estar vacío',
      theme
    });

    const phone = await input({ message: 'Teléfono (opcional, Enter para omitir):', theme });
    const email = await input({ message: 'Correo (opcional, Enter para omitir):', theme });
    const address = await input({ message: 'Dirección (opcional, Enter para omitir):', theme });

    let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nN:${name};;;;`;
    if (phone) vcard += `\nTEL:${phone}`;
    if (email) vcard += `\nEMAIL:${email}`;
    if (address) vcard += `\nADR:;;${address};;;;`;
    vcard += '\nEND:VCARD';

    return vcard;
  }
};