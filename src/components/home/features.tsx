import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/data/brand";

export function Features() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="DTG · DTF · Sourcing"
          description="MOQ starts from 1 piece. We accept personal and bulk custom orders."
          align="center"
          className="mb-14"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="border border-border bg-surface p-6 transition hover:border-maw-purple/50"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-maw-gradient">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-muted leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-1.5 text-xs text-muted">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-maw-magenta">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
