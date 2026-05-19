import type {
  GarmentCategory,
  GarmentSize,
  PrintMethod,
  PrintPositionCode,
  PrintSizeCode,
} from "@/data/schema";

export type {
  GarmentCategory,
  GarmentSize,
  PrintMethod,
  PrintPositionCode,
  PrintSizeCode,
};

/** Active tab in the 4-button customizer UI */
export type CustomizerTab = "tshirt" | "oversized-tee" | "hoodie" | "polo";

export type PaymentMethod =
  | "card"
  | "bank-transfer"
  | "cash-on-delivery"
  | "promptpay";

export interface CustomizationState {
  tab: CustomizerTab;
  productId: string;
  colorId: string;
  size: GarmentSize;
  printMethod: PrintMethod;
  printPosition: PrintPositionCode;
  printSize: PrintSizeCode;
  quantity: number;
  designUrl: string | null;
  designFileName: string | null;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  payment: PaymentMethod;
  notes?: string;
}

export interface Order extends CustomizationState, CheckoutForm {
  id: string;
  productName: string;
  colorName: string;
  category: GarmentCategory;
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}
