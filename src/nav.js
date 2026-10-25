import { NAV_LINKS } from "./data/content.js";

// Smooth-scrolls to a section and keeps the URL path in sync (/skills, /projects, ...).
export function goTo(e, id) {
  e?.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
  const link = NAV_LINKS.find((l) => l.id === id);
  if (link) window.history.replaceState(null, "", link.path);
}
