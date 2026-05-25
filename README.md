# Ironclad Construction – Next.js Website

A production-ready, SEO-optimised, statically-generated marketing site built with **Next.js 14 App Router**, **TypeScript**, and **TailwindCSS**.

---

## 📁 Full Project Structure

```
construction-co/
├── public/
│   ├── favicon.ico               ← Replace with your own
│   ├── apple-touch-icon.png      ← 180×180 PNG
│   ├── og-image.jpg              ← 1200×630 Open Graph image
│   └── images/                   ← Optional local project photos
│
├── src/
│   ├── app/
│   │   ├── globals.css           ← Tailwind + custom CSS
│   │   ├── layout.tsx            ← Root layout, metadata, JSON-LD
│   │   ├── page.tsx              ← Home page – assembles sections
│   │   ├── robots.ts             ← Auto-generated robots.txt
│   │   └── sitemap.ts            ← Auto-generated sitemap.xml
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Header.tsx        ← Sticky nav, mobile menu
│   │   │   ├── Hero.tsx          ← Full-screen hero + stats
│   │   │   ├── About.tsx         ← Company story + trust cards
│   │   │   ├── Services.tsx      ← 6-service grid
│   │   │   ├── Projects.tsx      ← Photo gallery
│   │   │   ├── Contact.tsx       ← Info + contact form
│   │   │   └── Footer.tsx        ← Links, social, copyright
│   │   │
│   │   └── ui/
│   │       ├── ServiceIcon.tsx   ← SVG icon switcher
│   │       └── ContactForm.tsx   ← Async Formspree form
│   │
│   └── lib/
│       └── config.ts             ← ⭐ ALL editable content lives here
│
├── next.config.ts                ← Static export config
├── tailwind.config.ts            ← Custom colours, fonts, utilities
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── .eslintrc.json
```

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → Open http://localhost:3000

# 3. Build static export
npm run build
# → Outputs to /out directory

# 4. Preview static build
npx serve out
```

---

## ✏️ Customising the Site

**All company content is in one place: `src/lib/config.ts`**

Edit these fields:

| Field | Description |
|---|---|
| `SITE.name` | Company name |
| `SITE.tagline` | Hero tagline |
| `SITE.description` | Meta description |
| `SITE.url` | Your live domain (no trailing slash) |
| `SITE.phone` | Contact phone number |
| `SITE.email` | Contact email |
| `SITE.address` | Physical address |
| `SITE.serviceArea` | Geographic service area |
| `SITE.founded` | Founding year (auto-calculates years experience) |
| `SITE.social` | Facebook / Instagram URLs |
| `SITE.formspreeEndpoint` | Formspree form URL (see below) |
| `SERVICES` | Array of 4–8 services |
| `GALLERY_IMAGES` | Array of project photo URLs + alt text |

---

## 📬 Setting Up the Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **+ New Form**, name it "Contact Form", set the email recipient
3. Copy your form endpoint — it looks like `https://formspree.io/f/xabcdefg`
4. Open `src/lib/config.ts` and replace:
   ```ts
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```
   with your actual endpoint
5. Redeploy — form submissions will land in your Formspree dashboard and be forwarded to your email

> **Free tier:** 50 submissions/month. Paid plans start at $10/mo for 1,000 submissions.

---

## 🚀 Deploying to Vercel

### Option A – Via GitHub (recommended)

1. Push your project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — leave all settings as defaults
5. Click **Deploy**

> Because `next.config.ts` sets `output: "export"`, the build outputs a fully static site with zero serverless functions needed.

### Option B – Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Build settings (auto-detected, but for reference)

| Setting | Value |
|---|---|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Directory | `out` |
| Install Command | `npm install` |

---

## 🌐 Connecting a Custom Domain

1. In your Vercel project → **Settings → Domains**
2. Type your domain (e.g. `ironclad-construction.com`) → **Add**
3. Vercel will show you DNS records to add:

### If using an apex domain (`yourdomain.com`)
Add an **A record** at your registrar:
```
Type:  A
Name:  @
Value: 76.76.21.21
```

### If using a subdomain (`www.yourdomain.com`)
Add a **CNAME record**:
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
```

4. Wait up to 24 hours for DNS propagation
5. Vercel automatically provisions a free SSL/TLS certificate via Let's Encrypt
6. Update `SITE.url` in `src/lib/config.ts` to your live domain, then redeploy

---

## 🖼️ Adding Your Own Photos

Replace the Unsplash URLs in `src/lib/config.ts → GALLERY_IMAGES` with:

**Option A – Unsplash (free, no attribution required under Unsplash license)**
```ts
src: "https://images.unsplash.com/photo-PHOTO_ID?w=800&q=80"
```

**Option B – Local images**
1. Place photos in `public/images/`
2. Reference as:
   ```ts
   src: "/images/my-project.jpg"
   ```

**Recommended sizes:**
- Gallery images: 800×600 px (4:3) or 1200×800 px (3:2)
- Hero background: 1920×1080 px minimum
- OG image: exactly 1200×630 px

> Tip: Compress images with [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) before upload for best Lighthouse scores.

---

## 🔍 SEO Checklist

- [x] Single `<h1>` on the page
- [x] Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<address>`)
- [x] All images have descriptive `alt` attributes
- [x] `title` and `description` meta tags
- [x] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [x] Twitter Card tags
- [x] `robots.txt` (auto-generated via `app/robots.ts`)
- [x] `sitemap.xml` (auto-generated via `app/sitemap.ts`)
- [x] LocalBusiness JSON-LD schema markup
- [x] Canonical URL
- [x] `lang` attribute on `<html>`
- [x] Lazy loading for below-fold images

**After deploying:** Submit your sitemap to [Google Search Console](https://search.google.com/search-console):
1. Add your property (domain)
2. Go to Sitemaps → enter `sitemap.xml` → Submit

---

## 🎨 Customising Design

### Colours
Edit `tailwind.config.ts` → `theme.extend.colors.brand`

The default amber-orange palette works well for construction. To switch to a blue palette:
```ts
brand: {
  400: "#60a5fa",  // blue-400
  500: "#3b82f6",  // blue-500
  600: "#2563eb",  // blue-600
  // ...
}
```

### Fonts
The site uses [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) (headings) and [Barlow](https://fonts.google.com/specimen/Barlow) (body), loaded from Google Fonts in `globals.css`.

To change fonts:
1. Replace the `@import` URL in `globals.css`
2. Update the `--font-display` and `--font-body` CSS variables

---

## 📊 Performance Notes

- **Static export** (`output: "export"`) = no server-side JS, fastest possible TTFB
- Images use `loading="lazy"` + `decoding="async"` throughout
- Google Fonts loaded with `display=swap` to prevent render blocking
- No heavy third-party scripts
- Target: **Lighthouse 95+** on all four metrics

---

## 📝 License

MIT – free to use for client projects.
