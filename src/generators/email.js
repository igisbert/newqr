import { input } from '@inquirer/prompts';
import { isNonEmpty, isValidEmail } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

export default {
  name: 'Email',
  async generate() {
    const email = await input({
      message: 'Dirección de correo destino:',
      validate: (value) => isValidEmail(value) || 'Introduce un email válido',
      theme
    });

    const subject = await input({ message: 'Asunto (opcional, Enter para omitir):', theme });
    const body = await input({ message: 'Cuerpo del mensaje (opcional, Enter para omitir):', theme });

    let mailto = `mailto:${email}`;
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    if (params.length > 0) mailto += `?${params.join('&')}`;

    return mailto;
  }
};