// The tab icon is blanked during the opening and handed back once the "MK" badge has flown up to it.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const links = () => [...document.querySelectorAll('link[rel~="icon"]')];

export function blankFavicon() {
  links().forEach((l) => {
    if (!l.dataset.real) l.dataset.real = l.getAttribute("href");
    l.setAttribute("href", BLANK);
  });
}

export function restoreFavicon() {
  const stamp = Date.now();
  links().forEach((l) => {
    const real = l.dataset.real;
    if (real) l.setAttribute("href", `${real.split("?")[0]}?v=${stamp}`);
  });
}
