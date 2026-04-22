export type TransactionType = "income" | "expense";

export interface ParsedTransaction {
  type: TransactionType;
  amount: number;
  currency: "UZS";
  note: string | null;
  rawText: string;
}

const incomeKeywords = [
  "received",
  "receive",
  "got",
  "income",
  "kirim",
  "oldim",
  "tushdi",
  "keldi",
];

const expenseKeywords = [
  "spent",
  "spend",
  "paid",
  "xarajat",
  "chiqim",
  "sarfladim",
  "to'ladim",
  "to‘ladim",
  "berdim",
];

const amountPattern = /(\d[\d\s.,]*)\s*(?:so['’`]?m|som|soum|uzs|сум)?/giu;

const keywordIndex = (value: string, keywords: string[]): number =>
  keywords.reduce((smallest, keyword) => {
    const index = value.indexOf(keyword);
    if (index === -1) {
      return smallest;
    }
    return smallest === -1 ? index : Math.min(smallest, index);
  }, -1);

const detectType = (normalized: string): TransactionType | null => {
  const incomeIndex = keywordIndex(normalized, incomeKeywords);
  const expenseIndex = keywordIndex(normalized, expenseKeywords);

  if (incomeIndex === -1 && expenseIndex === -1) {
    return null;
  }

  if (incomeIndex !== -1 && expenseIndex === -1) {
    return "income";
  }

  if (expenseIndex !== -1 && incomeIndex === -1) {
    return "expense";
  }

  return incomeIndex < expenseIndex ? "income" : "expense";
};

const extractAmount = (value: string): { amount: number; endIndex: number } | null => {
  const matches = [...value.matchAll(amountPattern)];

  if (matches.length === 0) {
    return null;
  }

  let selected = matches[0];
  let selectedDigits = selected[1].replace(/\D/g, "");

  for (const match of matches) {
    const digits = match[1].replace(/\D/g, "");
    if (digits.length > selectedDigits.length) {
      selected = match;
      selectedDigits = digits;
    }
  }

  if (!selectedDigits) {
    return null;
  }

  const amount = Number.parseInt(selectedDigits, 10);

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  const endIndex = (selected.index ?? 0) + selected[0].length;
  return { amount, endIndex };
};

const cleanupNote = (value: string): string | null => {
  const cleaned = value
    .trim()
    .replace(/^(from|for|to|dan|uchun|ga)\s+/i, "")
    .replace(/[.,;!?]+$/g, "")
    .trim();

  return cleaned || null;
};

export const parseTransactionMessage = (value: string): ParsedTransaction | null => {
  const rawText = value.trim();
  if (!rawText) {
    return null;
  }

  const normalized = rawText.toLowerCase();
  const type = detectType(normalized);
  if (!type) {
    return null;
  }

  const extractedAmount = extractAmount(rawText);
  if (!extractedAmount) {
    return null;
  }

  const tail = rawText.slice(extractedAmount.endIndex);
  const note = cleanupNote(tail);

  return {
    type,
    amount: extractedAmount.amount,
    currency: "UZS",
    note,
    rawText,
  };
};
