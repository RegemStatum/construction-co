"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/lib/config";

const heroSlides = [
  {
    url: "https://images.unsplash.com/photo-1733431772808-82d878e59000?w=1920&q=85&fit=crop&h=1080",
    label: "Drywall installation and finishing",
  },
  {
    url: "https://images.pexels.com/photos/4263067/pexels-photo-4263067.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    label: "Wood flooring installation",
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=85&fit=crop&h=1080",
    label: "Completed bathroom remodel",
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const handleSlideChange = (direction: number) => {
    setCurrentSlide((current) => {
      const nextIndex = current + direction;
      return (nextIndex + heroSlides.length) % heroSlides.length;
    });
  };

  return (
    <section
      id="hero"
      aria-label="Hero – welcome to Ironclad Construction"
      className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.url}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.url}')` }}
          />
        ))}
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/65 to-brand-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="hidden sm:flex absolute left-1/2 bottom-5 z-20 items-center gap-2 rounded-full bg-black/30 px-2 py-1 shadow-lg backdrop-blur-sm -translate-x-1/2">
        <button
          type="button"
          onClick={() => handleSlideChange(-1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-400"
          aria-label="Previous hero image"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="hidden sm:block px-2 text-[11px] uppercase tracking-[0.3em] text-white/75">
          {currentSlide + 1}/{heroSlides.length}
        </div>

        <button
          type="button"
          onClick={() => handleSlideChange(1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-400"
          aria-label="Next hero image"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      {/* Content */}
      <div className="container-site pb-12 pt-28 md:pb-20 md:pt-52">
        {/* Eyebrow */}
        <p className="inline-flex items-center gap-2.5 mb-4 md:mb-6 text-brand-400 font-body font-semibold text-sm tracking-widest uppercase">
          <span className="w-8 h-px bg-brand-400" aria-hidden="true" />
          {t("hero.eyebrow")}
        </p>

        {/* H1 – one per page */}
        <h1 className="font-display text-fluid-4xl font-black text-white uppercase leading-none max-w-3xl mb-4 md:mb-6">
          {t("hero.headlineLine1")}
          <br />
          <span className="text-brand-400">{t("hero.headlineAccent")}</span>
        </h1>

        <p className="md:hidden font-body text-fluid-lg text-stone-300 max-w-xl leading-relaxed mb-6">
          {t("hero.descriptionShort", { siteName: SITE.name })}
        </p>
        <p className="hidden md:block font-body text-fluid-lg text-stone-300 max-w-xl leading-relaxed mb-10">
          {t("hero.description", {
            siteName: SITE.name,
            serviceArea: t("site.serviceArea"),
          })}
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary">
            {t("header.quote")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#projects" className="btn-outline">
            {t("hero.viewWork")}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      {/* <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-stone-500"
        aria-hidden="true"
      >
        <span className="text-xs font-body uppercase tracking-widest">
          Scroll
        </span>
        <span className="block w-px h-8 bg-gradient-to-b from-stone-500 to-transparent" />
      </div> */}
    </section>
  );
}
