export function isNonEmpty(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

export function isValidUrl(str) {
  if (!isNonEmpty(str)) return false;
  try {
    new URL(str);
    return true;
  } catch {
    return /^https?:\/\//i.test(str);
  }
}

export function isValidEmail(str) {
  if (!isNonEmpty(str)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isValidPhone(str) {
  if (!isNonEmpty(str)) return false;
  return /^[\d\s\-+()]{7,20}$/.test(str);
}

export function isValidLatLon(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= -90 && num <= 90;
}