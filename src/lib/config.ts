// src/lib/config.ts
// ─── Company & Site Configuration ──────────────────────────────────────────
// Edit these values to customise the website for your company.

export const SITE = {
  name:        "Raum89",
  tagline:     "Handwerk mit Präzision. Made in München.",
  description: "Inhabergeführter Handwerksbetrieb aus München – Ihr Partner für Trockenbau, Boden- und Parkettverlegung, Fliesenarbeiten sowie Sanitär- und Elektroinstallationen seit 2011.",
  url:         "https://raum89.de",
  phone:       "+49 89 4520 1837",
  email:       "info@raum89.de",
  address: {
    street:  "Landsberger Straße 110",
    city:    "München",
    state:   "Bayern",
    zip:     "80339",
    country: "DE",
  },
  serviceArea: "München und Umgebung – Schwabing, Bogenhausen, Pasing, Sendling u. v. m.",
  founded:     2011,

  // Social – leave blank to hide icons
  social: {
    facebook: "https://facebook.com/raum89",
    instagram: "https://instagram.com/raum89",
  },
} as const;

export const NAV_LINKS = [
  { id: "services", href: "#services" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
] as const;

export const STATS = [
  { value: `${new Date().getFullYear() - SITE.founded}+`, labelKey: "stats.years" },
  { value: "500+", labelKey: "stats.projects" },
  { value: "98%", labelKey: "stats.satisfaction" },
  { value: "15+", labelKey: "stats.craftsmen" },
] as const;

export const SERVICES = [
  {
    id: "drywall",
    icon: "drywall",
    titleKey: "services.drywall.title",
    descriptionKey: "services.drywall.description",
  },
  {
    id: "flooring",
    icon: "flooring",
    titleKey: "services.flooring.title",
    descriptionKey: "services.flooring.description",
  },
  {
    id: "tiling",
    icon: "tiling",
    titleKey: "services.tiling.title",
    descriptionKey: "services.tiling.description",
  },
  {
    id: "parquet",
    icon: "parquet",
    titleKey: "services.parquet.title",
    descriptionKey: "services.parquet.description",
  },
  {
    id: "plumbing",
    icon: "plumbing",
    titleKey: "services.plumbing.title",
    descriptionKey: "services.plumbing.description",
  },
  {
    id: "electrical",
    icon: "electrical",
    titleKey: "services.electrical.title",
    descriptionKey: "services.electrical.description",
  },
] as const;

// Unsplash / Pexels job photos (free to use)
export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1733431772808-82d878e59000?w=800&q=80",
    alt: "Trockenbau und Wandverkleidung – Neubauprojekt in München",
    width: 800, height: 600,
  },
  {
    src: "https://images.pexels.com/photos/4263067/pexels-photo-4263067.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Bodenbelagsarbeiten – Verlegung von Laminatboden",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1625646333826-c30c4e4d73d2?w=800&q=80",
    alt: "Fliesenarbeiten – Badsanierung mit hochwertigen Fliesen",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1761053133165-0f3acdaf1770?w=800&q=80",
    alt: "Parkettverlegung im Fischgrätmuster",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=800&q=80",
    alt: "Sanitärinstallation – Anschluss und Reparatur",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    alt: "Elektroinstallation – fachgerechte Verkabelung",
    width: 800, height: 600,
  },
] as const;
