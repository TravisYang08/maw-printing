import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden border border-border bg-surface-elevated px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="absolute inset-0 bg-maw-gradient opacity-10" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-4">
              Ready to <span className="text-maw-gradient font-semibold">print</span>?
            </h2>
            <p className="text-muted text-sm md:text-base mb-8 max-w-md mx-auto">
              Upload your design, preview on premium blanks, checkout in minutes.
              MOQ from 1 piece.
            </p>
            <Link href="/customize">
              <Button size="lg">Customize Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
