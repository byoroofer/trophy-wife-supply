import { Suspense, type CSSProperties, type ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { TrackingProvider } from "@/components/tracking-provider";
import { buildSiteMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import "./globals.css";

const fontVariables = {
  "--font-body": '"Avenir Next", "Segoe UI", sans-serif',
  "--font-display": '"Iowan Old Style", "Palatino Linotype", Georgia, serif'
} as CSSProperties;

export const metadata = buildSiteMetadata();

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body style={fontVariables}>
        <Suspense fallback={null}>
          <TrackingProvider />
        </Suspense>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
