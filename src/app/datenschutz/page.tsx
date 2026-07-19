// src/app/datenschutz/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung gemäß DSGVO für ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <Header solid />
      <main id="main-content">
        <article className="section-padding pt-40 md:pt-48 bg-white">
          <div className="container-site max-w-3xl">
            <h1 className="font-display text-fluid-3xl font-black text-stone-900 uppercase accent-line mb-10">
              Datenschutzerklärung
            </h1>

            <div className="flex flex-col gap-10 text-stone-600 leading-relaxed">
              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  1. Verantwortlicher
                </h2>
                <p>
                  Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                  <br />
                  {SITE.name}
                  <br />
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                  <br />
                  Telefon: {SITE.phone}
                  <br />
                  E-Mail: {SITE.email}
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  2. Ihre Rechte als betroffene Person
                </h2>
                <p>
                  Ihnen stehen gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen
                  Daten zu: Recht auf Auskunft (Art. 15 DSGVO), Recht auf Berichtigung (Art. 16 DSGVO), Recht auf
                  Löschung (Art. 17 DSGVO), Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO), Recht auf
                  Datenübertragbarkeit (Art. 20 DSGVO) sowie Recht auf Widerspruch gegen die Verarbeitung (Art. 21
                  DSGVO). Sie haben zudem das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung
                  Ihrer personenbezogenen Daten durch uns zu beschweren, z. B. beim Bayerischen Landesamt für
                  Datenschutzaufsicht (BayLDA).
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  3. Hosting und Server-Logfiles
                </h2>
                <p>
                  Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf unserer Website erhebt und speichert der
                  Hosting-Anbieter automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser
                  automatisch übermittelt (u. a. IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp, verwendetes
                  Betriebssystem, Referrer-URL). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt
                  und nach spätestens 7 Tagen gelöscht. Rechtsgrundlage ist unser berechtigtes Interesse an der
                  technisch fehlerfreien Darstellung und der Sicherheit unserer Website (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  4. Kontaktformular
                </h2>
                <p>
                  Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                  Formular (Name, Telefonnummer, E-Mail-Adresse, gewünschte Leistung, Projektbeschreibung) zum Zweck
                  der Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen verarbeitet. Der Versand der
                  E-Mail erfolgt technisch über den E-Mail-Dienstleister Brevo SAS, 8 rue de Londres, 75009 Paris,
                  Frankreich, mit dem ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO besteht. Da Brevo seinen
                  Sitz in der EU hat, findet keine Übermittlung Ihrer Daten in ein Drittland statt. Die Verarbeitung
                  erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
                  Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen
                  übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
                  Bearbeitung von Kundenanfragen (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  5. Google Fonts
                </h2>
                <p>
                  Diese Website bindet zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts ein,
                  die von Servern der Google Ireland Limited bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr
                  Browser die benötigten Schriftarten direkt von den Servern von Google, wobei Ihre IP-Adresse an
                  Google übermittelt wird. Rechtsgrundlage ist unser berechtigtes Interesse an einer einheitlichen
                  und ansprechenden Darstellung unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen
                  finden Sie in der Datenschutzerklärung von Google unter{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  6. Lokaler Speicher (localStorage)
                </h2>
                <p>
                  Um Ihre gewählte Sprache dauerhaft zu berücksichtigen, speichern wir Ihre Sprachauswahl im lokalen
                  Speicher (localStorage) Ihres Browsers. Es handelt sich dabei nicht um ein Cookie; die Information
                  verbleibt ausschließlich auf Ihrem Endgerät und wird nicht an uns übertragen. Rechtsgrundlage ist
                  unser berechtigtes Interesse an einer nutzerfreundlichen Darstellung der Website (Art. 6 Abs. 1
                  lit. f DSGVO). Sie können den lokalen Speicher jederzeit über die Einstellungen Ihres Browsers
                  löschen.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  7. Datensicherheit
                </h2>
                <p>
                  Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung zum Schutz der
                  Übertragung vertraulicher Inhalte. Eine verschlüsselte Verbindung erkennen Sie an der
                  Zeichenfolge „https://“ in der Adresszeile Ihres Browsers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  8. Änderung dieser Datenschutzerklärung
                </h2>
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
                  rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen. Für Ihren
                  erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  9. Fragen zum Datenschutz
                </h2>
                <p>
                  Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
