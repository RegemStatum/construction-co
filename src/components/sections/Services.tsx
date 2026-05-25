// src/components/sections/Services.tsx
import { SERVICES } from "@/lib/config";
import ServiceIcon from "@/components/ui/ServiceIcon";

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding bg-stone-950"
      aria-labelledby="services-heading"
    >
      <div className="container-site">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2.5 mb-4 text-brand-400 font-body font-semibold text-sm tracking-widest uppercase">
            <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
            What We Do
            <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
          </p>
          <h2
            id="services-heading"
            className="font-display text-fluid-3xl font-black text-white uppercase accent-line accent-line-center"
          >
            Our Services
          </h2>
          <p className="mt-6 text-stone-400 text-fluid-base max-w-xl mx-auto">
            From a single room refresh to a complete home transformation, we have the
            expertise and crew to deliver outstanding results.
          </p>
        </div>

        {/* Services grid */}
        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Construction services"
        >
          {SERVICES.map(({ id, icon, title, description }) => (
            <li key={id}>
              <article className="service-card h-full bg-stone-900 border-stone-800 hover:border-brand-700">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-sm bg-brand-500/10 border border-brand-500/20
                              flex items-center justify-center text-brand-400 mb-5
                              group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500
                              transition-all duration-300"
                  aria-hidden="true"
                >
                  <ServiceIcon icon={icon} className="w-6 h-6" />
                </div>

                {/* Text */}
                <h3 className="font-display text-xl font-bold text-white uppercase mb-3">
                  {title}
                </h3>
                <p className="font-body text-sm text-stone-400 leading-relaxed">
                  {description}
                </p>

                {/* CTA hint */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 mt-5 text-brand-400 text-sm font-semibold
                             hover:text-brand-300 transition-colors group/link"
                  aria-label={`Get a quote for ${title}`}
                >
                  Get a Quote
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="group-hover/link:translate-x-1 transition-transform duration-150"
                    aria-hidden="true"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
