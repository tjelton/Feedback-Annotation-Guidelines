/* Deep links: when the URL hash points at something inside a collapsed
   <details>, open every enclosing <details>, scroll to it and flash it. */
(function () {
  "use strict";

  function reveal(id, smooth) {
    if (!id) return;
    let el;
    try { el = document.getElementById(decodeURIComponent(id)); } catch (e) { el = null; }
    if (!el) return;
    let p = el;
    while (p) {
      if (p.tagName === "DETAILS") p.open = true;
      p = p.parentElement;
    }
    if (el.tagName === "DETAILS") el.open = true;
    const target = el.tagName === "DETAILS" ? (el.querySelector(":scope > summary") || el) : el;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      target.classList.remove("flash");
      void target.offsetWidth;
      target.classList.add("flash");
    });
  }

  function fromHash(smooth) { reveal(location.hash.slice(1), smooth); }

  /* Same-page links: handle even when the hash does not change (re-click). */
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    if (!document.getElementById(id)) return;
    e.preventDefault();
    history.pushState(null, "", "#" + id);
    reveal(id, true);
  });
  window.addEventListener("hashchange", () => fromHash(true));

  window.GXref = { reveal, fromHash };
})();
