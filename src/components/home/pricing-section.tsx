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
    <section id="pricing" className="section-dark border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent Rates (Ks)"
          description="Garment price + print fee per piece. Bulk discounts apply automatically at checkout."
          align="center"
          className="mb-16"
        />

        {/* Garment cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-14">
          {featuredGarments.map((item) => {
            const minPrice = Math.min(
              ...item.sizes.map((s) => s.price).filter((v) => v > 0)
            );
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-maw-purple/30 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(209,32,138,0.08),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">
                    From
                  </p>
                  <p className="text-3xl font-light mb-2 text-maw-gradient">
                    {formatKyat(minPrice)}
                  </p>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">
                    {item.fabricName}
                  </h3>
                  <p className="text-xs text-muted capitalize">{item.fit} fit</p>
                  <p className="text-xs text-muted mt-1">{item.gsm}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Print fee tables */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* DTG */}
          <div className="group rounded-2xl border border-border bg-surface-elevated p-6 md:p-8 transition-all duration-500 hover:border-maw-purple/30">
            <h3 className="text-sm uppercase tracking-[0.2em] mb-5 text-maw-gradient font-semibold">
              DTG Print Fees (per piece)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-3 text-left text-xs uppercase tracking-wider">Size</th>
                    <th className="py-3 text-right text-xs uppercase tracking-wider">White</th>
                    <th className="py-3 text-right text-xs uppercase tracking-wider">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {PRINT_FEES_DTG.filter((r) => r.size !== "a1").map((row, i) => (
                    <tr key={row.size} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                      <td className="py-3">{row.label}</td>
                      <td className="py-3 text-right">
                        {row.white != null ? formatKyat(row.white) : "—"}
                      </td>
                      <td className="py-3 text-right">
                        {row.color != null ? formatKyat(row.color) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[10px] text-muted leading-relaxed">
              Bulk:{" "}
              {DTG_BULK_TIERS.map((t) => `${t.label} ${t.discountPercent}%`).join(" · ")}
            </p>
          </div>

          {/* DTF */}
          <div className="group rounded-2xl border border-border bg-surface-elevated p-6 md:p-8 transition-all duration-500 hover:border-maw-purple/30">
            <h3 className="text-sm uppercase tracking-[0.2em] mb-5 text-maw-gradient font-semibold">
              DTF Print Fees (per piece)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-3 text-left text-xs uppercase tracking-wider">Size</th>
                    <th className="py-3 text-right text-xs uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PRINT_FEES_DTF.map((row, i) => (
                    <tr key={row.size} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                      <td className="py-3">{row.label}</td>
                      <td className="py-3 text-right">{formatKyat(row.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[10px] text-muted leading-relaxed">
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
            <Button size="lg" className="bg-maw-gradient hover:opacity-90 hover:shadow-[0_0_40px_rgba(209,32,138,0.3)] transition-all duration-300">
              Get Your Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
