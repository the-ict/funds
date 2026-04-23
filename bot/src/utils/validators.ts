import { isUzbekPhone } from "./phone.util";

export const validateFullName = (value: string): string | null => {
  if (!value) return null;
  return value;
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  return isUzbekPhone(phone);
};