// src/lib/config.ts
// ─── Company & Site Configuration ──────────────────────────────────────────
// Edit these values to customise the website for your company.

export const SITE = {
  name:        "Ironclad Construction",
  tagline:     "Building Tomorrow, Today.",
  description: "Family-owned construction company serving the greater metro area since 2003. Specialising in home renovation, kitchen & bathroom remodels, roofing, and interior build-outs.",
  url:         "https://ironclad-construction.com",
  phone:       "+1 (555) 892-4100",
  email:       "info@ironclad-construction.com",
  address: {
    street:  "420 Industrial Blvd",
    city:    "Denver",
    state:   "CO",
    zip:     "80203",
    country: "US",
  },
  serviceArea: "Denver Metro, Aurora, Lakewood, Centennial & surrounding areas",
  founded:     2003,

  // Social – leave blank to hide icons
  social: {
    facebook: "https://facebook.com/ironcladconstruction",
    instagram: "https://instagram.com/ironcladconstruction",
  },

  // Formspree endpoint – replace with your own form ID after sign-up
  // https://formspree.io/f/<your-form-id>
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
} as const;

export const NAV_LINKS = [
  { id: "about", href: "#about" },
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
    id: "home-renovation",
    icon: "home",
    titleKey: "services.homeRenovation.title",
    descriptionKey: "services.homeRenovation.description",
  },
  {
    id: "kitchen-renovation",
    icon: "kitchen",
    titleKey: "services.kitchenRenovation.title",
    descriptionKey: "services.kitchenRenovation.description",
  },
  {
    id: "bathroom-renovation",
    icon: "bath",
    titleKey: "services.bathroomRenovation.title",
    descriptionKey: "services.bathroomRenovation.description",
  },
  {
    id: "interior-construction",
    icon: "interior",
    titleKey: "services.interiorConstruction.title",
    descriptionKey: "services.interiorConstruction.description",
  },
  {
    id: "painting",
    icon: "paint",
    titleKey: "services.painting.title",
    descriptionKey: "services.painting.description",
  },
  {
    id: "roofing",
    icon: "roof",
    titleKey: "services.roofing.title",
    descriptionKey: "services.roofing.description",
  },
] as const;

// Unsplash construction images (free to use)
export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    alt: "Modern home renovation exterior – Ironclad Construction project",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Bright contemporary kitchen remodel with marble countertops",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    alt: "Luxury bathroom renovation with walk-in shower and heated floors",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    alt: "New residential construction framing and interior build-out",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    alt: "Completed residential exterior painting and curb appeal upgrade",
    width: 800, height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    alt: "Roof replacement project – new architectural shingles installation",
    width: 800, height: 600,
  },
] as const;
