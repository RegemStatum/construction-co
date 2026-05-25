// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/config";

/* ── Metadata ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "construction company",
    "home renovation",
    "kitchen remodel",
    "bathroom renovation",
    "roofing",
    "Denver contractor",
    "interior construction",
    "painting contractor",
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
    locale:      "en_US",
    url:         SITE.url,
    siteName:    SITE.name,
    title:       `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url:    `${SITE.url}/og-image.jpg`,
        width:  1200,
        height: 630,
        alt:    `${SITE.name} – Professional Construction Services`,
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
  icons: {
    icon:             "/favicon.ico",
    shortcut:         "/favicon-16x16.png",
    apple:            "/apple-touch-icon.png",
  },
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
    name:    "Construction Services",
    itemListElement: [
      "Home Renovation",
      "Kitchen Renovation",
      "Bathroom Renovation",
      "Interior Construction",
      "Painting",
      "Roofing",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  },
};

/* ── Layout Component ──────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
