/* Section 4 (Specificity).  See README.md for the content format.

   A specificity example ("sx") is:
     { id, t, lv, code, notes }                    one idea
     { id, ideas: [{ t, lv, code }, …], notes }    a comment split into ideas
   lv   = the feedback level used to highlight the text (FT, FP, FR) or null
   code = "none" | "instance" | "what" | "both" | "notcoded"
   what / instance = true | false when the guidelines only answer that one
   question for the sentence (used by the quiz).
   oneIdea: true marks a comment the guidelines say is ONE idea. */
window.GUIDE = window.GUIDE || {};

(function () {
  const CODE_LINE = { none: "Code: **None** (blank).", instance: "Code: **Instance**.", what: "Code: **What**.", both: "Code: **Both**." };
  /* One worked example from the "Examples" part of 4.3: the two answers and the code. */
  function E(id, lv, t, code, inst, what, fr) {
    const notes = [];
    if (fr) notes.push("Q1 from FR definition: " + fr[0], "Q2 from FR definition: " + fr[1]);
    notes.push("‘Instance’ question: " + inst, "‘What’ question: " + what, CODE_LINE[code]);
    return { sx: { id, t, lv, code, notes } };
  }
  /* A sentence quoted in the rules, where the guidelines give one answer only. */
  const W = (id, t, what) => ({ sx: { id, t, what } });
  const I = (id, t, instance, code) => ({ sx: { id, t, instance, code } });
  const C = (id, t, code) => ({ sx: { id, t, code } });

  GUIDE.specificity = {
    id: "specificity",
    sectionNumber: "4",
    title: "Specificity",
    intro: "As the name suggests, specificity records how specific a feedback comment is to a student by considering two dimensions: (1) is it clear where in the student’s submission the feedback comment is being applied, and (2) does this comment provide specific detail such as what is correct, incorrect or missing. Specificity is coded for each idea in a comment, which is elaborated on in section 4.3. The main rule is below:",
    mainRule: {
      title: "Specificity Main Rule",
      intro: "Split the comment into ideas (see 4.3), then answer both questions below for each idea.",
      questions: [
        { key: "1", id: "q-instance", label: "Instance question:", text: "Does the idea point to a particular instance in the student’s submission?", section: "4.1" },
        { key: "2", id: "q-what", label: "What question:", text: "Does the idea say what in particular is correct, incorrect or missing, or name a particular method or action?", section: "4.2" }
      ],
      table: [["No", "No", "none"], ["Yes", "No", "instance"], ["No", "Yes", "what"], ["Yes", "Yes", "both"]]
    },
    afterRule: "Note that specificity is independent of the feedback-questions and feedback-level coding. We do not label the none spans, but just leave them.",

    sections: [
      /* ---------------------------------------------------------------- 4.1 */
      {
        section: "4.1",
        title: "The ‘Instance’ Question",
        blocks: [
          { p: "Nicol (2010) describes specific feedback as “pointing to instances in the student’s submission where the feedback applies” (p. 512)." },
          { p: "An idea points to an instance if its words identify either:" },
          { ol: [
            { key: "a", text: "**A location in the submission**, such as a:", sub: [
              "Section (e.g. “your introduction”)",
              "Paragraph (e.g. “the second paragraph”)",
              "Figure (e.g. “Figure 3”)",
              "Table",
              "Question (e.g. “Question 2b”)"
            ] },
            { key: "b", text: "**Particular content from the submission**, such as an:", sub: [
              "Item",
              "Quotation",
              "Source (e.g. “your use of C. S. Lewis”)",
              "A name (e.g. “variable names like temp2 and x”)",
              "The student’s data (e.g. “your data”)",
              "A choice the student made (e.g. “why you chose interviews over surveys”)."
            ] }
          ] },
          { p: "The following **DO NOT** point to an instance:" },
          { list: [
            { text: "**General aspects that every submission has**, such as the argument, structure, analysis, writing or presentation (e.g. “Your argument is weak”, “Good analysis”).", sub: [
              I("s41-argument-weak", "Your argument is weak", false),
              I("s41-good-analysis", "Good analysis", false)
            ] },
            { text: "**Areas that run through the whole work**, such as spelling, referencing, formatting or variable naming (e.g. “Your referencing is inconsistent”).", sub: [
              I("s41-referencing-inconsistent", "Your referencing is inconsistent", false)
            ] },
            { text: "**Items picked out only by their fault or a count**, such as “Two sources are websites”, “Some of your citations are missing page numbers” or “You have several spelling errors”. The examples given tell us what kind of thing is wrong, but not which items they are (a student would have to search the submission to locate them).", sub: [
              I("s41-two-sources", "Two sources are websites", false),
              I("s41-citations-page-numbers", "Some of your citations are missing page numbers", false),
              I("s41-several-spelling", "You have several spelling errors", false),
              { text: "Regarding the example “two sources are websites”, if it was changed to “your sources by Smith and Jones are websites”, this is now specific because it points to the specific instance (in fact, this would be coded as __BOTH__).", sub: [
                I("s41-smith-jones", "your sources by Smith and Jones are websites", true, "both")
              ] }
            ] },
            "**The whole work**, such as “your essay”, “this report”, “your submission”, a draft (“your second draft”) or a mark.",
            { text: "**“This”, “that” and “here”**, where it is not clear where to find what the marker is referring to. We are assuming that for the purposes of this annotation task, the feedback is written as comments and not anchored to specific parts of the work. This is true for the data we are annotating (we acknowledge that this is not always the case), and hence we treat “this”, “that” and “here” comments as not specific. An exception is if the rest of the words identify particular content, such as “How confident are you in this value for g?”, where the student could easily navigate to this line of working, so it does satisfy the instance question.", sub: [
              I("s41-value-for-g", "How confident are you in this value for g?", true)
            ] }
          ] },
          { callout: { title: "In general", text: "This really distils to: could someone holding only the submission and the feedback idea find the exact place or content referenced? If not, the answer is no." } }
        ]
      },

      /* ---------------------------------------------------------------- 4.2 */
      {
        section: "4.2",
        title: "The ‘What’ Question",
        blocks: [
          { p: "An idea answers the ‘What’ question when it does one of the following:" },
          { list: [
            { text: "**Says what in particular is correct**", sub: [
              W("s42-intro-states-argument", "Your introduction clearly states the argument.", true),
              { text: "“Your introduction is good” is too general, so is not valid.", sub: [W("s42-intro-good", "Your introduction is good", false)] }
            ] },
            { text: "**Says what in particular is incorrect**", sub: [
              W("s42-correlation", "You confuse correlation with causation.", true),
              W("s42-several-spelling", "You have several spelling errors", true),
              W("s42-citations-page-numbers", "Some of your citations are missing page numbers", true),
              { text: "“There are a few errors” does not say what kind of error, so is not valid.", sub: [W("s42-few-errors", "There are a few errors", false)] }
            ] },
            { text: "**Says what in particular is missing**", sub: [
              W("s42-treaty", "Include more about the Treaty of Versailles.", true),
              W("s42-lacks-evidence", "Your argument lacks evidence.", true),
              "Naming the kind of thing that is missing is enough."
            ] },
            { text: "**Gives a verdict – good or bad – on an area with set rules.**", sub: [
              { text: "Some areas, such as spelling, grammar, referencing and units, follow set rules that the student can look up. The student can check their work against the rules without being told more.", sub: [
                { text: "On the contrary, a verdict on an area judged on quality, such as analysis or argument, does not answer the ‘What’ question, because there are no rules for the student to check against (e.g. “Your analysis lacks depth.”)", sub: [
                  W("s42-analysis-depth", "Your analysis lacks depth.", false)
                ] },
                { label: "*Areas with set rules*", text: "spelling, grammar, punctuation, referencing and citations, units, significant figures, formatting, variable naming." },
                { label: "*Areas judged on quality*", text: "argument, structure, analysis, writing, presentation, clarity, depth, critical thinking, tone, code comments." },
                { label: "*For an area not listed, ask*", text: "could the student fix this using a dictionary, style guide or set of rules, without being told more? If yes, it is an area with set rules." }
              ] },
              W("s42-spelling-poor", "Your spelling is poor", true),
              W("s42-referencing-inconsistent", "Your referencing is inconsistent", true),
              W("s42-referencing-accurate", "Your referencing is accurate", true)
            ] },
            { text: "**Names a particular method or action,** whether it advises it, evaluates it, or asks about it.", sub: [
              { text: "Advises: “Use the SWOT analysis process”, “Proofread your work.”", sub: [
                W("s42-swot", "Use the SWOT analysis process", true),
                W("s42-proofread", "Proofread your work.", true)
              ] },
              { text: "Evaluates: “Your proofreading was thorough.”", sub: [W("s42-proofreading-thorough", "Your proofreading was thorough.", true)] },
              { text: "Asks about: “Did you proofread before submitting?”", sub: [W("s42-did-you-proofread", "Did you proofread before submitting?", true)] }
            ] }
          ] },
          { heading: "Other considerations" },
          { rules: [
            { key: "a", title: "The ‘Instance’ and ‘What’ questions are answered separately.", body: [
              { text: "For example, “Good use of C. S. Lewis”:", sub: [
                "Answers the ‘Instance’ question: Anyone holding the submission could find where the student discusses C. S. Lewis.",
                "Does not answer the ‘What’ question: “good” tells the student that their use of C. S. Lewis was successful, not what made it successful. By contrast, “Your use of C. S. Lewis clearly supports your argument about moral law” answers both questions."
              ] }
            ] },
            { key: "b", title: "Quality words on their own DO NOT answer the ‘What’ question.", body: [
              "Quality words, such as “good”, “excellent”, “weak”, “clear”, “thorough”, “lacks depth” or “not analytical enough” say that something is good or bad, not what in particular is good or bad.",
              { text: "To test if something answers the ‘What’ question, ignore the quality word and the instance. If something particular is still left, the idea answers the ‘What’ question:", sub: [
                "“Your introduction clearly states the argument” → “states the argument”: answers it. It says what the introduction contains.",
                "“Your proofreading was thorough” → “your proofreading”: answers it (a particular method).",
                "“Your referencing is accurate” → “referencing”: answers it (an area with set rules).",
                { text: "“The aim and hypothesis are not clearly stated” → “stated” - does not answer it. The aim and hypothesis are the instance, so once they and “not clearly” are set aside, nothing particular is left.", sub: [
                  W("s42b-aim-hypothesis", "The aim and hypothesis are not clearly stated", false)
                ] }
              ] }
            ] },
            { key: "c", title: "A verdict on an area judged on quality DOES NOT answer the ‘What’ question.", body: [
              { text: "Saying that the analysis, argument, structure, depth or clarity is good or bad does not say what in particular is good or bad. All of the following do not answer the ‘What’ question:", sub: [
                W("s42c-argument-weak", "Your argument is weak", false),
                W("s42c-good-analysis", "Good analysis", false),
                W("s42c-not-analytical", "This essay is not sufficiently analytical", false)
              ] }
            ] },
            { key: "d", title: "Saying that something is wrong without saying what DOES NOT answer the ‘What’ question.", body: [
              { text: "Examples:", sub: [
                W("s42d-section-needs-work", "This section needs work.", false),
                W("s42d-few-errors", "There are a few errors.", false)
              ] }
            ] },
            { key: "e", title: "Asking for more or better of something without saying what to do DOES NOT answer the ‘What’ question.", body: [
              { text: "Examples:", sub: [
                W("s42e-industrial-revolution", "Your coverage of the Industrial Revolution is thin", false),
                W("s42e-differential-diagnoses", "Your discussion of differential diagnoses could also be expanded", false),
                W("s42e-revise-carefully", "Revise more carefully", false)
              ] },
              "Naming the part that needs more answers the ‘Instance’ question, not the ‘What’ question.",
              { text: "Saying what to add or do does answer it:", sub: [
                C("s42e-compare-history", "Expand your discussion of differential diagnoses by comparing them with the patient’s history", "both"),
                C("s42e-timeline", "Make a timeline of your milestones before you start writing", "what")
              ] },
              { text: "This rule does not apply to areas with set rules. Asking for better spelling, grammar, referencing or units does answer the ‘What’ question, because the student can check their work against the rules:", sub: [
                C("s42e-spelling-improve", "Your spelling needs to improve", "what"),
                C("s42e-careful-referencing", "Be more careful with your referencing", "what")
              ] }
            ] },
            { key: "f", title: "General advice, actions and ways of working DO NOT answer the ‘What’ question.", body: [
              { text: "Examples:", sub: [
                W("s42f-different-approach", "Try a different approach", false),
                W("s42f-expand-analysis", "Expand your analysis", false),
                W("s42f-improve-this", "Improve this", false),
                W("s42f-ask-for-help", "Ask for help", false),
                W("s42f-feedback-on-board", "Take feedback on board", false),
                W("s42f-work-harder", "Work harder", false),
                W("s42f-start-earlier", "Start your assignments earlier", false)
              ] },
              "This also includes general mentions of time management or study habits.",
              { text: "Naming who or what makes it particular. Examples:", sub: [
                C("s42f-ask-tutor", "Ask your tutor for feedback on a draft", "what")
              ] },
              { text: "Pointing to a whole document that covers the whole task, such as the assessment brief, the rubric or an exemplar, DOES NOT answer the ‘What’ question. The student knows what to read, but not what to look for or change. Naming a part of the document, or a document about one area, does. Examples:", sub: [
                C("s42f-assessment-brief", "Refer to the assessment brief", "none"),
                C("s42f-check-rubric", "Check the rubric", "none"),
                C("s42f-criterion-3", "Refer to criterion 3 of the rubric", "what"),
                C("s42f-writing-centre", "Use the writing centre’s referencing guide", "what")
              ] }
            ] }
          ] },
          { compare: { title: "Comparison examples", items: [
            { id: "s42-cmp-standard", title: "Describing a standard", pair: [
              { t: "A distinction-level report would critically evaluate the sources rather than summarise them.", what: true, note: "‘What’ question: yes. It names a particular action - critically evaluating the sources rather than summarising them." },
              { t: "A distinction-level report would show a high level of understanding.", what: false, note: "‘What’ question: no. It says that the report would be good, not what it would do." }
            ] },
            { id: "s42-cmp-set-rules", title: "An area with set rules vs an area judged on quality", pair: [
              { t: "Your spelling is poor.", what: true, note: "‘What’ question: yes. Spelling has set rules - the student can check each word against a dictionary." },
              { t: "Your analysis lacks depth.", what: false, note: "‘What’ question: no. Analysis is judged on quality - there are no rules the student can check it against." }
            ] },
            { id: "s42-cmp-verdict", title: "A verdict vs saying what in particular is wrong", pair: [
              { t: "Your method section comes before your aims.", what: true, note: "‘What’ question: yes. It says what is wrong with the structure." },
              { t: "Your structure is confusing.", what: false, note: "‘What’ question: no. Structure is judged on quality - “confusing” doesn’t say what in particular is wrong." }
            ] },
            { id: "s42-cmp-missing", title: "Naming what is missing vs a verdict.", pair: [
              { t: "Your argument lacks evidence.", what: true, note: "‘What’ question: yes. It names the kind of thing that is missing (evidence)." },
              { t: "Your argument is weak.", what: false, note: "‘What’ question: no. Argument is judged on quality – “weak” doesn’t say what in particular is wrong." }
            ] },
            { id: "s42-cmp-left", title: "Something particular left vs only the instance left.", pair: [
              { t: "Your introduction clearly states the argument.", what: true, note: "‘What’ question: yes. Ignoring “clearly” and the instance (the introduction) leaves “states the argument”, which says what the introduction contains." },
              { t: "The aim and hypothesis are not clearly stated.", what: false, note: "‘What’ question: no. The aim and hypothesis are the instance. Ignoring them and “not clearly” leaves only “stated”, which says nothing particular." }
            ] }
          ] } }
        ]
      },

      /* ---------------------------------------------------------------- 4.3 */
      {
        section: "4.3",
        title: "Coding by Idea",
        blocks: [
          { p: "Specificity is coded for each idea in a comment, not for each question span or level span." },
          { box: { text: "An idea is one point the marker makes about one thing: a single judgement, a single piece of advice or a single question.", list: [
            "**Split** when the comment moves on to a different thing or makes a different point.",
            "**Keep together** a point and its reason or explanation.",
            "**Do not code self-level ideas.**"
          ] } },
          { examples: { title: "Examples of splitting", items: [
            { sx: { id: "s43-intro-treaty", ideas: [
              { t: "Good job with your introduction. ", lv: "FT", code: "instance" },
              { t: "Include more about the Treaty of Versailles.", lv: "FT", code: "what" }
            ], notes: [
              "Two ideas: a judgement about the introduction, then advice about missing content.",
              "First idea: **Instance** (points to the introduction; “good job” says that it is good, not what is good about it).",
              "Second idea: **What** (says what is missing, doesn’t point to an instance).",
              "Coding the two sentences together would wrongly suggest that one idea does both."
            ] } },
            { sx: { id: "s43-intro-conclusion", ideas: [
              { t: "Your introduction clearly states the argument, ", lv: "FT", code: "both" },
              { t: "but your conclusion just repeats it.", lv: "FT", code: "both" }
            ], notes: [
              "Two ideas: the comment moves from the introduction to the conclusion.",
              { text: "First idea: **Both**.", sub: [
                "Instance: “your introduction” is a location in the submission.",
                "What: it says what is good about the introduction (it clearly states the argument)."
              ] },
              { text: "Second idea: **Both**.", sub: [
                "Instance: “your conclusion” is a location in the submission.",
                "What: it says what is wrong with the conclusion (it just repeats the argument)."
              ] }
            ] } },
            { sx: { id: "s43-strong-because", t: "Your introduction is strong because it clearly states the argument.", lv: "FT", code: "both", oneIdea: true, notes: [
              "One idea: the second half is the reason for the first.",
              { text: "Code: **Both**.", sub: [
                "Instance: “your introduction” is a location in the submission.",
                "What: the reason says what is good about it (it clearly states the argument). “Strong” on its own would not be enough."
              ] }
            ] } },
            { sx: { id: "s43-treaty-since", t: "Include more about the Treaty of Versailles, since it explains the economic collapse you describe.", lv: "FT", code: "both", oneIdea: true, notes: [
              "One idea: the second half explains the advice.",
              { text: "Code: **Both**.", sub: [
                "Instance: “the economic collapse you describe” is particular content from the submission.",
                "What: “include more about the Treaty of Versailles” says what is missing.",
                "Because it is one idea, both answers count together."
              ] }
            ] } },
            { sx: { id: "s43-natural-writer", ideas: [
              { t: "You’re a natural writer, ", lv: null, code: "notcoded" },
              { t: "and your introduction clearly states the argument.", lv: "FT", code: "both" }
            ], notes: [
              "Two ideas: the first is about the student (self-level), the second about the work.",
              "First idea: not coded.",
              { text: "Second idea: **Both**.", sub: [
                "Instance: “your introduction” is a location in the submission.",
                "What: it says what is good about the introduction (it clearly states the argument)."
              ] }
            ] } }
          ] } },
          { heading: "Other rules" },
          { list: [
            "**Use only the idea’s own words.** Do not fill in what the idea refers to from other parts of the comment.",
            "**Specificity never changes the question or the level.** A vague idea and a detailed one about the same thing get the same level and question."
          ] }
        ]
      },

      /* ------------------------------------------------------- Examples */
      {
        section: "4.3",
        id: "s-4-examples",
        title: "Examples",
        unnumbered: true,
        blocks: [
          { examples: { title: "Task level", items: [
            E("s4-excellent-submission", "FT", "Excellent submission.", "none", "no. It is about the whole work.", "no. “Excellent” says that the work is good, not what is good about it."),
            E("s4-argument-weak", "FT", "Your argument is weak.", "none", "no. The argument is a general aspect of the work.", "no. “Weak” says that the argument is bad, not what is wrong with it."),
            E("s4-good-job-intro", "FT", "Good job with your introduction.", "instance", "yes. The introduction is a location in the submission.", "no. “Good job” says that the introduction is good, not what is good about it."),
            E("s4-good-use-lewis", "FT", "Good use of C. S. Lewis.", "instance", "yes. C. S. Lewis is particular content from the submission.", "no. “Good” says that the use was successful, not what made it successful."),
            E("s4-industrial-revolution", "FT", "Your coverage of the Industrial Revolution is thin.", "instance", "yes. The coverage of the Industrial Revolution is particular content from the submission.", "no. It says that more is needed, but not what to add."),
            E("s4-issues-data", "FT", "There are some issues with your data.", "instance", "yes. The student’s data can be found in the submission.", "no. “Some issues” says that something is wrong, not what."),
            E("s4-lewis-moral-law", "FT", "Your use of C. S. Lewis clearly supports your argument about moral law.", "both", "yes. C. S. Lewis is particular content from the submission.", "yes. It says what is good about the use (it supports the argument about moral law)."),
            E("s4-treaty", "FT", "Include more about the Treaty of Versailles.", "what", "no. Missing content cannot be pointed to.", "yes. It says what is missing."),
            E("s4-correlation-paragraph", "FT", "In this paragraph you confuse correlation with causation.", "what", "no. “This paragraph” cannot be identified from the words.", "yes. It says what is wrong."),
            E("s4-several-spelling", "FT", "You have several spelling errors.", "what", "no. It does not say where the errors are.", "yes. It names the type of error (spelling)."),
            E("s4-two-sources", "FT", "Two sources are websites.", "what", "no. It does not say which two sources.", "yes. It says what is wrong with them (they are websites)."),
            E("s4-spelling-poor", "FT", "Your spelling is poor.", "what", "no. Spelling runs through the whole work.", "yes. Spelling has set rules, so the student can check each word against a dictionary."),
            E("s4-referencing-inconsistent", "FT", "Your referencing is inconsistent.", "what", "no. Referencing runs through the whole work (in-text citations as well as the reference list).", "yes. Referencing has set rules, so the student can check each reference against the referencing style."),
            E("s4-reference-list", "FT", "Your reference list is inconsistent.", "both", "yes. The reference list is a location.", "yes. Referencing has set rules, so the student can check each reference against the referencing style."),
            E("s4-intro-states-argument", "FT", "Your introduction clearly states the argument.", "both", "yes. The introduction is a location.", "yes. It says what is good about it (it clearly states the argument), not just that it is good."),
            E("s4-variable-names", "FT", "Variable names like temp2 and x make the code hard to read.", "both", "yes. temp2 and x are particular content.", "yes. It says what is wrong with them.")
          ] } },
          { examples: { title: "Process level", items: [
            E("s4-different-approach", "FP", "Try a different approach.", "none", "no.", "no. It does not name a particular method."),
            E("s4-time-management", "FP", "Your time management let you down.", "none", "no.", "no. Time management is a general way of working, not a particular method."),
            E("s4-start-earlier", "FP", "Start your assignments earlier.", "none", "no.", "no. It is general time-management advice - it does not say how much earlier or name a particular step."),
            E("s4-proofread", "FP", "Proofread your work.", "what", "no.", "yes. Proofreading is a particular method."),
            E("s4-read-aloud", "FP", "Read your work aloud, sentence by sentence, to catch errors your eye skips over.", "what", "no.", "yes. It names a particular method. The extra detail does not change the code."),
            E("s4-proofread-conclusion", "FP", "Proofread your conclusion before submitting.", "both", "yes. The conclusion is a location.", "yes. Proofreading is a particular method."),
            E("s4-swot-feedback-section", "FP", "In the feedback section, use the SWOT analysis process.", "both", "yes. The feedback section is a location.", "yes. SWOT analysis is a particular method."),
            E("s4-proofreading-thorough", "FP", "Your proofreading was thorough.", "what", "no. Proofreading is a method, not content in the submission.", "yes. It names a particular method (proofreading). “Thorough” on its own would not be enough."),
            E("s4-did-you-proofread", "FP", "Did you proofread before submitting?", "what", "no.", "yes. It asks about a particular method."),
            E("s4-proofreading-section-2", "FP", "Your proofreading of Section 2 was thorough.", "both", "yes. Section 2 is a location.", "yes. It evaluates a particular method.")
          ] } },
          { examples: { title: "Self-regulation level", items: [
            E("s4-differently-next-time", "FR", "Think about what you’d do differently next time.", "none", "no.", "no.",
              ["the student is asked to direct their own way of working.", "no plan is supplied, so they must come up with it themselves."]),
            E("s4-interviews-surveys", "FR", "Consider why you chose interviews over surveys.", "instance", "yes. The choice of interviews over surveys is particular content from the submission.", "no. It does not say whether the choice was right or wrong.",
              ["the student is asked to judge their own decision (the choice of interviews).", "no verdict is given, so the student must think the question through themselves."]),
            E("s4-value-for-g", "FR", "How confident are you in this value for g?", "instance", "yes. “This” alone would not count, but the student’s value for g can be found in the submission.", "no. It asks how confident the student is, but does not say whether the value is right or wrong, or name a method.",
              ["the student is asked to judge their own understanding (how sure they are that their answer is right).", "no verdict is given, so the student must make the judgement."]),
            E("s4-catching-errors", "FR", "Well done for catching and correcting your own errors in the second draft.", "what", "no. The second draft is a whole version of the work, not a part of it, and the errors are not identified (once corrected, they cannot be found).", "yes. It says what the student did well (caught and corrected their own errors).",
              ["the fragment evaluates how the student monitored their own work (catching their own errors), not the work itself.", "the judgement being evaluated (finding the errors) was the student’s to make, and they made it without the marker pointing the errors out."]),
            E("s4-recognised-weaknesses", "FR", "You clearly recognised the weaknesses in your own experimental design in your reflection, especially the small sample size.", "both", "yes. The reflection is a part of the submission, and the small sample size is particular content.", "yes. It says what the student did well (recognised the weaknesses, especially the small sample size).",
              ["the fragment evaluates how the student judged their own work (recognising weaknesses in their design), not the design itself.", "the judgement (spotting the weaknesses) was the student’s to make, and they made it without the marker pointing them out."]),
            E("s4-ask-for-help", "FR", "Next time, think about when to ask for help.", "none", "no.", "no. “Ask for help” is a general action: it does not say who to ask or how.",
              ["the student is asked to judge when to seek help.", "no timing or source is supplied, so the student must decide."])
          ], after: "Self-regulation prompts answer the What question only when they name a particular method or action. Most don’t, because the student is left to work it out: if a prompt said what was wrong or which method to use, the student would no longer have to make the judgement themselves, and it would not be self-regulation (FR question 2). Self-regulation evaluations can answer both questions." } },
          { examples: { title: "Feed up", items: [
            E("s4-assessment-brief", null, "Refer to the assessment brief.", "none", "no. The brief is not part of the submission.", "no. The brief covers the whole task, so the student knows what to read but not what to look for or change."),
            E("s4-criterion-3", null, "Refer to criterion 3 of the rubric.", "what", "no. The rubric is not part of the submission.", "yes. It names a particular part of the rubric to read."),
            E("s4-distinction-evaluate", null, "A distinction-level report would critically evaluate the sources rather than summarise them.", "what", "no.", "yes. It describes the standard, not this submission, but it names a particular action (critically evaluating the sources rather than summarising them)."),
            E("s4-distinction-understanding", null, "A distinction-level report would show a high level of understanding.", "none", "no.", "no. “A high level of understanding” says that a distinction-level report is good, not what in particular it does. It is a verdict on an area judged on quality, like “Your argument is weak”, applied to the standard. Two students reading it could do quite different things to show a high level of understanding.")
          ] } }
        ]
      },

      /* ---------------------------------------------------------------- 4.4 */
      {
        section: "4.4",
        title: "Basis for These Rules",
        blocks: [
          { heading: "The Two Questions" },
          { list: [
            { text: "**‘Instance’ question**", sub: ["Source: Nicol (2010) lists “Specific: pointing to instances in the student’s submission where the feedback applies” as a quality of good feedback (p. 512)."] },
            { text: "**‘What’ question**", sub: ["Source: Weaver’s (2006) students found comments unhelpful when they were too general or vague to show which features of the work met the criteria and which fell short (pp. 6, 8)."] }
          ] },
          { heading: "References" },
          { p: "Page numbers for Weaver (2006) refer to the author’s postprint, not to the journal pages." },
          { refs: [
            { text: "Nicol, D. (2010). From monologue to dialogue: Improving written feedback processes in mass higher education. *Assessment & Evaluation in Higher Education, 35*(5), 501–517.", url: "https://doi.org/10.1080/02602931003786559" },
            { text: "Weaver, M. R. (2006). Do students value feedback? Student perceptions of tutors’ written responses. *Assessment & Evaluation in Higher Education, 31*(3), 379–394." }
          ] }
        ]
      }
    ]
  };
})();
