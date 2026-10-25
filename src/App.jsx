import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "./data/content.js";
import { useActiveSection, useGlassGlow } from "./hooks.js";
import { goTo } from "./nav.js";
import Background from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function App() {
  const active = useActiveSection(SECTION_IDS);
  const [toast, setToast] = useState(null);
  const timer = useRef();
  useGlassGlow();

  const notify = useCallback((msg, type) => {
    clearTimeout(timer.current);
    setToast({ msg, type });
    timer.current = setTimeout(() => setToast(null), 4000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Opening /skills, /projects, ... directly scrolls to that section.
  useEffect(() => {
    const link = NAV_LINKS.find((l) => l.path === window.location.pathname);
    if (link && link.id !== "hero") setTimeout(() => goTo(null, link.id), 300);
  }, []);

  // Keep the URL in step with the section being read.
  useEffect(() => {
    const link = NAV_LINKS.find((l) => l.id === active);
    if (link && window.location.pathname !== link.path) window.history.replaceState(null, "", link.path);
  }, [active]);

  return (
    <>
      <Background />
      <Navbar active={active} />

      <main className="flex-grow z-10 relative mt-[69px]">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact notify={notify} />
      </main>

      <footer className="w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#080e1a] border-t border-outline-variant z-10 relative">
        <div className="font-terminal-header text-xs text-on-surface hover:text-primary-container transition-colors cursor-default">
          © 2026 KALITH_AI // ENGINEER PORTFOLIO v2.0
        </div>
        <div className="flex gap-6 font-terminal-header text-xs">
          <a
            href="https://github.com/KALITH2006/Portfolio"
            target="_blank"
            rel="noreferrer"
            className="text-outline hover:text-primary-container opacity-80 hover:opacity-100 transition-all">
            Source
          </a>
        </div>
      </footer>

      <div id="toast" role="status" aria-live="polite" className={toast ? `show ${toast.type}` : ""}>
        {toast?.msg}
      </div>
    </>
  );
}
