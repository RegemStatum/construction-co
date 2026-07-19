// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SITE, SERVICES } from "@/lib/config";
import { isValidEmail, isValidPhone } from "@/lib/validation";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type BrevoEmail = {
  sender: { name: string; email: string };
  to: { email: string; name?: string }[];
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent: string;
};

async function sendBrevoEmail(apiKey: string, email: BrevoEmail): Promise<{ ok: true } | { ok: false; status: number; body: string }> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(email),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, body };
  }
  return { ok: true };
}

const CONFIRMATION_COPY = {
  de: {
    subject: (siteName: string) => `Ihre Anfrage bei ${siteName}`,
    greeting: (name: string) => `Hallo ${name},`,
    body: "vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns innerhalb eines Werktages bei Ihnen.",
    summaryHeading: "Ihre Angaben im Überblick:",
    labels: { phone: "Telefon", email: "E-Mail", service: "Gewünschte Leistung", message: "Nachricht" },
    closing: (siteName: string) => `Mit freundlichen Grüßen<br>Ihr Team von ${siteName}`,
  },
  en: {
    subject: (siteName: string) => `Your inquiry to ${siteName}`,
    greeting: (name: string) => `Hi ${name},`,
    body: "thank you for reaching out. We've received your inquiry and will get back to you within one business day.",
    summaryHeading: "Your details:",
    labels: { phone: "Phone", email: "Email", service: "Service requested", message: "Message" },
    closing: (siteName: string) => `Best regards,<br>The ${siteName} team`,
  },
  ru: {
    subject: (siteName: string) => `Ваш запрос в ${siteName}`,
    greeting: (name: string) => `Здравствуйте, ${name}!`,
    body: "спасибо за ваше сообщение. Мы получили ваш запрос и свяжемся с вами в течение одного рабочего дня.",
    summaryHeading: "Ваши данные:",
    labels: { phone: "Телефон", email: "Эл. почта", service: "Требуемая услуга", message: "Сообщение" },
    closing: (siteName: string) => `С уважением,<br>Команда ${siteName}`,
  },
  uk: {
    subject: (siteName: string) => `Ваш запит до ${siteName}`,
    greeting: (name: string) => `Вітаємо, ${name}!`,
    body: "дякуємо за ваше повідомлення. Ми отримали ваш запит і зв'яжемося з вами протягом одного робочого дня.",
    summaryHeading: "Ваші дані:",
    labels: { phone: "Телефон", email: "Ел. пошта", service: "Потрібна послуга", message: "Повідомлення" },
    closing: (siteName: string) => `З повагою,<br>Команда ${siteName}`,
  },
} as const;

type Locale = keyof typeof CONFIRMATION_COPY;

function isLocale(value: string): value is Locale {
  return value in CONFIRMATION_COPY;
}

export async function POST(request: NextRequest) {
  const data = await request.formData();

  // Honeypot: real visitors never see or fill this field, bots often do.
  // Pretend to succeed so bots don't learn to look for a different tell.
  if (String(data.get("website") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const serviceId = String(data.get("service") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const rawLocale = String(data.get("locale") ?? "").trim();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";

  if (!name || !phone || !email || !message) {
    return NextResponse.json(
      { error: "Bitte füllen Sie alle Pflichtfelder aus." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
      { status: 400 },
    );
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige Telefonnummer ein." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return NextResponse.json(
      { error: "E-Mail-Versand ist derzeit nicht verfügbar. Bitte rufen Sie uns direkt an." },
      { status: 500 },
    );
  }

  const serviceLabel =
    SERVICES.find((s) => s.id === serviceId)?.id ??
    (serviceId || "Nicht angegeben");

  const headerHtml = `
    <div style="padding:4px 0 20px;margin-bottom:24px;border-bottom:2px solid #f28010;">
      <img src="${escapeHtml(SITE.url)}/logo-email.png" width="32" height="32" alt=""
           style="vertical-align:middle;display:inline-block;">
      <span style="vertical-align:middle;display:inline-block;margin-left:10px;color:#17130f;
                   font-size:22px;font-weight:800;letter-spacing:1px;text-transform:uppercase;
                   font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(SITE.name)}
      </span>
    </div>
  `;

  const footerHtml = `
    <p style="margin-top:24px;padding-top:16px;border-top:1px solid #e2ded9;color:#78716c;font-size:13px;">
      ${escapeHtml(SITE.name)}<br>
      ${escapeHtml(SITE.address.street)}, ${escapeHtml(SITE.address.zip)} ${escapeHtml(SITE.address.city)}<br>
      ${escapeHtml(SITE.phone)} · ${escapeHtml(SITE.email)}<br>
      <a href="${escapeHtml(SITE.url)}" style="color:#b9430a;">${escapeHtml(SITE.url.replace(/^https?:\/\//, ""))}</a>
    </p>
  `;
  const footerText = `\n\n--\n${SITE.name}\n${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}\n${SITE.phone} · ${SITE.email}\n${SITE.url}`;

  const notificationHtml = `
    ${headerHtml}
    <h2>Neue Kontaktanfrage über ${escapeHtml(SITE.name)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Gewünschte Leistung:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Nachricht:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    ${footerHtml}
  `;
  const notificationText =
    `Neue Kontaktanfrage über ${SITE.name}\n\n` +
    `Name: ${name}\nTelefon: ${phone}\nE-Mail: ${email}\nGewünschte Leistung: ${serviceLabel}\n\nNachricht:\n${message}` +
    footerText;

  const notificationResult = await sendBrevoEmail(apiKey, {
    sender: { name: SITE.name, email: SITE.email },
    to: [{ email: SITE.email, name: SITE.name }],
    replyTo: { email, name },
    subject: `Neue Anfrage von ${name} – ${SITE.name}`,
    htmlContent: notificationHtml,
    textContent: notificationText,
  }).catch((err) => {
    console.error("Brevo request error (notification)", err);
    return { ok: false as const, status: 0, body: String(err) };
  });

  if (!notificationResult.ok) {
    console.error("Brevo send failed (notification)", notificationResult.status, notificationResult.body);
    return NextResponse.json(
      { error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an." },
      { status: 502 },
    );
  }

  // Confirmation email to the visitor – best-effort, doesn't fail the request
  // if it errors, since the business notification above already succeeded.
  const copy = CONFIRMATION_COPY[locale];
  const confirmationHtml = `
    ${headerHtml}
    <p>${copy.greeting(escapeHtml(name))}</p>
    <p>${copy.body}</p>
    <p><strong>${copy.summaryHeading}</strong></p>
    <p>
      <strong>${copy.labels.phone}:</strong> ${escapeHtml(phone)}<br>
      <strong>${copy.labels.email}:</strong> ${escapeHtml(email)}<br>
      <strong>${copy.labels.service}:</strong> ${escapeHtml(serviceLabel)}<br>
      <strong>${copy.labels.message}:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}
    </p>
    <p>${copy.closing(escapeHtml(SITE.name))}</p>
    ${footerHtml}
  `;
  const confirmationText =
    `${copy.greeting(name)}\n\n${copy.body}\n\n${copy.summaryHeading}\n` +
    `${copy.labels.phone}: ${phone}\n${copy.labels.email}: ${email}\n${copy.labels.service}: ${serviceLabel}\n${copy.labels.message}:\n${message}\n\n` +
    copy.closing(SITE.name).replace(/<br>/g, "\n") +
    footerText;

  const confirmationResult = await sendBrevoEmail(apiKey, {
    sender: { name: SITE.name, email: SITE.email },
    to: [{ email, name }],
    replyTo: { email: SITE.email, name: SITE.name },
    subject: copy.subject(SITE.name),
    htmlContent: confirmationHtml,
    textContent: confirmationText,
  }).catch((err) => {
    console.error("Brevo request error (confirmation)", err);
    return { ok: false as const, status: 0, body: String(err) };
  });

  if (!confirmationResult.ok) {
    console.error("Brevo send failed (confirmation)", confirmationResult.status, confirmationResult.body);
  }

  return NextResponse.json({ ok: true });
}
