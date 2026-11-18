#!/usr/bin/env node
/* Content checks for the guidelines site.  Run from the repo root:
     node tools/validate.mjs
   Checks: data loads, ids unique, span codes valid, every cross-reference
   (explicit {{…}} and automatic "2.4 rule d" style) resolves, quiz banks are
   big enough and every generated question is answerable. Exit code 1 on error. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);

const ctx = { console, URLSearchParams };
ctx.window = ctx;
ctx.location = { pathname: "/validate.html", search: "", hash: "" };
ctx.document = { addEventListener() {}, getElementById() { return null; } };
vm.createContext(ctx);
for (const f of ["assets/data/general.js", "assets/data/questions.js", "assets/data/levels.js", "assets/data/specificity.js", "assets/js/render.js", "assets/js/quiz.js"]) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) { err("missing file " + f); continue; }
  try { vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f }); }
  catch (e) { err(f + ": " + e.message); }
}
const { GUIDE, G, GQuiz } = ctx;
if (!GUIDE || !G) { console.error(errors.join("\n")); process.exit(1); }

const VALID = { questions: ["FU", "FB", "FF", null], levels: ["FS", "FT", "FP", "FR", null] };
const ids = new Map();

/* -------- walk every string with the context the page renders it in -------- */
function checkText(s, c, where) {
  if (typeof s !== "string") return;
  for (const m of s.matchAll(/\[\[([A-Z]+):/g)) if (!["FU", "FB", "FF", "FS", "FT", "FP", "FR", "NONE"].includes(m[1])) err(`${where}: bad inline code [[${m[1]}:`);
  if ((s.match(/\[\[/g) || []).length !== (s.match(/\]\]/g) || []).length) err(`${where}: unbalanced [[ ]] in "${s.slice(0, 60)}…"`);
  if ((s.match(/\{\{/g) || []).length !== (s.match(/\}\}/g) || []).length) err(`${where}: unbalanced {{ }} in "${s.slice(0, 60)}…"`);
  const before = G.unresolved.length;
  G.inline(s, c);
  for (const a of G.unresolved.slice(before)) err(`${where}: link target #${a} does not exist ("${s.slice(0, 70)}…")`);
}
function checkExample(ex, kind, c, where) {
  if (!ex || !ex.id) { err(`${where}: example without id`); return; }
  if (ids.has(ex.id)) err(`duplicate example id "${ex.id}" (${ids.get(ex.id)} and ${where})`);
  ids.set(ex.id, where);
  const sides = ex.vs ? ex.vs : ex.codings ? Object.entries(ex.codings).map(([k, spans]) => ({ spans, k })) : [{ spans: ex.spans }];
  if (!sides.length || sides.some((s) => !Array.isArray(s.spans) || !s.spans.length)) err(`${where} ${ex.id}: missing spans`);
  sides.forEach((s) => (s.spans || []).forEach((sp) => {
    const k = s.k || kind;
    if (typeof sp.t !== "string" || !sp.t.length) err(`${where} ${ex.id}: empty span text`);
    if (!VALID[k].includes(sp.c === undefined ? null : sp.c)) err(`${where} ${ex.id}: invalid code ${sp.c} for ${k}`);
  }));
  checkNodes(ex.notes, kind, c, where + " › " + ex.id);
}
function checkNodes(nodes, kind, c, where) {
  (nodes || []).forEach((n, i) => {
    const w = where + "[" + i + "]";
    if (n == null) return err(`${w}: null node`);
    if (typeof n === "string") return checkText(n, c, w);
    if (n.ex) return checkExample(n.ex, kind, c, w);
    if (n.diagram) return;
    checkText(n.text, c, w); checkText(n.label, c, w);
    checkNodes(n.sub, kind, c, w);
  });
}

// Section 1
GUIDE.general.principles.forEach((p) => { checkText(p.title, {}, "P" + p.n); checkNodes(p.body, "questions", {}, "P" + p.n); });
Object.values(GUIDE.home).flat().forEach((v) => typeof v === "string" ? checkText(v, {}, "home") : null);

for (const kind of ["questions", "levels"]) {
  const d = GUIDE[kind];
  if (!d) { err(`GUIDE.${kind} not defined`); continue; }
  checkNodes(d.intro, kind, {}, kind + ".intro");
  d.categories.forEach((cat) => {
    const c = { code: cat.code }, w = cat.section;
    if (!VALID[kind].includes(cat.code)) err(`${w}: bad category code ${cat.code}`);
    checkText(cat.mainRule.intro, c, w + " main rule");
    (cat.mainRule.points || []).forEach((p) => checkText(p.text, c, w + " point " + p.key));
    (cat.mainRule.questions || []).forEach((q) => { checkText(q.title, c, w + " Q" + q.key); checkNodes(q.sub, kind, c, w + " Q" + q.key); });
    if (cat.commonExamples) { checkText(cat.commonExamples.intro, c, w); cat.commonExamples.points.forEach((p) => checkText(p.text, c, w + " ce " + p.key)); }
    checkText(cat.preNote, c, w + " preNote");
    (cat.examples || []).forEach((ex) => checkExample(ex, kind, c, w));
    (cat.groups || []).forEach((g) => { checkText(g.title, c, w); g.examples.forEach((ex) => checkExample(ex, kind, c, w + " " + g.title)); });
    if (cat.deviations) checkNodes(cat.deviations.body, kind, c, w + " deviations");
  });
  if (d.distinguish.rationale) checkText(d.distinguish.rationale.text, {}, kind + " rationale");
  d.distinguish.sections.forEach((s) => {
    const c = { section: s.section };
    checkNodes(s.intro, kind, c, s.section + " intro");
    s.rules.forEach((r) => { checkText(r.title, Object.assign({ nolink: true }, c), `${s.section}${r.key} title`); checkNodes(r.body, kind, c, `${s.section} rule ${r.key}`); });
    if (s.other) s.other.examples.forEach((ex) => checkExample(ex, kind, c, s.section + " other"));
  });
  (d.notes || []).forEach((n) => checkNodes(n.body, kind, {}, n.section));
}

/* -------- Section 4 -------- */
const SPEC = ["none", "instance", "what", "both", "notcoded"];
function checkSpecNodes(nodes, c, where) {
  (nodes || []).forEach((n, i) => {
    const w = where + "[" + i + "]";
    if (n == null) return err(`${w}: null node`);
    if (typeof n === "string") return checkText(n, c, w);
    if (n.sx) {
      const sx = n.sx;
      if (!sx.id) return err(`${w}: specificity example without id`);
      if (ids.has(sx.id)) err(`duplicate example id "${sx.id}"`);
      ids.set(sx.id, w);
      const ideas = sx.ideas || [{ t: sx.t, lv: sx.lv, code: sx.code }];
      ideas.forEach((d) => {
        if (typeof d.t !== "string" || !d.t.trim()) err(`${w} ${sx.id}: empty idea text`);
        if (d.code != null && !SPEC.includes(d.code)) err(`${w} ${sx.id}: bad specificity code ${d.code}`);
        if (d.lv != null && !["FS", "FT", "FP", "FR"].includes(d.lv)) err(`${w} ${sx.id}: bad level ${d.lv}`);
      });
      if (ideas.some((d) => d.code == null) && sx.what === undefined && sx.instance === undefined) err(`${w} ${sx.id}: no code and no answer`);
      return checkSpecNodes(sx.notes, c, w + " › " + sx.id);
    }
    checkText(n.text, c, w); checkText(n.label, c, w);
    checkSpecNodes(n.sub, c, w);
  });
}
if (GUIDE.specificity) {
  const d = GUIDE.specificity;
  checkText(d.intro, {}, "4 intro");
  checkText(d.mainRule.intro, {}, "4 main rule");
  d.mainRule.questions.forEach((q) => checkText(q.text, {}, "4 main rule Q" + q.key));
  d.mainRule.table.forEach((r) => { if (!SPEC.includes(r[2])) err("4 main rule table: bad code " + r[2]); });
  checkText(d.mainRule.after, {}, "4 main rule");
  checkText(d.afterRule, {}, "4 after rule");
  d.sections.forEach((s) => {
    const c = { section: s.section }, w = s.id || s.section;
    (s.blocks || []).forEach((b, i) => {
      const bw = w + " block " + i;
      ["p", "heading"].forEach((k) => checkText(b[k], c, bw));
      if (b.callout) checkText(b.callout.text, c, bw);
      if (b.box) { checkText(b.box.text, c, bw); checkSpecNodes(b.box.list, c, bw); }
      if (b.list) checkSpecNodes(b.list, c, bw);
      if (b.ol) b.ol.forEach((p) => { checkText(p.text, c, bw + p.key); checkSpecNodes(p.sub, c, bw + p.key); });
      if (b.rules) b.rules.forEach((r) => { checkText(r.title, Object.assign({ nolink: true }, c), `${s.section}${r.key} title`); checkSpecNodes(r.body, c, `${s.section} rule ${r.key}`); });
      if (b.examples) { checkSpecNodes(b.examples.items, c, bw); checkText(b.examples.after, c, bw); }
      if (b.compare) b.compare.items.forEach((it) => {
        if (ids.has(it.id)) err(`duplicate example id "${it.id}"`); ids.set(it.id, bw);
        checkText(it.title, c, bw); it.pair.forEach((p) => { checkText(p.note, c, bw); if (typeof p.what !== "boolean") err(`${bw} ${it.id}: comparison without a What answer`); });
      });
    });
  });
} else err("GUIDE.specificity not defined");

/* -------- quiz banks -------- */
const summary = [];
for (const kind of ["questions", "levels", "specificity"]) {
  if (!GUIDE[kind]) continue;
  const bank = GQuiz.buildBank(kind);
  bank.conflicts.forEach((c) => warn(`${kind} quiz: "${c.text.slice(0, 60)}…" coded ${c.a} and ${c.b} in different places (first one is used)`));
  const items = bank.items;
  const seg = items.filter((it) => it.spec ? it.seq && (it.seq.length > 1 || it.oneIdea) : it.spans.length > 1 || it.oneSpan).length;
  const types = {};
  if (kind === "specificity") bank.conflicts.forEach((c) => err(`specificity quiz: "${c.text.slice(0, 60)}" has conflicting answers ${c.a} vs ${c.b}`));
  summary.push(`${kind}: bank ${items.length} items (${seg} ${kind === "specificity" ? "idea-splitting" : "span/segmentation"} items)`);
  if (items.length < 60) err(`${kind} quiz bank only has ${items.length} items (want ≥ 60)`);
  for (let run = 0; run < 300; run++) {
    const qs = GQuiz.sample(kind, items);
    if (qs.length !== Math.min(20, items.length)) err(`${kind}: sample produced ${qs.length} questions`);
    const uids = new Set(qs.map((q) => q.it.uid));
    if (uids.size !== qs.length) err(`${kind}: duplicate item in one quiz`);
    qs.forEach((q) => {
      const vals = q.options.map((o) => o.value);
      if (!vals.includes(q.answer)) err(`${kind}: answer ${q.answer} missing from options for ${q.it.uid}`);
      if (new Set(vals).size !== vals.length) err(`${kind}: duplicate options for ${q.it.uid}`);
      if (vals.length < (q.type === "what" || q.type === "instance" ? 2 : 3)) err(`${kind}: only ${vals.length} options for ${q.it.uid}`);
      if (run === 0 || run % 10 === 0) types[q.type] = (types[q.type] || 0) + 1;
    });
    if (errors.length > 50) break;
  }
  summary.push(`  question types (sampled): ${Object.entries(types).map(([k, v]) => k + " " + v).join(", ")}`);
}

const uniq = (a) => [...new Set(a)];
const out = [...uniq(errors).map((e) => "ERROR  " + e), ...uniq(warnings).map((w) => "warn   " + w)];
console.log(out.join("\n"));
console.log("\n" + summary.join("\n"));
console.log(`anchors registered: ${G.anchors.size}; example ids: ${ids.size}`);
console.log(errors.length ? `\n✗ ${uniq(errors).length} error(s)` : "\n✓ all checks passed");
process.exit(errors.length ? 1 : 0);
