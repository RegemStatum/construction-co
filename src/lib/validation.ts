// src/lib/validation.ts
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{6,20}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function isValidPhone(value: string): boolean {
  if (!PHONE_PATTERN.test(value)) return false;
  const digitCount = (value.match(/\d/g) ?? []).length;
  return digitCount >= 6;
}
