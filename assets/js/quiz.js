/* Quiz engine.  The question bank is built automatically from every example
   in the guidelines (the classification's own section plus Section 1), so
   the quiz always matches the current guideline content. */
(function () {
  "use strict";
  const G = window.G, esc = G.esc;
  const QUIZ_LENGTH = 20;
  const PASS_RATE = 0.9;
  const N_SEG = 5, N_COUNT = 2;
  /* Difficulty mix per attempt: at most EASY_SHARE of the questions are easy,
     and at least HARD_SHARE are hard (if the bank has enough of them). */
  const EASY_SHARE = 0.15, HARD_SHARE = 0.6;
  const ATTEMPTS_KEY = "fag-quiz-attempts";
  const PROGRESS_KEY = (kind) => "fag-quiz-progress-" + kind;
  const KIND_LABEL = { questions: "Feedback Questions", levels: "Feedback Levels", specificity: "Specificity" };

  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------------- Bank ---------------- */
  function buildBank(kind) {
    if (kind === "specificity") return buildSpecBank();
    const items = [], seen = new Map(), conflicts = [];
    G.collectExamples(kind).forEach((o) => {
      if (o.ex.quiz === false) return;
      G.exampleSides(o.ex, kind).forEach((side, i) => {
        const spans = side.spans || [];
        if (!spans.length) return;
        const text = G.spansText(spans).trim();
        const key = norm(text);
        const sig = spans.map((s) => s.c || "none").join("|") + (side.oneSpan ? "!" : "");
        if (seen.has(key)) {
          if (seen.get(key) !== sig) conflicts.push({ text, a: seen.get(key), b: sig, id: o.ex.id });
          return;
        }
        seen.set(key, sig);
        items.push({ n: items.length + 1, uid: o.ex.id + (o.ex.vs ? "#" + i : ""), ex: o.ex, spans, oneSpan: side.oneSpan, text, loc: o.loc, parentText: o.parentText });
      });
    });
    return { items, conflicts };
  }

  /* Section 4: every quoted sentence, merged by text.  An item can carry a full
     code (one per idea) and/or the guidelines' answer to one of the two questions. */
  const SPEC_ANSWER = { none: [false, false], instance: [true, false], what: [false, true], both: [true, true] };
  function buildSpecBank() {
    const items = [], byKey = new Map(), conflicts = [];
    const hasNotes = (sx) => !!(sx.notes && sx.notes.length);
    G.collectSpec().forEach((o) => {
      const sx = o.sx;
      if (sx.quiz === false) return;
      const ideas = G.specIdeas(sx);
      const text = G.specText(sx);
      const key = norm(text);
      const seq = ideas.every((d) => d.code) ? ideas.map((d) => d.code) : null;
      let it = byKey.get(key);
      const primary = () => Object.assign(it, { uid: sx.id, sx, ex: sx, ideas, text, spans: ideas.map((d) => ({ t: d.t, c: d.lv || null })), loc: o.loc, parentText: o.parentText, oneIdea: !!sx.oneIdea });
      if (!it) {
        it = { n: items.length + 1, spec: true, seq, what: sx.what, instance: sx.instance };
        primary();
        byKey.set(key, it); items.push(it);
        return;
      }
      if (seq) {
        if (it.seq && it.seq.join("|") !== seq.join("|")) conflicts.push({ text, a: it.seq.join("|"), b: seq.join("|"), id: sx.id });
        if (!it.seq) it.seq = seq;
      }
      // The occurrence with its own code and explanation (the worked examples) becomes the one shown.
      const score = (x) => (G.specIdeas(x).every((d) => d.code) ? 2 : 0) + (hasNotes(x) ? 1 : 0);
      if (score(sx) > score(it.sx)) primary();
      ["what", "instance"].forEach((q) => {
        if (sx[q] === undefined) return;
        if (it[q] !== undefined && it[q] !== sx[q]) conflicts.push({ text, a: q + "=" + it[q], b: q + "=" + sx[q], id: sx.id });
        it[q] = sx[q];
      });
    });
    items.forEach((it) => {
      if (!it.seq || it.seq.length !== 1 || !SPEC_ANSWER[it.seq[0]]) return;
      const [inst, what] = SPEC_ANSWER[it.seq[0]];
      if (it.instance !== undefined && it.instance !== inst) conflicts.push({ text: it.text, a: it.seq[0], b: "instance=" + it.instance, id: it.uid });
      if (it.what !== undefined && it.what !== what) conflicts.push({ text: it.text, a: it.seq[0], b: "what=" + it.what, id: it.uid });
    });
    return { items, conflicts };
  }

  function isSeg(it) { return it.spec ? !!(it.seq && (it.seq.length > 1 || it.oneIdea)) : it.spans.length > 1 || it.oneSpan; }

  /* ---------------- Question generation ---------------- */
  function seqLabel(kind, seq) {
    if (kind === "specificity") {
      if (seq.length === 1) return "One idea " + G.specChip(seq[0]);
      return seq.map((c) => G.specChip(c)).join('<span class="chip-sep"> | </span>') + ' <span class="muted">(' + seq.length + " ideas)</span>";
    }
    if (seq.length === 1) return "One " + G.codeName(seq[0]).toLowerCase() + " span " + G.chip(seq[0]);
    return seq.map((c) => G.chip(c)).join('<span class="chip-sep"> | </span>') + ' <span class="muted">(' + seq.length + " spans)</span>";
  }

  function segOptions(kind, seq) {
    const codes = kind === "specificity" ? G.SPEC_ORDER.concat(["notcoded"]) : G.KIND_CODES[kind];
    const key = (s) => s.join("|");
    const cands = [];
    codes.forEach((c) => cands.push([c]));
    if (seq.length > 1) {
      cands.push(seq.slice().reverse());
      seq.forEach((c, i) => codes.forEach((o) => { if (o !== c) { const s = seq.slice(); s[i] = o; cands.push(s); } }));
      cands.push(seq.slice(0, -1));
      if (seq.length === 2) cands.push(seq.concat([seq[0]]));
    } else {
      codes.forEach((o) => { if (o !== seq[0]) { cands.push([seq[0], o]); cands.push([o, seq[0]]); } });
      cands.push([seq[0], seq[0]]);
    }
    const uniq = new Map();
    shuffle(cands).forEach((s) => { if (s.length && key(s) !== key(seq) && !s.includes(null) && !uniq.has(key(s))) uniq.set(key(s), s); });
    // Prefer some "single span" distractors and some multi-span ones.
    const ds = Array.from(uniq.values());
    const singles = ds.filter((s) => s.length === 1), multis = ds.filter((s) => s.length > 1);
    const pick = [];
    while (pick.length < 3 && (singles.length || multis.length)) {
      const from = (pick.length % 2 === 0 ? multis : singles).length ? (pick.length % 2 === 0 ? multis : singles) : (multis.length ? multis : singles);
      pick.push(from.shift());
    }
    return shuffle([seq].concat(pick)).map((s) => ({ value: key(s), html: seqLabel(kind, s) }));
  }

  const SPEC_OPTION = {
    none: "Neither question (leave blank)", instance: "Instance question only", what: "What question only", both: "Both questions"
  };
  const YES_NO = [{ value: "yes", html: "<strong>Yes</strong>" }, { value: "no", html: "<strong>No</strong>" }];
  function makeSpecQuestion(it, type) {
    if (type === "code") return {
      type, it, answer: it.seq[0], prompt: "Which specificity code does this idea get?",
      options: G.SPEC_ORDER.map((c) => ({ value: c, html: G.specChip(c) + " " + SPEC_OPTION[c] }))
    };
    if (type === "what") return { type, it, answer: it.what ? "yes" : "no", prompt: "Does this idea answer the ‘What’ question?", options: YES_NO };
    if (type === "instance") return { type, it, answer: it.instance ? "yes" : "no", prompt: "Does this idea answer the ‘Instance’ question (point to a particular instance in the submission)?", options: YES_NO };
    if (type === "count") {
      const n = it.seq.length, opts = [];
      for (let i = 1; i <= Math.max(4, n); i++) opts.push({ value: String(i), html: "<strong>" + i + "</strong> idea" + (i > 1 ? "s" : "") });
      return { type, it, answer: String(n), prompt: "How many ideas should this comment be split into for specificity coding?", options: opts };
    }
    return { type: "seg", it, answer: it.seq.join("|"), prompt: "How should this comment be split into ideas and coded? (Ideas in order, left to right.)", options: segOptions("specificity", it.seq) };
  }
  function specLabelType(it) {
    if (it.seq && it.seq.length === 1 && it.seq[0] !== "notcoded") return "code";
    if (it.what !== undefined) return "what";
    if (it.instance !== undefined) return "instance";
    return null;
  }
  function specGroupKey(it) {
    const t = specLabelType(it);
    return t === "code" ? "code:" + it.seq[0] : t + ":" + (it[t] ? "yes" : "no");
  }

  function makeQuestion(kind, it, type) {
    if (kind === "specificity") return makeSpecQuestion(it, type);
    const codes = G.KIND_CODES[kind];
    const unit = kind === "questions" ? "feedback-question" : "feedback-level";
    if (type === "label") {
      const ans = it.spans[0].c || "none";
      return {
        type, it, answer: ans,
        prompt: kind === "questions" ? "Which feedback question does this fragment answer?" : "Which feedback level is this fragment?",
        options: codes.map((c) => ({ value: c, html: G.chip(c) + " " + esc(G.codeName(c)) }))
          .concat([{ value: "none", html: G.chip(null) + " " + (kind === "questions" ? "No feedback question (leave unannotated)" : "No annotation") }])
      };
    }
    const seq = it.spans.map((s) => s.c || null);
    if (type === "count") {
      const n = seq.length, max = Math.max(4, n);
      const opts = [];
      for (let i = 1; i <= max; i++) opts.push({ value: String(i), html: "<strong>" + i + "</strong> span" + (i > 1 ? "s" : "") });
      return { type, it, answer: String(n), prompt: "How many " + unit + " spans should this comment be split into?", options: opts };
    }
    if (seq.includes(null)) return makeQuestion(kind, it, "count");
    return { type: "seg", it, answer: seq.join("|"), prompt: "How should this comment be split into " + unit + " spans and coded? (Spans in order, left to right.)", options: segOptions(kind, seq) };
  }

  /* ---------------- Difficulty ----------------
     easy:   a plain example from a category's main list (or a Section 4 main-rule /
             worked example), asked as "which code?".
     medium: other plain examples, "how many spans/ideas?", and ‘What’/‘Instance’
             yes/no questions.
     hard:   any "split and code" question, and anything from a "telling them
             apart" rule, a deviation, a Section 1 principle, a note, a comparison
             (A vs B, or an example nested inside another example's explanation),
             or a fragment that should be left unannotated. */
  function itemTier(it) {
    const a = it.loc.area;
    if (it.spec) {
      if (a === "rule" || it.loc.compare) return "hard";
      return it.seq ? "easy" : "medium";
    }
    if (["rule", "deviation", "principle", "note"].includes(a) || it.ex.vs || it.parentText || it.spans.some((s) => !s.c)) return "hard";
    return a === "category" ? "easy" : "medium";
  }
  function difficultyOf(q) {
    if (q.type === "seg") return "hard";
    const t = itemTier(q.it);
    return q.type === "count" && t === "easy" ? "medium" : t;
  }

  function sample(kind, bank) {
    const spec = kind === "specificity";
    const total = Math.min(QUIZ_LENGTH, bank.length);
    const maxEasy = Math.round(total * EASY_SHARE), wantHard = Math.round(total * HARD_SHARE);
    const qs = [];
    const add = (it, type) => { const q = makeQuestion(kind, it, type); q.difficulty = difficultyOf(q); qs.push(q); };
    const segPool = shuffle(bank.filter(isSeg));
    // Section 4 has only a handful of split examples, so it asks fewer of each.
    const nSeg = Math.min(spec ? 3 : N_SEG, segPool.length);
    segPool.splice(0, nSeg).forEach((it) => add(it, "seg"));
    const nCount = Math.min(N_COUNT, segPool.length);
    segPool.splice(0, nCount).forEach((it) => add(it, "count"));
    // Label questions, sorted into difficulty tiers; each tier is balanced across answers.
    const tiers = { hard: {}, medium: {}, easy: {} };
    shuffle(bank.filter((it) => !isSeg(it))).forEach((it) => {
      if (spec && !specLabelType(it)) return;
      const type = spec ? specLabelType(it) : "label";
      const k = spec ? specGroupKey(it) : it.spans[0].c || "none";
      const groups = tiers[difficultyOf({ type, it })];
      (groups[k] = groups[k] || []).push({ it, type });
    });
    function take(tier, n) {
      const groups = tiers[tier], keys = shuffle(Object.keys(groups));
      let added = 0;
      while (added < n && qs.length < total && keys.some((k) => groups[k].length)) {
        for (const k of keys) {
          if (added >= n || qs.length >= total) break;
          if (groups[k].length) { const o = groups[k].shift(); add(o.it, o.type); added++; }
        }
      }
    }
    const count = (d) => qs.filter((q) => q.difficulty === d).length;
    take("hard", wantHard - count("hard"));
    take("medium", total - qs.length - maxEasy);
    take("easy", maxEasy - count("easy"));
    // Top up if a tier ran short: harder questions first, easy ones last.
    take("hard", total);
    take("medium", total);
    while (qs.length < total && segPool.length) add(segPool.shift(), "seg");
    take("easy", total);
    return shuffle(qs);
  }

  /* ---------------- UI ---------------- */
  const root = () => document.getElementById("content");
  let state = null;

  function ctxFor(loc) { return loc.area === "rule" ? { section: loc.section } : (loc.code ? { code: loc.code } : {}); }
  function reviseLink(it) {
    const href = G.hrefFor(G.exId(it.ex.anchorId || it.ex.id)) ||
      (it.loc.area === "rule" && G.hrefFor(G.ruleId(it.loc.section, it.loc.ruleKey))) ||
      (it.loc.anchor && G.hrefFor(it.loc.anchor)) || G.hrefFor(G.secId(it.loc.section));
    return href ? '<a class="goto" href="' + esc(href) + '" target="_blank" rel="noopener">Revise this: ' + esc(G.locLabel(it.loc)) + " ↗</a>" : "";
  }
  /* Verbatim guideline context for an item: the rule it sits under and the
     bullet that introduces it. */
  function contextHtml(it) {
    const ctx = ctxFor(it.loc);
    let h = '<div class="excerpt" style="margin-top:8px"><div class="crumb">' + esc(G.locLabel(it.loc)) + "</div>";
    if (it.loc.area === "rule") h += '<div class="rule-title">Rule ' + esc(it.loc.ruleKey) + ": " + G.inline(it.loc.ruleTitle, ctx) + "</div>";
    if (it.parentText && it.parentText.indexOf("“") !== 0) h += "<p>" + G.inline(it.parentText, ctx) + "</p>";
    return h + "</div>";
  }
  function codedLine(it) {
    if (!it.spec) return "Coded in the guidelines as: " + G.quoteHtml(it.spans) + " " + G.chipsFor(it.spans, it.oneSpan);
    if (it.seq) return "Coded in the guidelines as: " + G.specQuote(it.sx) + " " +
      it.seq.map((c) => G.specChip(c)).join('<span class="chip-sep">|</span>') + (it.oneIdea ? ' <span class="muted" style="font-size:.74rem">(one idea)</span>' : "");
    const parts = [];
    if (it.instance !== undefined) parts.push("‘Instance’ question: <strong>" + (it.instance ? "yes" : "no") + "</strong>");
    if (it.what !== undefined) parts.push("‘What’ question: <strong>" + (it.what ? "yes" : "no") + "</strong>");
    return "In the guidelines: " + G.specQuote(it.sx) + " · " + parts.join(" · ");
  }
  function answerHtml(q, value) {
    const o = q.options.find((x) => x.value === value);
    return o ? o.html : esc(value);
  }
  function plainText(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    // The grey "No annotation" chip repeats the option's own wording.
    const none = d.querySelector(".chip.c-none");
    if (none && d.textContent.trim() !== none.textContent.trim()) none.remove();
    return d.textContent.replace(/\s+/g, " ").trim();
  }

  /* Everything the page shows about a question's example, as finished HTML.
     It is saved with a quiz in progress, so a half-done quiz comes back exactly
     as it was asked even if the guidelines have since changed or dropped the
     example (new attempts only ever draw from the current bank). */
  function view(q) {
    if (q.view) return q.view;
    const it = q.it;
    return (q.view = {
      n: it.n, uid: it.uid, text: it.text,
      quote: G.quoteHtml(it.spans),
      coded: codedLine(it),
      guide: contextHtml(it) + (it.ex.notes && it.ex.notes.length ? G.notesHtml(it.ex.notes, ctxFor(it.loc), { kind: state.kind }) : ""),
      revise: reviseLink(it)
    });
  }

  /* ---------------- Attempt history (this browser) ----------------
     Every answered question is saved as it happens, so unfinished attempts are
     kept too.  The whole history can be downloaded as a CSV file. */
  function loadAttempts() {
    try {
      const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || "[]");
      return Array.isArray(all) ? all : [];
    } catch (e) { return []; }
  }
  function saveAttempt(rec) {
    try {
      const all = loadAttempts();
      const i = all.findIndex((a) => a.id === rec.id);
      if (i >= 0) all[i] = rec; else all.push(rec);
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
    } catch (e) { /* storage unavailable */ }
  }

  const TYPE_LABEL = {
    label: "Which code?", seg: "Split and code", count: "How many spans/ideas?",
    code: "Which specificity code?", what: "‘What’ question?", instance: "‘Instance’ question?"
  };
  function stamp(iso) {
    if (!iso) return "";
    const d = new Date(iso), p = (x) => String(x).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function attemptsCsv(all) {
    const cell = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
    const rows = [["Attempt", "Quiz", "Started", "Finished", "Status", "Attempt score", "Passed",
      "Question # in attempt", "Bank #", "Example ID", "Difficulty", "Question type", "Question", "Comment",
      "Result", "Their answer (if wrong)", "Correct answer"]];
    all.forEach((a, i) => {
      const done = !!a.finished;
      const score = done ? a.score + "/" + a.total : a.score + "/" + a.answers.length + " (" + (a.restarted ? "restarted" : "stopped") + " after " + a.answers.length + " of " + a.total + ")";
      a.answers.forEach((r) => rows.push([
        i + 1, KIND_LABEL[a.kind] || a.kind, stamp(a.started), stamp(a.finished), done ? "Completed" : a.restarted ? "Restarted" : "Not finished",
        score, done ? (a.passed ? "Yes" : "No") : "", r.pos, r.bank, r.id, r.difficulty, TYPE_LABEL[r.type] || r.type,
        r.prompt, r.text, r.correct ? "Correct" : "Wrong", r.correct ? "" : r.chosen, r.answer
      ]));
    });
    return rows.map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  }
  function downloadAttempts() {
    const all = loadAttempts();
    if (!all.length) return;
    const blob = new Blob(["﻿" + attemptsCsv(all)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quiz-attempts-" + stamp(new Date().toISOString()).slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const BROWSER_NOTE = "Nothing is sent anywhere: your history stays on this device, in this browser. " +
    "It won’t appear in a different browser or on another device, it isn’t kept in a private or incognito window, " +
    "and clearing your browsing data deletes it. Download your attempts before you clear your browser or switch devices.";
  function warningHtml() {
    return '<div class="warn-callout" role="note"><strong>⚠ Your quiz history is only saved in this browser</strong>' + BROWSER_NOTE + "</div>";
  }
  function historyHtml(showNote) {
    const all = loadAttempts();
    const nq = all.reduce((s, a) => s + a.answers.length, 0);
    return '<div class="card"><h3 style="margin-top:0">Your quiz history</h3>' +
      (all.length
        ? "<p>" + all.length + " attempt" + (all.length > 1 ? "s" : "") + " (" + nq + " questions answered) saved in this browser. " +
          "The download lists every question you were asked, by its number in the question bank, whether you got it right, and what you answered when you got it wrong.</p>"
        : "<p>No attempts yet. Every quiz attempt you make in this browser is saved here, and you can download them all as a spreadsheet (CSV).</p>") +
      (showNote ? '<p class="muted" style="font-size:.9rem">' + BROWSER_NOTE + "</p>" : "") + '<div class="q-actions" style="justify-content:flex-start"><button class="btn" id="export"' + (all.length ? "" : " disabled") + ">Download all attempts (CSV)</button></div></div>";
  }
  function bindExport() {
    const b = document.getElementById("export");
    if (b) b.addEventListener("click", downloadAttempts);
  }

  /* ---------------- Quiz in progress (this browser) ----------------
     The current quiz is saved after every step, so a refresh or a visit to
     another page brings the person back to the same question (or results). */
  function saveProgress(phase) {
    if (!state) return;
    try {
      localStorage.setItem(PROGRESS_KEY(state.kind), JSON.stringify({
        v: 2, kind: state.kind, phase: phase || "quiz", i: state.i, score: state.score, chosen: state.chosen,
        missed: state.missed.map((m) => ({ idx: state.qs.indexOf(m.q), chosen: m.chosen })),
        qs: state.qs.map((q) => ({ type: q.type, answer: q.answer, prompt: q.prompt, options: q.options, difficulty: q.difficulty, view: view(q) })),
        record: state.record
      }));
    } catch (e) { /* storage unavailable */ }
  }
  function clearProgress(kind) {
    try { localStorage.removeItem(PROGRESS_KEY(kind)); } catch (e) { /* storage unavailable */ }
  }
  function loadProgress(kind) {
    try {
      const p = JSON.parse(localStorage.getItem(PROGRESS_KEY(kind)) || "null");
      if (!p || p.v !== 2 || !Array.isArray(p.qs) || !p.qs.length || p.qs.some((q) => !q || !q.view) || !(p.i >= 0 && p.i < p.qs.length)) return null;
      const qs = p.qs;
      return {
        phase: p.phase,
        state: {
          kind, qs, i: p.i, score: p.score, chosen: p.chosen == null ? null : p.chosen, answered: p.chosen != null, record: p.record,
          missed: (p.missed || []).filter((m) => qs[m.idx]).map((m) => ({ q: qs[m.idx], chosen: m.chosen }))
        }
      };
    } catch (e) { return null; }
  }
  function setView(kind, view) {
    try { history.replaceState(null, "", "?s=" + kind + (view ? "&view=" + view : "")); } catch (e) { /* ignore */ }
  }

  function resumeLabel(kind) {
    const p = loadProgress(kind);
    return p && p.phase === "quiz" ? "Resume quiz (" + (p.state.i + 1) + "/" + p.state.qs.length + ")" : "Start";
  }
  function renderPicker() {
    const cards = ["questions", "levels", "specificity"].map((kind) => {
      const soon = !window.GUIDE[kind];
      const pass = !soon && window.GNav.getPass(kind);
      const size = soon ? 0 : buildBank(kind).items.length;
      return '<div class="card tile' + (soon ? " disabled" : "") + '"><h3>' + KIND_LABEL[kind] + " quiz</h3>" +
        (soon ? '<p>Not available.</p>'
          : "<p>" + Math.min(QUIZ_LENGTH, size) + " random questions from a bank of " + size + ". Pass mark 90%.</p>" +
            (pass ? '<span class="badge-pass">✓ Passed ' + esc(pass.date) + " (" + pass.score + "/" + pass.total + ")</span>" : "") +
            '<div class="tile-actions"><a class="btn primary" href="quiz.html?s=' + kind + '">' + resumeLabel(kind) + "</a></div>") + "</div>";
    }).join("");
    root().innerHTML = '<div class="quiz-wrap"><h1>Quizzes</h1><p>Each guideline section has its own quiz, like a site safety induction: read the section, then show you can apply it. Every question is a real example from the guidelines. You get instant feedback with the reasoning and a link to the part to revise.</p>' + warningHtml() + '<div class="grid">' + cards + "</div>" + historyHtml(false) + "</div>";
    bindExport();
  }

  function renderIntro(kind) {
    const bank = buildBank(kind);
    if (bank.conflicts.length) console.warn("Quiz bank conflicts", bank.conflicts);
    const n = Math.min(QUIZ_LENGTH, bank.items.length);
    const need = Math.ceil(n * PASS_RATE);
    const pass = window.GNav.getPass(kind);
    root().innerHTML = '<div class="quiz-wrap"><div class="card"><div class="eyebrow muted" style="font-weight:600;text-transform:uppercase;font-size:.8rem">Quiz</div>' +
      "<h1>" + KIND_LABEL[kind] + "</h1>" +
      "<ul><li><strong>" + n + "</strong> questions, drawn at random from " + bank.items.length + " guideline examples.</li>" +
      (kind === "specificity"
        ? "<li>Question types: <em>which code?</em>, <em>does it answer the ‘What’ (or ‘Instance’) question?</em>, <em>how should it be split into ideas?</em>, and <em>how many ideas?</em></li>"
        : "<li>Three question types: <em>which code?</em>, <em>how should it be split and coded?</em>, and <em>how many spans?</em></li>") +
      "<li>Most questions are hard ones: splitting comments, edge cases from the “telling them apart” rules, and comparisons. Only a few are straightforward.</li>" +
      "<li>You see the answer and the reasoning straight after each question.</li>" +
      "<li>Pass mark: <strong>90%</strong> (" + need + "/" + n + ").</li>" +
      "</ul>" + warningHtml() +
      (pass ? '<p><span class="badge-pass">✓ You passed on ' + esc(pass.date) + " (" + pass.score + "/" + pass.total + ")</span></p>" : "") +
      '<div class="q-actions" style="justify-content:flex-start"><button class="btn primary" id="start">Start quiz</button>' +
      '<a class="btn" href="' + G.PAGES[kind] + '">Read the guidelines first</a></div></div></div>';
    document.getElementById("start").addEventListener("click", () => start(kind, bank.items));
  }

  function start(kind, bank) {
    const qs = sample(kind, bank);
    state = {
      kind, qs, i: 0, score: 0, missed: [], answered: false, chosen: null,
      record: { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), kind, started: new Date().toISOString(), finished: null, total: qs.length, score: 0, passed: null, answers: [] }
    };
    setView(kind);
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.qs[state.i];
    const n = state.qs.length;
    state.answered = false;
    state.chosen = null;
    saveProgress();
    root().innerHTML = '<div class="quiz-wrap"><div class="q-meta"><span>' + KIND_LABEL[state.kind] + " quiz</span><span>Question " + (state.i + 1) + " of " + n + " · Bank #" + view(q).n + " · Score " + state.score + "</span></div>" +
      '<div class="progress" aria-hidden="true"><div style="width:' + (100 * state.i / n) + '%"></div></div>' +
      '<div class="card"><div class="q-prompt">' + esc(q.prompt) + "</div>" +
      '<div class="q-text">“' + esc(view(q).text) + "”</div>" +
      '<div class="options" role="group" aria-label="Answers">' +
      q.options.map((o, k) => '<button class="option" type="button" data-v="' + esc(o.value) + '"><span class="opt-key">' + (k + 1) + "</span><span>" + o.html + "</span></button>").join("") +
      '</div><div id="fb" aria-live="polite"></div></div>' +
      '<div class="q-actions" style="justify-content:flex-start"><button class="btn" type="button" id="restart">↺ Restart quiz</button></div></div>';
    root().querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => answer(b.dataset.v)));
    document.getElementById("restart").addEventListener("click", restart);
    const first = root().querySelector(".option"); if (first) first.focus({ preventScroll: true });
  }

  function answer(v) {
    if (state.answered) return;
    state.answered = true;
    const q = state.qs[state.i];
    const ok = v === q.answer;
    if (ok) state.score++; else state.missed.push({ q, chosen: v });
    const rec = state.record;
    rec.answers.push({
      pos: state.i + 1, bank: view(q).n, id: view(q).uid, type: q.type, difficulty: q.difficulty, prompt: q.prompt, text: view(q).text,
      correct: ok, chosen: plainText(answerHtml(q, v)), answer: plainText(answerHtml(q, q.answer))
    });
    rec.score = state.score;
    saveAttempt(rec);
    state.chosen = v;
    saveProgress();
    showFeedback(v);
  }

  /* Mark the options and show the answer and reasoning for the current question. */
  function showFeedback(v) {
    const q = state.qs[state.i];
    const ok = v === q.answer;
    root().querySelectorAll(".option").forEach((b) => {
      b.disabled = true;
      if (b.dataset.v === q.answer) b.classList.add("correct");
      else if (b.dataset.v === v) b.classList.add("wrong");
    });
    const vw = view(q);
    const last = state.i === state.qs.length - 1;
    document.getElementById("fb").innerHTML =
      '<div class="feedback ' + (ok ? "ok" : "bad") + '"><div class="verdict ' + (ok ? "ok" : "bad") + '">' + (ok ? "✓ Correct" : "✗ Not quite") + "</div>" +
      (ok ? "" : '<div class="answer-line">Correct answer: ' + answerHtml(q, q.answer) + "</div>") +
      '<div class="answer-line">' + vw.coded + "</div>" +
      '<div class="muted" style="font-weight:600;margin-top:8px">From the guidelines:</div>' + vw.guide +
      "<div>" + vw.revise + "</div></div>" +
      '<div class="q-actions"><button class="btn primary" id="next">' + (last ? "See results" : "Next question →") + "</button></div>";
    // Links inside feedback open in a new tab so quiz progress is kept.
    document.querySelectorAll("#fb a").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    const nx = document.getElementById("next");
    nx.addEventListener("click", next);
    nx.focus({ preventScroll: true });
  }

  /* Start again with a fresh set of questions.  The answers given so far stay
     in the history, marked as a restarted attempt. */
  function restart() {
    const done = state.record.answers.length;
    if (!window.confirm("Restart this quiz with a fresh set of questions?" +
      (done ? "\n\nThe " + done + " answer" + (done > 1 ? "s" : "") + " you’ve given so far will be kept in your quiz history." : ""))) return;
    if (done) { state.record.restarted = true; saveAttempt(state.record); }
    const kind = state.kind;
    clearProgress(kind);
    start(kind, buildBank(kind).items);
    window.scrollTo({ top: 0 });
  }

  function next() {
    if (state.i < state.qs.length - 1) { state.i++; renderQuestion(); window.scrollTo({ top: 0 }); }
    else finish();
  }

  function finish() {
    const n = state.qs.length, s = state.score;
    const passed = s >= Math.ceil(n * PASS_RATE);
    Object.assign(state.record, { finished: new Date().toISOString(), score: s, passed });
    saveAttempt(state.record);
    if (passed) {
      window.GNav.setPass(state.kind, { date: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }), score: s, total: n });
      window.GNav.renderHeader();
    }
    saveProgress("results");
    setView(state.kind, "results");
    renderResults();
    window.scrollTo({ top: 0 });
  }

  function renderResults() {
    const n = state.qs.length, s = state.score;
    const passed = !!state.record.passed;
    const missed = state.missed.map(({ q, chosen }) =>
      '<li><div class="muted" style="font-size:.8rem">Bank #' + view(q).n + "</div><div>" + view(q).quote + "</div>" +
      '<div class="muted" style="font-size:.9rem">' + esc(q.prompt) + "</div>" +
      "<div>Your answer: " + answerHtml(q, chosen) + " · Correct: " + answerHtml(q, q.answer) + "</div>" +
      "<div>" + view(q).revise + "</div></li>").join("");
    root().innerHTML = '<div class="quiz-wrap"><div class="card" style="text-align:center">' +
      '<div class="score-big">' + s + "/" + n + "</div>" +
      '<h2 class="' + (passed ? "result-pass" : "result-fail") + '" style="margin-top:10px">' + (passed ? "✓ Passed" : "Not passed yet") + "</h2>" +
      "<p>" + (passed ? "Well done. Your pass has been recorded in this browser." : "You need " + Math.ceil(n * PASS_RATE) + "/" + n + " (90%) to pass. Revise the items below and try again; you’ll get a fresh set of questions.") + "</p>" +
      '<div class="q-actions" style="justify-content:center"><button class="btn primary" id="retake">Retake quiz</button><a class="btn" href="' + G.PAGES[state.kind] + '">Back to the guidelines</a></div></div>' +
      (missed ? '<div class="card"><h3 style="margin-top:0">Questions to revise (' + state.missed.length + ")</h3><ul class=\"missed\">" + missed + "</ul></div>" : "") + historyHtml(true) + "</div>";
    document.querySelectorAll(".missed a").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    bindExport();
    const kind = state.kind;
    document.getElementById("retake").addEventListener("click", () => start(kind, buildBank(kind).items));
  }

  document.addEventListener("keydown", (e) => {
    if (!state || e.altKey || e.ctrlKey || e.metaKey) return;
    if (!state.answered && /^[1-9]$/.test(e.key)) {
      const b = root().querySelectorAll(".option")[Number(e.key) - 1];
      if (b) { e.preventDefault(); b.click(); }
    }
  });

  function init() {
    const params = new URLSearchParams(location.search);
    const kind = params.get("s");
    if (!kind || !window.GUIDE[kind]) return renderPicker();
    const saved = loadProgress(kind);
    if (saved && saved.phase === "quiz") {
      // Back to the same question; if it was already answered, show its feedback again.
      state = saved.state;
      const chosen = state.chosen;
      setView(kind);
      renderQuestion();
      if (chosen != null) { state.answered = true; state.chosen = chosen; saveProgress(); showFeedback(chosen); }
    } else if (saved && saved.phase === "results" && params.get("view") === "results") {
      state = saved.state;
      renderResults();
    } else renderIntro(kind);
  }

  window.GQuiz = { buildBank, sample, makeQuestion, difficultyOf, attemptsCsv, init, QUIZ_LENGTH, PASS_RATE, EASY_SHARE, HARD_SHARE };
})();
