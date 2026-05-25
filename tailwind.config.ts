import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fef9ee",
          100: "#fdf0d0",
          200: "#fada9d",
          300: "#f7be5f",
          400: "#f49d2a",
          500: "#f28010",
          600: "#e05f08",
          700: "#b9430a",
          800: "#94340f",
          900: "#792d10",
          950: "#411404",
        },
        stone: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "fluid-sm":  "clamp(0.875rem, 1.5vw, 1rem)",
        "fluid-base":"clamp(1rem,    2vw,   1.125rem)",
        "fluid-lg":  "clamp(1.125rem,2.5vw, 1.5rem)",
        "fluid-xl":  "clamp(1.5rem,  3vw,   2rem)",
        "fluid-2xl": "clamp(2rem,    4vw,   3rem)",
        "fluid-3xl": "clamp(2.5rem,  6vw,   4.5rem)",
        "fluid-4xl": "clamp(3rem,    8vw,   6rem)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, rgba(12,10,9,0.85) 0%, rgba(41,37,36,0.7) 50%, rgba(242,128,16,0.25) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "card":  "0 2px 12px 0 rgba(12,10,9,0.08), 0 1px 3px 0 rgba(12,10,9,0.06)",
        "card-hover": "0 8px 32px 0 rgba(12,10,9,0.14), 0 2px 8px 0 rgba(12,10,9,0.08)",
        "brand": "0 4px 20px 0 rgba(242,128,16,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
