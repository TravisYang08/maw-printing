"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ShirtPreview } from "./shirt-preview";
import { OptionGroup, OptionButton } from "./option-group";
import { DesignUploader } from "./design-uploader";
import { Button } from "@/components/ui/button";
import { useCustomizerStore } from "@/store/customizer-store";
import { getPriceBreakdown } from "@/lib/pricing";
import { formatKyat } from "@/lib/utils";
import {
  CUSTOMIZER_TABS,
  getAvailableSizes,
  getProductById,
  getProductsForCustomizerTab,
  getDefaultProduct,
} from "@/data/repository";
import {
  PRINT_POSITIONS,
  PRINT_SIZES,
} from "@/data/printing";
import type { CustomizerTab } from "@/types";
import type { PrintMethod, PrintPositionCode, PrintSizeCode } from "@/data/schema";

const PRINT_METHODS: { id: PrintMethod; label: string }[] = [
  { id: "dtg", label: "DTG" },
  { id: "dtf", label: "DTF" },
];

export function ProductCustomizer() {
  const { customization, setCustomization, getTotalPrice } =
    useCustomizerStore();
  const [previewView, setPreviewView] = useState<"front" | "back">("front");

  const product = getProductById(customization.productId);
  const color = product?.colors.find((c) => c.id === customization.colorId);
  const tabProducts = getProductsForCustomizerTab(customization.tab);
  const sizes = getAvailableSizes(customization.productId);

  const breakdown = getPriceBreakdown(customization);

  const isBackPosition = ["g", "h", "i", "j", "k"].includes(
    customization.printPosition
  );
  const effectiveView = isBackPosition ? "back" : previewView;

  const canCheckout =
    customization.designUrl &&
    !breakdown.contactOnly &&
    !breakdown.printContact &&
    breakdown.total > 0;

  const handleTabChange = (tab: CustomizerTab) => {
    const next = getDefaultProduct(tab);
    setCustomization({
      tab,
      productId: next.id,
      colorId: next.colors[0].id,
      size: next.sizes[0]?.size ?? "M",
    });
  };

  const handleProductChange = (productId: string) => {
    const next = getProductById(productId);
    if (!next) return;
    setCustomization({
      productId,
      colorId: next.colors[0].id,
      size: next.sizes[0]?.size ?? "M",
    });
  };

  const printSizeNote = useMemo(() => {
    if (customization.printSize === "a1" && customization.printMethod === "dtg") {
      return "A1 DTG — contact us for pricing";
    }
    return null;
  }, [customization.printSize, customization.printMethod]);

  const previewCategory =
    product?.category === "baby-tee" ? "tshirt" : product?.category ?? "tshirt";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-maw-magenta mb-2">
          Product Customizer
        </p>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight">
          Design Your <span className="text-maw-gradient">Piece</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          MOQ from 1 piece · Prices in Myanmar Kyat (Ks)
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <ShirtPreview
            category={previewCategory}
            colorHex={color?.hex ?? "#0a0a0a"}
            printPosition={customization.printPosition}
            printSize={customization.printSize}
            designUrl={customization.designUrl}
            view={effectiveView}
          />
          <div className="flex justify-center gap-2">
            {(["front", "back"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setPreviewView(v)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border ${
                  previewView === v
                    ? "border-maw-magenta bg-maw-magenta text-white"
                    : "border-border text-muted"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <OptionGroup label="Print Method">
            <div className="grid grid-cols-2 gap-2">
              {PRINT_METHODS.map((m) => (
                <OptionButton
                  key={m.id}
                  selected={customization.printMethod === m.id}
                  onClick={() => setCustomization({ printMethod: m.id })}
                >
                  {m.label}
                </OptionButton>
              ))}
            </div>
          </OptionGroup>

          <OptionGroup label="Clothing Type">
            <div className="grid grid-cols-2 gap-2">
              {CUSTOMIZER_TABS.map(({ tab, label }) => (
                <OptionButton
                  key={tab}
                  selected={customization.tab === tab}
                  onClick={() => handleTabChange(tab)}
                >
                  {label}
                </OptionButton>
              ))}
            </div>
          </OptionGroup>

          {tabProducts.length > 0 && (
            <OptionGroup label="Fabric / Line">
              <select
                value={customization.productId}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none"
              >
                {tabProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fabricName}
                    {p.collection ? ` · ${p.collection}` : ""} · {p.gsm}
                    {p.contactOnly ? " (Contact)" : ""}
                  </option>
                ))}
              </select>
              {product && (
                <p className="text-xs text-muted">
                  {product.description ?? product.style} · {product.material}
                </p>
              )}
            </OptionGroup>
          )}

          {product?.contactOnly ? (
            <div className="border border-maw-purple/50 bg-maw-purple/10 p-4 text-sm text-muted">
              {product.name} pricing varies — message us on Telegram{" "}
              <a
                href="tel:+66922995921"
                className="text-maw-magenta hover:underline"
              >
                +66 9 2299 5921
              </a>{" "}
              for a quote.
            </div>
          ) : (
            <>
              <OptionGroup label="Color">
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {product?.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCustomization({ colorId: c.id })}
                      title={`${c.name}${c.minOrderQty ? ` (min ${c.minOrderQty})` : ""}`}
                      className={`flex flex-col items-center gap-1 ${
                        customization.colorId === c.id ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      <span
                        className={`h-9 w-9 rounded-full border-2 ${
                          customization.colorId === c.id
                            ? "border-maw-magenta scale-110"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[9px] text-muted max-w-[4rem] truncate text-center">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </OptionGroup>

              <OptionGroup label="Size">
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <OptionButton
                      key={size}
                      selected={customization.size === size}
                      onClick={() => setCustomization({ size })}
                      className="min-w-[3rem]"
                    >
                      {size}
                      <span className="block text-[9px] opacity-60 mt-0.5">
                        {formatKyat(
                          product?.sizes.find((s) => s.size === size)?.price ?? 0
                        )}
                      </span>
                    </OptionButton>
                  ))}
                </div>
              </OptionGroup>

              <OptionGroup label="Print Position">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {PRINT_POSITIONS.map((pos) => (
                    <OptionButton
                      key={pos.code}
                      selected={customization.printPosition === pos.code}
                      onClick={() => {
                        setCustomization({
                          printPosition: pos.code as PrintPositionCode,
                        });
                        if (pos.side === "back") setPreviewView("back");
                      }}
                      className="text-[10px] !px-2"
                    >
                      {pos.label}
                    </OptionButton>
                  ))}
                </div>
              </OptionGroup>

              <OptionGroup label="Print Size">
                <div className="grid grid-cols-4 gap-2">
                  {PRINT_SIZES.map((ps) => (
                    <OptionButton
                      key={ps.code}
                      selected={customization.printSize === ps.code}
                      onClick={() =>
                        setCustomization({
                          printSize: ps.code as PrintSizeCode,
                        })
                      }
                      className="flex-col !py-3"
                    >
                      <span>{ps.label}</span>
                      <span className="text-[9px] opacity-60 mt-0.5">
                        {ps.inch}
                      </span>
                    </OptionButton>
                  ))}
                </div>
                {printSizeNote && (
                  <p className="text-xs text-maw-magenta">{printSizeNote}</p>
                )}
              </OptionGroup>

              <OptionGroup label="Quantity">
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomization({
                        quantity: Math.max(1, customization.quantity - 1),
                      })
                    }
                    className="h-10 w-10 border border-border text-lg hover:border-maw-magenta"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-lg font-light">
                    {customization.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomization({
                        quantity: customization.quantity + 1,
                      })
                    }
                    className="h-10 w-10 border border-border text-lg hover:border-maw-magenta"
                  >
                    +
                  </button>
                  {breakdown.discountRate > 0 && (
                    <span className="text-xs text-maw-magenta uppercase tracking-wider">
                      {(breakdown.discountRate * 100).toFixed(0)}% bulk discount
                    </span>
                  )}
                </div>
              </OptionGroup>
            </>
          )}

          <DesignUploader />

          {!product?.contactOnly && (
            <div className="border border-border bg-surface p-6 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Price breakdown · Garment + Print
              </p>
              <div className="flex justify-between text-sm text-muted">
                <span>Garment ({customization.size})</span>
                <span>{formatKyat(breakdown.garmentUnit)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>
                  Print ({customization.printMethod.toUpperCase()} ·{" "}
                  {PRINT_SIZES.find((s) => s.code === customization.printSize)?.label})
                </span>
                <span>
                  {breakdown.printContact
                    ? "Contact"
                    : formatKyat(breakdown.printUnit)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Unit total</span>
                <span>{formatKyat(breakdown.unitTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal ({breakdown.quantity} pcs)</span>
                <span>{formatKyat(breakdown.subtotal)}</span>
              </div>
              {breakdown.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-maw-magenta">
                  <span>Discount</span>
                  <span>-{formatKyat(breakdown.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-lg">
                <span>Total</span>
                <span className="font-medium text-maw-gradient">
                  {breakdown.printContact
                    ? "Contact for quote"
                    : formatKyat(getTotalPrice())}
                </span>
              </div>
              <p className="text-[10px] text-muted italic">
                *Print price does not include garment. Bulk discounts apply
                automatically.
              </p>
            </div>
          )}

          <Link href={canCheckout ? "/checkout" : "#"} className="block">
            <Button size="lg" className="w-full" disabled={!canCheckout}>
              Proceed to Checkout
            </Button>
          </Link>
          {!customization.designUrl && (
            <p className="text-center text-xs text-muted">
              Upload a design to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
