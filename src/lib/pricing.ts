import {
  getDtfBulkDiscount,
  getDtgBulkDiscount,
  getPrintFee,
  DTG_PRINT_PRICES,
  DTF_PRINT_PRICES,
  PRINT_SIZES,
  DTG_QUANTITY_TIERS,
  DTF_QUANTITY_TIERS,
} from "@/data/printing";
import {
  getGarmentPrice,
  getProductById,
  getProductColor,
} from "@/data/repository";
import type { CustomizationState } from "@/types";
import type { PrintSizeCode } from "@/data/schema";

export function calculateOrderPricing(
  state: Pick<
    CustomizationState,
    | "productId"
    | "colorId"
    | "size"
    | "printMethod"
    | "printSize"
    | "quantity"
  >
) {
  const color = getProductColor(state.productId, state.colorId);
  const garmentUnit = getGarmentPrice(state.productId, state.size);
  const printUnit = color
    ? getPrintFee(state.printMethod, state.printSize, color.shirtGroup)
    : null;

  const product = getProductById(state.productId);
  if (product?.contactOnly) {
    return {
      garmentUnit: 0,
      printUnit: 0,
      unitTotal: 0,
      subtotal: 0,
      discountRate: 0,
      discountAmount: 0,
      total: 0,
      contactOnly: true,
      printContact: false,
    };
  }

  if (printUnit === null) {
    return {
      garmentUnit,
      printUnit: 0,
      unitTotal: garmentUnit,
      subtotal: garmentUnit * state.quantity,
      discountRate: 0,
      discountAmount: 0,
      total: 0,
      contactOnly: false,
      printContact: true,
    };
  }

  const unitTotal = garmentUnit + printUnit;
  const subtotal = unitTotal * state.quantity;
  const discountRate =
    state.printMethod === "dtf"
      ? getDtfBulkDiscount(state.quantity)
      : getDtgBulkDiscount(state.quantity);
  const discountAmount = subtotal * discountRate;
  const total = Math.round(subtotal - discountAmount);

  return {
    garmentUnit,
    printUnit,
    unitTotal,
    subtotal,
    discountRate,
    discountAmount,
    total,
    contactOnly: false,
    printContact: false,
  };
}

export function calculateTotalPrice(
  state: Pick<
    CustomizationState,
    | "productId"
    | "colorId"
    | "size"
    | "printMethod"
    | "printSize"
    | "quantity"
  >
): number {
  return calculateOrderPricing(state).total;
}

export function getPriceBreakdown(
  state: Pick<
    CustomizationState,
    | "productId"
    | "colorId"
    | "size"
    | "printMethod"
    | "printSize"
    | "quantity"
  >
) {
  return { ...calculateOrderPricing(state), quantity: state.quantity };
}

export {
  DTG_QUANTITY_TIERS as DTG_BULK_TIERS,
  DTF_QUANTITY_TIERS as DTF_BULK_TIERS,
};

export const PRINT_FEES_DTG = DTG_PRINT_PRICES.map((row) => {
  const spec = PRINT_SIZES.find((s) => s.code === row.size)!;
  return {
    size: row.size as PrintSizeCode,
    label: spec.label,
    inch: spec.inch,
    cm: spec.cm,
    white: row.white,
    color: row.color,
  };
});

export const PRINT_FEES_DTF = DTF_PRINT_PRICES.map((row) => {
  const spec = PRINT_SIZES.find((s) => s.code === row.size)!;
  return {
    size: row.size as PrintSizeCode,
    label: spec.label,
    inch: spec.inch,
    cm: spec.cm,
    price: row.price,
  };
});
