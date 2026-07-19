// src/app/page.tsx
import Header  from "@/components/sections/Header";
import Hero    from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact  from "@/components/sections/Contact";
import Footer   from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
