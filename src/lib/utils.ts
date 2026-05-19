import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKyat(amount: number): string {
  return (
    new Intl.NumberFormat("en-MM", {
      maximumFractionDigits: 0,
    }).format(amount) + " Ks"
  );
}

/** @deprecated use formatKyat */
export function formatCurrency(amount: number): string {
  return formatKyat(amount);
}
