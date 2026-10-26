import { useCallback, useEffect, useRef, useState } from "react";
import { PAGES } from "./data/content.js";
import Loader from "./components/Loader.jsx";
import TvCrash from "./components/TvCrash.jsx";
import BrandReveal from "./components/BrandReveal.jsx";
import { blankFavicon, restoreFavicon } from "./favicon.js";
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
  const [crashed, setCrashed] = useState(false);
  const [loaded, setLoaded] = useState(false); // loader reached 100%
  const [booted, setBooted] = useState(false); // page starts easing in
  const [loaderGone, setLoaderGone] = useState(false);
  const [brandDone, setBrandDone] = useState(false);
  const [bw, setBw] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const notify = useCallback((msg, type) => {
    clearTimeout(timer.current);
    setToast({ msg, type });
    timer.current = setTimeout(() => setToast(null), 4000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  // The tab icon stays blank until the MK badge arrives (restored by BrandReveal; the timeout is a safety net).
  useEffect(() => {
    blankFavicon();
    const t = setTimeout(restoreFavicon, 20000);
    return () => clearTimeout(t);
  }, []);

  // keep the loader mounted while it fades out over the brand reveal
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setLoaderGone(true), 900);
    return () => clearTimeout(t);
  }, [loaded]);

  const navigate = useCallback((id, hash = "") => {
    const target = PAGES.find((p) => p.id === id);
    if (!target) return;
    window.history.pushState(null, "", target.path + (hash ? `#${hash}` : ""));
    setPage(id);
  }, []);

  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="fixed inset-0 bg-black p-2 sm:p-4">
      <div
        data-booted={booted}
        className={`screen relative h-full rounded-[22px] sm:rounded-[44px] overflow-hidden ${bw ? "bw" : ""}`}>
        <div className="crt-bg" aria-hidden="true" />
        <div className="stage absolute inset-0 z-10">
          <main key={page} className="absolute inset-0 z-10 channel-in">
            {page === "home" && <Tapes active={booted} />}
            {page === "profile" && <Profile onNavigate={navigate} />}
            {page === "internships" && <Internships />}
            {page === "certificates" && <Certificates />}
            {page === "contact" && <Contact notify={notify} />}
            {page === "404" && <NotFound onHome={() => navigate("home")} />}
          </main>
        </div>

        <TopBar page={page} onNavigate={navigate} />
        <BottomBar bw={bw} onToggleBw={() => setBw((v) => !v)} />

        <div className="crt-overlay" aria-hidden="true" />
        {!crashed ? (
          <TvCrash onDone={() => setCrashed(true)} />
        ) : (
          !loaderGone && <Loader leaving={loaded} onDone={() => setLoaded(true)} />
        )}
        {loaded && !brandDone && <BrandReveal onReveal={() => setBooted(true)} onFinish={() => setBrandDone(true)} />}

        <div id="toast" role="status" aria-live="polite" className={toast ? `show ${toast.type}` : ""}>
          {toast?.msg}
        </div>
      </div>
    </div>
  );
}
