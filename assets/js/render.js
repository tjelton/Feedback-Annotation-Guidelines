/* ==========================================================================
   Shared rendering helpers.  Exposes window.G.
   - inline markup:  [[FU:text]]  {{key|label}}  **bold**  *italic*  __underline__
   - automatic cross-reference links ("2.4 rule d", "FT point a", ...)
   - examples, nodes, main rules, coding chips
   - an anchor registry so any page can link to anything on any page
   ========================================================================== */
(function () {
  "use strict";
  const GUIDE = window.GUIDE || {};

  const CODES = {
    FU: { name: "Feed-up", kind: "questions" },
    FB: { name: "Feed-back", kind: "questions" },
    FF: { name: "Feed-forward", kind: "questions" },
    FS: { name: "Self-level", short: "Self", kind: "levels" },
    FT: { name: "Task-level", short: "Task", kind: "levels" },
    FP: { name: "Process-level", short: "Process", kind: "levels" },
    FR: { name: "Self-regulation-level", short: "Self-regulation", kind: "levels" }
  };
  const KIND_CODES = { questions: ["FU", "FB", "FF"], levels: ["FS", "FT", "FP", "FR"] };
  const PAGES = { general: "general.html", questions: "questions.html", levels: "levels.html", specificity: "specificity.html" };
  const SECTION_PAGE = { "1": "general.html", "2": "questions.html", "3": "levels.html", "4": "specificity.html" };

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const secId = (sec) => "s-" + String(sec).replace(/\./g, "-");
  const ruleId = (sec, key) => "r-" + String(sec).replace(/\./g, "-") + "-" + key;
  const exId = (id) => "ex-" + id;
  const codeName = (c) => (c && CODES[c] ? CODES[c].name : "No annotation");
  const currentPage = () => {
    const p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  };

  /* ------------------------------------------------------------------
     Anchor registry: anchor id -> page
     ------------------------------------------------------------------ */
  const anchors = new Map();
  function reg(id, page) { if (!anchors.has(id)) anchors.set(id, page); }

  function forEachNode(nodes, fn, parentText) {
    (nodes || []).forEach((n) => {
      if (n == null) return;
      if (typeof n === "string") return;
      if (n.ex) {
        fn(n.ex, parentText);
        forEachNode(n.ex.notes, fn, quoteText(n.ex));
        return;
      }
      if (n.sub) forEachNode(n.sub, fn, n.text || parentText);
    });
  }

  function exampleSides(ex, kind) {
    if (ex.vs) return ex.vs.map((s) => ({ spans: s.spans, oneSpan: !!s.oneSpan }));
    if (ex.codings) return ex.codings[kind] ? [{ spans: ex.codings[kind], oneSpan: !!ex.oneSpan }] : [];
    return ex.spans ? [{ spans: ex.spans, oneSpan: !!ex.oneSpan }] : [];
  }
  function spansText(spans) { return (spans || []).map((s) => s.t).join(""); }
  function quoteText(ex) {
    if (ex.vs) return ex.vs.map((s) => "“" + spansText(s.spans).trim() + "”").join(" vs ");
    const sp = ex.spans || (ex.codings && (ex.codings.questions || ex.codings.levels));
    return "“" + spansText(sp).trim() + "”";
  }

  /* Walk every example of a classification (plus Section 1 examples that carry a
     coding of that kind) and report where it lives. */
  function collectExamples(kind) {
    const out = [];
    const data = GUIDE[kind];
    const page = PAGES[kind];
    if (data) {
      (data.categories || []).forEach((cat) => {
        const base = { page, section: cat.section, sectionTitle: cat.title, code: cat.code };
        const walkList = (list, area, extra) => (list || []).forEach((ex) => {
          out.push({ ex, loc: Object.assign({ area }, base, extra || {}), parentText: null });
          forEachNode(ex.notes, (sub, pt) => out.push({ ex: sub, loc: Object.assign({ area }, base, extra || {}), parentText: pt }), quoteText(ex));
        });
        walkList(cat.examples, "category");
        (cat.groups || []).forEach((g) => walkList(g.examples, "group", { groupTitle: g.title }));
        if (cat.deviations) forEachNode(cat.deviations.body, (ex, pt) =>
          out.push({ ex, loc: Object.assign({ area: "deviation", groupTitle: cat.deviations.title || "Our Deviations from H&T" }, base), parentText: pt }));
      });
      ((data.distinguish && data.distinguish.sections) || []).forEach((sec) => {
        const base = { page, section: sec.section, sectionTitle: sec.title };
        forEachNode(sec.intro, (ex, pt) => out.push({ ex, loc: Object.assign({ area: "intro" }, base), parentText: pt }));
        (sec.rules || []).forEach((r) => forEachNode(r.body, (ex, pt) =>
          out.push({ ex, loc: Object.assign({ area: "rule", ruleKey: r.key, ruleTitle: r.title }, base), parentText: pt })));
        if (sec.other) (sec.other.examples || []).forEach((ex) => {
          out.push({ ex, loc: Object.assign({ area: "other", groupTitle: sec.other.title || "Other examples" }, base), parentText: null });
          forEachNode(ex.notes, (sub, pt) => out.push({ ex: sub, loc: Object.assign({ area: "other", groupTitle: sec.other.title || "Other examples" }, base), parentText: pt }), quoteText(ex));
        });
      });
      (data.notes || []).forEach((n) => forEachNode(n.body, (ex, pt) =>
        out.push({ ex, loc: { area: "note", page, section: n.section, sectionTitle: n.title }, parentText: pt })));
    }
    if (GUIDE.general) {
      GUIDE.general.principles.forEach((p) => forEachNode(p.body, (ex, pt) => {
        if (ex.codings && ex.codings[kind]) out.push({ ex, loc: { area: "principle", page: PAGES.general, section: "1", principle: p.n, sectionTitle: "Principle " + p.n + ": " + p.title }, parentText: pt });
      }));
    }
    return out;
  }

  function locLabel(loc) {
    switch (loc.area) {
      case "category": return loc.section + " " + loc.sectionTitle + " › Examples";
      case "group":
      case "deviation": return (loc.unnumbered ? "" : loc.section + " ") + loc.sectionTitle + " › " + loc.groupTitle;
      case "rule": return loc.section + " " + loc.sectionTitle + " › Rule " + loc.ruleKey;
      case "other": return loc.section + " " + loc.sectionTitle + " › " + loc.groupTitle;
      case "intro": return loc.section + " " + loc.sectionTitle;
      case "note": return loc.section + " " + loc.sectionTitle;
      case "principle": return "Section 1 › Principle " + loc.principle;
      default: return loc.section || "";
    }
  }
  function locShort(loc) {
    switch (loc.area) {
      case "rule": return loc.section + " rule " + loc.ruleKey;
      case "principle": return "Section 1 Principle " + loc.principle;
      default: return loc.section + " " + loc.sectionTitle;
    }
  }

  function buildRegistry() {
    reg("s-1", PAGES.general); reg("s-2", PAGES.questions); reg("s-3", PAGES.levels); reg("s-4", PAGES.specificity);
    if (GUIDE.general) GUIDE.general.principles.forEach((p) => {
      reg("p-" + p.n, PAGES.general);
      forEachNode(p.body, (ex) => reg(exId(ex.id), PAGES.general));
    });
    ["questions", "levels"].forEach((kind) => {
      const d = GUIDE[kind]; if (!d) return;
      const page = PAGES[kind];
      reg("legend-" + kind, page);
      d.categories.forEach((cat) => {
        reg(secId(cat.section), page);
        reg("rule-" + cat.code, page);
        (cat.mainRule.points || []).forEach((p) => reg("pt-" + cat.code + "-" + p.key, page));
        (cat.mainRule.questions || []).forEach((q) => reg("pt-" + cat.code + "-" + q.key, page));
        if (cat.commonExamples) cat.commonExamples.points.forEach((p) => reg("ce-" + p.key, page));
        if (cat.deviations) reg("dev-" + cat.code, page);
      });
      if (d.distinguish) {
        reg("distinguish-" + kind, page);
        d.distinguish.sections.forEach((s) => {
          reg(secId(s.section), page);
          (s.rules || []).forEach((r) => reg(ruleId(s.section, r.key), page));
        });
      }
      (d.notes || []).forEach((n) => reg(secId(n.section), page));
      collectExamples(kind).forEach(({ ex, loc }) => { if (loc.area !== "principle") reg(exId(ex.id), page); });
    });
    registerSpec();
  }

  function hrefFor(anchor) {
    const page = anchors.get(anchor);
    if (!page) return null;
    return (page === currentPage() ? "" : page) + "#" + anchor;
  }

  function resolveKey(key) {
    key = key.trim();
    let m;
    if ((m = key.match(/^ex:(.+)$/))) return exId(m[1]);
    if ((m = key.match(/^P(\d)$/))) return "p-" + m[1];
    if ((m = key.match(/^(FU|FB|FF|FS|FT|FP|FR)\.ce\.([a-f])$/))) return "ce-" + m[2];
    if ((m = key.match(/^(FU|FB|FF|FS|FT|FP|FR)\.([a-f1-9])$/))) return "pt-" + m[1] + "-" + m[2];
    if ((m = key.match(/^(FU|FB|FF|FS|FT|FP|FR)$/))) return "rule-" + m[1];
    if ((m = key.match(/^(\d)\.(\d)([a-i])$/))) return ruleId(m[1] + "." + m[2], m[3]);
    if ((m = key.match(/^(\d)\.(\d)$/))) return secId(m[1] + "." + m[2]);
    if ((m = key.match(/^(\d)$/))) return "s-" + m[1];
    if (key.startsWith("#")) return key.slice(1);
    return key;
  }

  /* ------------------------------------------------------------------
     Inline markup + auto-linking
     ------------------------------------------------------------------ */
  const TOKEN_SRC = String.raw`\[\[(FU|FB|FF|FS|FT|FP|FR|NONE):([\s\S]*?)\]\]|\{\{([^|}]+)\|([^}]*)\}\}|\*\*([\s\S]+?)\*\*|__(?=\S)([\s\S]+?)__|\*(?=[^*\s])([^*]+?)\*`;

  const AUTO_SRC = [
    String.raw`(?<A>\b(?<Asec>[1-4]\.[1-8])\s+rules?\s+(?<Akey>[a-i])\b)`,
    String.raw`(?<B>\b(?<Bcode>FU|FB|FF|FS|FT|FP|FR)\s+(?<Bpar>\()?(?<Bkind>point|rule|case)\s+(?<Bkey>[a-f])\b(?<Bclose>\))?)`,
    String.raw`(?<C>\bSection 1,? Principle (?<Cn>[1-5]))`,
    String.raw`(?<E>\bcommon (?:FR )?example (?<Ekey>[a-f])\b)`,
    String.raw`(?<F>\b(?<Fq>Q[12]) (?:from|of) (?:the )?FR definition|\bFR question (?<Fn>[12])\b)`,
    String.raw`(?<D>\b[Ss]ections? (?<Dsec>[1-4](?:\.[1-8])?)(?![\d.]))`,
    String.raw`(?<G>\bpoints? (?<Gkey>[a-f])\b)`,
    String.raw`(?<H>\brules? (?<Hkey>[a-i])\b)`,
    String.raw`(?<J>(?<![\d.\w])(?<Jsec>[1-4]\.[1-8])(?![\d]))`
  ].join("|");

  const unresolved = [];
  function link(anchor, html, soft) {
    const href = hrefFor(anchor);
    if (!href) { if (!soft) unresolved.push(anchor); return null; }
    return '<a class="xref" href="' + esc(href) + '">' + html + "</a>";
  }

  function autolink(text, ctx) {
    if (ctx && ctx.nolink) return esc(text);
    const re = new RegExp(AUTO_SRC, "g");
    let out = "", last = 0, m;
    while ((m = re.exec(text))) {
      const g = m.groups;
      let anchor = null, linkText = m[0], pre = "", post = "";
      if (g.A) anchor = ruleId(g.Asec, g.Akey);
      else if (g.B) {
        const code = g.Bcode;
        if (g.Bkind === "rule" && g.Bpar && ctx && ctx.section) anchor = ruleId(ctx.section, g.Bkey); // "FU (rule d)" = this section's rule d
        else anchor = (g.Bkind === "case" || code === "FR") ? "ce-" + g.Bkey : "pt-" + code + "-" + g.Bkey;
        if (g.Bclose && !g.Bpar) { linkText = linkText.slice(0, -1); post = ")"; }
      } else if (g.C) anchor = "p-" + g.Cn;
      else if (g.E) anchor = "ce-" + g.Ekey;
      else if (g.F) anchor = "pt-FR-" + (g.Fq ? g.Fq.slice(1) : g.Fn);
      else if (g.D) anchor = "s-" + g.Dsec.replace(".", "-");
      else if (g.G) anchor = ctx && ctx.code ? "pt-" + ctx.code + "-" + g.Gkey : null;
      else if (g.H) anchor = ctx && ctx.section ? ruleId(ctx.section, g.Hkey) : null;
      else if (g.J) anchor = secId(g.Jsec);
      const a = anchor ? link(anchor, esc(linkText), !!g.J) : null;
      out += esc(text.slice(last, m.index)) + pre + (a || esc(linkText)) + post;
      last = m.index + m[0].length;
    }
    return out + esc(text.slice(last));
  }

  function inline(str, ctx) {
    ctx = ctx || {};
    str = String(str == null ? "" : str);
    let out = "", last = 0;
    for (const m of str.matchAll(new RegExp(TOKEN_SRC, "g"))) {
      out += autolink(str.slice(last, m.index), ctx);
      if (m[1]) {
        const c = m[1] === "NONE" ? null : m[1];
        out += '<span class="span c-' + (c || "none") + '" title="' + esc(codeName(c)) + '">' + inline(m[2], Object.assign({}, ctx, { nolink: true })) + "</span>";
      } else if (m[3]) {
        const inner = inline(m[4], Object.assign({}, ctx, { nolink: true }));
        out += link(resolveKey(m[3]), inner) || inner;
      } else if (m[5]) out += "<strong>" + inline(m[5], ctx) + "</strong>";
      else if (m[6] && /^(TASK|SELF|PROCESS|SELF-REGULATION|BOTH)$/.test(m[6])) out += '<strong class="verdict">' + esc(m[6]) + "</strong>";
      else if (m[6]) out += "<u>" + inline(m[6], ctx) + "</u>";
      else if (m[7]) out += "<em>" + inline(m[7], ctx) + "</em>";
      last = m.index + m[0].length;
    }
    return out + autolink(str.slice(last), ctx);
  }

  /* ------------------------------------------------------------------
     Spans, chips, examples, nodes
     ------------------------------------------------------------------ */
  function renderSpans(spans) {
    return (spans || []).map((s, i) => {
      const c = s.c || null;
      const sep = i > 0 ? '<span class="span-sep" aria-hidden="true" title="span boundary">|</span>' : "";
      return sep + '<span class="span c-' + (c || "none") + '" title="' + esc(codeName(c)) + '">' + esc(s.t) + "</span>";
    }).join("");
  }
  function chip(c) {
    return '<span class="chip c-' + (c || "none") + '" title="' + esc(codeName(c)) + '">' + (c || "No annotation") + "</span>";
  }
  function chipsFor(spans, oneSpan) {
    const list = (spans || []).map((s) => chip(s.c || null)).join('<span class="chip-sep">|</span>');
    return list + (oneSpan ? ' <span class="muted" style="font-size:.74rem">(one span)</span>' : "");
  }
  function quoteHtml(spans) {
    const sp = (spans || []).slice();
    return "“" + renderSpans(trimSpans(sp)) + "”";
  }
  function trimSpans(sp) {
    if (!sp.length) return sp;
    sp = sp.map((s) => Object.assign({}, s));
    sp[0].t = sp[0].t.replace(/^\s+/, "");
    sp[sp.length - 1].t = sp[sp.length - 1].t.replace(/\s+$/, "");
    sp.forEach((s, i) => { if (i > 0) s.t = s.t.replace(/^\s+/, ""); if (i < sp.length - 1) s.t = s.t.replace(/\s+$/, ""); });
    return sp;
  }

  function summaryLine(ex, kind) {
    if (ex.vs) {
      const q = ex.vs.map((s) => '<span class="ex-quote-part">' + quoteHtml(s.spans) + "</span>").join('<span class="vs">vs</span>');
      const chips = ex.vs.map((s) => chipsFor(s.spans, s.oneSpan)).join('<span class="vs">vs</span>');
      return '<div class="ex-line"><span class="ex-quote">' + q + '</span><span class="ex-codes">' + chips + "</span></div>";
    }
    let spans = ex.spans;
    if (!spans && ex.codings) spans = ex.codings[kind] || ex.codings.questions || ex.codings.levels;
    return '<div class="ex-line"><span class="ex-quote">' + quoteHtml(spans) + '</span><span class="ex-codes">' + chipsFor(spans, ex.oneSpan) + "</span></div>";
  }

  /* opts: {kind, ctx, idPrefix, bodyHtml, open} */
  function renderExample(ex, opts) {
    opts = opts || {};
    const ctx = opts.ctx || {};
    const id = opts.noId ? "" : ' id="' + esc((opts.idPrefix || "") + exId(ex.id)) + '"';
    let body = opts.bodyHtml;
    if (body == null) {
      body = "";
      if (ex.codings) {
        const lines = [];
        if (ex.codings.questions) lines.push('<p><strong>Feedback questions:</strong> ' + quoteHtml(ex.codings.questions) + " " + chipsFor(ex.codings.questions) + "</p>");
        if (ex.codings.levels) lines.push('<p><strong>Feedback levels:</strong> ' + quoteHtml(ex.codings.levels) + " " + chipsFor(ex.codings.levels) + "</p>");
        body += lines.join("");
      }
      if (ex.notes && ex.notes.length && !onlyRestatesCode(ex.notes)) body += notesHtml(ex.notes, ctx, opts);
    }
    if (opts.static) {
      // Always-open example (used where the text defines concepts, e.g. Section 1).
      const head = ex.codings ? "" : '<div class="ex-static-head">' + summaryLine(ex, opts.kind) + "</div>";
      return '<div class="example example-open"' + id + ">" + head + (body ? '<div class="ex-body">' + body + "</div>" : "") + "</div>";
    }
    const summary = summaryLine(ex, opts.kind);
    if (!body) return '<div class="example example-static"' + id + ">" + '<div style="padding:8px 12px">' + summary + "</div></div>";
    return '<details class="example"' + id + (opts.open ? " open" : "") + "><summary>" + summary + '</summary><div class="ex-body">' + body + "</div></details>";
  }

  /* Explanations under an example read as short paragraphs. Bullets are kept
     only when the explanation has its own sub-points or nested examples. */
  function notesHtml(notes, ctx, opts) {
    if (notes.every((n) => typeof n === "string")) {
      return notes.map((n) => '<p class="ex-note">' + inline(noteText(n), ctx) + "</p>").join("");
    }
    return renderNodes(notes, ctx, { kind: opts.kind, staticExamples: opts.static });
  }

  /* Notes such as "→ FF." or "→ FF | FU." only repeat the code already shown
     by the chips, so the example is shown as a plain line, not a drop-down.
     (The quiz still shows these notes.) */
  const CODE_ONLY = /^\s*(?:→\s*)?(?:one\s+)?(?:FU|FB|FF|FS|FT|FP|FR)(?:\s*\|\s*(?:FU|FB|FF|FS|FT|FP|FR))*(?:\s+spans?)?\s*\.?\s*$/;
  function onlyRestatesCode(notes) {
    return notes.every((n) => typeof n === "string" && CODE_ONLY.test(n));
  }

  /* In the Word doc a leading "→" separated an example from its verdict.
     On the web the note already sits under its example, so the arrow is dropped. */
  function noteText(s) {
    const t = String(s).replace(/^\s*→\s*/, "");
    return t === String(s) ? t : t.charAt(0).toUpperCase() + t.slice(1);
  }

  /* opts: {plain, kind, parentText, staticExamples} */
  function renderNodes(nodes, ctx, opts) {
    opts = opts || {};
    if (!nodes || !nodes.length) return "";
    const items = nodes.map((n) => {
      if (n == null) return "";
      if (typeof n === "string") return "<li>" + inline(noteText(n), ctx) + "</li>";
      if (n.diagram === "ramaprasad") return '<li class="diagram-li">' + diagramHtml() + "</li>";
      if (n.heading) return '<li class="subhead">' + inline(n.text, ctx) + "</li>";
      if (n.sx) {
        if (isSpecEcho(n.sx, opts.parentText)) return "";
        return '<li class="ex-li">' + renderSpecExample(n.sx, { ctx }) + "</li>";
      }
      if (n.ex) {
        if (isEchoOfParent(n.ex, opts.parentText)) return "";
        return '<li class="ex-li">' + renderExample(n.ex, { kind: opts.kind, ctx, static: opts.staticExamples }) + "</li>";
      }
      let html = "";
      if (n.label) html += '<span class="node-label">' + inline(n.label, ctx) + ":</span> ";
      if (n.text) html += inline(noteText(n.text), ctx);
      if (n.sub && n.sub.length) html += renderNodes(n.sub, ctx, { kind: opts.kind, parentText: n.text, staticExamples: opts.staticExamples });
      return "<li>" + html + "</li>";
    }).join("");
    return '<ul class="nodes' + (opts.plain ? " plain" : "") + '">' + items + "</ul>";
  }

  /* An example with no notes whose words already appear (coded inline) in the
     bullet that introduces it adds nothing visually, so the rule view skips it.
     It is still collected for the quiz and the "more examples" lists. */
  const normText = (s) => String(s || "").toLowerCase().replace(/\[\[[a-z]+:/g, "").replace(/[^a-z0-9]+/g, "");
  function isEchoOfParent(ex, parentText) {
    if (!parentText || (ex.notes && ex.notes.length)) return false;
    const p = normText(parentText);
    const sides = ex.vs ? ex.vs.map((v) => v.spans) : [ex.spans || (ex.codings && (ex.codings.questions || ex.codings.levels))];
    return sides.every((sp) => { const t = normText(spansText(sp)); return t.length > 0 && p.includes(t); });
  }

  /* ------------------------------------------------------------------
     Section 4 (specificity)
     ------------------------------------------------------------------ */
  const SPEC_CODES = {
    none: "None", instance: "Instance", what: "What", both: "Both", notcoded: "Not coded"
  };
  const SPEC_ORDER = ["none", "instance", "what", "both"];
  function specChip(code) {
    const name = SPEC_CODES[code] || "None";
    return '<span class="chip s-' + esc(code || "none") + '" title="Specificity: ' + esc(name) + '">' + esc(name) + "</span>";
  }
  function specIdeas(sx) { return sx.ideas || [{ t: sx.t, lv: sx.lv || null, code: sx.code || null }]; }
  function specText(sx) { return specIdeas(sx).map((d) => d.t).join("").trim(); }
  function specQuote(sx) {
    const ideas = specIdeas(sx);
    return "“" + ideas.map((d, i) =>
      (i ? '<span class="span-sep" aria-hidden="true" title="idea boundary">|</span>' : "") +
      '<span class="span' + (d.lv ? " c-" + d.lv : "") + '">' + esc(d.t.trim()) + "</span>").join("") + "”";
  }
  function specChips(sx) {
    const ideas = specIdeas(sx);
    if (!ideas.every((d) => d.code)) return "";
    return ideas.map((d) => specChip(d.code)).join('<span class="chip-sep">|</span>') +
      (sx.oneIdea ? ' <span class="muted" style="font-size:.74rem">(one idea)</span>' : "");
  }
  function specSummary(sx) {
    return '<div class="ex-line"><span class="ex-quote">' + specQuote(sx) + '</span><span class="ex-codes">' + specChips(sx) + "</span></div>";
  }
  /* A sentence quoted inside a bullet adds nothing when the bullet already shows it. */
  function isSpecEcho(sx, parentText) {
    if (!parentText || (sx.notes && sx.notes.length)) return false;
    const t = normText(specText(sx));
    return t.length > 0 && normText(parentText).includes(t);
  }
  function renderSpecExample(sx, opts) {
    opts = opts || {};
    const id = ' id="' + esc(exId(sx.id)) + '"';
    const body = sx.notes && sx.notes.length ? notesHtml(sx.notes, opts.ctx || {}, {}) : "";
    if (!body) return '<div class="example example-static"' + id + '><div style="padding:6px 12px">' + specSummary(sx) + "</div></div>";
    return '<details class="example"' + id + "><summary>" + specSummary(sx) + '</summary><div class="ex-body">' + body + "</div></details>";
  }
  /* "Sentence 1 vs Sentence 2" comparisons (4.2). */
  function renderSpecCompare(item, ctx) {
    const quotes = item.pair.map((p) => '<span class="ex-quote-part">“' + esc(p.t) + "”</span>").join('<span class="vs">vs</span>');
    const body = '<p class="ex-note"><strong>' + inline(item.title, ctx) + "</strong></p>" +
      item.pair.map((p, i) => '<p class="ex-note"><strong>' + (i ? "vs Sentence 2" : "Sentence 1") + ":</strong> “" + esc(p.t) + "”</p>" +
        '<p class="ex-note cmp-note">' + inline(p.note, ctx) + "</p>").join("");
    return '<details class="example" id="' + esc(exId(item.id)) + '"><summary><div class="ex-line"><span class="ex-quote">' + quotes + "</span></div></summary>" +
      '<div class="ex-body">' + body + "</div></details>";
  }

  /* Walk Section 4 and report every quoted sentence with where it lives. */
  function specSectionId(s) { return s.id || secId(s.section); }
  function collectSpec() {
    const out = [];
    const d = GUIDE.specificity;
    if (!d) return out;
    const page = PAGES.specificity;
    const walk = (nodes, loc, parentText) => (nodes || []).forEach((n) => {
      if (n == null || typeof n === "string") return;
      if (n.sx) { out.push({ sx: n.sx, loc, parentText }); return; }
      if (n.sub) walk(n.sub, loc, n.text || parentText);
    });
    d.sections.forEach((s) => {
      const base = { page, section: s.section, sectionTitle: s.title, anchor: specSectionId(s), unnumbered: !!s.unnumbered };
      (s.blocks || []).forEach((b) => {
        if (b.list) walk(b.list, Object.assign({ area: "intro" }, base), null);
        if (b.ol) b.ol.forEach((p) => walk(p.sub, Object.assign({ area: "intro" }, base), p.text));
        if (b.rules) b.rules.forEach((r) => walk(r.body, Object.assign({ area: "rule", ruleKey: r.key, ruleTitle: r.title }, base), null));
        if (b.examples) walk(b.examples.items, Object.assign({ area: "group", groupTitle: b.examples.title }, base), null);
        if (b.compare) b.compare.items.forEach((item) => item.pair.forEach((p, i) => out.push({
          sx: { id: item.id + "-" + (i + 1), anchorId: item.id, t: p.t, what: p.what, notes: [p.note] },
          loc: Object.assign({ area: "group", groupTitle: b.compare.title, compare: true }, base), parentText: item.title
        })));
      });
    });
    return out;
  }
  function registerSpec() {
    const d = GUIDE.specificity;
    if (!d) return;
    const page = PAGES.specificity;
    reg("rule-spec", page);
    d.mainRule.questions.forEach((q) => reg(q.id, page));
    d.sections.forEach((s) => {
      reg(specSectionId(s), page);
      (s.blocks || []).forEach((b) => {
        if (b.ol) b.ol.forEach((p) => reg("pt-" + s.section.replace(".", "-") + "-" + p.key, page));
        if (b.rules) b.rules.forEach((r) => reg(ruleId(s.section, r.key), page));
        if (b.compare) b.compare.items.forEach((item) => reg(exId(item.id), page));
      });
    });
    collectSpec().forEach(({ sx }) => { if (!sx.anchorId) reg(exId(sx.id), page); });
  }

  function diagramHtml() {
    return '<div class="diagram" role="img" aria-label="Feed-back, then an arrow labelled feed-forward, pointing to feed-up">' +
      '<span class="oval">Feed-back</span><span class="arrow-box">Feed-forward</span><span class="oval">Feed-up</span></div>';
  }

  function legendHtml(kind) {
    const codes = KIND_CODES[kind];
    const title = kind === "questions" ? "Font coding used for feedback questions" : "Colour coding used for feedback levels";
    return '<div class="legend" id="legend-' + kind + '"><strong>' + title + "</strong>" +
      codes.map((c) => '<span class="legend-item">' + chip(c) + ' <span class="span c-' + c + '">' + esc(CODES[c].name) + "</span></span>").join("") +
      "</div>";
  }

  function renderMainRule(cat) {
    const r = cat.mainRule;
    let html = '<div class="main-rule" id="rule-' + cat.code + '"><h4>' + esc(r.title) + "</h4>";
    if (r.intro) html += "<p>" + inline(r.intro, { code: cat.code }) + "</p>";
    if (r.points) {
      html += "<ol>" + r.points.map((p) => '<li id="pt-' + cat.code + "-" + p.key + '"><span class="pt-key">' + esc(p.key) + ")</span><span>" + inline(p.text, { code: cat.code }) + "</span></li>").join("") + "</ol>";
    }
    if (r.questions) {
      html += "<ol>" + r.questions.map((q) => '<li id="pt-' + cat.code + "-" + q.key + '"><span class="pt-key">' + esc(q.key) + '.</span><span><span class="q-title">' + inline(q.title, { code: cat.code }) + "</span>" + renderNodes(q.sub, { code: cat.code }) + "</span></li>").join("") + "</ol>";
    }
    if (r.after) html += renderNodes(r.after, { code: cat.code }, { plain: true });
    return html + "</div>";
  }

  window.G = {
    CODES, KIND_CODES, PAGES, SECTION_PAGE, esc, inline, autolink, renderSpans, renderExample, renderNodes, renderMainRule,
    legendHtml, chip, chipsFor, quoteHtml, collectExamples, exampleSides, spansText, quoteText, locLabel, locShort,
    SPEC_CODES, SPEC_ORDER, specChip, specChips, specQuote, specText, specIdeas, renderSpecExample, renderSpecCompare, collectSpec, specSectionId,
    anchors, unresolved, noteText, notesHtml, hrefFor, resolveKey, buildRegistry, secId, ruleId, exId, codeName, currentPage, diagramHtml, forEachNode
  };
  buildRegistry();
})();
