// src/components/ui/ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SERVICES } from "@/lib/config";
import { isValidEmail, isValidPhone } from "@/lib/validation";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) errors.name = t("form.errorRequired");
    if (!phone) errors.phone = t("form.errorRequired");
    else if (!isValidPhone(phone)) errors.phone = t("form.errorPhone");
    if (!email) errors.email = t("form.errorRequired");
    else if (!isValidEmail(email)) errors.email = t("form.errorEmail");
    if (!message) errors.message = t("form.errorRequired");

    return errors;
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstField = Object.keys(errors)[0];
      form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setFieldErrors({});
    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact/", {
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
        className="flex flex-col items-center justify-center text-center py-10 px-5 sm:py-16 sm:px-8 rounded-sm bg-brand-50 border border-brand-200"
      >
        <span
          className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-5"
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M6 14l6 6 10-10"
              stroke="#b9430a"
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
          className="mt-6 text-brand-700 font-semibold text-sm hover:text-brand-800 underline"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof FieldErrors) =>
    `form-input ${fieldErrors[field] ? "border-red-400 focus:border-red-500 focus:ring-red-500" : ""}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-4 sm:gap-5"
    >
      <input type="hidden" name="locale" value={i18n.language} />

      {/* Honeypot – hidden from real visitors, bots often fill every field */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-body font-medium text-stone-700 text-sm mb-1.5"
          >
            {t("form.name")} {" "}
            <span className="text-brand-700" aria-label={t("form.required")}>*
            </span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className={inputClass("name")}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            onChange={() => clearFieldError("name")}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="block font-body font-medium text-stone-700 text-sm mb-1.5"
          >
            {t("form.phone")} {" "}
            <span className="text-brand-700" aria-label={t("form.required")}>*
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            className={inputClass("phone")}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
            onChange={() => clearFieldError("phone")}
            onBlur={(e) => {
              e.currentTarget.value = e.currentTarget.value.trim();
            }}
          />
          {fieldErrors.phone && (
            <p id="contact-phone-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {fieldErrors.phone}
            </p>
          )}
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
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={t("form.emailPlaceholder")}
          className={inputClass("email")}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          onChange={() => clearFieldError("email")}
          onBlur={(e) => {
            e.currentTarget.value = e.currentTarget.value.trim().toLowerCase();
          }}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {fieldErrors.email}
          </p>
        )}
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
          rows={5}
          placeholder={t("form.projectPlaceholder")}
          className={`${inputClass("message")} resize-none`}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          onChange={() => clearFieldError("message")}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {fieldErrors.message}
          </p>
        )}
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
