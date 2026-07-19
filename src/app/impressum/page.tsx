// src/app/impressum/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung gemäß § 5 TMG für ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <Header solid />
      <main id="main-content">
        <article className="section-padding pt-40 md:pt-48 bg-white">
          <div className="container-site max-w-3xl">
            <h1 className="font-display text-fluid-3xl font-black text-stone-900 uppercase accent-line mb-10">
              Impressum
            </h1>

            <div className="flex flex-col gap-10 text-stone-600 leading-relaxed">
              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Angaben gemäß § 5 TMG
                </h2>
                <p>
                  {SITE.name}
                  <br />
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                  <br />
                  {SITE.address.state}, Deutschland
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Vertreten durch
                </h2>
                <p>Geschäftsführer: Thomas Berger</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Kontakt
                </h2>
                <p>
                  Telefon: {SITE.phone}
                  <br />
                  E-Mail: {SITE.email}
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Registereintrag
                </h2>
                <p>
                  Eintragung im Handelsregister.
                  <br />
                  Registergericht: Amtsgericht München
                  <br />
                  Registernummer: HRB XXXXXX
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Umsatzsteuer-ID
                </h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                  <br />
                  DE XXXXXXXXX
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h2>
                <p>
                  Berufsbezeichnung: Handwerksmeister (verliehen in Deutschland)
                  <br />
                  Zuständige Kammer: Handwerkskammer für München und Oberbayern
                  <br />
                  Es gelten die Vorschriften der Handwerksordnung (HwO), einsehbar unter{" "}
                  <a
                    href="https://www.gesetze-im-internet.de/hwo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    gesetze-im-internet.de/hwo
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Redaktionell verantwortlich
                </h2>
                <p>
                  Thomas Berger
                  <br />
                  {SITE.address.street}, {SITE.address.zip} {SITE.address.city}
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  EU-Streitschlichtung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                  .<br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht verpflichtet und nicht bereit, an
                  Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Haftung für Inhalte
                </h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
                  Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Haftung für Links
                </h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                  haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                  der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  Urheberrecht
                </h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                  deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
                  Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
