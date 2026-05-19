import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/data/brand";
import { Printer, Film, Package } from "lucide-react";

const icons = [Printer, Film, Package];

export function Features() {
  return (
    <section className="section-dark border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="DTG · DTF · Sourcing"
          description="MOQ starts from 1 piece. We accept personal and bulk custom orders."
          align="center"
          className="mb-16"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-500 hover:border-maw-purple/40 hover:-translate-y-1"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(107,29,122,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-maw-purple/20 border border-maw-purple/30 flex items-center justify-center group-hover:bg-maw-purple/30 transition-colors">
                    <Icon size={22} className="text-maw-magenta" />
                  </div>
                  <h3 className="text-lg font-semibold uppercase tracking-wider text-maw-gradient">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-xs text-muted">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-maw-magenta flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
