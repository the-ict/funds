const UZBEKISTAN_COUNTRY_CODE = "+998";

export const normalizePhone = (raw: string): string | null => {
  const cleaned = raw.replace(/[^\d+]/g, "").trim();

  if (!cleaned) {
    return null;
  }

  if (cleaned.startsWith("+")) {
    const digits = cleaned.slice(1).replace(/\D/g, "");
    return `+${digits}`;
  }

  const onlyDigits = cleaned.replace(/\D/g, "");

  if (onlyDigits.startsWith("998") && onlyDigits.length === 12) {
    return `+${onlyDigits}`;
  }

  if (onlyDigits.length === 9) {
    return `${UZBEKISTAN_COUNTRY_CODE}${onlyDigits}`;
  }

  return null;
};

export const isUzbekPhone = (phone: string): boolean => /^\+998\d{9}$/.test(phone);
