import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return "0 UZS";
  const abs = Math.abs(amount);
  return abs.toLocaleString("uz-UZ").replace(/,/g, " ") + " UZS";
}

export function compactCurrency(amount: number): string {
  if (isNaN(amount)) return "0";
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) {
    return (abs / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + " mlrd";
  }
  if (abs >= 1_000_000) {
    return (abs / 1_000_000).toFixed(1).replace(/\.0$/, '') + " mln";
  }
  if (abs >= 1_000) {
    return (abs / 1_000).toFixed(1).replace(/\.0$/, '') + " ming";
  }
  return abs.toString();
}

export function exportToCSV(data: any[], filename: string) {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]).join(',');
  const csvData = data.map(row => 
    Object.values(row).map(value => {
      // Escape commas and quotes
      const str = String(value).replace(/"/g, '""');
      return `"${str}"`;
    }).join(',')
  );
  
  const csv = [headers, ...csvData].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}
