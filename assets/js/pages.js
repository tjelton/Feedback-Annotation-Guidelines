/* Page builders: home, general (section 1), and the two classification pages
   (feedback questions / feedback levels) which share one structure. */
(function () {
  "use strict";
  const G = window.G, GUIDE = window.GUIDE;
  const esc = G.esc, inline = G.inline;

  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
  const exKey = (ex, kind) => G.exampleSides(ex, kind).map((s) => norm(G.spansText(s.spans))).join("|");

  function toolbar(kind) {
    return '<div class="toolbar">' +
      '<button class="btn" type="button" data-act="expand">Expand all</button>' +
      '<button class="btn" type="button" data-act="collapse">Collapse all</button>' +
      (kind ? '<button class="btn" type="button" data-act="examples" aria-pressed="' + !examplesShown() + '">' + exToggleLabel(examplesShown()) + "</button>" : "") +
      (kind ? '<a class="btn primary" href="quiz.html?s=' + kind + '">Take the quiz →</a>' : "") +
      "</div>";
  }
  function wireToolbar(root) {
    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      if (b.dataset.act === "examples") {
        const show = !examplesShown();
        setExamplesShown(show);
        document.querySelectorAll("#content details.ex-group").forEach((d) => { d.open = show; });
        b.textContent = exToggleLabel(show);
        b.setAttribute("aria-pressed", String(!show));
        return;
      }
      const open = b.dataset.act === "expand";
      document.querySelectorAll("#content details").forEach((d) => { d.open = open; });
    });
  }
  function tocHtml(items) {
    const li = items.map((i) => '<li class="' + (i.sub ? "toc-sub" : "") + '"><a href="#' + esc(i.id) + '">' + inline(i.label, { nolink: true }) + "</a></li>").join("");
    return '<details open><summary>On this page</summary><ul>' + li + "</ul></details>";
  }
  function finish() {
    if (window.innerWidth <= 900) { const t = document.querySelector(".toc details"); if (t) t.open = false; }
    if (window.GXref) window.GXref.fromHash(false);
  }

  /* ---------------- Home ---------------- */
  function buildHome() {
    const h = GUIDE.home;
    const el = document.getElementById("content");
    const item = (q) => "<li>" + esc(q.q) + ' <span class="arrow" aria-hidden="true">→</span> <span class="span c-' + q.code + '">' + esc(q.name) + "</span></li>";
    const qList = h.questions.map(item).join("");
    const lList = h.levels.map(item).join("");
    const badge = (kind) => {
      const p = window.GNav.getPass(kind);
      return p ? '<span class="badge-pass" title="Passed on ' + esc(p.date) + '">✓ Quiz passed (' + p.score + "/" + p.total + ")</span>" : "";
    };
    const tiles = [
      { n: "1", href: "general.html", title: "General Annotation Principles", text: "Five principles that apply to all annotation: fragment-level coding, independent spans, mutual exclusivity, unrelated text and one purpose per span." },
      { n: "2", href: "questions.html", title: "Feedback Questions", text: "Feed-up, feed-back and feed-forward: main rules, examples, and the rules for telling them apart.", kind: "questions" },
      { n: "3", href: "levels.html", title: "Feedback Levels", text: "Self, task, process and self-regulation: main rules, examples, and the rules for telling them apart.", kind: "levels" },
      { n: "4", href: "specificity.html", title: "Specificity", text: "How specific each idea in a comment is: the ‘Instance’ and ‘What’ questions, coding by idea, and worked examples.", kind: "specificity" }
    ].map((t) => '<div class="card tile' + (t.soon ? " disabled" : "") + '">' +
      '<span class="muted" style="font-weight:600">Section ' + t.n + "</span>" +
      "<h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p>" +
      (t.kind ? badge(t.kind) : "") + (t.soon ? '<span class="badge-soon">Coming soon</span>' : "") +
      '<div class="tile-actions"><a class="btn" href="' + t.href + '">Read</a>' +
      (t.kind ? '<a class="btn primary" href="quiz.html?s=' + t.kind + '">Quiz</a>' : "") + "</div></div>").join("");

    el.innerHTML =
      '<section class="hero"><h1>' + esc(h.title) + "</h1>" +
      h.intro.map((p) => "<p>" + inline(p) + "</p>").join("") +
      '<ul class="qa-list">' + qList + "</ul>" +
      "<p>" + inline(h.questionsNote) + "</p>" +
      "<p>" + inline(h.levelsIntro) + "</p>" +
      '<ul class="qa-list">' + lList + "</ul>" +
      h.after.map((p) => "<p>" + inline(p) + "</p>").join("") + "</section>" +
      '<div class="callout"><strong>Quizzes</strong>To gauge how well you’ve understood sections 2, 3, and 4, please complete the quizzes. Scoring 90% is a good indicator that you have understood the specifications.</div>' +
      '<div class="grid">' + tiles + "</div>" +
      '<section class="card"><h2>Change log</h2><ul>' + h.changeLog.map((c) => "<li><strong>(" + esc(c.date) + ")</strong> – " + inline(c.text) + "</li>").join("") + "</ul></section>";
  }

  /* ---------------- Section 1 ---------------- */
  function buildGeneral() {
    const d = GUIDE.general;
    const el = document.getElementById("content");
    const toc = document.getElementById("toc");
    const cards = d.principles.map((p) =>
      '<section class="card" id="p-' + p.n + '"><h3 style="margin-top:0">Principle ' + p.n + ": " + inline(p.title, { nolink: true }) + "</h3>" +
      G.renderNodes(p.body, {}, { plain: true, kind: "questions", staticExamples: true }) + "</section>").join("");
    el.innerHTML = '<div class="page-head" id="s-1"><div><div class="eyebrow">Section 1</div><h1>' + esc(d.title) + "</h1></div></div>" +
      '<p class="muted">These principles apply to both classifications. Worked examples show the feedback-question coding (font) and, where given, the feedback-level coding (colour).</p>' +
      G.legendHtml("questions").replace('id="legend-questions"', "") + G.legendHtml("levels").replace('id="legend-levels"', "") + cards;
    toc.innerHTML = tocHtml(d.principles.map((p) => ({ id: "p-" + p.n, label: "Principle " + p.n })));
    finish();
  }

  /* ---------------- Classification pages ---------------- */
  function moreExamplesFor(cat, kind, occ, ownKeys) {
    const seen = new Set(ownKeys);
    const res = [];
    occ.forEach((o) => {
      if (o.loc.code === cat.code) return;
      const sides = G.exampleSides(o.ex, kind);
      if (!sides.some((s) => (s.spans || []).some((sp) => sp.c === cat.code))) return;
      const k = exKey(o.ex, kind);
      if (seen.has(k)) return;
      seen.add(k);
      res.push(o);
    });
    return res;
  }

  function excerptExample(o, cat, kind) {
    const loc = o.loc;
    const ctx = loc.area === "rule" ? { section: loc.section } : (loc.code ? { code: loc.code } : {});
    let body = '<div class="excerpt"><div class="crumb">' + esc(G.locLabel(loc)) + "</div>";
    if (loc.area === "rule") body += '<div class="rule-title">Rule ' + esc(loc.ruleKey) + ": " + inline(loc.ruleTitle, ctx) + "</div>";
    if (o.parentText && o.parentText.indexOf("“") !== 0) body += "<p>" + inline(o.parentText, ctx) + "</p>";
    else if (o.parentText) body += '<p class="muted">Given as part of: ' + esc(o.parentText) + "</p>";
    body += '<div class="excerpt-target">' + summaryOnly(o.ex, kind) + "</div>";
    if (o.ex.notes && o.ex.notes.length) body += G.notesHtml(o.ex.notes, ctx, { kind });
    body += "</div>";
    const href = G.hrefFor(G.exId(o.ex.id)) || G.hrefFor(loc.area === "rule" ? G.ruleId(loc.section, loc.ruleKey) : G.secId(loc.section));
    if (href) body += '<a class="goto" href="' + esc(href) + '">Go to ' + esc(G.locShort(loc)) + " in the guidelines →</a>";
    return G.renderExample(o.ex, { kind, bodyHtml: body, noId: true });
  }
  function summaryOnly(ex, kind) {
    if (ex.vs) return ex.vs.map((s) => G.quoteHtml(s.spans) + " " + G.chipsFor(s.spans, s.oneSpan)).join(' <span class="vs">vs</span> ');
    const sp = ex.spans || (ex.codings && ex.codings[kind]);
    return G.quoteHtml(sp) + " " + G.chipsFor(sp, ex.oneSpan);
  }

  /* A list of examples under a main rule, with its own arrow so it can be folded away. */
  function exGroup(titleHtml, bodyHtml, count) {
    const open = examplesShown() ? " open" : "";
    return '<details class="ex-group"' + open + '><summary><span class="ex-group-title">' + titleHtml + '</span><span class="ex-group-count">' + count + "</span></summary>" + bodyHtml + "</details>";
  }
  const EX_KEY = "fag-show-examples";
  function examplesShown() { try { return localStorage.getItem(EX_KEY) !== "0"; } catch (e) { return true; } }
  function setExamplesShown(v) { try { localStorage.setItem(EX_KEY, v ? "1" : "0"); } catch (e) { /* storage unavailable */ } }
  function exToggleLabel(shown) { return shown ? "Hide examples" : "Show examples"; }

  function exList(list, kind, ctx) {
    return '<ul class="ex-list">' + (list || []).map((ex) => "<li>" + G.renderExample(ex, { kind, ctx }) + "</li>").join("") + "</ul>";
  }

  function buildClassification(kind) {
    const d = GUIDE[kind];
    const el = document.getElementById("content");
    const toc = document.getElementById("toc");
    const occ = G.collectExamples(kind);
    const tocItems = [];
    let html = "";

    html += '<div class="page-head" id="s-' + d.sectionNumber + '"><div><div class="eyebrow">Section ' + esc(d.sectionNumber) + "</div><h1>" + esc(d.title) + "</h1></div>" + toolbar(kind) + "</div>";
    html += '<section class="card" id="intro-' + kind + '">' + G.renderNodes(d.intro, {}, { plain: true, kind }) + G.legendHtml(kind) + "</section>";
    tocItems.push({ id: "intro-" + kind, label: "Introduction" });

    d.categories.forEach((cat) => {
      const ctx = { code: cat.code };
      const name = G.CODES[cat.code].name;
      tocItems.push({ id: G.secId(cat.section), label: cat.section + " " + cat.title });
      let c = '<section class="card category" id="' + G.secId(cat.section) + '">';
      c += '<h3><span class="section-num">' + esc(cat.section) + "</span>" + inline(cat.title, { nolink: true }) + " " + G.chip(cat.code) + "</h3>";
      c += G.renderMainRule(cat);
      if (cat.commonExamples) {
        c += '<div class="common-examples"><p>' + inline(cat.commonExamples.intro, ctx) + "</p><ol>" +
          cat.commonExamples.points.map((p) => '<li id="ce-' + p.key + '"><span class="pt-key"><strong>' + esc(p.key) + ")</strong></span><span>" + inline(p.text, ctx) + "</span></li>").join("") + "</ol></div>";
      }
      if (cat.preNote) c += '<p class="muted">' + inline(cat.preNote, ctx) + "</p>";
      c += exGroup('Examples <span class="ex-group-hint">(click an example to see why)</span>', exList(cat.examples, kind, ctx), cat.examples.length);
      (cat.groups || []).forEach((g) => {
        c += exGroup(inline(g.title, ctx), exList(g.examples, kind, ctx), g.examples.length);
      });
      const own = [];
      (cat.examples || []).forEach((ex) => own.push(exKey(ex, kind)));
      const more = moreExamplesFor(cat, kind, occ, own);
      if (more.length) {
        c += '<hr class="more-rule">';
        c += exGroup("More " + esc(name.toLowerCase()) + " examples from elsewhere in the guidelines",
          '<p class="more-hint">These examples come from other parts of the guidelines (mostly the rules for telling categories apart). Click one to see the excerpt it comes from.</p>' +
          '<ul class="ex-list">' + more.map((o) => "<li>" + excerptExample(o, cat, kind) + "</li>").join("") + "</ul>", more.length);
      }
      if (cat.deviations) {
        c += '<details class="panel" id="dev-' + cat.code + '"><summary>' + esc(cat.deviations.title || "Our Deviations from H&T") + '</summary><div class="panel-body">' +
          G.renderNodes(cat.deviations.body, ctx, { kind }) + "</div></details>";
      }
      c += "</section>";
      html += c;
    });

    if (d.distinguish) {
      const dist = d.distinguish;
      html += '<section class="section" id="distinguish-' + kind + '"><h2>Telling them apart</h2>';
      tocItems.push({ id: "distinguish-" + kind, label: "Telling them apart" });
      if (dist.rationale) html += '<div class="callout rationale"><strong>' + esc(dist.rationale.title) + "</strong>" + inline(dist.rationale.text) + "</div>";
      dist.sections.forEach((s) => {
        const ctx = { section: s.section };
        tocItems.push({ id: G.secId(s.section), label: s.section + " " + s.title, sub: true });
        let c = '<div class="distinguish-section" id="' + G.secId(s.section) + '"><h3><span class="section-num">' + esc(s.section) + "</span>" + inline(s.title, { nolink: true }) + "</h3>";
        if (s.intro) c += G.renderNodes(s.intro, ctx, { plain: true, kind });
        (s.rules || []).forEach((r) => {
          c += '<details class="rule" id="' + G.ruleId(s.section, r.key) + '"><summary><span class="rule-key">Rule ' + esc(r.key) + "</span>" + inline(r.title, Object.assign({ nolink: true }, ctx)) + "</summary>" +
            '<div class="rule-body">' + G.renderNodes(r.body, ctx, { kind }) + "</div></details>";
        });
        if (s.other) {
          c += '<details class="panel"><summary>' + esc(s.other.title || "Other examples") + '</summary><div class="panel-body">' + exList(s.other.examples, kind, ctx) + "</div></details>";
        }
        html += c + "</div>";
      });
      html += "</section>";
    }

    (d.notes || []).forEach((n) => {
      tocItems.push({ id: G.secId(n.section), label: n.section + " " + n.title });
      html += '<section class="card" id="' + G.secId(n.section) + '"><h3 style="margin-top:0"><span class="section-num">' + esc(n.section) + "</span>" + esc(n.title) + "</h3>" +
        G.renderNodes(n.body, {}, { plain: true, kind }) + "</section>";
    });

    const label = kind === "questions" ? "Feedback Questions" : "Feedback Levels";
    html += '<section class="card" id="quiz-cta"><h3 style="margin-top:0">Ready to test yourself?</h3><p>The ' + label + " quiz asks 20 questions drawn from every example in this section and Section 1. You need 90% (18/20) to pass. When you get one wrong, it links you to the part of the guidelines to revise.</p>" +
      '<a class="btn primary" href="quiz.html?s=' + kind + '">Start the ' + label + " quiz →</a></section>";
    tocItems.push({ id: "quiz-cta", label: "Quiz" });

    el.innerHTML = html;
    toc.innerHTML = tocHtml(tocItems);
    wireToolbar(el);
    finish();
  }

  /* ---------------- Section 4: Specificity ---------------- */
  function specMainRule(r) {
    let h = '<div class="main-rule" id="rule-spec"><h4>' + esc(r.title) + "</h4>";
    h += "<p>" + inline(r.intro) + "</p>";
    h += "<ol>" + r.questions.map((q) => '<li id="' + esc(q.id) + '"><span class="pt-key">' + esc(q.key) + '.</span><span><strong>' + esc(q.label) + "</strong> " + inline(q.text) + "</span></li>").join("") + "</ol>";
    h += '<table class="spec-table"><thead><tr><th scope="col">Instance question</th><th scope="col">What question</th><th scope="col">Code</th></tr></thead><tbody>' +
      r.table.map((row) => "<tr><td>" + esc(row[0]) + "</td><td>" + esc(row[1]) + "</td><td>" + G.specChip(row[2]) +
        (row[2] === "none" ? ' <span class="muted">(leave blank)</span>' : "") + "</td></tr>").join("") + "</tbody></table>";
    if (r.after) h += "<p>" + inline(r.after) + "</p>";
    return h + "</div>";
  }

  function specBlocks(blocks, ctx) {
    return (blocks || []).map((b) => {
      if (b.p) return "<p>" + inline(b.p, ctx) + "</p>";
      if (b.heading) return '<h4 class="spec-subhead">' + inline(b.heading, ctx) + "</h4>";
      if (b.list) return G.renderNodes(b.list, ctx, {});
      if (b.ol) return '<ol class="spec-points">' + b.ol.map((pt) => '<li id="pt-' + ctx.section.replace(".", "-") + "-" + pt.key + '"><span class="pt-key">' + esc(pt.key) + ")</span><span>" +
        inline(pt.text, ctx) + G.renderNodes(pt.sub, ctx, { parentText: pt.text }) + "</span></li>").join("") + "</ol>";
      if (b.callout) return '<div class="callout"><strong>' + esc(b.callout.title) + "</strong>" + inline(b.callout.text, ctx) + "</div>";
      if (b.box) return '<div class="spec-box"><p>' + inline(b.box.text, ctx) + "</p>" + G.renderNodes(b.box.list, ctx, {}) + "</div>";
      if (b.rules) return b.rules.map((r) => '<details class="rule" id="' + G.ruleId(ctx.section, r.key) + '"><summary><span class="rule-key">' + esc(r.key) + ")</span>" +
        inline(r.title, Object.assign({ nolink: true }, ctx)) + '</summary><div class="rule-body">' + G.renderNodes(r.body, ctx, {}) + "</div></details>").join("");
      if (b.examples) {
        const list = '<ul class="ex-list">' + b.examples.items.map((n) => "<li>" + G.renderSpecExample(n.sx, { ctx }) + "</li>").join("") + "</ul>";
        return exGroup(inline(b.examples.title, { nolink: true }), list + (b.examples.after ? '<p class="spec-after">' + inline(b.examples.after, ctx) + "</p>" : ""), b.examples.items.length);
      }
      if (b.compare) {
        const list = '<ul class="ex-list">' + b.compare.items.map((it) => "<li>" + G.renderSpecCompare(it, ctx) + "</li>").join("") + "</ul>";
        return exGroup(inline(b.compare.title, { nolink: true }) + ' <span class="ex-group-hint">(click one to see why)</span>', list, b.compare.items.length);
      }
      if (b.refs) return '<ul class="refs">' + b.refs.map((r) => "<li>" + inline(r.text, { nolink: true }) +
        (r.url ? ' <a href="' + esc(r.url) + '" rel="noopener">' + esc(r.url) + "</a>" : "") + "</li>").join("") + "</ul>";
      return "";
    }).join("");
  }

  function buildSpecificity() {
    const d = GUIDE.specificity;
    const el = document.getElementById("content");
    const toc = document.getElementById("toc");
    const tocItems = [{ id: "intro-specificity", label: "Introduction" }];
    let html = '<div class="page-head" id="s-4"><div><div class="eyebrow">Section 4</div><h1>' + esc(d.title) + "</h1></div>" + toolbar("specificity") + "</div>";
    html += '<section class="card" id="intro-specificity"><p>' + inline(d.intro) + "</p>" + specMainRule(d.mainRule) +
      (d.afterRule ? "<p>" + inline(d.afterRule) + "</p>" : "") + "</section>";
    d.sections.forEach((s) => {
      const id = G.specSectionId(s);
      const ctx = { section: s.section };
      tocItems.push({ id, label: (s.unnumbered ? "" : s.section + " ") + s.title, sub: !!s.unnumbered });
      html += '<section class="card spec-section" id="' + id + '"><h3>' + (s.unnumbered ? "" : '<span class="section-num">' + esc(s.section) + "</span>") +
        inline(s.title, { nolink: true }) + "</h3>" + specBlocks(s.blocks, ctx) + "</section>";
    });
    html += '<section class="card" id="quiz-cta"><h3 style="margin-top:0">Ready to test yourself?</h3><p>The Specificity quiz asks 20 questions drawn from every example in this section. You need 90% (18/20) to pass. When you get one wrong, it links you to the part of the guidelines to revise.</p>' +
      '<a class="btn primary" href="quiz.html?s=specificity">Start the Specificity quiz →</a></section>';
    tocItems.push({ id: "quiz-cta", label: "Quiz" });
    el.innerHTML = html;
    toc.innerHTML = tocHtml(tocItems);
    wireToolbar(el);
    finish();
  }

  window.GPages = { buildHome, buildGeneral, buildClassification, buildSpecificity };
})();
