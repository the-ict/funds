import { isUzbekPhone } from "./phone.util";

export const validateFullName = (value: string): string | null => {
  const name = value.trim().replace(/\s+/g, " ");
  const hasUrl = /(https?:\/\/|www\.)/i.test(name);
  const hasForbiddenChars = /[<>{}[\]|_*=$%#@!~^`]/.test(name);
  const hasDigit = /\d/.test(name);
  const namePattern = /^[\p{L}’'`-]+(?:\s+[\p{L}’'`-]+)+$/u;

  if (!name) {
    return null;
  }

  if (name.length < 3 || name.length > 70) {
    return null;
  }

  if (hasUrl || hasForbiddenChars || hasDigit) {
    return null;
  }

  if (!namePattern.test(name)) {
    return null;
  }

  return name;
};

export const validatePhone = (phone: string): boolean => isUzbekPhone(phone);
