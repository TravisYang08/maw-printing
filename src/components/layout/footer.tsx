import Link from "next/link";
import { BRAND } from "@/data/brand";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold tracking-[0.2em]">M.A.W</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-maw-magenta">
              {BRAND.fullName}
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              {BRAND.tagline}. Premium DTG & DTF printing for Thailand &
              Myanmar.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
              Navigate
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/customize" className="hover:text-maw-magenta transition">
                  Customize
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-maw-magenta transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-maw-magenta transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-maw-magenta transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-maw-magenta">
                  {BRAND.phone}
                </a>
              </li>
              <li>{BRAND.email}</li>
              <li>{BRAND.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p className="uppercase tracking-widest">{BRAND.taglineMm}</p>
        </div>
      </div>
    </footer>
  );
}
