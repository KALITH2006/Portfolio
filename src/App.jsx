import { useCallback, useEffect, useRef, useState } from "react";
import { PAGES } from "./data/content.js";
import { useGlassGlow } from "./hooks.js";
import Background from "./components/Background.jsx";
import Loader from "./components/Loader.jsx";
import TopBar from "./components/TopBar.jsx";
import BottomBar from "./components/BottomBar.jsx";
import Hero from "./components/Hero.jsx";
import Tapes from "./components/Tapes.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";

const pageFromPath = (path) => {
  const clean = path.replace(/\/+$/, "") || "/";
  return PAGES.find((p) => p.path === clean || p.aliases.includes(clean))?.id ?? "home";
};

export default function App() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));
  const [booted, setBooted] = useState(false);
  const [bw, setBw] = useState(false);
  const [toast, setToast] = useState(null);
  const scroller = useRef(null);
  const timer = useRef();
  useGlassGlow();

  const notify = useCallback((msg, type) => {
    clearTimeout(timer.current);
    setToast({ msg, type });
    timer.current = setTimeout(() => setToast(null), 4000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  const navigate = useCallback((id) => {
    const target = PAGES.find((p) => p.id === id);
    if (!target) return;
    window.history.pushState(null, "", target.path);
    setPage(id);
  }, []);

  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // New "channel": back to the top of the screen.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [page]);

  // Opening a legacy URL such as /skills lands on that part of its page.
  useEffect(() => {
    if (!booted) return;
    const anchor = { "/skills": "skills", "/certifications": "education-certifications", "/projects": "projects" }[
      window.location.pathname
    ];
    if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView(), 150);
  }, [booted]);

  return (
    <div className="tv fixed inset-0 bg-black p-2 sm:p-4">
      <div
        className={`screen relative h-full rounded-[18px] sm:rounded-[34px] overflow-hidden bg-[#111] ${bw ? "bw" : ""}`}>
        <Background />

        <TopBar page={page} onNavigate={navigate} />

        <div ref={scroller} className="relative z-10 h-full overflow-y-auto no-scrollbar pt-28 pb-24">
          <main key={page} className="channel-in">
            {page === "home" && (
              <>
                <Hero />
                <Tapes active={booted && page === "home"} />
              </>
            )}
            {page === "profile" && (
              <>
                <Skills />
                <Education />
              </>
            )}
            {page === "internships" && <Experience />}
            {page === "contact" && <Contact notify={notify} />}
          </main>
        </div>

        <BottomBar bw={bw} onToggleBw={() => setBw((v) => !v)} />

        <div className="crt-overlay" aria-hidden="true" />
        {!booted && <Loader onDone={() => setBooted(true)} />}

        <div id="toast" role="status" aria-live="polite" className={toast ? `show ${toast.type}` : ""}>
          {toast?.msg}
        </div>
      </div>
    </div>
  );
}
