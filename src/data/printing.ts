import type {
  DtfPrintPriceRow,
  DtgPrintPriceRow,
  PrintPositionSpec,
  PrintSizeSpec,
  PrintingMethodSpec,
  QuantityTier,
} from "./schema";

export const PRINT_SIZES: PrintSizeSpec[] = [
  { code: "logo", label: "LOGO", inch: '2" × 2"', cm: "5 × 5" },
  { code: "a7", label: "A7", inch: '3" × 4"', cm: "7.4 × 10.5" },
  { code: "a6", label: "A6", inch: '4" × 6"', cm: "10.5 × 14.8" },
  { code: "a5", label: "A5", inch: '6" × 8"', cm: "14.8 × 21" },
  { code: "a4", label: "A4", inch: '8" × 12"', cm: "21 × 29.7" },
  { code: "a3", label: "A3", inch: '12" × 16"', cm: "29.7 × 42" },
  { code: "a2", label: "A2", inch: '16" × 21"', cm: "42 × 59.4" },
  { code: "a1", label: "A1", inch: '21" × 28"', cm: "55 × 84.1" },
];

export const PRINT_POSITIONS: PrintPositionSpec[] = [
  { code: "a", label: "A · Left Chest", shortLabel: "Left Chest", side: "front" },
  { code: "b", label: "B · Center Chest", shortLabel: "Center Chest", side: "front" },
  { code: "c", label: "C · Center Front", shortLabel: "Center", side: "front" },
  { code: "d", label: "D · Right Bottom", shortLabel: "Right Bottom", side: "front" },
  { code: "e", label: "E · Left Bottom", shortLabel: "Left Bottom", side: "front" },
  { code: "f", label: "F · Center Bottom", shortLabel: "Center Bottom", side: "front" },
  { code: "g", label: "G · Upper Back", shortLabel: "Upper Back", side: "back" },
  { code: "h", label: "H · Center Back", shortLabel: "Center Back", side: "back" },
  { code: "i", label: "I · Right Back", shortLabel: "Right Back", side: "back" },
  { code: "j", label: "J · Left Back", shortLabel: "Left Back", side: "back" },
  { code: "k", label: "K · Bottom Back", shortLabel: "Bottom Back", side: "back" },
  { code: "l", label: "L · Left Sleeve", shortLabel: "Left Sleeve", side: "sleeve" },
  { code: "m", label: "M · Left Shoulder", shortLabel: "Left Shoulder", side: "front" },
  { code: "n", label: "N · Right Sleeve", shortLabel: "Right Sleeve", side: "sleeve" },
  { code: "o", label: "O · Right Shoulder", shortLabel: "Right Shoulder", side: "front" },
  { code: "p", label: "P · Neck Label", shortLabel: "Neck Label", side: "neck" },
];

export const DTG_QUANTITY_TIERS: QuantityTier[] = [
  { minQty: 10, discountPercent: 10, label: "10 pcs" },
  { minQty: 30, discountPercent: 15, label: "30 pcs" },
  { minQty: 50, discountPercent: 18, label: "50 pcs" },
  { minQty: 100, discountPercent: 20, label: "100+ pcs" },
];

export const DTF_QUANTITY_TIERS: QuantityTier[] = [
  { minQty: 10, discountPercent: 10, label: "10 pcs" },
  { minQty: 30, discountPercent: 15, label: "30 pcs" },
  { minQty: 50, discountPercent: 25, label: "50 pcs" },
  { minQty: 100, discountPercent: 30, label: "100+ pcs" },
  { minQty: 200, discountPercent: 40, label: "200+ pcs" },
];

export const DTG_PRINT_PRICES: DtgPrintPriceRow[] = [
  { size: "logo", white: 12150, color: 13500 },
  { size: "a7", white: 14850, color: 17550 },
  { size: "a6", white: 17550, color: 21600 },
  { size: "a5", white: 20250, color: 25650 },
  { size: "a4", white: 22950, color: 33750 },
  { size: "a3", white: 25650, color: 43200 },
  { size: "a2", white: 28350, color: 60750 },
  { size: "a1", white: null, color: null, contactForPricing: true },
];

export const DTF_PRINT_PRICES: DtfPrintPriceRow[] = [
  { size: "logo", price: 6750 },
  { size: "a7", price: 8100 },
  { size: "a6", price: 9450 },
  { size: "a5", price: 10800 },
  { size: "a4", price: 12150 },
  { size: "a3", price: 16200 },
  { size: "a2", price: 18900 },
  { size: "a1", price: 27000 },
];

export const PRINTING_METHODS: PrintingMethodSpec[] = [
  {
    id: "dtg",
    name: "DTG",
    fullName: "Direct to Garment",
    description: "Brother GTX Pro · soft full-color finish",
    equipment: "Brother GTX Pro (Japan)",
    quantityTiers: DTG_QUANTITY_TIERS,
    printableOn: [
      "T-shirts",
      "Hoodies",
      "Jackets",
      "Sweatshirts",
      "Denim",
      "Cotton & cotton-blend",
    ],
  },
  {
    id: "dtf",
    name: "DTF",
    fullName: "Direct to Film",
    description: "9-color system · vibrant prints on any fabric",
    equipment: "9-color DTF (CMYK + RGBG + White)",
    quantityTiers: DTF_QUANTITY_TIERS,
    printableOn: [
      "T-shirts",
      "Hoodies",
      "Sweatshirts",
      "Tote bags",
      "Caps",
      "Polyester & blends",
    ],
  },
];

export function getPrintSize(code: string) {
  return PRINT_SIZES.find((s) => s.code === code);
}

export function getPrintPosition(code: string) {
  return PRINT_POSITIONS.find((p) => p.code === code);
}

export function getDtgBulkDiscount(qty: number): number {
  let discount = 0;
  for (const tier of DTG_QUANTITY_TIERS) {
    if (qty >= tier.minQty) discount = tier.discountPercent;
  }
  return discount / 100;
}

export function getDtfBulkDiscount(qty: number): number {
  let discount = 0;
  for (const tier of DTF_QUANTITY_TIERS) {
    if (qty >= tier.minQty) discount = tier.discountPercent;
  }
  return discount / 100;
}

export function getPrintFee(
  method: "dtg" | "dtf",
  size: string,
  shirtGroup: "white" | "color"
): number | null {
  if (method === "dtf") {
    const row = DTF_PRINT_PRICES.find((r) => r.size === size);
    return row?.price ?? null;
  }
  const row = DTG_PRINT_PRICES.find((r) => r.size === size);
  if (!row || row.contactForPricing) return null;
  return shirtGroup === "white" ? row.white : row.color;
}
