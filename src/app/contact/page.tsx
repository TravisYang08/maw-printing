"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/brand";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Any Inquiries?"
        description="Message us for more catalogs and apparel options based on your budget and preferences."
        className="mb-14"
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4">
            <Phone className="shrink-0 text-maw-magenta" size={20} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">
                Telegram / Phone
              </p>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="text-lg font-medium hover:text-maw-magenta transition"
              >
                {BRAND.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="shrink-0 text-maw-magenta" size={20} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">
                Email
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-sm hover:text-maw-magenta transition"
              >
                {BRAND.email}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin className="shrink-0 text-maw-magenta" size={20} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">
                Studio
              </p>
              <p className="text-sm text-muted">{BRAND.location}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <MessageCircle className="shrink-0 text-maw-magenta" size={20} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">
                Social
              </p>
              <p className="text-sm text-muted">{BRAND.social}</p>
              <p className="text-xs text-muted mt-1">
                Facebook · TikTok · Instagram
              </p>
            </div>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            We warmly welcome personal custom orders, businesses, and young
            entrepreneurs who want to start or grow their own clothing brands.
          </p>
        </div>

        {submitted ? (
          <div className="border border-border bg-surface p-8 flex items-center justify-center">
            <p className="text-center text-muted">
              Thanks for reaching out. We&apos;ll get back to you within 24
              hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-border bg-surface p-6 md:p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                className="w-full border border-border bg-background px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Email / Telegram
              </label>
              <input
                id="contact-email"
                name="email"
                required
                className="w-full border border-border bg-background px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Bulk order, rush printing, catalog request..."
                className="w-full border border-border bg-background px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none resize-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
