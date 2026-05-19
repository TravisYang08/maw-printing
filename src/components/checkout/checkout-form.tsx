"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCustomizerStore } from "@/store/customizer-store";
import { createOrder } from "@/lib/supabase";
import { formatKyat } from "@/lib/utils";
import { getProductById, getProductColor } from "@/data/repository";
import { PRINT_POSITIONS, PRINT_SIZES } from "@/data/printing";
import { CATEGORY_LABELS } from "@/data/products";
import type { PaymentMethod } from "@/types";
import { CheckCircle } from "lucide-react";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: "bank-transfer", label: "Bank Transfer" },
  { value: "promptpay", label: "PromptPay" },
  { value: "cash-on-delivery", label: "Cash on Delivery" },
  { value: "card", label: "Credit / Debit Card" },
];

export function CheckoutForm() {
  const {
    customization,
    checkout,
    setCheckout,
    getTotalPrice,
    resetCustomization,
  } = useCustomizerStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = getProductById(customization.productId);
  const color = getProductColor(customization.productId, customization.colorId);
  const total = getTotalPrice();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const { error: orderError } = await createOrder({
      name: form.get("name") as string,
      phone: form.get("phone") as string,
      address: form.get("address") as string,
      payment: form.get("payment") as PaymentMethod,
      notes: (form.get("notes") as string) || undefined,
      ...customization,
      category: product?.category ?? "tshirt",
      productName: product?.fabricName ?? "",
      colorName: color?.name ?? "",
      totalPrice: total,
    });

    setLoading(false);
    if (orderError) {
      setError(orderError);
      return;
    }
    setSuccess(true);
    resetCustomization();
  }

  if (!customization.designUrl) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-muted mb-6">
          No active order. Please customize a product first.
        </p>
        <Link href="/customize">
          <Button>Go to Customizer</Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle className="mx-auto mb-4 text-maw-magenta" size={48} />
        <h1 className="text-2xl font-light mb-2">Order Placed</h1>
        <p className="text-muted text-sm mb-8">
          Thank you! We&apos;ll contact you on Telegram to confirm.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const pos = PRINT_POSITIONS.find((p) => p.code === customization.printPosition);
  const pSize = PRINT_SIZES.find((s) => s.code === customization.printSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-maw-magenta mb-2">
          Checkout
        </p>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">
          Complete Your Order
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-6 order-2 lg:order-1">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={checkout.name}
              onChange={(e) => setCheckout({ name: e.target.value })}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
              Phone / Telegram
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              defaultValue={checkout.phone}
              onChange={(e) => setCheckout({ phone: e.target.value })}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              defaultValue={checkout.address}
              onChange={(e) => setCheckout({ address: e.target.value })}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none resize-none"
            />
          </div>
          <fieldset>
            <legend className="block text-xs uppercase tracking-[0.2em] text-muted mb-3">
              Payment Method
            </legend>
            <div className="space-y-2">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 border border-border px-4 py-3 cursor-pointer hover:border-maw-magenta has-[:checked]:border-maw-magenta"
                >
                  <input type="radio" name="payment" value={opt.value} required className="accent-[var(--maw-magenta)]" />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="notes" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
              Notes (optional)
            </label>
            <textarea id="notes" name="notes" rows={2} className="w-full border border-border bg-surface px-4 py-3 text-sm resize-none focus:border-maw-magenta focus:outline-none" />
          </div>
          {error && (
            <p className="text-sm text-red-400 border border-red-900/50 bg-red-950/20 px-4 py-3">{error}</p>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Placing Order..." : `Place Order · ${formatKyat(total)}`}
          </Button>
        </form>

        <div className="order-1 lg:order-2 border border-border bg-surface p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted mb-6">Order Summary</h2>
          <div className="flex gap-4 mb-6">
            <div className="relative h-24 w-24 shrink-0 border border-border">
              {customization.designUrl && (
                <Image src={customization.designUrl} alt="Design" fill className="object-contain p-2" unoptimized />
              )}
            </div>
            <div className="text-sm space-y-1">
              <p className="font-medium">{product?.fabricName}</p>
              {product?.collection && <p className="text-muted text-xs">{product.collection}</p>}
              <p className="text-muted">
                {CATEGORY_LABELS[product?.category ?? "tshirt"]} · {color?.name} · {customization.size}
              </p>
              <p className="text-muted">
                {customization.printMethod.toUpperCase()} · {pos?.label} · {pSize?.label}
              </p>
              <p className="text-muted">Qty: {customization.quantity}</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between text-lg">
            <span>Total</span>
            <span className="font-medium text-maw-gradient">{formatKyat(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
