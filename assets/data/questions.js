// Section 2 – Feedback Question Guidelines (2.1–2.8)
// Transcribed from the annotation guidelines PDF. See SCHEMA for structure.
window.GUIDE = window.GUIDE || {};
window.GUIDE.questions = {
  id: "questions",
  sectionNumber: "2",
  title: "Feedback Question Guidelines",

  intro: [
    { text: "Ramaprasad’s (1983) Definition", heading: true },
    "To better understand the difference between annotating something as feed-up, feed-back and feed-forward, it is useful to consider how each fits into the notion of feedback. Ramaprasad’s (1983) definition of feedback is that “feedback is information about the gap between the actual level and the reference level of a system parameter which is used to alter the gap in some way.” In this way, we can consider feed-up as the reference level we are aiming for, and feed-back as where we currently are. Feed-forward is hence how to close the gap between feed-back and feed-up.",
    { diagram: "ramaprasad" },
    "H&T note that the three feedback questions “are certainly not linearly interpreted or implemented, and the boundaries between them are fuzzy” (p. 103). To keep annotators consistent, this guide gives each fragment only one feedback question and sets clear rules for choosing between them."
  ],

  categories: [
    // ------------------------------------------------------------------ 2.1 FU
    {
      code: "FU", section: "2.1", title: "(FU) Feed-Up",
      mainRule: {
        title: "FU Main Rule",
        intro: "This is any fragment that answers “Where am I going?”. This includes:",
        points: [
          { key: "a", text: "States a goal, purpose or learning outcome, whether of the task or beyond it (e.g. a skill for later study or work)." },
          { key: "b", text: "States a criterion or standard tied to the assessment, or to a later one (e.g. the rubric, a grade, the task requirements)." },
          { key: "c", text: "Points the student to where the goals or criteria are set out, or to an example that shows them (e.g. the rubric, the task sheet, an exemplar)." },
          { key: "d", text: "Describes what good finished work is like, contains, or does for its reader, either as a statement about good work in general or as the reason for a piece of advice." }
        ]
      },
      examples: [
        {
          id: "fu-purpose",
          spans: [ { t: "The purpose of this assessment task was to develop a critical reflection of the origins of democracy.", c: "FU" } ],
          notes: [ "This is feed-up as it explains the goal (point a)." ]
        },
        {
          id: "fu-swot",
          spans: [ { t: "This task assesses your ability to apply the SWOT framework to a real company.", c: "FU" } ],
          notes: [ "This states what the task is for (point a)." ]
        },
        {
          id: "fu-concise",
          spans: [ { t: "Being able to write concisely is a skill you’ll need in your career.", c: "FU" } ],
          notes: [ "This states a goal beyond the task (point a)." ]
        },
        {
          id: "fu-beat-mark",
          spans: [ { t: "Aim to beat your last mark.", c: "FU" } ],
          notes: [
            "This sets a target for the student to aim for (point a). A target is feed-up; advice on how to reach it is feed-forward.",
            "If a method is attached, the method is split off: “[[FU:Aim to beat your last mark]] [[FF:by starting earlier]]” is FU | FF."
          ]
        },
        {
          id: "fu-distinction",
          spans: [ { t: "A distinction-level report will compare at least two theories.", c: "FU" } ],
          notes: [ "This states a standard and ties it to a grade (point b)." ]
        },
        {
          id: "fu-apa",
          spans: [ { t: "Your next assignment will require APA.", c: "FU" } ],
          notes: [
            "This states what a later task requires (point b).",
            "Compare this with “[[FF:In your next report, start with the research question]]”, which tells the student what to do in the later task, so it is feed-forward (FF point c)."
          ]
        },
        {
          id: "fu-heading",
          spans: [ { t: "Presentation and formatting (15 marks):", c: "FU" } ],
          notes: [ "This is a heading from the rubric. It names a criterion and says how much it is worth (point b)." ]
        },
        {
          id: "fu-heading-mark",
          spans: [
            { t: "Presentation and formatting (15 marks): ", c: "FU" },
            { t: "11/15", c: "FB" }
          ],
          notes: [
            "“[[FU:Presentation and formatting (15 marks):]]” is feed-up (point b).",
            "“[[FB:11/15]]” is feed-back (point a), as a mark evaluates the work."
          ]
        },
        {
          id: "fu-task-sheet",
          spans: [ { t: "See the task sheet for the word limit.", c: "FU" } ],
          notes: [ "This points the student to where the criteria are set out (point c)." ]
        },
        {
          id: "fu-hd-sample",
          spans: [ { t: "An HD sample report is in the Week 3 folder on Canvas.", c: "FU" } ],
          notes: [ "This points the student to an example that shows the standard (point c). The sample report doesn’t list the criteria, but it shows what HD-level work looks like. It doesn’t say when or how to use the sample, so it is not FF." ]
        },
        {
          id: "fu-rubric-point",
          spans: [ { t: "Refer to point 1 of the marking rubric.", c: "FU" } ],
          notes: [
            "This is feed-up as it is referring a student to the marking rubric which would specify the goals for an assessment (point c). It tells the student where the standard is, not what to change.",
            {
              text: "Point c applies only when the fragment just sends the student to where the goals or criteria are set out or shown (the rubric, the task sheet, an exemplar). If it says when or how to use them, it is feed-forward. For example:",
              sub: [
                "“[[FF:You might consider having a look at the HD exemplar on Canvas before you start your next essay]]” (FF point c)",
                "“[[FF:Always re-read the task sheet before you submit]]” (FF point b)."
              ]
            }
          ]
        },
        {
          id: "fu-topic-sentence",
          spans: [
            { t: "Make sure each paragraph opens with a topic sentence, ", c: "FF" },
            { t: "so that a reader can follow your argument without having to reread it.", c: "FU" }
          ],
          notes: [
            "The FU part says what good work achieves: an argument the reader can follow (point d).",
            "The italics part is feed-forward (FF point a)."
          ]
        },
        {
          id: "fu-label-axes",
          spans: [
            { t: "Label the axes on every graph, ", c: "FF" },
            { t: "as a reader should be able to interpret each figure without going back to the text.", c: "FU" }
          ],
          notes: [
            "The FU part describes what good finished work is like: figures that make sense on their own (point d).",
            "The first part is feed-forward (FF point a)."
          ]
        },
        {
          id: "fu-good-lab-reports",
          spans: [ { t: "Good lab reports give an uncertainty for every measured value.", c: "FU" } ],
          notes: [ "This describes good work in general and says nothing about this student’s report (point d)." ]
        }
      ]
    },

    // ------------------------------------------------------------------ 2.2 FB
    {
      code: "FB", section: "2.2", title: "(FB) Feed-Back",
      mainRule: {
        title: "FB Main Rule",
        intro: "This is any fragment that answers “How am I going?”. This includes:",
        points: [
          { key: "a", text: "Evaluates the work, or a part of it, positively or negatively." },
          { key: "b", text: "States what the work contains or lacks, in words that describe the work as it is (e.g. “has no”, “lacks”, “is missing”)." },
          { key: "c", text: "Evaluates a method the student used, or how they monitored their own work." },
          { key: "d", text: "Compares the work with earlier work." }
        ]
      },
      preNote: "Note: for the examples, some examples do fit points a and b. For simplicity, only one is conveyed throughout (i.e. if we say it is point a, it could also be point b, and vice versa).",
      examples: [
        {
          id: "fb-objectives",
          spans: [ { t: "Clear objectives and research question. Very good and to the point sub questions.", c: "FB" } ],
          notes: [ "FB as it evaluates the work (point a)." ]
        },
        {
          id: "fb-analysis-insightful",
          spans: [ { t: "Your analysis was both clear and insightful. You have clearly understood the evaluation criteria and how to apply them to identify strengths and weaknesses in your in-depth reading of this published qualitative case study.", c: "FB" } ],
          notes: [
            "FB as it is evaluating current performance (point a).",
            "While it does mention the evaluation criteria, it judges the work against them, so is FB.",
            "It is not FU because it doesn’t say what the criteria are or where to find them, only that the student has met them."
          ]
        },
        {
          id: "fb-well-done",
          spans: [ { t: "Well done.", c: "FB" } ],
          notes: [ "This is generic praise of the work (point a)." ]
        },
        {
          id: "fb-no-conclusion",
          spans: [ { t: "There is no conclusion.", c: "FB" } ],
          notes: [
            "This states what the work lacks (point b).",
            "Even though you can argue that this feedback implies “[[FF:add a conclusion]]” which would be feed-forward, we code what the fragment says, not implies."
          ]
        },
        {
          id: "fb-highlighted",
          spans: [ { t: "I’ve highlighted every unsupported claim in yellow.", c: "FB" } ],
          notes: [
            "FB (point b). It says what the marker did, but it also names a fault in the work in its own words: unsupported claims. A fragment that names a fault in the work, even in passing, is FB.",
            "If the fragment tells the student what to do about the fault (e.g. “[[FF:Fix the unsupported claims]]”), it is FF (FF point a; see 2.5 rule b)."
          ]
        },
        {
          id: "fb-sig-figs",
          spans: [ { t: "Sig figs – your burette only reads to 0.05 mL.", c: "FB" } ],
          notes: [
            "FB (point b). “Sig figs” names where the fault is, and “only” says the burette gives less precision than the student’s figures claim.",
            "“Sig figs” here is the marker’s own shorthand, not a heading from the rubric. If it were a rubric heading, it would be split off as feed-up (see the heading examples in 2.1).",
            "You would have context of the assessment, and if not, go with your gut."
          ],
          quiz: false
        },
        {
          id: "fb-could-be-clearer",
          spans: [ { t: "Your argument could be clearer.", c: "FB" } ],
          notes: [
            "FB (point a). It only names a quality the work falls short on. It doesn’t say what to add, remove or change, and it doesn’t say the work must change.",
            "Compare with “[[FF:Make your argument clearer]]” and “[[FF:Your argument needs to be clearer]]”, which are FF (point a), as these say what to change."
          ]
        },
        {
          id: "fb-lit-search",
          spans: [ { t: "Your literature search was clearly systematic.", c: "FB" } ],
          notes: [ "This evaluates a method the student used (point c)." ]
        },
        {
          id: "fb-caught-typos",
          spans: [ { t: "You should have caught these typos.", c: "FB" } ],
          notes: [
            "It names no change to the work and no method to use; it judges what the student failed to notice, so it is FB.",
            "Compare this with “[[FF:You should have proofread]]”, which names a method and is hence FF (point b)."
          ]
        },
        {
          id: "fb-forget-conclusion",
          spans: [ { t: "Did you forget to include a conclusion?", c: "FB" } ],
          notes: [
            "FB (point b). It is a statement worded as a question. The question says no more than the plain statement “[[FB:There is no conclusion]]” would.",
            "It is not FF, because the question already gives its answer: “forget” says the conclusion is missing."
          ]
        },
        {
          id: "fb-second-draft",
          spans: [ { t: "Your second draft is much improved.", c: "FB" } ],
          notes: [ "This compares the work with earlier work (point d)." ]
        }
      ]
    },

    // ------------------------------------------------------------------ 2.3 FF
    {
      code: "FF", section: "2.3", title: "(FF) Feed-Forward",
      mainRule: {
        title: "FF Main Rule",
        intro: "This is any fragment that answers “Where to next?”. This includes:",
        points: [
          { key: "a", text: "Says what to add, remove or change in the work." },
          { key: "b", text: "Names a method, habit, tool or strategy to use." },
          { key: "c", text: "Gives advice for a later task, or for the student’s learning in general." },
          { key: "d", text: "Asks the student a question to think through or to answer, without giving the answer." }
        ]
      },
      examples: [
        {
          id: "ff-worked-example",
          spans: [ { t: "This would be stronger with a worked example.", c: "FF" } ],
          notes: [ "It says what to add (point a)." ]
        },
        {
          id: "ff-worked-example-past",
          spans: [ { t: "This would have been stronger with a worked example.", c: "FF" } ],
          notes: [ "FF (point a). The past tense (“would have been”) doesn’t change what it says to add." ]
        },
        {
          id: "ff-table",
          spans: [ { t: "You might consider adding a table.", c: "FF" } ],
          notes: [ "FF (point a). It says what to add; “you might consider” only softens the advice." ]
        },
        {
          id: "ff-results-section",
          spans: [ { t: "Make sure in your results or findings section to mention to what extent your respondents agree or disagree with each other and to what extent you feel your results are representing the opinion of all millennials you interviewed.", c: "FF" } ],
          notes: [ "FF as it contains actionable steps on how to progress to the goal state (point a)." ]
        },
        {
          id: "ff-codebase",
          spans: [ { t: "It’s going to be a long codebase so it’s good to keep a good code structure and test incrementally as you go.", c: "FF" } ],
          oneSpan: true,
          notes: [ "This is one FF span (point b). “It’s going to be a long codebase” is background for the advice, so it is included in the same span (Section 1 Principle 5)." ]
        },
        {
          id: "ff-proofread-thesis",
          spans: [
            { t: "Please make sure to proofread the thesis ", c: "FF" },
            { t: "to avoid minor grammatical errors.", c: "FU" }
          ],
          notes: [
            "“[[FF:Please make sure to proofread the thesis]]” is FF (point b).",
            "“[[FU:to avoid minor grammatical errors]]” is FU (point d). This is because you would see the result in the finished work: a thesis without minor grammatical errors."
          ]
        },
        {
          id: "ff-error-log",
          spans: [ { t: "Keep a log of the errors I’ve marked so you can spot your patterns.", c: "FF" } ],
          oneSpan: true,
          notes: [
            "This is one FF span (point b). “Keep a log of the errors I’ve marked” names a habit for the student to use.",
            {
              text: "“So you can spot your patterns” is not split off as FU. It doesn’t give the assessment as a reason, and it doesn’t describe the finished work: you would not see the student spotting their patterns by looking at the work (FU point d). It is what the log helps the student do, so it stays in the FF (point b) span.",
              sub: [
                "Compare “[[FF:Please write comments on important long logic blocks]] [[FU:such that other people can understand more easily]]”. There the reason is a quality of the work itself (code that other people can understand), so it is split off as FU (point d)."
              ]
            }
          ]
        },
        {
          id: "ff-office-hours",
          spans: [ { t: "Come and see me in office hours if you’d like to talk through the regression output.", c: "FF" } ],
          notes: [ "This is FF (point b). Going to the marker for help is a strategy the student can use." ]
        },
        {
          id: "ff-margin-comments",
          spans: [ { t: "See my margin comments.", c: "FF" } ],
          notes: [ "This is FF (point b). It points to the marker’s own feedback, not to the goals or criteria, so it is not FU." ]
        },
        {
          id: "ff-next-report",
          spans: [ { t: "In your next report, start with the research question.", c: "FF" } ],
          notes: [ "This is advice for a later task (point c)." ]
        },
        {
          id: "ff-hd-exemplar",
          spans: [ { t: "You might consider having a look at the HD exemplar on Canvas before you start your next essay.", c: "FF" } ],
          notes: [
            "This is FF (point c). It says when to use the exemplar, so it is advice for a later task.",
            "Compare with: “[[FU:The HD exemplar is on Canvas]]”, which is FU (point c)."
          ]
        },
        {
          id: "ff-messy-articles",
          spans: [ { t: "As you engage in this continuous process, though, remember that you will rarely find a perfect or near-perfect article, but the messy ones should certainly cause you to pause.", c: "FF" } ],
          notes: [ "FF (point c). It is general advice about how to judge articles in future. It doesn’t evaluate the current work, and even though it is vague, it doesn’t change how we code it." ]
        },
        {
          id: "ff-research-question",
          spans: [ { t: "How does this relate to your research question?", c: "FF" } ],
          notes: [ "This asks the student a question to think through and gives no answer (FF point d)." ]
        },
        {
          id: "ff-comment-logic-blocks",
          spans: [
            { t: "Please write comments on important long logic blocks (such as loops of long if-statements) ", c: "FF" },
            { t: "such that other people can understand more easily.", c: "FU" }
          ],
          notes: [
            "“…[[FU:such that other people can understand more easily]]” is FU, as it describes the finished code and the rationale (point d).",
            "“[[FF:Please write comments on important long logic blocks (such as loops of long if-statements)]]” is FF (point a), as it says what to add to the work."
          ]
        },
        {
          id: "ff-commented-vs",
          vs: [
            { spans: [ { t: "Your code must be commented", c: "FF" } ] },
            { spans: [ { t: "Your code isn’t commented", c: "FB" } ] }
          ],
          notes: [
            "The first says what the code needs to be, so it is FF (point a).",
            "The second says how the code currently is, so it is FB (point b)."
          ]
        }
      ]
    }
  ],

  distinguish: {
    rationale: {
      title: "Rationale of sections 2.4-2.6:",
      text: "It can often be difficult to tell the difference between questions in some cases. The following sections are designed to specify further rules to help in distinguishing what label to assign."
    },
    sections: [
      // ---------------------------------------------------------------- 2.4 FU <-> FF
      {
        section: "2.4", title: "FU ↔ FF",
        rules: [
          {
            key: "a",
            title: "Words like “must”, “should”, “need to” and “please” appear in both FU and FF, so they don’t decide between the two.",
            body: [
              { ex: {
                id: "r24a-distinction-should",
                vs: [
                  { spans: [ { t: "A distinction-level report should compare at least two theories", c: "FU" } ] },
                  { spans: [ { t: "You should compare at least two theories", c: "FF" } ] }
                ],
                notes: [
                  "The first is FU (point b). It ties the standard to a grade, so it says what a distinction requires.",
                  "The second is FF (point a). It names no grade or requirement, so it is the marker telling the student what to add to their work."
                ]
              } }
            ]
          },
          {
            key: "b",
            title: "A standard is FU if it is tied to the assessment (e.g. the rubric, a grade, the task requirements), or if it is about good work in general rather than this student’s work.",
            body: [
              {
                text: "A standard is tied to the assessment if the fragment mentions the rubric or marking criteria, a grade or mark, the task’s instructions, what the marker or markers look for, the unit’s aims, or the year level. Code it FU.",
                sub: [
                  { ex: {
                    id: "r24b-markers-look-for",
                    spans: [ { t: "Markers look for a clearly stated hypothesis", c: "FU" } ],
                    notes: [ "→ FU (point b)." ]
                  } },
                  { ex: {
                    id: "r24b-marker-wants",
                    spans: [ { t: "The marker wants to see you work through each element", c: "FU" } ],
                    notes: [ "→ FU (point b)." ]
                  } },
                  { ex: {
                    id: "r24b-third-year",
                    spans: [ { t: "At third-year level we expect you to engage critically", c: "FU" } ],
                    notes: [ "→ FU (point b)." ]
                  } },
                  { ex: {
                    id: "r24b-reflection-honest",
                    spans: [
                      { t: "Your reflection is honest, ", c: "FB" },
                      { t: "which is exactly the kind of self-awareness this unit is after", c: "FU" }
                    ],
                    notes: [ "→ FB | FU. The second part states the unit’s aim (FU point a)." ]
                  } },
                  { ex: {
                    id: "r24b-ok-result",
                    spans: [ { t: "To achieve an OK result, your code must be commented appropriately", c: "FU" } ],
                    notes: [ "→ FU (point b). It ties the standard to a grade (“an OK result”), so it says what the assessment requires." ]
                  } }
                ]
              },
              {
                text: "If the fragment mentions the assessment but only uses it as a guide or a reason for advice, it is not coded this way. See {{2.4c|2.4 rules c}} and {{2.4d|d}}.",
                sub: [
                  "If it tells the student to meet a requirement without saying what the requirement is, it is FF.",
                  { ex: {
                    id: "r24b-word-limit",
                    vs: [
                      { spans: [ { t: "Remember to stay within the word limit", c: "FF" } ] },
                      { spans: [ { t: "The word limit is 2,000 words", c: "FU" } ] }
                    ],
                    notes: [
                      "“[[FF:Remember to stay within the word limit]]” → FF (point a).",
                      "Compared with “[[FU:The word limit is 2,000 words]]” → FU (point b)."
                    ]
                  } }
                ]
              },
              "A standard is about good work in general if it names a kind of work (“[[FU:Good lab reports]]…”, “[[FU:Abstracts should]]…”) or a field or setting beyond the task (“[[FU:In engineering]]…”, “[[FU:Employers expect]]…”). Code it FU.",
              {
                text: "A standard is about this student’s work if it uses “you” or “your”, gives an instruction (“Add…”), points at the submission (“this paragraph”, “here”), or says what should be done to the work. If it is not tied to the assessment, code it FF. This holds even if the standard is also on the rubric. Most advice relates to something the rubric assesses, so otherwise everything would be coded as FU.",
                sub: [
                  { ex: {
                    id: "r24b-code-commented",
                    spans: [ { t: "Your code must be commented appropriately", c: "FF" } ],
                    notes: [ "→ FF (point a). It names no grade or requirement, so it is the marker telling the student what to do to their code. Rewording it as “[[FU:The assessment requires commented code]]” would add something the sentence doesn’t say." ]
                  } },
                  { ex: {
                    id: "r24b-comments-provided",
                    spans: [ { t: "Comments should be provided where necessary", c: "FF" } ],
                    notes: [ "→ FF (point a). It names no grade or requirement and says what should be done to this student’s code." ]
                  } }
                ]
              },
              {
                text: "If you can’t tell whether a standard is about this student’s work or good work in general, code it FF.",
                sub: [
                  { ex: {
                    id: "r24b-topic-sentence",
                    spans: [ { t: "Every paragraph needs a topic sentence", c: "FF" } ],
                    notes: [ "Could mean this essay or essays in general, so it is FF (point a)." ]
                  } }
                ]
              }
            ]
          },
          {
            key: "c",
            title: "When advice comes with a reason or background (“so that…”, “to…”, “as…”, “because…”, “since…”, or a sentence just before the advice), the advice is FF. Whether the reason is split off, and how it is coded, depends on what it talks about.",
            body: [
              "If it judges this submitted work (“[[FB:as there are several spelling errors]]”), split it off as FB (2.5 rule a).",
              "If it gives the assessment (“[[FU:since it is worth 10 marks]]”), split it off as FU (rule d).",
              {
                text: "If it describes good finished work, either what it is like or what it does for its reader (“[[FU:so that a reader can follow your argument]]”), split it off as FU (point d).",
                sub: [
                  "To check, ask: would you see the result by looking at the finished work? Examples include a thesis without grammar errors, an argument a reader can follow, and figures that make sense on their own."
                ]
              },
              "If it does anything else, keep it in the same FF span as the advice. This includes what the student gets from the advice (“[[FF:so you can spot your patterns]]”) and a fact about the task (“[[FF:since this is a reflective piece]]”).",
              "If unsure whether the reason moves to FU, keep it in the FF span.",
              {
                text: "Examples:",
                sub: [
                  { ex: {
                    id: "r24c-such-that",
                    spans: [ { t: "…such that other people can understand more easily", c: "FU" } ],
                    notes: [
                      "→ FU.",
                      "Here, the “such that…” part links whatever span was given previously to the end state, which is why this span is FU (point d)."
                    ],
                    quiz: false
                  } },
                  { ex: {
                    id: "r24c-avoid-errors",
                    spans: [ { t: "…to avoid minor grammatical errors", c: "FU" } ],
                    notes: [
                      "→ FU.",
                      "The finished thesis would have no minor grammatical errors, so you would see the result in the work (point d)."
                    ],
                    quiz: false
                  } },
                  { ex: {
                    id: "r24c-read-aloud",
                    spans: [
                      { t: "Read your draft aloud ", c: "FF" },
                      { t: "to catch clunky sentences", c: "FU" }
                    ],
                    notes: [
                      "→ FF | FU.",
                      "The finished draft would have no clunky sentences (FU point d)."
                    ]
                  } },
                  { ex: {
                    id: "r24c-error-log",
                    spans: [ { t: "Keep a log of the errors I’ve marked so you can spot your patterns", c: "FF" } ],
                    oneSpan: true,
                    notes: [
                      "→ one FF span.",
                      "This is one FF span.",
                      "“[[FF:Keep a log of the errors I’ve marked]]” is FF (point b).",
                      "“so you can spot your patterns” is what the log helps the student do. You would not see it in the finished work, so it stays in the same FF span."
                    ]
                  } },
                  { ex: {
                    id: "r24c-reflective-piece",
                    spans: [ { t: "Since this is a reflective piece, write in the first person", c: "FF" } ],
                    oneSpan: true,
                    notes: [
                      "→ one FF span.",
                      "The reason is a plain fact about the task, not a description of good work."
                    ]
                  } }
                ]
              }
            ]
          },
          {
            key: "d",
            title: "A grade phrase that sets the condition (“For a distinction…”) makes the whole sentence one FU span. The rubric used as a guide for a change (“using point 1 of the rubric”) stays in the FF span. The assessment given as a reason (“since it is worth 10 marks”) is split off as FU.",
            body: [
              {
                label: "CASE 1", text: "If it sets a grade as the condition:",
                sub: [
                  "Examples: “[[FU:To achieve an OK result]]…”, “[[FU:For a distinction]]…”, “[[FU:To get full marks]]…”",
                  "If the part after the … says what the work needs, you assign one FU span (point b). We don’t split off the grade phrase.",
                  { ex: {
                    id: "r24d-ok-result-comment",
                    spans: [ { t: "To achieve an OK result, you must comment your code", c: "FU" } ],
                    oneSpan: true,
                    notes: [
                      "→ one FU span.",
                      "To emphasise, we DO NOT code the above as two spans: “To achieve an OK result” (FU) | “you must comment your code” (FF). The sentence has one purpose: stating what an “OK result” requires. The grade phrase only names the grade, and the requirement itself is in the marking rubric, so neither part works as a span on its own."
                    ]
                  } },
                  {
                    text: "Other advice in the same sentence that the grade phrase doesn’t apply to is coded on its own:",
                    sub: [
                      { ex: {
                        id: "r24d-distinction-reference-list",
                        spans: [
                          { t: "For a distinction you need to compare two theories, ", c: "FU" },
                          { t: "and please also fix your reference list", c: "FF" }
                        ],
                        notes: []
                      } }
                    ]
                  }
                ]
              },
              {
                label: "CASE 2", text: "If it points to the rubric as the guide for a change:",
                sub: [
                  "Examples: “[[FF:using point 1 of the rubric]]”, “[[FF:as criterion 2 requires]]”",
                  "Forms one FF (point a) span.",
                  "Pointing to the rubric is usually FU (point c). Here the rubric is the means of closing the gap, not the point of the sentence.",
                  {
                    text: "Examples:",
                    sub: [
                      { ex: {
                        id: "r24d-revise-intro-rubric",
                        spans: [ { t: "Revise your introduction using point 1 of the rubric", c: "FF" } ],
                        oneSpan: true,
                        notes: [ "→ FF." ]
                      } },
                      { ex: {
                        id: "r24d-rewrite-methods-criterion",
                        spans: [ { t: "Rewrite your methods section as criterion 2 of the rubric requires", c: "FF" } ],
                        oneSpan: true,
                        notes: [ "→ FF." ]
                      } }
                    ]
                  }
                ]
              },
              {
                label: "CASE 3", text: "If it gives the assessment as a reason:",
                sub: [
                  "Examples: “[[FU:since…]]”, “[[FU:because…]]”, “[[FU:which the rubric rewards]]”, “[[FU:as the rubric requires it]]”",
                  "You split these parts off as FU (point b).",
                  {
                    text: "Examples:",
                    sub: [
                      { ex: {
                        id: "r24d-rubric-requires-it",
                        spans: [
                          { t: "You must comment your code, ", c: "FF" },
                          { t: "as the rubric requires it", c: "FU" }
                        ],
                        notes: [ "→ FF | FU." ]
                      } },
                      { ex: {
                        id: "r24d-worth-10-marks",
                        spans: [
                          { t: "Add a limitations section, ", c: "FF" },
                          { t: "since it is worth 10 marks", c: "FU" }
                        ],
                        notes: [ "→ FF | FU." ]
                      } },
                      { ex: {
                        id: "r24d-lost-marks-brief",
                        spans: [
                          { t: "You lost marks here ", c: "FB" },
                          { t: "because the brief required at least five peer-reviewed sources", c: "FU" }
                        ],
                        notes: [ "→ FB | FU. “[[FB:You lost marks here]]” says how this work did (FB point a); the reason states what the task requires (FU point b)." ]
                      } }
                    ]
                  }
                ]
              }
            ]
          },
          {
            key: "e",
            title: "Subject content (a correct answer, a fact or an explanation) is FU (point d). It describes what good work contains and says nothing about this student’s work. Stated as a change to this work, it is FF (point a).",
            body: [
              { ex: {
                id: "r24e-two-plus-two",
                spans: [ { t: "2+2=4", c: "FU" } ],
                notes: [ "→ FU (point d)." ]
              } },
              { ex: {
                id: "r24e-answer-should-be-4",
                spans: [ { t: "Your answer should be 4", c: "FF" } ],
                notes: [ "→ FF (point a)." ]
              } },
              { ex: {
                id: "r24e-nci-shares",
                spans: [ { t: "Remember NCI shares in post-acquisition movements too", c: "FF" } ],
                notes: [ "→ FF (point a). This is because “Remember… too” tells the student what to include in this work." ]
              } },
              { ex: {
                id: "r24e-randomisation",
                spans: [ { t: "Why does randomisation matter? Because it balances unknown confounders across the groups", c: "FU" } ],
                oneSpan: true,
                notes: [ "→ one FU (point d) span. This is the marker just providing information of what the answer should be." ]
              } }
            ]
          }
        ]
      },

      // ---------------------------------------------------------------- 2.5 FB <-> FF
      {
        section: "2.5", title: "FB ↔ FF",
        rules: [
          {
            key: "a",
            title: "When one sentence both evaluates and advises, split it.",
            body: [
              { ex: {
                id: "r25a-proofread-spelling",
                spans: [
                  { t: "Make sure you proofread, ", c: "FF" },
                  { t: "as there are several spelling errors", c: "FB" }
                ],
                notes: [
                  "The first part of the sentence is FF (point b).",
                  "The second part is FB (point a)."
                ]
              } }
            ]
          },
          {
            key: "b",
            title: "When unsure between FB and FF, consider whether the fragment names an improvement to the work (something to add, remove or change), or a method to use.",
            body: [
              {
                text: "If it names an improvement, including past-tense wording (“would have”, “should have”, “needed”), label FF. Examples:",
                sub: [
                  { ex: { id: "r25b-stronger-worked-example", spans: [ { t: "This would be stronger with a worked example", c: "FF" } ], notes: [] } },
                  { ex: { id: "r25b-would-have-been-stronger", spans: [ { t: "This would have been stronger with a worked example", c: "FF" } ], notes: [] } },
                  { ex: { id: "r25b-trade-unions", spans: [ { t: "I would have liked to see more on the trade unions", c: "FF" } ], notes: [] } },
                  { ex: { id: "r25b-should-have-included-conclusion", spans: [ { t: "You should have included a conclusion", c: "FF" } ], notes: [] } },
                  { ex: { id: "r25b-conclusion-needs-evidence", spans: [ { t: "Your conclusion needs more evidence", c: "FF" } ], notes: [] } },
                  { ex: { id: "r25b-conclusion-needed-evidence", spans: [ { t: "Your conclusion needed more evidence", c: "FF" } ], notes: [] } }
                ]
              },
              {
                text: "If it only describes the work as it is or judges it, label FB. Examples:",
                sub: [
                  { ex: { id: "r25b-no-conclusion", spans: [ { t: "There is no conclusion", c: "FB" } ], notes: [] } },
                  { ex: { id: "r25b-conclusion-lacks-evidence", spans: [ { t: "Your conclusion lacks evidence", c: "FB" } ], notes: [] } },
                  { ex: { id: "r25b-argument-weak", spans: [ { t: "Your argument is weak", c: "FB" } ], notes: [] } }
                ]
              },
              "“[[FB:Your conclusion lacks evidence]]” (FB) and “[[FF:Your conclusion needed more evidence]]” (FF) get different codes: the first describes the work as it is; the second names what would make it better.",
              {
                text: "Segments that say the work must or should change (“Make…”, “needs to”, “should”, “must”) are FF (point a), even if it only names a quality. Examples:",
                sub: [
                  { ex: { id: "r25b-make-argument-clearer", spans: [ { t: "Make your argument clearer", c: "FF" } ], notes: [] } },
                  { ex: { id: "r25b-argument-needs-clearer", spans: [ { t: "Your argument needs to be clearer", c: "FF" } ], notes: [] } },
                  "Vague advice is still advice."
                ]
              },
              {
                text: "If the segment only names a quality the work falls short on, label FB (point a). Examples:",
                sub: [
                  { ex: { id: "r25b-argument-could-be-clearer", spans: [ { t: "Your argument could be clearer", c: "FB" } ], notes: [] } },
                  { ex: { id: "r25b-could-be-stronger", spans: [ { t: "This could be stronger", c: "FB" } ], notes: [] } },
                  {
                    text: "To check, ask: can you tell from the fragment what would be different in the work?",
                    sub: [
                      {
                        text: "Note: “[[FF:The middle section could do with more contrast]]” and “[[FF:You could add a table here]]” name what to add, so they are FF.",
                        sub: [
                          { ex: { id: "r25b-middle-section-contrast", spans: [ { t: "The middle section could do with more contrast", c: "FF" } ], notes: [] } },
                          { ex: { id: "r25b-could-add-table", spans: [ { t: "You could add a table here", c: "FF" } ], notes: [] } }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                text: "Judging how the student monitored their own work stays FB, even with “should have”, because it names no change and no method. Example:",
                sub: [
                  { ex: {
                    id: "r25b-caught-typos",
                    spans: [ { t: "You should have caught these typos", c: "FB" } ],
                    notes: [ "(FB point c)." ]
                  } }
                ]
              }
            ]
          },
          {
            key: "c",
            title: "Code a rhetorical question by what it says. It is not automatically FF.",
            body: [
              {
                text: "If the verdict is in the question’s own words, label FB. Examples:",
                sub: [
                  { ex: {
                    id: "r25c-forget-conclusion",
                    spans: [ { t: "Did you forget to include a conclusion?", c: "FB" } ],
                    notes: [ "→ FB (point b). “Forget” says the conclusion is missing." ]
                  } },
                  { ex: {
                    id: "r25c-only-two-trials",
                    spans: [ { t: "Why only two trials?", c: "FB" } ],
                    notes: [ "→ FB (point a). “Only” says there are too few." ]
                  } }
                ]
              },
              {
                text: "If it names a change or a method, label FF. Examples:",
                sub: [
                  { ex: {
                    id: "r25c-considered-table",
                    spans: [ { t: "Have you considered adding a table?", c: "FF" } ],
                    notes: [ "→ FF (point a)." ]
                  } },
                  { ex: {
                    id: "r25c-regular-time",
                    spans: [ { t: "Have you tried setting aside a regular time each week to write?", c: "FF" } ],
                    notes: [ "→ FF (point b)." ]
                  } }
                ]
              },
              {
                text: "If it leaves the student to work out what is wrong or what to do, label FF (point d). Example:",
                sub: [
                  { ex: {
                    id: "r25c-subsidy",
                    spans: [ { t: "Have you considered how the subsidy affected rural households?", c: "FF" } ],
                    notes: [ "→ FF (point d). It doesn’t say directly that the work lacks this." ]
                  } }
                ]
              },
              {
                text: "We label a request for information about the work as FF (point d). Example:",
                sub: [
                  { ex: {
                    id: "r25c-dsm-edition",
                    spans: [ { t: "Which edition of the DSM did you use?", c: "FF" } ],
                    notes: []
                  } },
                  {
                    text: "A question with no connection to the work gets no annotation (Section 1 Principle 4):",
                    sub: [
                      { ex: {
                        id: "r25c-composition-prize",
                        spans: [ { t: "Are you entering the composition prize this year?", c: null } ],
                        notes: []
                      } }
                    ]
                  }
                ]
              },
              {
                text: "A question attached to advice on the same point stays in the advice’s span. Example:",
                sub: [
                  { ex: {
                    id: "r25c-inequality",
                    spans: [ { t: "The inequality in line 3 needs justification – why is |x_n − L| < ε/2 here?", c: "FF" } ],
                    oneSpan: true,
                    notes: [ "→ one FF span. The question is just an elaboration on the earlier point." ]
                  } }
                ]
              },
              "A question the marker answers themselves is coded by the answer, with the question in the same span (see 2.4 rule e)."
            ]
          }
        ]
      },

      // ---------------------------------------------------------------- 2.6 FU <-> FB
      {
        section: "2.6", title: "FU ↔ FB",
        rules: [
          {
            key: "a",
            title: "What the assessment requires is FU. How this work did against it is FB.",
            body: [
              "This follows Ramaprasad’s definition (start of this section): FU is the level we are aiming for, and FB is where the work currently is.",
              "How the work did is FB even if the fragment names a criterion or a mark."
            ]
          },
          {
            key: "b",
            title: "A fragment that judges the work against the criteria is FB, whether it mentions the criteria in general or names one.",
            body: [
              { ex: {
                id: "r26b-met-criteria",
                spans: [ { t: "You have met all the criteria", c: "FB" } ],
                notes: [ "→ FB (point a). It evaluates the work and does not say what any criterion requires." ]
              } },
              { ex: {
                id: "r26b-marked-down",
                spans: [ { t: "You were marked down because you did not comment appropriately", c: "FB" } ],
                oneSpan: true,
                notes: [ "→ one FB span (point b). It says how the work did. It may imply that commenting is a marking criterion, but it does not state that as a requirement. We code what the fragment says, not what it implies." ]
              } },
              {
                text: "Compare with:",
                sub: [
                  { ex: {
                    id: "r26b-ok-result",
                    spans: [ { t: "To achieve an OK result, your code must be commented appropriately", c: "FU" } ],
                    notes: [ "→ FU (point b). It states what an OK result requires and says nothing about how this work did." ]
                  } }
                ]
              },
              {
                text: "Compare with:",
                sub: [
                  { ex: {
                    id: "r26b-lost-marks-brief",
                    spans: [
                      { t: "You lost marks here ", c: "FB" },
                      { t: "because the brief required at least five peer-reviewed sources", c: "FU" }
                    ],
                    notes: [ "→ FB | FU. The reason DOES state a requirement, so it is split off (2.4 rule d)." ]
                  } }
                ]
              }
            ]
          },
          {
            key: "c",
            title: "A mark the work received is FB. A mark the work could get is FU.",
            body: [
              "This is because a mark the work received says how the work did (feed-back). A mark the work could get says what the assessment requires (the reference level – feed-up).",
              {
                text: "“Could get” means a mark the student can still aim for. A mark this work missed or would get says how this work did, so it is FB. Examples:",
                sub: [
                  { ex: {
                    id: "r26c-draft-pass",
                    spans: [ { t: "In its current form, this draft would receive a pass", c: "FB" } ],
                    notes: [ "→ FB (point a)." ]
                  } },
                  { ex: {
                    id: "r26c-higher-mark-if",
                    spans: [ { t: "This would have received a higher mark if you had addressed the limitations", c: "FB" } ],
                    oneSpan: true,
                    notes: [ "→ one FB span (point a)." ]
                  } },
                  { ex: {
                    id: "r26c-for-higher-mark",
                    spans: [ { t: "For a higher mark, you needed to address the limitations", c: "FB" } ],
                    oneSpan: true,
                    notes: [ "→ one FB span (point a). “For a higher mark” is a mark this work missed, not a grade to aim for, so 2.4 rule d does not apply." ]
                  } },
                  {
                    text: "Compare:",
                    sub: [
                      { ex: {
                        id: "r26c-hd-band",
                        spans: [ { t: "To move into the HD band, your discussion would need to…", c: "FU" } ],
                        notes: [ "→ FU (point b). The HD band is still something to aim for." ],
                        quiz: false
                      } }
                    ]
                  },
                  { ex: {
                    id: "r26c-beat-last-mark",
                    spans: [ { t: "Aim to beat your last mark", c: "FU" } ],
                    notes: [ "→ FU (point a). It is a mark to aim for and says nothing about how this work did." ]
                  } }
                ]
              },
              {
                text: "A reason given for a mark stays in the same FB span as the mark.",
                sub: [
                  { ex: {
                    id: "r26c-higher-mark-reason",
                    spans: [ { t: "This would have received a higher mark if you had addressed the limitations", c: "FB" } ],
                    oneSpan: true,
                    notes: [ "→ one FB span. “If you had addressed the limitations” names an improvement, but here it only explains the mark, so it is not split off as FF (compare 2.5 rule b)." ]
                  } },
                  {
                    text: "The exception is a reason that states what the assessment requires, which is split off as FU (2.4 rule d):",
                    sub: [
                      { ex: {
                        id: "r26c-lost-marks-brief",
                        spans: [
                          { t: "You lost marks here ", c: "FB" },
                          { t: "because the brief required at least five peer-reviewed sources", c: "FU" }
                        ],
                        notes: [ "→ FB | FU." ]
                      } }
                    ]
                  }
                ]
              },
              {
                text: "On a rubric line, the mark received is split from the heading:",
                sub: [
                  { ex: {
                    id: "r26c-testing-rubric-line",
                    spans: [
                      { t: "Testing ", c: "FU" },
                      { t: "(6/15):", c: "FB" }
                    ],
                    notes: [ "→ FU | FB. The heading names the criterion (FU point b); the mark says how this work did (FB point a)." ]
                  } }
                ]
              },
              {
                text: "Other Examples:",
                sub: [
                  { ex: {
                    id: "r26c-full-marks-structure",
                    spans: [ { t: "To get full marks for structure, every paragraph needs a topic sentence", c: "FU" } ],
                    notes: [ "→ FU (point b). It sets a grade as the condition and says what that grade requires, similar to “To achieve an OK result…” (2.4 rule d)." ]
                  } },
                  { ex: {
                    id: "r26c-structure-worth",
                    spans: [ { t: "Structure is worth 20 marks", c: "FU" } ],
                    notes: [ "→ FU (point b). It says what the assessment rewards." ]
                  } },
                  { ex: {
                    id: "r26c-full-marks-because",
                    spans: [ { t: "You got full marks for structure because every paragraph opens with a topic sentence", c: "FB" } ],
                    oneSpan: true,
                    notes: [ "→ one FB span (point a). It says how this work did on structure." ]
                  } },
                  { ex: {
                    id: "r26c-lost-marks-referencing",
                    spans: [ { t: "You lost marks for referencing", c: "FB" } ],
                    notes: [ "→ FB (point a), for the same reason as above." ]
                  } }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  notes: [
    {
      section: "2.7", title: "On Self-Level Feedback",
      body: [
        "In section 3.1, we introduce self-level feedback. If a fragment is coded self-level, do not give it a feedback question. The rationale is that self-level feedback contains no information relevant to the student project, and hence it cannot satisfy feed-up, feed-back, and feed-forward."
      ]
    },
    {
      section: "2.8", title: "Deviations from Hattie and Timperley",
      body: [
        "In section 3, the deviations are discussed as required in each subsection. As we have fewer deviations in the feedback-question guidelines, we discuss all deviations here below:",
        {
          text: "Feedback questions for self-level fragments.",
          sub: [
            "H&T: praise is “rarely directed at addressing the three feedback questions” (p. 102).",
            "Ours: self-level fragments never get a feedback question, so that the rule is the same for every annotator."
          ]
        },
        {
          text: "Standards stated as what this work needs",
          sub: [
            "H&T: goals and their “success criteria” belong to “Where am I going?” (p. 88).",
            "Ours: a standard is feed-up when it is tied to the assessment or is about good work in general (2.4 rule b). A standard stated simply as what this student’s work needs (“Your code must be commented”) is feed-forward, even if it is on the rubric. Otherwise, most advice would be coded as feed-up. This fits H&T’s description of “Where to next?”: “What activities need to be undertaken to make better progress?” (p. 86)."
          ]
        }
      ]
    }
  ]
};
