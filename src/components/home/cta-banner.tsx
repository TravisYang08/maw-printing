import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-8 py-20 md:px-20 md:py-24 text-center">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,29,122,0.2)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(209,32,138,0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-grid opacity-30" />

          <div className="relative max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-maw-magenta mb-4">
              Start Creating
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Ready to{" "}
              <span className="text-maw-gradient font-semibold">bring your ideas</span>{" "}
              to life?
            </h2>
            <p className="text-muted text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
              Upload your design, preview on premium blanks, and checkout in minutes.
              MOQ from just 1 piece.
            </p>
            <Link href="/customize">
              <Button
                size="lg"
                className="group gap-3 text-base px-10 py-6 bg-maw-gradient hover:opacity-90 hover:shadow-[0_0_50px_rgba(209,32,138,0.4)] transition-all duration-300 rounded-full"
              >
                Customize Now
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
