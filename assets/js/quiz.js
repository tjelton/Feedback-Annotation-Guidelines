/* Quiz engine.  The question bank is built automatically from every example
   in the guidelines (the classification's own section plus Section 1), so
   the quiz always matches the current guideline content. */
(function () {
  "use strict";
  const G = window.G, esc = G.esc;
  const QUIZ_LENGTH = 20;
  const PASS_RATE = 0.9;
  const N_SEG = 5, N_COUNT = 2;
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
        items.push({ uid: o.ex.id + (o.ex.vs ? "#" + i : ""), ex: o.ex, spans, oneSpan: side.oneSpan, text, loc: o.loc, parentText: o.parentText });
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
        it = { spec: true, seq, what: sx.what, instance: sx.instance };
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

  function sample(kind, bank) {
    const segPool = shuffle(bank.filter(isSeg));
    const labelPool = bank.filter((it) => !isSeg(it));
    const total = Math.min(QUIZ_LENGTH, bank.length);
    const qs = [];
    // Section 4 has only a handful of split examples, so it asks fewer of each.
    const nSeg = Math.min(kind === "specificity" ? 3 : N_SEG, segPool.length);
    segPool.splice(0, nSeg).forEach((it) => qs.push(makeQuestion(kind, it, "seg")));
    const nCount = Math.min(N_COUNT, segPool.length);
    segPool.splice(0, nCount).forEach((it) => qs.push(makeQuestion(kind, it, "count")));
    // Balanced label questions: round-robin over answer codes.
    const spec = kind === "specificity";
    const groups = {};
    shuffle(labelPool).forEach((it) => {
      if (spec && !specLabelType(it)) return;
      const k = spec ? specGroupKey(it) : it.spans[0].c || "none";
      (groups[k] = groups[k] || []).push(it);
    });
    const keys = shuffle(Object.keys(groups));
    while (qs.length < total && keys.some((k) => groups[k].length)) {
      for (const k of keys) {
        if (qs.length >= total) break;
        if (groups[k].length) { const it = groups[k].shift(); qs.push(makeQuestion(kind, it, spec ? specLabelType(it) : "label")); }
      }
    }
    while (qs.length < total && segPool.length) qs.push(makeQuestion(kind, segPool.shift(), "seg"));
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

  function renderPicker() {
    const cards = ["questions", "levels", "specificity"].map((kind) => {
      const soon = !window.GUIDE[kind];
      const pass = !soon && window.GNav.getPass(kind);
      const size = soon ? 0 : buildBank(kind).items.length;
      return '<div class="card tile' + (soon ? " disabled" : "") + '"><h3>' + KIND_LABEL[kind] + " quiz</h3>" +
        (soon ? '<p>Not available.</p>'
          : "<p>" + Math.min(QUIZ_LENGTH, size) + " random questions from a bank of " + size + ". Pass mark 90%.</p>" +
            (pass ? '<span class="badge-pass">✓ Passed ' + esc(pass.date) + " (" + pass.score + "/" + pass.total + ")</span>" : "") +
            '<div class="tile-actions"><a class="btn primary" href="quiz.html?s=' + kind + '">Start</a></div>') + "</div>";
    }).join("");
    root().innerHTML = '<div class="quiz-wrap"><h1>Quizzes</h1><p>Each guideline section has its own quiz, like a site safety induction: read the section, then show you can apply it. Every question is a real example from the guidelines. You get instant feedback with the reasoning and a link to the part to revise.</p><div class="grid">' + cards + "</div></div>";
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
      "<li>You see the answer and the reasoning straight after each question.</li>" +
      "<li>Pass mark: <strong>90%</strong> (" + need + "/" + n + ").</li></ul>" +
      (pass ? '<p><span class="badge-pass">✓ You passed on ' + esc(pass.date) + " (" + pass.score + "/" + pass.total + ")</span></p>" : "") +
      '<div class="q-actions" style="justify-content:flex-start"><button class="btn primary" id="start">Start quiz</button>' +
      '<a class="btn" href="' + G.PAGES[kind] + '">Read the guidelines first</a></div></div></div>';
    document.getElementById("start").addEventListener("click", () => start(kind, bank.items));
  }

  function start(kind, bank) {
    state = { kind, qs: sample(kind, bank), i: 0, score: 0, missed: [], answered: false };
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.qs[state.i];
    const n = state.qs.length;
    state.answered = false;
    root().innerHTML = '<div class="quiz-wrap"><div class="q-meta"><span>' + KIND_LABEL[state.kind] + " quiz</span><span>Question " + (state.i + 1) + " of " + n + " · Score " + state.score + "</span></div>" +
      '<div class="progress" aria-hidden="true"><div style="width:' + (100 * state.i / n) + '%"></div></div>' +
      '<div class="card"><div class="q-prompt">' + esc(q.prompt) + "</div>" +
      '<div class="q-text">“' + esc(q.it.text) + "”</div>" +
      '<div class="options" role="group" aria-label="Answers">' +
      q.options.map((o, k) => '<button class="option" type="button" data-v="' + esc(o.value) + '"><span class="opt-key">' + (k + 1) + "</span><span>" + o.html + "</span></button>").join("") +
      '</div><div id="fb" aria-live="polite"></div></div></div>';
    root().querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => answer(b.dataset.v)));
    const first = root().querySelector(".option"); if (first) first.focus({ preventScroll: true });
  }

  function answer(v) {
    if (state.answered) return;
    state.answered = true;
    const q = state.qs[state.i];
    const ok = v === q.answer;
    if (ok) state.score++; else state.missed.push({ q, chosen: v });
    root().querySelectorAll(".option").forEach((b) => {
      b.disabled = true;
      if (b.dataset.v === q.answer) b.classList.add("correct");
      else if (b.dataset.v === v) b.classList.add("wrong");
    });
    const it = q.it;
    const notes = it.ex.notes && it.ex.notes.length ? G.notesHtml(it.ex.notes, ctxFor(it.loc), { kind: state.kind }) : "";
    const last = state.i === state.qs.length - 1;
    document.getElementById("fb").innerHTML =
      '<div class="feedback ' + (ok ? "ok" : "bad") + '"><div class="verdict ' + (ok ? "ok" : "bad") + '">' + (ok ? "✓ Correct" : "✗ Not quite") + "</div>" +
      (ok ? "" : '<div class="answer-line">Correct answer: ' + answerHtml(q, q.answer) + "</div>") +
      '<div class="answer-line">' + codedLine(it) + "</div>" +
      '<div class="muted" style="font-weight:600;margin-top:8px">From the guidelines:</div>' + contextHtml(it) + notes +
      "<div>" + reviseLink(it) + "</div></div>" +
      '<div class="q-actions"><button class="btn primary" id="next">' + (last ? "See results" : "Next question →") + "</button></div>";
    // Links inside feedback open in a new tab so quiz progress is kept.
    document.querySelectorAll("#fb a").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    const nx = document.getElementById("next");
    nx.addEventListener("click", next);
    nx.focus({ preventScroll: true });
  }

  function next() {
    if (state.i < state.qs.length - 1) { state.i++; renderQuestion(); window.scrollTo({ top: 0 }); }
    else renderResults();
  }

  function renderResults() {
    const n = state.qs.length, s = state.score;
    const passed = s >= Math.ceil(n * PASS_RATE);
    if (passed) {
      window.GNav.setPass(state.kind, { date: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }), score: s, total: n });
      window.GNav.renderHeader();
    }
    const missed = state.missed.map(({ q, chosen }) =>
      "<li><div>" + G.quoteHtml(q.it.spans) + "</div>" +
      '<div class="muted" style="font-size:.9rem">' + esc(q.prompt) + "</div>" +
      "<div>Your answer: " + answerHtml(q, chosen) + " · Correct: " + answerHtml(q, q.answer) + "</div>" +
      "<div>" + reviseLink(q.it) + "</div></li>").join("");
    root().innerHTML = '<div class="quiz-wrap"><div class="card" style="text-align:center">' +
      '<div class="score-big">' + s + "/" + n + "</div>" +
      '<h2 class="' + (passed ? "result-pass" : "result-fail") + '" style="margin-top:10px">' + (passed ? "✓ Passed" : "Not passed yet") + "</h2>" +
      "<p>" + (passed ? "Well done. Your pass has been recorded in this browser." : "You need " + Math.ceil(n * PASS_RATE) + "/" + n + " (90%) to pass. Revise the items below and try again; you’ll get a fresh set of questions.") + "</p>" +
      '<div class="q-actions" style="justify-content:center"><button class="btn primary" id="retake">Retake quiz</button><a class="btn" href="' + G.PAGES[state.kind] + '">Back to the guidelines</a></div></div>' +
      (missed ? '<div class="card"><h3 style="margin-top:0">Questions to revise (' + state.missed.length + ")</h3><ul class=\"missed\">" + missed + "</ul></div>" : "") + "</div>";
    document.querySelectorAll(".missed a").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
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
    const kind = new URLSearchParams(location.search).get("s");
    if (kind && window.GUIDE[kind]) renderIntro(kind);
    else renderPicker();
  }

  window.GQuiz = { buildBank, sample, makeQuestion, init, QUIZ_LENGTH, PASS_RATE };
})();
