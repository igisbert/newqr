import text from './text.js';
import url from './url.js';
import wifi from './wifi.js';
import contact from './contact.js';
import email from './email.js';
import sms from './sms.js';
import phone from './phone.js';
import geo from './geo.js';
import event from './event.js';

export const generators = {
  text,
  url,
  wifi,
  contact,
  email,
  sms,
  phone,
  geo,
  event
};

export const generatorList = [
  { name: 'Texto plano', value: 'text' },
  { name: 'URL', value: 'url' },
  { name: 'WiFi', value: 'wifi' },
  { name: 'Contacto (vCard)', value: 'contact' },
  { name: 'Email', value: 'email' },
  { name: 'SMS', value: 'sms' },
  { name: 'Teléfono', value: 'phone' },
  { name: 'Ubicación (GPS)', value: 'geo' },
  { name: 'Evento de calendario', value: 'event' }
];