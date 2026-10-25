import { useCallback, useEffect, useRef, useState } from "react";
import { PAGES } from "./data/content.js";
import Loader from "./components/Loader.jsx";
import TopBar from "./components/TopBar.jsx";
import BottomBar from "./components/BottomBar.jsx";
import Tapes from "./components/Tapes.jsx";
import Profile from "./components/Profile.jsx";
import Internships from "./components/Internships.jsx";
import Certificates from "./components/Certificates.jsx";
import Contact from "./components/Contact.jsx";
import NotFound from "./components/NotFound.jsx";

const pageFromPath = (path) => {
  const clean = path.replace(/\/+$/, "") || "/";
  return PAGES.find((p) => p.path === clean || p.aliases.includes(clean))?.id ?? "404";
};

export default function App() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));
  const [booted, setBooted] = useState(false);
  const [bw, setBw] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef();

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

  return (
    <div className="fixed inset-0 bg-black p-2 sm:p-4">
      <div className={`screen relative h-full rounded-[22px] sm:rounded-[44px] overflow-hidden ${bw ? "bw" : ""}`}>
        <main key={page} className="absolute inset-0 z-10 channel-in">
          {page === "home" && <Tapes active={booted} />}
          {page === "profile" && <Profile onNavigate={navigate} />}
          {page === "internships" && <Internships />}
          {page === "certificates" && <Certificates />}
          {page === "contact" && <Contact notify={notify} />}
          {page === "404" && <NotFound onHome={() => navigate("home")} />}
        </main>

        <TopBar page={page} onNavigate={navigate} />
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
