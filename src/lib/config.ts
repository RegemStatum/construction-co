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
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
] as const;

export const STATS = [
  { value: `${new Date().getFullYear() - SITE.founded}+`, label: "Years in Business" },
  { value: "500+",  label: "Projects Completed"  },
  { value: "98%",   label: "Client Satisfaction"  },
  { value: "15+",   label: "Expert Craftsmen"     },
] as const;

export const SERVICES = [
  {
    id:          "home-renovation",
    icon:        "home",
    title:       "Home Renovation",
    description: "Full-scale home transformations – from structural changes to finishing touches. We bring your vision to life on time and on budget.",
  },
  {
    id:          "kitchen-renovation",
    icon:        "kitchen",
    title:       "Kitchen Renovation",
    description: "Custom cabinetry, countertops, island builds, and appliance integration. Kitchens that are as functional as they are beautiful.",
  },
  {
    id:          "bathroom-renovation",
    icon:        "bath",
    title:       "Bathroom Renovation",
    description: "Spa-quality remodels featuring walk-in showers, soaking tubs, and premium tile work that stand the test of time.",
  },
  {
    id:          "interior-construction",
    icon:        "interior",
    title:       "Interior Construction",
    description: "Framing, drywall, ceilings, custom built-ins, and open-plan conversions. The backbone behind every great interior.",
  },
  {
    id:          "painting",
    icon:        "paint",
    title:       "Interior & Exterior Painting",
    description: "Flawless prep, premium paints, and expert application for a finish that lasts. Residential and light commercial.",
  },
  {
    id:          "roofing",
    icon:        "roof",
    title:       "Roofing",
    description: "Roof installation, repair, and replacement using top-grade materials. We protect what matters most – your home.",
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
