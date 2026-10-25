import { useEffect } from "react";

// Shown for any address that isn't one of the pages: the TV has lost its signal.
export default function NotFound({ onHome }) {
  useEffect(() => {
    const previous = document.title;
    document.title = "404 · Signal lost · KALITH";
    const onKey = (e) => e.key === "Enter" && onHome();
    window.addEventListener("keydown", onKey);
    return () => {
      document.title = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onHome]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%]">
      <div className="static-noise absolute inset-0 pointer-events-none" aria-hidden="true" />

      <p className="px text-primary-container relative">[Error]</p>
      <h1 className="serif glitch relative text-[clamp(7rem,26vw,20rem)] leading-[0.8] text-on-surface" data-text="404">
        404
      </h1>
      <p className="px !text-xl text-on-surface mt-6 relative">No signal on this channel</p>
      <p className="font-mono text-xs text-on-surface-variant mt-2 relative max-w-md">
        The page <span className="text-primary-container break-all">{window.location.pathname}</span> doesn&apos;t exist, or the tape was moved.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-8 relative">
        <button
          onClick={onHome}
          className="px !text-lg rounded-full bg-[#ece9e1] text-[#111] px-6 py-2.5 hover:bg-white transition-colors">
          Back to home ⏎
        </button>
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, "", "/contact");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
          className="px !text-lg rounded-full border border-white/25 px-6 py-2.5 hover:border-primary-container hover:text-primary-container transition-colors">
          Report a broken link ↗
        </a>
      </div>
    </div>
  );
}
