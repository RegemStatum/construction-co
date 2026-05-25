// src/components/sections/Hero.tsx
import { SITE, STATS } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero – welcome to Ironclad Construction"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Using a CSS background as the hero bg so it doesn't count as content img */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85')",
          }}
        />
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

      {/* Content */}
      <div className="container-site pb-20 pt-40 md:pt-52">
        {/* Eyebrow */}
        <p className="inline-flex items-center gap-2.5 mb-6 text-brand-400 font-body font-semibold text-sm tracking-widest uppercase">
          <span className="w-8 h-px bg-brand-400" aria-hidden="true" />
          Since {SITE.founded} · Denver, CO
        </p>

        {/* H1 – one per page */}
        <h1 className="font-display text-fluid-4xl font-black text-white uppercase leading-none max-w-3xl mb-6">
          Building Tomorrow,
          <br />
          <span className="text-brand-400">Today.</span>
        </h1>

        <p className="font-body text-fluid-lg text-stone-300 max-w-xl leading-relaxed mb-10">
          {SITE.name} delivers exceptional construction and renovation services across{" "}
          {SITE.serviceArea}. Quality craftsmanship. On time. On budget.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary">
            Get a Free Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#projects" className="btn-outline">
            View Our Work
          </a>
        </div>

        {/* Stats bar */}
        <dl
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-700/50 rounded-sm overflow-hidden max-w-3xl border border-stone-700/50"
          aria-label="Company statistics"
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-stone-950/70 backdrop-blur-sm px-6 py-5 text-center"
            >
              <dt className="font-display text-fluid-2xl font-black text-brand-400 leading-none mb-1">
                {value}
              </dt>
              <dd className="font-body text-xs text-stone-400 uppercase tracking-wider">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-stone-500"
        aria-hidden="true"
      >
        <span className="text-xs font-body uppercase tracking-widest">Scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-stone-500 to-transparent" />
      </div>
    </section>
  );
}
