"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/customize", label: "Customize" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="M.A.W Printing"
            width={120}
            height={40}
            style={{ height: "40px", width: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs uppercase tracking-[0.15em] transition-colors hover:text-white",
                pathname === link.href
                  ? "text-white"
                  : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/customize"
            className="border border-maw-magenta px-4 py-2 text-xs uppercase tracking-[0.15em] transition hover:bg-maw-magenta hover:text-white"
          >
            Start Order
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.15em] text-muted hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/customize"
              onClick={() => setOpen(false)}
              className="border border-white px-4 py-3 text-center text-xs uppercase tracking-[0.15em]"
            >
              Start Order
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
