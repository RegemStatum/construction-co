// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE } from "@/lib/config";
import I18nProvider from "@/app/I18nProvider";

/* ── Metadata ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Handwerker München",
    "Trockenbau München",
    "Bodenleger München",
    "Parkett verlegen",
    "Fliesenleger München",
    "Sanitärinstallation München",
    "Elektroinstallation München",
    "Renovierung München",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type:        "website",
    locale:      "de_DE",
    url:         SITE.url,
    siteName:    SITE.name,
    title:       `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url:    `${SITE.url}/og-image.jpg`,
        width:  1200,
        height: 630,
        alt:    `${SITE.name} – Handwerksleistungen in München`,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images:      [`${SITE.url}/og-image.jpg`],
  },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#1c1917",
};

/* ── LocalBusiness JSON-LD Schema ─────────────────────────────────────── */
const schemaMarkup = {
  "@context":            "https://schema.org",
  "@type":               "LocalBusiness",
  "@id":                 SITE.url,
  name:                  SITE.name,
  description:           SITE.description,
  url:                   SITE.url,
  telephone:             SITE.phone,
  email:                 SITE.email,
  foundingDate:          String(SITE.founded),
  areaServed:            SITE.serviceArea,
  address: {
    "@type":          "PostalAddress",
    streetAddress:    SITE.address.street,
    addressLocality:  SITE.address.city,
    addressRegion:    SITE.address.state,
    postalCode:       SITE.address.zip,
    addressCountry:   SITE.address.country,
  },
  sameAs: Object.values(SITE.social).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Handwerksleistungen",
    itemListElement: [
      "Trockenbau",
      "Bodenbelagsarbeiten",
      "Fliesenarbeiten",
      "Parkettverlegung",
      "Sanitärinstallation",
      "Elektroinstallation",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  },
};

/* ── Layout Component ──────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="font-body antialiased">
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
