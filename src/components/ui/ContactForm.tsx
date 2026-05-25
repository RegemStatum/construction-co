// src/components/ui/ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SITE, SERVICES } from "@/lib/config";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { t } = useTranslation();
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(SITE.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(
          json?.error ?? t("form.submitError"),
        );
        setState("error");
      }
    } catch {
      setErrorMsg(t("form.networkError"));
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-sm bg-brand-50 border border-brand-200"
      >
        <span
          className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-5"
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M6 14l6 6 10-10"
              stroke="#f28010"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display text-2xl font-bold text-stone-900 uppercase mb-2">
          {t("form.successTitle")}
        </h3>
        <p className="text-stone-600 font-body text-base">
          {t("form.successText")}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-brand-600 font-semibold text-sm hover:text-brand-700 underline"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-body font-medium text-stone-700 text-sm mb-1.5"
          >
            {t("form.name")} {" "}
            <span className="text-brand-500" aria-label={t("form.required")}>*
            </span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="block font-body font-medium text-stone-700 text-sm mb-1.5"
          >
            {t("form.phone")} {" "}
            <span className="text-brand-500" aria-label={t("form.required")}>*
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            className="form-input"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block font-body font-medium text-stone-700 text-sm mb-1.5"
        >
          {t("form.email")} {" "}
          <span className="text-brand-500" aria-label={t("form.required")}>*
          </span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t("form.emailPlaceholder")}
          className="form-input"
        />
      </div>

      {/* Service */}
      <div>
        <label
          htmlFor="contact-service"
          className="block font-body font-medium text-stone-700 text-sm mb-1.5"
        >
          {t("form.service")}
        </label>
        <select
          id="contact-service"
          name="service"
          className="form-input"
          defaultValue=""
        >
          <option value="" disabled>
            {t("form.servicePlaceholder")}
          </option>
          {SERVICES.map(({ id, titleKey }) => (
            <option key={id} value={id}>
              {t(titleKey)}
            </option>
          ))}
          <option value="other">{t("form.otherService")}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block font-body font-medium text-stone-700 text-sm mb-1.5"
        >
          {t("form.project")} {" "}
          <span className="text-brand-500" aria-label={t("form.required")}>*
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t("form.projectPlaceholder")}
          className="form-input resize-none"
        />
      </div>

      {/* Error message */}
      {state === "error" && (
        <p
          role="alert"
          className="text-red-600 text-sm font-body bg-red-50 border border-red-200 rounded-sm px-4 py-3"
        >
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        aria-busy={state === "submitting"}
      >
        {state === "submitting" ? (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="animate-spin"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="9"
                r="7"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
              <path
                d="M9 2a7 7 0 0 1 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {t("form.sending")}
          </>
        ) : (
          <>
            {t("form.sendMessage")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8h12M10 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-stone-400 font-body text-center">
        {t("form.responseNote")}
      </p>
    </form>
  );
}
