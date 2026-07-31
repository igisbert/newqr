import path from 'node:path';
import process from 'node:process';

export function getDefaultFilename(extension) {
  const timestamp = Date.now();
  return `qr-${timestamp}.${extension}`;
}

export function getSavePath(filename) {
  return path.resolve(process.cwd(), filename);
}

export function ensureHttps(url) {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}