/* Shared header, footer and quiz-badge storage. */
(function () {
  "use strict";
  const PASS_KEY = (kind) => "fag-quiz-pass-" + kind;

  function getPass(kind) {
    try {
      const raw = localStorage.getItem(PASS_KEY(kind));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function setPass(kind, rec) {
    try { localStorage.setItem(PASS_KEY(kind), JSON.stringify(rec)); } catch (e) { /* storage unavailable */ }
  }

  const LINKS = [
    { href: "index.html", label: "Home" },
    { href: "general.html", label: "1. General" },
    { href: "questions.html", label: "2. Questions", kind: "questions" },
    { href: "levels.html", label: "3. Levels", kind: "levels" },
    { href: "specificity.html", label: "4. Specificity", kind: "specificity" },
    { href: "quiz.html", label: "Quizzes" }
  ];

  function renderHeader() {
    const host = document.getElementById("site-header");
    if (!host) return;
    const here = (location.pathname.split("/").pop() || "index.html");
    const links = LINKS.map((l) => {
      const cur = here === l.href ? ' aria-current="page"' : "";
      const badge = l.kind && getPass(l.kind) ? '<span class="nav-badge" title="Quiz passed">✓</span>' : "";
      return '<a href="' + l.href + '"' + cur + ">" + l.label + badge + "</a>";
    }).join("");
    host.className = "site-header";
    host.innerHTML = '<div class="inner"><a class="brand" href="index.html">Feedback Annotation Guidelines</a>' +
      '<nav class="site-nav" aria-label="Main">' + links + "</nav></div>";
  }

  function renderFooter() {
    const host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    host.textContent = "Feedback Annotation Guidelines";
  }

  /* Previous / next buttons at the bottom of each reading page. */
  const SEQUENCE = [
    { href: "index.html", title: "Home" },
    { href: "general.html", title: "1. General Annotation Principles" },
    { href: "questions.html", title: "2. Feedback Questions" },
    { href: "levels.html", title: "3. Feedback Levels" },
    { href: "specificity.html", title: "4. Specificity" },
    { href: "quiz.html", title: "Quizzes" }
  ];

  function renderPager() {
    const main = document.querySelector("main.page");
    const here = (location.pathname.split("/").pop() || "index.html");
    const i = SEQUENCE.findIndex((p) => p.href === here);
    if (!main || i < 0 || here === "quiz.html") return;
    const prev = SEQUENCE[i - 1];
    const next = SEQUENCE[i + 1];
    const nav = document.createElement("nav");
    nav.className = "pager";
    nav.setAttribute("aria-label", "Section navigation");
    nav.innerHTML =
      (prev ? '<a class="pager-link prev" href="' + prev.href + '"><span class="pager-dir">← Previous</span><span class="pager-title">' + prev.title + "</span></a>" : "<span></span>") +
      (next ? '<a class="pager-link next" href="' + next.href + '"><span class="pager-dir">Next →</span><span class="pager-title">' + next.title + "</span></a>" : "<span></span>");
    main.appendChild(nav);
  }

  window.GNav = { getPass, setPass, renderHeader, renderFooter };
  renderHeader();
  renderFooter();
  renderPager();
})();
