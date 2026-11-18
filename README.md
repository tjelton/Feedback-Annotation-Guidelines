# Feedback Annotation Guidelines (digital version)

An interactive, condensed version of the feedback annotation guidelines, built as a static site for GitHub Pages.

- **Section 1:** General Annotation Principles
- **Section 2:** Feedback Questions (feed-up, feed-back, feed-forward)
- **Section 3:** Feedback Levels (self, task, process, self-regulation)
- **Section 4:** Specificity (the ‘Instance’ and ‘What’ questions, coding by idea)

Main rules are always visible. Examples and the "telling them apart" rules expand when clicked. References such as "2.4 rule d" or "FT point a" link to what they mention. Sections 2, 3 and 4 each have a quiz: 20 random questions drawn from every example in the guidelines, with a 90% pass mark and instant feedback that links back to the relevant rule.

## Running locally

There's no build step. Serve the folder with any static server:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works in most browsers.

## Editing the content

All guideline text lives in plain JS data files in `assets/data/`:

| File | Contents |
|---|---|
| `general.js` | Home page overview, change log, Section 1 principles |
| `questions.js` | Section 2 (2.1–2.8) |
| `levels.js` | Section 3 (3.1–3.8) |
| `specificity.js` | Section 4 (4.1–4.4 and the worked examples) |

The pages, the "more examples from elsewhere" lists and the quiz bank are all generated from these files. If you add or edit an example in one place, it updates everywhere.

### Building blocks

**Example.** Each `t` is a span of text and each `c` is its code. Use `null` for text that isn't annotated.
```js
{ id: "fu-purpose",
  spans: [ { t: "The purpose of this assessment task was …", c: "FU" } ],
  notes: [ "This is feed-up as it explains the goal (point a)." ] }
```
- **Multi-span example:** list several spans in order, e.g. `[{t:"Make sure you proofread, ", c:"FF"}, {t:"as there are several spelling errors", c:"FB"}]`.
- `oneSpan: true` marks an example that the guidelines stress is one span (e.g. "one FF span").
- **Comparisons ("A" vs "B"):** `{ id, vs: [ {spans:[…]}, {spans:[…]} ], notes:[…] }`.
- `quiz: false` keeps an example out of the quiz, e.g. fragments with "…" or examples whose coding depends on context.

**Specificity example (Section 4).** The text is highlighted in its feedback-level colour (`lv`) and each idea gets a specificity code: `none`, `instance`, `what`, `both` or `notcoded` (self-level ideas).
```js
{ sx: { id: "s4-good-job-intro", t: "Good job with your introduction.", lv: "FT", code: "instance", notes: [ … ] } }
{ sx: { id: "s43-intro-treaty", ideas: [ { t: "Good job with your introduction. ", lv: "FT", code: "instance" },
                                         { t: "Include more about the Treaty of Versailles.", lv: "FT", code: "what" } ], notes: [ … ] } }
```
- A sentence the guidelines only answer one question for has `what: true/false` (or `instance: true/false`) instead of a code.
- `oneIdea: true` marks a comment the guidelines say is one idea.
- Section 4 pages are built from `blocks`: `{p}`, `{heading}`, `{list}`, `{ol}` (lettered points), `{callout}`, `{box}`, `{rules}` (the expandable a)–f) considerations), `{examples}` (a foldable list), `{compare}` (Sentence 1 vs Sentence 2) and `{refs}`.

**Notes / rule bodies.** These are lists whose items are:
- a string
- `{ text, sub: [...] }` (nested bullets)
- `{ ex: Example }` (an embedded, clickable example)
- `{ label: "CASE 1", text, sub }`

**Inline markup** can be used in any string:
- `[[FU:text]]` is a coded span inside prose.
- `{{2.4d|rule d}}` is an explicit link. Key forms:
  - `2.4` (section)
  - `2.4d` (rule)
  - `FU.a` (main-rule point)
  - `FR.ce.b` (FR common example)
  - `P5` (Section 1 Principle 5)
  - `ex:<id>` (an example)
- `**bold**`, `*italic*` and `__underline__` give plain emphasis.

**Automatic links** need no markup. These patterns become links on their own:
- "2.4 rule d"
- "FT point a" / "FU (point b)"
- "FR case e"
- "Section 1 Principle 5"
- "section 3.8"
- "common example c"
- "Q1 from FR definition" / "FR question 2"
- a bare "point a" inside a category's examples
- a bare "rule d" inside a distinguishing section

### Check your edits

```sh
node tools/validate.mjs
```

This checks that:
- the data loads
- example ids are unique
- span codes are valid
- every cross-reference points at something that exists
- each quiz bank is large enough and every generated question is answerable

It also prints the quiz bank sizes.

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, then branch `main`, folder `/ (root)`.
4. The site appears at `https://<user>.github.io/Feedback-Annotation-Guidelines/`.

`.nojekyll` is included so GitHub serves the files as they are.

## Private files

`Assets_Dont_Commit/` (the source PDF, transcripts, prompts) and `Prompt.md` are listed in `.gitignore` and are never committed.

## Quiz details

- **Questions per attempt:** 20, with around 5 "how should this be split and coded?", 2 "how many spans?", and the rest "which code?". The "which code?" questions are balanced across codes.
- **Specificity quiz:** 3 "how should this be split into ideas?", 2 "how many ideas?", and the rest a mix of "which specificity code?" and "does this answer the ‘What’ question?", balanced across answers.
- **Bank:** every example in the section plus the Section 1 examples that carry that kind of coding. Duplicate sentences are counted once.
- **Difficulty:** every question is tagged easy, medium or hard. *Hard* means any "split and code" question, or an example from a "telling them apart" rule, a deviation, a Section 1 principle, a note, a comparison (A vs B, or an example nested in another example's explanation), or a fragment that should be left unannotated. *Easy* means a plain example from a category's main list (in Section 4, a main-rule or worked example) asked as "which code?". Everything else is *medium*. Each attempt has at most 15% easy questions (3 of 20) and at least 60% hard ones (12 of 20), more when the bank allows. `node tools/validate.mjs` prints the actual mix.
- **Bank numbers:** each item in a bank has a number (#1, #2, …) in guideline order. It is shown on every question. Numbers shift if examples are added, removed or reordered, so the export also gives each example's ID, which doesn't change.
- **Attempt history and export:** every answer is saved in the browser's localStorage as it is given, so unfinished attempts are kept too. "Download all attempts (CSV)" on the Quizzes page and the results page exports one row per question asked. Each row has the attempt, quiz, date, bank number, example ID, difficulty, question type, the comment, whether the answer was right, the person's answer if it was wrong, and the correct answer. The history is per browser: annotators need to download the file and send it to you.
- **Progress is kept:** the quiz in progress is saved in localStorage after every step. Refreshing, or leaving for another page and coming back, returns to the same question, with its feedback if it was already answered. The Quizzes page shows "Resume quiz (n/20)". A refresh on the results page shows the results again. Links from the guideline pages open the quiz intro once a quiz is finished. Each saved question is a full copy (comment, options, answer, reasoning, revise link). A quiz in progress therefore comes back exactly as it was asked, even if you've since edited or removed that example. New attempts only draw from the current bank, so a removed example isn't asked again.
- **Restart:** "↺ Restart quiz" under each question asks for confirmation, then starts a fresh set of questions. The answers given so far stay in the history, and the attempt shows as "Restarted" in the export.
- **Pass mark:** 90%. A pass is remembered in the browser's localStorage, shown as a ✓ in the navigation bar and on the home page.
- **To change these:** edit `QUIZ_LENGTH`, `PASS_RATE`, `EASY_SHARE` and `HARD_SHARE` at the top of `assets/js/quiz.js`.
