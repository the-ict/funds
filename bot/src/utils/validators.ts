import { isUzbekPhone } from "./phone.util";

export const validateFullName = (value: string): string | null => {
  const name = value.trim().replace(/\s+/g, " ");
  const hasUrl = /(https?:\/\/|www\.)/i.test(name);
  const hasForbiddenChars = /[<>{}[\]|_*=$%#@!~^`]/.test(name);
  const isOnlyNumbers = /^\d+$/.test(name);

  if (!name) {
    return null;
  }

  if (name.length < 3 || name.length > 70) {
    return null;
  }

  if (hasUrl || hasForbiddenChars || isOnlyNumbers) {
    return null;
  }

  if (!/[\p{L}]/u.test(name) || !name.includes(' ')) {
    return null;
  }

  return name;
};

export const validatePhone = (phone: string): boolean => isUzbekPhone(phone);
