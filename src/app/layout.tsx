import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { BRAND } from "@/data/brand";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.fullName} — Custom Printing`,
  description:
    "Modern Apparel Works — premium DTG & DTF printing. MOQ from 1 piece. Thailand & Myanmar. Prices in MM Kyat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
