// src/components/sections/Contact.tsx
"use client";

import { useTranslation } from "react-i18next";
import { SITE } from "@/lib/config";
import ContactForm from "@/components/ui/ContactForm";

const INFO_ITEMS = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16.5 14.1c-.9-.1-1.8-.3-2.6-.7-.4-.2-.8-.1-1.1.2l-1.1 1.1a10.7 10.7 0 0 1-4.4-4.4l1.1-1.1c.3-.3.4-.7.2-1.1a9 9 0 0 1-.7-2.6C7.8 5.1 7.3 4.7 6.7 4.7H4.4C3.7 4.7 3 5.4 3 6.2 3 14.3 8.7 20 16.8 20c.8 0 1.5-.7 1.5-1.4v-2.3c0-.6-.4-1.1-1-1.2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    labelKey: "contact.phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="4"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2 7l9 6 9-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    labelKey: "contact.email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M11 2C7.7 2 5 4.7 5 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="11" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    labelKey: "contact.serviceArea",
    value: SITE.serviceArea,
    href: undefined,
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 7v4l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    labelKey: "contact.officeHours",
    value: "Mon – Fri: 7 am – 6 pm\nSat: 8 am – 2 pm",
    href: undefined,
  },
] as const;

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="section-padding bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <p className="inline-flex items-center gap-2.5 mb-4 text-brand-700 font-body font-semibold text-sm tracking-widest uppercase">
            <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
            {t("contact.eyebrow")}
            <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
          </p>
          <h2
            id="contact-heading"
            className="font-display text-fluid-3xl font-black text-stone-900 uppercase accent-line accent-line-center"
          >
            {t("contact.headline")}
          </h2>
          <p className="mt-6 text-stone-500 text-fluid-base max-w-lg mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          {/* Info column (2 of 5) */}
          <aside className="lg:col-span-2" aria-label="Contact information">
            <dl className="flex flex-col gap-6">
              {INFO_ITEMS.map(({ icon, labelKey, value, href }) => (
                <div key={labelKey} className="flex gap-4 items-start">
                  <dt>
                    <span
                      className="mt-0.5 w-11 h-11 flex-shrink-0 bg-brand-50 border border-brand-200
                                 rounded-sm flex items-center justify-center text-brand-700"
                    >
                      {icon}
                    </span>
                    <span className="sr-only">{t(labelKey)}:</span>
                  </dt>
                  <dd>
                    <p className="font-body font-semibold text-stone-700 text-xs uppercase tracking-wider mb-0.5">
                      {t(labelKey)}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-body text-stone-600 hover:text-brand-700 transition-colors text-base"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-stone-600 text-base whitespace-pre-line">
                        {value}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Address */}
            <div className="mt-8 p-5 bg-stone-50 rounded-sm border border-stone-200">
              <p className="font-body font-semibold text-stone-700 text-xs uppercase tracking-wider mb-2">
                {t("contact.officeAddress")}
              </p>
              <address className="not-italic font-body text-stone-600 text-sm leading-relaxed">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </address>
            </div>
          </aside>

          {/* Form column (3 of 5) */}
          <div className="lg:col-span-3 bg-stone-50 rounded-sm border border-stone-200 p-5 sm:p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
