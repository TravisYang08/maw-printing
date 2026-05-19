import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/brand";

const contactInfo = [
  { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: MapPin, label: "Location", value: BRAND.location },
];

export function ContactSection() {
  return (
    <section id="contact" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Info */}
          <div className="flex-1 space-y-8">
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let's Create Something Amazing"
              description="Ready to start your order or have questions? Reach out — we'd love to work with you."
            />

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-xl glass border border-border hover:border-maw-purple/30 transition-all duration-300 group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-maw-purple/20 border border-maw-purple/30 flex items-center justify-center flex-shrink-0 group-hover:bg-maw-purple/30 transition-colors">
                      <Icon size={18} className="text-maw-magenta" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <Link key={item.label} href={item.href}>
                    {content}
                  </Link>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 md:p-10">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-maw-purple/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-maw-magenta/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-6">
                <h3 className="text-2xl font-light tracking-tight">Start Your Order</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Use our online customizer to design your perfect garment. Upload your design,
                  choose your product, and place your order — all in one place.
                </p>
                <Link href="/customize">
                  <Button size="lg" className="group gap-2 bg-maw-gradient hover:opacity-90">
                    <Send size={16} />
                    Go to Customizer
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted">
                    Prefer to reach out directly?{" "}
                    <Link href="/contact" className="text-maw-magenta hover:underline">
                      Contact us →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
