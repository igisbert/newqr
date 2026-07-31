import { input } from '@inquirer/prompts';
import { isNonEmpty } from '../utils/validators.js';
import { theme } from '../utils/theme.js';

function formatEventDate(dateStr) {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match;
  return `${year}${month}${day}T${hour}${minute}00`;
}

export default {
  name: 'Evento de calendario',
  async generate() {
    const title = await input({
      message: 'Título del evento:',
      validate: (value) => isNonEmpty(value) || 'El título no puede estar vacío',
      theme
    });

    const startDate = await input({
      message: 'Fecha/hora inicio (YYYY-MM-DD HH:mm):',
      validate: (value) => {
        if (!isNonEmpty(value)) return 'La fecha no puede estar vacía';
        return formatEventDate(value) !== null || 'Formato inválido. Usa YYYY-MM-DD HH:mm';
      },
      theme
    });

    const endDate = await input({
      message: 'Fecha/hora fin (YYYY-MM-DD HH:mm):',
      validate: (value) => {
        if (!isNonEmpty(value)) return 'La fecha no puede estar vacía';
        return formatEventDate(value) !== null || 'Formato inválido. Usa YYYY-MM-DD HH:mm';
      },
      theme
    });

    const location = await input({ message: 'Ubicación (opcional, Enter para omitir):', theme });
    const description = await input({ message: 'Descripción (opcional, Enter para omitir):', theme });

    let vevent = `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${formatEventDate(startDate)}\nDTEND:${formatEventDate(endDate)}`;
    if (location) vevent += `\nLOCATION:${location}`;
    if (description) vevent += `\nDESCRIPTION:${description}`;
    vevent += '\nEND:VEVENT';

    return vevent;
  }
};