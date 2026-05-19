import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDefaultProduct } from "@/data/repository";
import type { CustomizationState, CheckoutForm } from "@/types";
import { calculateTotalPrice } from "@/lib/pricing";

const defaultProduct = getDefaultProduct("tshirt");

const defaultCustomization: CustomizationState = {
  tab: "tshirt",
  productId: defaultProduct.id,
  colorId: defaultProduct.colors[0].id,
  size: defaultProduct.sizes[0]?.size ?? "M",
  printMethod: "dtg",
  printPosition: "c",
  printSize: "a5",
  quantity: 1,
  designUrl: null,
  designFileName: null,
};

interface CustomizerStore {
  customization: CustomizationState;
  checkout: Partial<CheckoutForm>;
  setCustomization: (partial: Partial<CustomizationState>) => void;
  setCheckout: (partial: Partial<CheckoutForm>) => void;
  resetCustomization: () => void;
  getTotalPrice: () => number;
}

export const useCustomizerStore = create<CustomizerStore>()(
  persist(
    (set, get) => ({
      customization: defaultCustomization,
      checkout: {},
      setCustomization: (partial) =>
        set((state) => ({
          customization: { ...state.customization, ...partial },
        })),
      setCheckout: (partial) =>
        set((state) => ({
          checkout: { ...state.checkout, ...partial },
        })),
      resetCustomization: () =>
        set({ customization: defaultCustomization }),
      getTotalPrice: () => calculateTotalPrice(get().customization),
    }),
    { name: "maw-customizer-v3" }
  )
);
