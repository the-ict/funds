import { isUzbekPhone } from "./phone.util";

export const validateFullName = (value: string): string | null => {
  const name = value.trim().replace(/\s+/g, " ");

  if (!name) {
    return null;
  }

  if (name.length < 3) {
    return null;
  }

  return name;
};

export const validatePhone = (phone: string): boolean => isUzbekPhone(phone);
