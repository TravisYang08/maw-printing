import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  DTG_BULK_TIERS,
  DTF_BULK_TIERS,
  PRINT_FEES_DTG,
  PRINT_FEES_DTF,
} from "@/lib/pricing";
import { formatKyat } from "@/lib/utils";
import { getCustomizableProducts } from "@/data/repository";

export function PricingSection() {
  const featuredGarments = getCustomizableProducts().slice(0, 4);

  return (
    <section id="pricing" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent Rates (Ks)"
          description="Garment price + print fee per piece. Bulk discounts apply automatically at checkout."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {featuredGarments.map((item) => {
            const minPrice = Math.min(
              ...item.sizes.map((s) => s.price).filter((v) => v > 0)
            );
            return (
              <div
                key={item.id}
                className="border border-border bg-surface p-6 flex flex-col"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">
                  From
                </p>
                <p className="text-2xl font-light mb-1 text-maw-gradient">
                  {formatKyat(minPrice)}
                </p>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-1">
                  {item.fabricName}
                </h3>
                <p className="text-xs text-muted mb-2 capitalize">{item.fit} fit</p>
                <p className="text-sm text-muted flex-1">{item.gsm}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-10">
          <div className="border border-border bg-surface-elevated p-6">
            <h3 className="text-sm uppercase tracking-[0.2em] mb-4 text-maw-gradient">
              DTG Print Fees (per piece)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 text-left">Size</th>
                    <th className="py-2 text-right">White</th>
                    <th className="py-2 text-right">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {PRINT_FEES_DTG.filter((r) => r.size !== "a1").map((row) => (
                    <tr key={row.size} className="border-b border-border/50">
                      <td className="py-2">{row.label}</td>
                      <td className="py-2 text-right">
                        {row.white != null ? formatKyat(row.white) : "—"}
                      </td>
                      <td className="py-2 text-right">
                        {row.color != null ? formatKyat(row.color) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[10px] text-muted">
              Bulk:{" "}
              {DTG_BULK_TIERS.map((t) => `${t.label} ${t.discountPercent}%`).join(" · ")}
            </p>
          </div>

          <div className="border border-border bg-surface-elevated p-6">
            <h3 className="text-sm uppercase tracking-[0.2em] mb-4 text-maw-gradient">
              DTF Print Fees (per piece)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 text-left">Size</th>
                    <th className="py-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PRINT_FEES_DTF.map((row) => (
                    <tr key={row.size} className="border-b border-border/50">
                      <td className="py-2">{row.label}</td>
                      <td className="py-2 text-right">{formatKyat(row.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[10px] text-muted">
              Bulk:{" "}
              {DTF_BULK_TIERS.map((t) => `${t.label} ${t.discountPercent}%`).join(" · ")}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted italic mb-10">
          *Print prices do not include garment cost. A1 DTG — contact for pricing.
        </p>

        <div className="text-center">
          <Link href="/customize">
            <Button size="lg">Get Your Quote</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
