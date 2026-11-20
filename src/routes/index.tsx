import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/portfolio/About";
import { Achievements } from "@/components/portfolio/Achievements";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { BackToTop, CursorDot } from "@/components/portfolio/Extras";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";

const TITLE = "Saptha Shree — AI & Data Science Student, Aspiring Data Engineer";
const DESCRIPTION =
  "Portfolio of Saptha Shree, a B.Tech AI & Data Science student at UVCE Bengaluru — projects, skills, achievements and certifications.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CursorDot />
    </>
  );
}
