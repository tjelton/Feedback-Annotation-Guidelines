window.GUIDE = window.GUIDE || {};
GUIDE.levels = {
  id: "levels",
  sectionNumber: "3",
  title: "Feedback Level Guidelines",
  intro: [
    "Hattie and Timperley’s paper is a review of research, not a coding manual, and it sometimes describes a level by the effect feedback has on the learner (e.g. confidence, self-efficacy). We code a fragment by what it says: what it asks the student to do, or what it evaluates."
  ],

  categories: [
    /* ------------------------------------------------------------------ 3.1 FS */
    {
      code: "FS", section: "3.1", title: "(FS) Self-Level",
      mainRule: {
        title: "FS Main Rule",
        intro: "This is any fragment that evaluates the student as a person, or addresses their feelings, rather than their work, methods or self-regulation. It does one or more of the following:",
        points: [
          { key: "a", text: "Evaluates the student’s personal qualities, ability, effort, conduct or character, positively or negatively." },
          { key: "b", text: "Addresses the student’s feelings without evaluating them (e.g. apologising for or softening criticism, reassurance, encouragement)." }
        ]
      },
      examples: [
        {
          id: "fs-great-student",
          spans: [ { t: "You are a great student", c: "FS" } ],
          notes: [ "This evaluates the student as a person and says nothing about the work (point a)." ]
        },
        {
          id: "fs-nice-try",
          spans: [ { t: "Nice try", c: "FS" } ],
          notes: [ "“Try” refers to the effort the student put in (point a). While one may argue that “try” refers to the work, a judgement call was made to treat this as self, as it is ambiguous what try refers to. Hence, any evaluation of effort, positive or negative, is self-level (see 3.5 rule b, and ‘Our Deviations from H&T’ below)." ]
        },
        {
          id: "fs-lots-of-work",
          spans: [ { t: "I can see you’ve put lots of work in, good job!", c: "FS" } ],
          oneSpan: true,
          notes: [ "Similar to above, there is ambiguity about whether this refers to the task or the self. Good job is connected to the previous span and does not indicate a new span. We label as self." ]
        },
        {
          id: "fs-dont-be-discouraged",
          spans: [ { t: "Don’t be discouraged by this mark.", c: "FS" } ],
          notes: [ "This addresses the student’s feelings about the result. It does not judge the student or the work (point b)." ]
        },
        {
          id: "fs-more-confident",
          spans: [ { t: "You seem much more confident with integration by parts now.", c: "FS" } ],
          notes: [ "This comments on how the student feels about the topic, not on the work or on how they monitored it (point b). See ‘Our Deviations from H&T’ below." ]
        }
      ],
      deviations: {
        title: "Our Deviations from H&T",
        body: [
          {
            text: "Apologising for or softening criticism (e.g. “[[FS:Sorry if this sounds harsh]]”, “[[FS:I know this is a lot of red ink]]”)",
            sub: [
              { ex: { id: "dev-sorry-harsh", spans: [ { t: "Sorry if this sounds harsh", c: "FS" } ], notes: [ "Ours: self-level (FS point b). An apology or softening is directed at the student’s feelings." ] } },
              { ex: { id: "dev-red-ink", spans: [ { t: "I know this is a lot of red ink", c: "FS" } ], notes: [ "Ours: self-level (FS point b). An apology or softening is directed at the student’s feelings." ] } },
              "H&T: not addressed directly.",
              "Ours: self-level (FS point b).",
              "H&T describe personal feedback as typically expressing “evaluations and affect about the student” (p. 96). An apology or softening is directed at the student’s feelings. It does not evaluate the work, a method or the student’s self-regulation, so we code it self-level."
            ]
          },
          {
            ex: {
              id: "dev-intelligent-response",
              spans: [ { t: "That’s an intelligent response, well done", c: "FT" } ],
              oneSpan: true,
              notes: [
                "(p. 90)",
                "H&T: self-level. It is one of their two examples of feedback “directed to the ‘self’” (p. 90).",
                "Ours: task-level (FT point a).",
                {
                  text: "The adjective describes the response, not the student. Calling a response intelligent says it is thoughtful and well done, so it evaluates the work (FT point a; 3.5 rule a). “Well done” stays in the same span (3.5 rule c). Compare “[[FS:You’re intelligent]]”, which describes the student, so it is self-level (FS point a).",
                  sub: [
                    { ex: { id: "dev-youre-intelligent", spans: [ { t: "You’re intelligent", c: "FS" } ], notes: [] } }
                  ]
                }
              ]
            }
          },
          {
            text: "Generic praise of the work (e.g. “[[FT:Well done]]”, “[[FT:Great work]]”)",
            sub: [
              { ex: { id: "dev-well-done", spans: [ { t: "Well done", c: "FT" } ], notes: [ "Ours: task-level (3.5 rule b), because what it evaluates is the work, not the student." ] } },
              { ex: { id: "dev-great-work", spans: [ { t: "Great work", c: "FT" } ], notes: [ "Ours: task-level (3.5 rule b), because what it evaluates is the work, not the student." ] } },
              "H&T: describe self-level feedback as “usually praise” (p. 102) and “unrelated to the specifics of the task)” (p. 86), so “[[FT:Well done]]” can look self-level. But they never say which level praise of the work belongs to.",
              "Ours: task-level (3.5 rule b), because what it evaluates is the work, not the student."
            ]
          },
          {
            text: "Evaluations of effort (e.g. “[[FS:Great effort]]”, “[[FS:Nice try]]”, “[[FS:With a bit more effort this could have been a distinction]]”)",
            sub: [
              { ex: { id: "dev-great-effort", spans: [ { t: "Great effort", c: "FS" } ], notes: [ "H&T: “Great effort” is given as personal, self-level feedback (p. 96)." ] } },
              { ex: { id: "dev-nice-try", spans: [ { t: "Nice try", c: "FS" } ], notes: [] } },
              { ex: { id: "dev-more-effort-distinction", spans: [ { t: "With a bit more effort this could have been a distinction", c: "FS" } ], notes: [ "Where a comment that uses the word “effort” sits between task and self and can’t naturally be split, we lean on self (see 3.5 rule b)." ] } },
              "H&T: “[[FS:Great effort]]” is given as personal, self-level feedback (p. 96). In their self-regulation section they also discuss “feedback that attributes performance to effort or ability” (p. 95), but they don’t say what level such feedback belongs to.",
              {
                text: "Ours: we agree with H&T but add nuance. Sometimes, effort can be about the work. Where a comment that uses the word “effort” sits between task and self and can’t naturally be split, we lean on self (see 3.5 rule b). Effort tied to a named part of the work (e.g. “Your conclusion needed more effort”) is task-level instead, because it says that part of the work is not up to standard (see 3.8 Effort Across Levels, rule b).",
                sub: [
                  { ex: { id: "dev-conclusion-effort", spans: [ { t: "Your conclusion needed more effort", c: "FT" } ], notes: [] } }
                ]
              }
            ]
          },
          "Feedback questions for self-level fragments: self-level fragments never get a feedback question. See {{2.8|Our Deviations from H&T at the end of section 2}}."
        ]
      }
    },

    /* ------------------------------------------------------------------ 3.2 FT */
    {
      code: "FT", section: "3.2", title: "(FT) Task-Level",
      mainRule: {
        title: "FT Main Rule",
        intro: "This is any fragment about the work itself: what it contains or should contain, and how good or correct it is. It does one or more of the following:",
        points: [
          { key: "a", text: "States whether the work, or a part of it, is correct, done well or of good quality, positively or negatively." },
          { key: "b", text: "States what the work should contain, or what should be added, removed or changed." },
          { key: "c", text: "States a quality the work should have (e.g. a tone, a structure, a referencing style)." },
          { key: "d", text: "Directs the student to information they need to take in (e.g. something to read, learn or research)." },
          { key: "e", text: "Refers to a method that is part of the submitted work (e.g. a technique used in a solution, or a framework used in the writing)." }
        ]
      },
      examples: [
        {
          id: "ft-introduction-argument",
          spans: [ { t: "Your introduction clearly states the argument.", c: "FT" } ],
          notes: [ "This evaluates a specific part of the work (point a)." ]
        },
        {
          id: "ft-treaty-versailles",
          spans: [ { t: "You need to include more about the Treaty of Versailles.", c: "FT" } ],
          notes: [ "This states content the work should contain (point b)." ]
        },
        {
          id: "ft-correct-spelling",
          spans: [ { t: "Correct your spelling.", c: "FT" } ],
          notes: [ "“Correct” says the work must change (point b), and does not say how to go about it." ]
        },
        {
          id: "ft-friendly-tone",
          spans: [ { t: "Use a friendly tone.", c: "FT" } ],
          notes: [ "This asks for a quality in the work (point c)." ]
        },
        {
          id: "ft-make-sure-apa",
          spans: [ { t: "Make sure your references follow APA 7.", c: "FT" } ],
          notes: [ "This states a quality the work should have (point c). “Make sure” says what the work must be, not how to check it." ]
        },
        {
          id: "ft-read-smith",
          spans: [ { t: "Read Smith (2020) on this point.", c: "FT" } ],
          notes: [ "This directs the student to information to take in (point d). Hattie and Timperley include “directions to acquire more, different, or correct information” (p. 90) in task-level feedback." ]
        },
        {
          id: "ft-chain-rule",
          spans: [ { t: "Use the chain rule here.", c: "FT" } ],
          notes: [ "This names a method, but the method is part of the submitted solution and is what is being assessed (point e). Hence, task-level." ]
        },
        {
          id: "ft-yield-112",
          spans: [ { t: "Your percentage yield of 112% is impossible; almost certainly the product wasn’t dry when you weighed it.", c: "FT" } ],
          oneSpan: true,
          notes: [ "The first clause evaluates the result (point a). The second explains why, and an explanation stays with the evaluation it supports. The drying step is also part of the written-up procedure (point e)." ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 3.3 FP */
    {
      code: "FP", section: "3.3", title: "(FP) Process-Level",
      mainRule: {
        title: "FP Main Rule",
        intro: "This is any fragment about how the student goes about producing, checking or finding material for the work, rather than the work itself. It does one or more of the following:",
        points: [
          { key: "a", text: "Asks the student to look over the work for errors (e.g. check, re-read, proofread), or names or describes a way of doing so (e.g. testing, comparing the work against a supplied standard)." },
          { key: "b", text: "Names or describes a strategy, tool or way of working the student should use or has used." },
          { key: "c", text: "Names or describes a way of finding material for the work (e.g. a database, search strategy or keywords)." },
          { key: "d", text: "Directs the student to a specific source of help (e.g. a proofreader, a friend, the writing centre)." },
          { key: "e", text: "Refers to work habits or practice (e.g. starting earlier, planning before writing)." },
          { key: "f", text: "Evaluates any of the above, positively or negatively." }
        ]
      },
      examples: [
        {
          id: "fp-proofread-before-submitting",
          spans: [ { t: "Proofread your work before submitting.", c: "FP" } ],
          notes: [ "This names a way of checking the work for errors (point a). Naming a strategy is enough. Hattie and Timperley describe “strategies for error detection” as “a major type” of process-level feedback (p. 93)." ]
        },
        {
          id: "fp-grammar-checker",
          spans: [ { t: "Use a grammar checker.", c: "FP" } ],
          notes: [ "This asks the student to use a tool (point b), not for a quality in the work." ]
        },
        {
          id: "fp-check-apa",
          spans: [ { t: "Check your references against APA 7.", c: "FP" } ],
          notes: [ "This names a way of checking the work for errors (point a). APA 7 is the standard the student checks against, so the student, not the marker, finds any errors. Compare “Make sure your references follow APA 7”, which states a quality the work should have (FT point c)." ]
        },
        {
          id: "fp-strategies-earlier",
          spans: [ { t: "This page may make more sense if you use the strategies we talked about earlier.", c: "FP" } ],
          notes: [ "This names a strategy without explaining it (point b). Hattie and Timperley give it as an example of process-level feedback." ]
        },
        {
          id: "fp-scopus",
          spans: [ { t: "Use Scopus rather than Google.", c: "FP" } ],
          notes: [ "This is about how to find material, not what material the work needs (point c)." ]
        },
        {
          id: "fp-broaden-search",
          spans: [ { t: "Broaden your search terms.", c: "FP" } ],
          notes: [ "This names a search strategy. It says how to find material, not what material the work needs (point c)." ]
        },
        {
          id: "fp-ask-friend",
          spans: [ { t: "Ask a friend to read it before you submit.", c: "FP" } ],
          notes: [ "This supplies the help to seek, so the student does not have to decide where to get help (point d)." ]
        },
        {
          id: "fp-start-earlier",
          spans: [ { t: "Start earlier.", c: "FP" } ],
          notes: [ "This is a work habit (point e)." ]
        },
        {
          id: "fp-proofreading-thorough",
          spans: [ { t: "Your proofreading was thorough.", c: "FP" } ],
          notes: [ "This evaluates the way the student checked their work. Advice and evaluation about the same way of working get the same level (point a and point f)." ]
        }
      ],
      deviations: {
        title: "Our Deviations from H&T",
        body: [
          {
            ex: {
              id: "dev-edit-descriptors",
              spans: [ { t: "You need to edit this piece of writing by attending to the descriptors you have used…", c: "FT" } ],
              quiz: false,
              notes: [
                "(p. 90)",
                "H&T give this as process-level; we code it task-level. See {{3.6|3.6, Other examples}}."
              ]
            }
          },
          {
            text: "What counts as process:",
            sub: [
              "H&T: describe it broadly, as feedback “aimed at the processing of information” (p. 90), and link it to “transference to other more difficult or untried tasks” (p. 93).",
              "Ours: only what can be read from the comment: how the student produces, checks or finds material for the work (strategies, tools, ways of checking, search methods, help, work habits). It does not need to transfer to other tasks."
            ]
          }
        ]
      }
    },

    /* ------------------------------------------------------------------ 3.4 FR */
    {
      code: "FR", section: "3.4", title: "(FR) Self-Regulation-Level",
      mainRule: {
        title: "FR Main Rule",
        intro: "A fragment is self-regulation-level only if the answers to both questions below point to self-regulation.",
        questions: [
          {
            key: "1", title: "What is the student asked to do?",
            sub: [
              "Monitor, judge or direct their own thinking, learning or way of working, as in the cases below.",
              "For evaluations, the fragment must evaluate how the student monitored, judged or directed their own thinking, learning or way of working (e.g. noticing their own errors, acting on feedback). Evaluating a named method, tool or habit (e.g. “Your proofreading was thorough”) is process-level (FP point f)."
            ]
          },
          {
            key: "2", title: "Who makes the judgement?",
            sub: [
              "For advice and prompts, the __student__ must generate the judgement or direction themselves.",
              "For evaluations, the judgement being evaluated must have been the __student’s__ to make, whether or not they made it."
            ]
          }
        ]
      },
      commonExamples: {
        intro: "In general, fragments of the below nature (we refer to these as common FR examples) will answer the above two questions, and so would be classified as self-regulation (but these are just common examples – it is important the two questions are actually answered).",
        points: [
          { key: "a", text: "Asks the student to judge their own decisions, reasoning or understanding." },
          { key: "b", text: "Asks the student to check their work against a standard the fragment says they already know, without saying what it is (e.g. “You already know…”, “what we covered in class”)." },
          { key: "c", text: "Leaves the student to work out for themselves how to improve, plan or change their approach (not just how to improve the work)." },
          { key: "d", text: "Asks the student to set their own goals or monitor their own progress." },
          { key: "e", text: "Asks the student to judge when or how to seek help or use feedback." },
          { key: "f", text: "Evaluates the student’s self-monitoring or regulation, positively or negatively." }
        ]
      },
      examples: [
        {
          id: "fr-literature-supportive",
          spans: [ { t: "Is the literature supportive of your design methodology chosen?", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the student is asked to judge their own decision (the methodology they chose).",
            "Q2 from FR definition: no verdict is given, so the student must think the question through themselves.",
            "This is a case of common example a."
          ]
        },
        {
          id: "fr-confident-g",
          spans: [ { t: "How confident are you in this value for g?", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the student is asked to judge their own understanding (how sure they are that their answer is right).",
            "Q2 from FR definition: no verdict is given, so the student must make the judgement.",
            "This is a case of common example a.",
            "Note: Hattie and Timperley list “the degree of confidence or certainty in the correctness of the response” as an aspect of self-regulation (p. 94)."
          ]
        },
        {
          id: "fr-already-know",
          spans: [ { t: "You already know the key features of the opening of an argument. Check to see whether you have incorporated them in your first paragraph.", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the student is asked to check their own work against a standard they must recall.",
            "Q2 from FR definition: the standard is not stated, so the student must recall it and judge whether they applied it.",
            "This is a case of common example b."
          ]
        },
        {
          id: "fr-plan-next-essay",
          spans: [ { t: "Think about how you’ll plan your next essay differently.", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the student is asked to direct their own way of working (how they plan).",
            "Q2 from FR definition: no plan is supplied, so they must come up with it.",
            "This is a case of common example c."
          ]
        },
        {
          id: "fr-set-goals",
          spans: [ { t: "Set yourself goals for the next assignment.", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the student is asked to set their own goals.",
            "Q2 from FR definition: no goals are supplied, so the student must set them.",
            "This is a case of common example d.",
            "Note: Hattie and Timperley, quoting Zimmerman (2000), describe self-regulation as involving “self-generated thoughts, feelings, and actions that are planned and cyclically adapted to the attainment of personal goals” (pp. 93–94)."
          ]
        },
        {
          id: "fr-when-ask-feedback",
          spans: [ { t: "Think about when it would help to ask for feedback on a draft.", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the student is asked to judge when to seek help.",
            "Q2 from FR definition: no timing or source is supplied, so the student must decide for themselves.",
            "This is a case of common example e.",
            "Note: Hattie and Timperley describe self-regulated students as knowing “how and when to seek and receive feedback from others” (p. 94)."
          ]
        },
        {
          id: "fr-catching-errors",
          spans: [ { t: "Well done for catching and correcting your own errors in the second draft", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the fragment evaluates how the student monitored their own work (catching their own errors), not the work itself.",
            "Q2 from FR definition: the judgement being evaluated (finding the errors) was the student’s to make, and they made it without the marker pointing the errors out.",
            "This is a case of common example f."
          ]
        },
        {
          id: "fr-reflection-good-sense",
          spans: [ { t: "Your reflection shows you have a good sense of where your argument was weakest", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the fragment evaluates how well the student judged their own work.",
            "Q2 from FR definition: the judgement being evaluated (where the argument was weakest) was the student’s to make, and they made it in their reflection.",
            "This is a case of common example f.",
            {
              text: "Note: a reflection (the student’s account of their own learning or work) is often part of the submitted work, so a comment on it could be read as task or as self-regulation. If the comment could go either way, code it self-regulation (see the example directly below). Comments clearly about the writing itself (spelling, referencing, structure, length) stay task-level, e.g. “[[FT:Your reflection has several spelling errors]]” (FT point a). To tell whether the work is a reflection without picking up cues in the feedback comment, you would need to check the assessment’s task description.",
              sub: [
                { ex: { id: "fr-reflection-spelling", spans: [ { t: "Your reflection has several spelling errors", c: "FT" } ], notes: [ "Comments clearly about the writing itself (spelling, referencing, structure, length) stay task-level (FT point a)." ] } }
              ]
            }
          ]
        },
        {
          id: "fr-reflection-not-deep",
          spans: [ { t: "Your reflection doesn’t go deep enough", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the fragment evaluates how the student judged their own learning (how deeply they examined it), not only the writing.",
            "Q2 from FR definition: the judgement being evaluated (how far to examine their own learning) was the student’s to make. The fragment says they didn’t go far enough, which still meets Q2.",
            "This is a case of common example f.",
            "Note: this could also be read as task (the reflection is a piece of submitted work that falls short). Because it is a reflection and could go either way, it is self-regulation."
          ]
        },
        {
          id: "fr-receptive-feedback",
          spans: [ { t: "Thank you for being so receptive to feedback throughout this placement.", c: "FR" } ],
          notes: [
            "Q1 from FR definition: the fragment evaluates how the student dealt with feedback over the placement, which is part of directing their own learning.",
            "Q2 from FR definition: how to take and act on the feedback was the student’s judgement to make.",
            "This is a case of common example f.",
            "Note: “receptive” can sound like a personal quality (self-level). But a comment about how the student takes and uses feedback is self-regulation.",
            "Note: Hattie and Timperley list “the willingness to invest effort into seeking and dealing with feedback information” as an aspect of self-regulation (p. 94)."
          ]
        }
      ],
      groups: [
        {
          title: "Negative-examples and comparisons",
          examples: [
            {
              id: "frneg-think-differently-vs-start-earlier",
              vs: [
                { spans: [ { t: "Think about what you’d do differently next time.", c: "FR" } ] },
                { spans: [ { t: "Next time, start earlier.", c: "FP" } ] }
              ],
              notes: [
                {
                  text: "The first sentence is FR:",
                  sub: [
                    "Q1 from FR definition: the student is asked to direct their own way of working.",
                    "Q2 from FR definition: nothing is supplied, so they must decide for themselves.",
                    "This is a case of common example c.",
                    "Note: This is vague, but it still asks the student to direct their own way of working, and nothing is supplied, so they must decide for themselves. Vagueness does not change the level."
                  ]
                },
                {
                  text: "The second sentence is FP:",
                  sub: [
                    "Q1 from FR definition: met. The student is asked to change their own way of working (when they start).",
                    "Q2 from FR definition: not met. The marker supplies the change (start earlier), so the student doesn’t have to decide what to do differently.",
                    "It is process because it names a work habit (FP point e)."
                  ]
                }
              ]
            },
            {
              id: "frneg-reflect-effort-vs-more-effort",
              vs: [
                { spans: [ { t: "Reflect on whether you spread your effort well across the sections.", c: "FR" } ] },
                { spans: [ { t: "With a bit more effort this could have been a distinction", c: "FS" } ] }
              ],
              notes: [
                {
                  text: "The first sentence is FR:",
                  sub: [
                    "Q1 from FR definition: stripping the framing (“Reflect on”) leaves whether the student spread their effort well. The student is asked to judge their own way of working (where they put their effort), not what the work contains.",
                    "Q2 from FR definition: no verdict is given, so the student must make the judgement.",
                    "This is a case of common example a.",
                    "Note: This is vague, but it still asks the student to direct their own way of working, and nothing is supplied, so they must decide for themselves. Vagueness does not change the level."
                  ]
                },
                {
                  text: "The second sentence is FS:",
                  sub: [
                    "Q2 is not met as the marker supplies the judgement.",
                    "It is self-level (see {{3.1|3.1, Our Deviations from H&T}})."
                  ]
                }
              ]
            },
            {
              id: "frneg-word-count-vs-500-words",
              vs: [
                { spans: [ { t: "Set yourself daily word-count targets.", c: "FR" } ] },
                { spans: [ { t: "Write 500 words a day", c: "FP" } ] }
              ],
              notes: [
                {
                  text: "The first sentence is FR:",
                  sub: [
                    "Q1 from FR definition: the student is asked to set their own targets.",
                    "Q2 from FR definition: the targets aren’t given, so the student must set them. “Daily” and “word-count” only say what kind of target to set.",
                    "This is a case of common example d.",
                    "Note: The marker supplies the habit (daily targets), but not the targets themselves. The student must set those, so the judgement is still theirs."
                  ]
                },
                "The second sentence is FP, as the marker sets the target instead of the student, and it is a work habit."
              ]
            },
            {
              id: "frneg-strategies-earlier",
              spans: [ { t: "This page may make more sense if you use the strategies we talked about earlier.", c: "FP" } ],
              notes: [
                "(H&T p. 90).",
                "Q1 from FR definition: not met. The student is asked to apply a method to the page. They are not asked to monitor, judge or direct their own thinking, learning or way of working. Nothing asks them to check whether they used the strategies or to judge whether they worked.",
                "Q2 from FR definition: not met. The marker supplies the method. “The strategies we talked about earlier” names it by reference, so the student has to remember it but doesn’t have to decide on it.",
                "Note: the reference back to class makes this look like the example above. Compare “[[FR:You already know the key features of the opening of an argument. Check to see whether you have incorporated them in your first paragraph.]]” There, the student must judge whether they applied what they know. Remembering a method is not self-regulation, but judging whether you used it is."
              ]
            },
            {
              id: "frneg-check-rubric",
              spans: [ { t: "Go through each paragraph and check it against the rubric criteria.", c: "FP" } ],
              notes: [
                "Q1 from FR definition: met. The student is asked to judge whether they have met a standard, as in the “You already know…” example.",
                "Q2 from FR definition: not met. The rubric supplies the criteria the judgement is based on, so the student doesn’t have to recall or set them.",
                "What the feedback supplies is a method of checking, which makes it process-level (FP point a)."
              ]
            },
            {
              id: "frneg-improve-this",
              spans: [ { t: "Think about how you could improve this.", c: "FT" } ],
              notes: [
                "Q1 from FR definition: not met. “Think about how you could” is framing. Stripping it leaves “Improve this”, which is about the work itself, not the student’s own thinking, learning or way of working.",
                "Q2 from FR definition: met. Nothing is supplied, so the student must work out the improvement themselves. Both Q1 and Q2 must point to self-regulation, so this is not self-regulation.",
                "It is task because “improve this” says the work should change (FT point b).",
                "Note: compare “[[FR:Think about how you’ll plan your next essay differently]]”. After stripping the framing, that one is still about the student’s own planning, so Q1 is met."
              ]
            }
          ]
        }
      ],
      deviations: {
        title: "Our Deviations from H&T",
        body: [
          {
            text: "What counts as self-regulation:",
            sub: [
              "H&T: describe the level partly by its effect on the student, e.g. “confidence to engage further on a task” (p. 90), and list aspects such as self-assessment, confidence in an answer, attributions (the reasons given for success or failure) and help-seeking (p. 94).",
              {
                text: "Ours: we code what the fragment says, not its effect, and it is self-regulation only if it passes both FR questions. Hence, comments about how the student feels (“[[FS:Don’t be discouraged by this mark]]”, “[[FS:You seem much more confident with integration by parts now]]”) are self-level (FS point b).",
                sub: [
                  { ex: { id: "dev-fr-dont-be-discouraged", spans: [ { t: "Don’t be discouraged by this mark", c: "FS" } ], notes: [] } },
                  { ex: { id: "dev-fr-more-confident", spans: [ { t: "You seem much more confident with integration by parts now", c: "FS" } ], notes: [] } }
                ]
              },
              {
                text: "Comments that give a reason for the student’s result are coded by the reason they give. “[[FP:Your search missed key papers because you only used Google]]” blames a method, so it is process-level.",
                sub: [
                  { ex: { id: "dev-search-missed-google", spans: [ { t: "Your search missed key papers because you only used Google", c: "FP" } ], notes: [ "This blames a method, so it is process-level." ] } }
                ]
              }
            ]
          },
          {
            text: "Help-seeking:",
            sub: [
              "H&T: place help-seeking at more than one level. Errors may indicate “a need … to seek help” (p. 93, process). “The level of proficiency at seeking help” is an aspect of self-regulation (p. 94). They also distinguish “instrumental help seeking (asking for hints rather than answers)” from “executive help seeking (asking for answers or direct help that avoids time or work)”. They say the first leads “to feedback at the self-regulation levels” while the second “is more likely to relate to the task level and sometimes the processing level” (p. 96).",
              {
                text: "Ours: when the feedback names the help to seek, it is process-level (FP point d, e.g. “[[FP:Ask a friend to read it]]”). When the student must judge when or how to seek help, it is self-regulation (FR case e, e.g. “[[FR:Think about when it would help to ask for feedback on a draft]]”).",
                sub: [
                  { ex: { id: "dev-ask-friend", spans: [ { t: "Ask a friend to read it", c: "FP" } ], notes: [] } },
                  { ex: { id: "dev-when-ask-feedback", spans: [ { t: "Think about when it would help to ask for feedback on a draft", c: "FR" } ], notes: [] } }
                ]
              },
              "Why: H&T’s instrumental/executive distinction describes what the student does when they seek help, which can’t be read from the feedback. Our line uses the same test as the rest of self-regulation: who makes the judgement (FR Q2)."
            ]
          }
        ]
      }
    }
  ],

  distinguish: {
    rationale: {
      title: "Rationale of sections 3.5-3.8:",
      text: "It can often be difficult to tell the difference between levels in some cases. The following sections are designed to specify further rules to help in distinguishing what label to assign."
    },
    sections: [
      /* ---------------------------------------------------------------- 3.5 */
      {
        section: "3.5", title: "Self ↔ Task",
        rules: [
          {
            key: "a", title: "Choosing between self or task depends on what the sentence is about.",
            body: [
              { ex: {
                id: "r35a-intelligent-response",
                spans: [ { t: "That’s an intelligent response", c: "FT" } ],
                notes: [ "In the example, *response* is what the sentence is about, and hence this becomes an evaluation of the task, and is deemed task feedback." ]
              } },
              {
                text: "A sentence is not self-level just because it says “you”. Feedback is written to the student, so “you” appears in most comments. Ask what is being evaluated:",
                sub: [
                  { ex: { id: "r35a-wrong-formula", spans: [ { t: "You’ve used the wrong formula", c: "FT" } ], notes: [ "→ __TASK__. It evaluates the work (FT point a)." ] } },
                  { ex: { id: "r35a-argue-well", spans: [ { t: "You argue this well", c: "FT" } ], notes: [ "→ __TASK__. It evaluates the argument in the work (FT point a)." ] } },
                  { ex: { id: "r35a-great-student", spans: [ { t: "You are a great student", c: "FS" } ], notes: [ "→ __SELF__. It evaluates the student as a person (FS point a)." ] } }
                ]
              }
            ]
          },
          {
            key: "b", title: "When it is not clear whether the sentence is written about the task or the person, you need to determine what the likelihood is that it is referring to each. If you think that there is serious ambiguity, then label as self.",
            body: [
              {
                text: "Consider the examples: “[[FT:Well done]]”, “[[FT:Good job]]”, “[[FT:Great work]]”, “[[FT:Excellent submission]]”. These don’t say what is being praised, but it is incredibly likely that they refer to the work that was submitted, even though it doesn’t say anything specific about it. Hence, we would assign the __TASK__ level.",
                sub: [
                  { ex: { id: "r35b-well-done", spans: [ { t: "Well done", c: "FT" } ], notes: [] } },
                  { ex: { id: "r35b-good-job", spans: [ { t: "Good job", c: "FT" } ], notes: [] } },
                  { ex: { id: "r35b-great-work", spans: [ { t: "Great work", c: "FT" } ], notes: [] } },
                  { ex: { id: "r35b-excellent-submission", spans: [ { t: "Excellent submission", c: "FT" } ], notes: [] } }
                ]
              },
              {
                text: "Comments about effort follow section 3.8 ‘Effort Across Levels’. For example, “[[FS:Great effort]]” is __SELF__ (3.8 rule d), but “[[FT:Great effort on the literature review]]” is __TASK__, because it names a part of the work (3.8 rule b).",
                sub: [
                  { ex: { id: "r35b-great-effort", spans: [ { t: "Great effort", c: "FS" } ], notes: [ "__SELF__ (3.8 rule d)." ] } },
                  { ex: { id: "r35b-effort-lit-review", spans: [ { t: "Great effort on the literature review", c: "FT" } ], notes: [ "__TASK__, because it names a part of the work (3.8 rule b)." ] } }
                ]
              },
              {
                text: "Some fragments genuinely sit between task and self. “[[FS:This essay shows real effort]]” is about the essay, which points to task, but what it praises is the student’s effort, which points to self. Where a fragment sits between task and self like this, and it cannot naturally be split into a task part and a self-part, label it __SELF__.",
                sub: [
                  { ex: { id: "r35b-essay-real-effort", spans: [ { t: "This essay shows real effort", c: "FS" } ], notes: [] } }
                ]
              },
              {
                text: "If it can be split, split it (see {{3.5e|e}} below). For example, “[[FS:Fantastic effort]], and [[FT:your code passes every test case]]” becomes “[[FS:Fantastic effort]]” (self) and “[[FT:your code passes every test case]]” (task).",
                sub: [
                  { ex: {
                    id: "r35b-fantastic-effort-tests",
                    spans: [ { t: "Fantastic effort, ", c: "FS" }, { t: "and your code passes every test case", c: "FT" } ],
                    notes: [ "This becomes “Fantastic effort” (self) and “your code passes every test case” (task)." ]
                  } }
                ]
              }
            ]
          },
          {
            key: "c", title: "Generic praise attached to a task level response remains at the task level.",
            body: [
              { ex: {
                id: "r35c-intelligent-well-done",
                spans: [ { t: "That’s an intelligent response, well done", c: "FT" } ],
                oneSpan: true,
                notes: [ "The sentence is about the response, and as mentioned above, “[[FT:that’s an intelligent response]]” is task level. The “well done” part is still connected to the sentence about the “response”, and is hence part of the task span." ]
              } }
            ]
          },
          {
            key: "d", title: "Generic praise attached to a self-level response remains in the same self-level span.",
            body: [
              { ex: {
                id: "r35d-lots-of-work",
                spans: [ { t: "I can see you’ve put lots of work in, good job!", c: "FS" } ],
                oneSpan: true,
                notes: [ "“I can see you’ve put lots of work in” is self, because “lots of work” refers to the student’s effort (see 3.8 Effort Across Levels, rule d). Similarly, “good job!” is part of the entire span, which remains self-level." ]
              } }
            ]
          },
          {
            key: "e", title: "Split the span where the target of the evaluation changes.",
            body: [
              { ex: {
                id: "r35e-good-boy",
                spans: [ { t: "Good boy, ", c: "FS" }, { t: "that is correct", c: "FT" } ],
                notes: [ "Contains two spans: “[[FS:Good boy]]” (“boy” refers to a person → __SELF__) and “[[FT:that is correct]]” (this doesn’t say what is correct, but “that” most likely refers to the student’s answer → __TASK__)." ]
              } }
            ]
          }
        ]
      },

      /* ---------------------------------------------------------------- 3.6 */
      {
        section: "3.6", title: "Task ↔ Process",
        intro: [
          "In short: task-level feedback says **what** the work needs (including what the student needs to read or learn); process-level feedback is about **how** the student goes about producing, checking or finding material for it."
        ],
        rules: [
          {
            key: "a", title: "Naming a process for producing the work is at the process level, as long as it is not part of the submitted work (see item b below).",
            body: [
              {
                text: "“[[FP:Proofread your work]]” and “[[FP:This page may make more sense if you use the strategies we talked about earlier]]” (p. 90).",
                sub: [
                  { ex: { id: "r36a-proofread-work", spans: [ { t: "Proofread your work", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36a-strategies-earlier", spans: [ { t: "This page may make more sense if you use the strategies we talked about earlier", c: "FP" } ], notes: [] } }
                ]
              },
              "This follows directly from the points described in the FP section."
            ]
          },
          {
            key: "b", title: "Methods or processes that are part of the submitted work are task level.",
            body: [
              "This follows directly from FT point e.",
              "For example: A technique used in a solution, a research design, a statistical test, a chart type, an algorithm, a structure or framework used in the writing (such as writing paragraphs using the PEEL format), the working shown in a solution, and a procedure written up in a lab report.",
              "These are things that, by their nature, show up in the finished work.",
              "The way to distinguish is by considering whether it is the kind of method that, by its nature, shows up in the finished work and is assessed as part of it, whether or not the student used it.",
              { ex: { id: "r36b-unit-tests", spans: [ { t: "Write unit tests for the edge cases", c: "FT" } ], quiz: false, notes: [ "Assuming the tests are submitted is task." ] } },
              { ex: { id: "r36b-larger-inputs", spans: [ { t: "Test your code with larger inputs before submitting", c: "FP" } ], quiz: false, notes: [ "Assuming the testing is not submitted is process." ] } },
              "If it is unclear whether a method shows up in the finished work, code __PROCESS__. The task description from the coordinator may help you decide."
            ]
          },
          {
            key: "c", title: "Verbs that only say the work must change are task level. Verbs that ask the student to look for errors are process level, whatever part of the work they point to and whether or not a standard is named.",
            body: [
              {
                text: "Change and outcome verbs (correct, fix, revise, edit, add, remove, include, make sure, ensure) tell the student what the work must be. The marker has already decided what is wrong or missing, so the fragment is information about the work. Examples: “[[FT:Correct your spelling]]”, “[[FT:Revise this paragraph]]”, “[[FT:Use a friendly tone]]”, “[[FT:Make sure your references follow APA 7]]”. This follows under FT points b and c.",
                sub: [
                  { ex: { id: "r36c-correct-spelling", spans: [ { t: "Correct your spelling", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36c-revise-paragraph", spans: [ { t: "Revise this paragraph", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36c-friendly-tone", spans: [ { t: "Use a friendly tone", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36c-make-sure-apa", spans: [ { t: "Make sure your references follow APA 7", c: "FT" } ], notes: [] } },
                  "H&T describe task-level feedback as including “distinguishing correct from incorrect answers” (p. 91)."
                ]
              },
              {
                text: "Checking verbs (check, double-check, re-read, proofread, go over, compare) ask the student to find errors themselves, because no error has been identified. Examples: “[[FP:Check your spelling]]”, “[[FP:Double-check your calculations]]”, “[[FP:Proofread your work]]”, “[[FP:Check your references against APA 7]]”, “[[FP:Compare your answers with the worked solutions]]”. Naming a tool for finding errors is also process level (“[[FP:Use a grammar checker]]”). This follows under FP point a.",
                sub: [
                  { ex: { id: "r36c-check-spelling", spans: [ { t: "Check your spelling", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36c-double-check-calculations", spans: [ { t: "Double-check your calculations", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36c-proofread-work", spans: [ { t: "Proofread your work", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36c-check-apa", spans: [ { t: "Check your references against APA 7", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36c-compare-worked-solutions", spans: [ { t: "Compare your answers with the worked solutions", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36c-grammar-checker", spans: [ { t: "Use a grammar checker", c: "FP" } ], notes: [] } },
                  "H&T describe “strategies for error detection, thus providing oneself with feedback” as “a major type” of process-level feedback (p. 93)."
                ]
              },
              {
                text: "Some listed verbs have other meanings. Code what the fragment asks for: “[[FP:Compare your answers with the worked solutions]]” is process (checking for errors), but “[[FT:Compare the two theories in more depth]]” is task (what the essay should do, FT point b).",
                sub: [
                  { ex: { id: "r36c-compare-answers", spans: [ { t: "Compare your answers with the worked solutions", c: "FP" } ], notes: [ "Process (checking for errors)." ] } },
                  { ex: { id: "r36c-compare-theories", spans: [ { t: "Compare the two theories in more depth", c: "FT" } ], notes: [ "Task (what the essay should do, FT point b)." ] } }
                ]
              },
              {
                text: "When “make sure” or “ensure” is followed by something the student should do, code what follows: “[[FP:Make sure you proofread before submitting]]” → process (FP point a).",
                sub: [
                  { ex: { id: "r36c-make-sure-proofread", spans: [ { t: "Make sure you proofread before submitting", c: "FP" } ], notes: [ "→ process (FP point a)." ] } }
                ]
              },
              {
                text: "The verb lists are examples only. For other verbs, apply the test at the start of this rule: “[[FT:Fix your apostrophes]]” (task) vs “[[FP:Watch your apostrophes]]” (process).",
                sub: [
                  { ex: {
                    id: "r36c-fix-vs-watch-apostrophes",
                    vs: [
                      { spans: [ { t: "Fix your apostrophes", c: "FT" } ] },
                      { spans: [ { t: "Watch your apostrophes", c: "FP" } ] }
                    ],
                    notes: []
                  } }
                ]
              },
              "A named standard does not change the level. In “[[FP:Check your references against APA 7]]”, the student still does the comparing (FP point a).",
              { ex: {
                id: "r36c-correct-vs-check-spelling",
                vs: [
                  { spans: [ { t: "Correct your spelling", c: "FT" } ] },
                  { spans: [ { t: "Check your spelling", c: "FP" } ] }
                ],
                notes: [ "The same errors may have prompted both. But “correct” tells the student their spelling is wrong (task), while “check” asks them to find out (process)." ]
              } },
              {
                text: "Known limitation: some fragments with almost the same meaning receive different levels, e.g. “[[FT:Make sure your references follow APA 7]]” (FT point c) and “[[FP:Check your references against APA 7]]” (FP point a). This is deliberate. The level records what the fragment asks the student to do, not what prompted the marker to write it, and the same principle applies to “[[FT:Correct your spelling]]” vs “[[FP:Check your spelling]]” above.",
                sub: [
                  { ex: {
                    id: "r36c-make-sure-vs-check-apa",
                    vs: [
                      { spans: [ { t: "Make sure your references follow APA 7", c: "FT" } ] },
                      { spans: [ { t: "Check your references against APA 7", c: "FP" } ] }
                    ],
                    notes: []
                  } }
                ]
              }
            ]
          },
          {
            key: "d", title: "Information to take in is task-level; how to find it is process-level.",
            body: [
              "This follows from the definitions.",
              {
                text: "Asking students to acquire information is task level (FT point d): “[[FT:Read Smith (2020) on this point]]”, “[[FT:Do more reading on attachment theory]]”, “[[FT:Read more widely]]”, “[[FT:Do more research]]”, “[[FT:Find more recent sources]]”.",
                sub: [
                  { ex: { id: "r36d-read-smith", spans: [ { t: "Read Smith (2020) on this point", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36d-reading-attachment", spans: [ { t: "Do more reading on attachment theory", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36d-read-widely", spans: [ { t: "Read more widely", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36d-more-research", spans: [ { t: "Do more research", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36d-recent-sources", spans: [ { t: "Find more recent sources", c: "FT" } ], notes: [] } }
                ]
              },
              {
                text: "How to find material (a tool, a database, a search strategy, keywords, or getting help) is process level ({{FP.c|FP points c}} and {{FP.d|d}}): “[[FP:Use Scopus rather than Google]]”, “[[FP:Broaden your search terms]]”, “[[FP:Ask the librarian to help you find primary sources]]”.",
                sub: [
                  { ex: { id: "r36d-scopus", spans: [ { t: "Use Scopus rather than Google", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36d-broaden-search", spans: [ { t: "Broaden your search terms", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36d-ask-librarian", spans: [ { t: "Ask the librarian to help you find primary sources", c: "FP" } ], notes: [] } }
                ]
              },
              {
                text: "Evaluating a search method is also process-level: “[[FP:Your search missed key papers because you only used Google]]”.",
                sub: [
                  { ex: { id: "r36d-search-missed-google", spans: [ { t: "Your search missed key papers because you only used Google", c: "FP" } ], notes: [] } }
                ]
              }
            ]
          },
          {
            key: "e", title: "Standards the work must meet are task level when they are stated as what the work should be.",
            body: [
              {
                text: "Examples: “[[FT:Make sure your references follow APA 7]]”, “[[FT:Make sure each paragraph meets the rubric criteria]]”. This follows under FT point c.",
                sub: [
                  { ex: { id: "r36e-make-sure-apa", spans: [ { t: "Make sure your references follow APA 7", c: "FT" } ], notes: [] } },
                  { ex: { id: "r36e-make-sure-rubric", spans: [ { t: "Make sure each paragraph meets the rubric criteria", c: "FT" } ], notes: [] } }
                ]
              },
              {
                text: "When the standard is given as something to check the work against, it is process level (see 3.6 rule c above): “[[FP:Check your references against APA 7]]”, “[[FP:Check each paragraph against the rubric criteria]]”, “[[FP:Compare your answers with the worked solutions]]”. This follows under FP point a.",
                sub: [
                  { ex: { id: "r36e-check-apa", spans: [ { t: "Check your references against APA 7", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36e-check-rubric", spans: [ { t: "Check each paragraph against the rubric criteria", c: "FP" } ], notes: [] } },
                  { ex: { id: "r36e-compare-worked-solutions", spans: [ { t: "Compare your answers with the worked solutions", c: "FP" } ], notes: [] } }
                ]
              },
              {
                text: "Exception: if the student must recall the standard themselves and judge whether their work meets it, it is self-regulation level (e.g. “[[FR:You already know the key features of the opening of an argument. Check to see whether you have incorporated them in your first paragraph]]”, H&T p. 90).",
                sub: [
                  { ex: { id: "r36e-already-know", spans: [ { t: "You already know the key features of the opening of an argument. Check to see whether you have incorporated them in your first paragraph", c: "FR" } ], notes: [] } }
                ]
              }
            ]
          },
          {
            key: "f", title: "Elaboration does not shift something to process level.",
            body: [
              {
                text: "The sentence “[[FT:Your paragraphs are very long]]” is task level. Changing it to “[[FT:Your paragraphs are very long, which makes it hard to tell where one point ends and the next begins]]” is still task level.",
                sub: [
                  { ex: { id: "r36f-paragraphs-long", spans: [ { t: "Your paragraphs are very long", c: "FT" } ], notes: [ "Task level (FT point a)." ] } },
                  { ex: { id: "r36f-paragraphs-long-elaborated", spans: [ { t: "Your paragraphs are very long, which makes it hard to tell where one point ends and the next begins", c: "FT" } ], notes: [ "Still task level. Elaboration does not shift something to process level." ] } }
                ]
              }
            ]
          }
        ],
        other: {
          title: "Other examples",
          examples: [
            {
              id: "o36-edit-descriptors",
              spans: [ { t: "You need to edit this piece of writing by attending to the descriptors you have used so the reader is able to understand the nuances of your meaning.", c: "FT" } ],
              notes: [
                "(H&T p. 90).",
                "“Edit” only says the work must change (FT point b). “Attending to the descriptors” directs attention to a feature of the work, and “so the reader is able to understand the nuances of your meaning” elaborates on why. None of these describes a way of working, and so it received the task level. This is a deviation from H&T who give this as a process example."
              ]
            },
            {
              id: "o36-chain-rule-vs-strategies",
              vs: [
                { spans: [ { t: "Use the chain rule here", c: "FT" } ] },
                { spans: [ { t: "This page may make more sense if you use the strategies we talked about earlier.", c: "FP" } ] }
              ],
              notes: [
                "(p. 90).",
                "While both the examples name a method, the chain rule example is part of the submitted solution and is what is being assessed, meaning that it receives the label of task-level.",
                "In the second example, the strategies do not appear on the page, so it is process level."
              ]
            },
            {
              id: "o36-read-widely-vs-scopus",
              vs: [
                { spans: [ { t: "Read more widely", c: "FT" } ] },
                { spans: [ { t: "Use Scopus rather than Google.", c: "FP" } ] }
              ],
              notes: [
                "“[[FT:Read more widely]]” says what the student needs (more information), but nothing about how to find it, meaning it is task level (a very non-specific case of FT point d).",
                "“[[FP:Use Scopus rather than Google]]” is about how to find material, giving it the process level (FP point c)."
              ]
            },
            {
              id: "o36-sources-vs-draft-friday",
              vs: [
                { spans: [ { t: "Use at least three peer-reviewed sources per section", c: "FT" } ] },
                { spans: [ { t: "Aim to have the draft done by Friday.", c: "FP" } ] }
              ],
              notes: [
                "“[[FT:Use at least three peer-reviewed sources per section]]” is a requirement of the work, meaning it is task level (FT point b).",
                "“[[FP:Aim to have the draft done by Friday]]” is a work habit set by the marker. It says nothing about what the work should contain, giving it the process level (FP point e)."
              ]
            }
          ]
        }
      },

      /* ---------------------------------------------------------------- 3.7 */
      {
        section: "3.7", title: "Task/Process ↔ Self-Regulation",
        rules: [
          {
            key: "a", title: "Supplied vs recalled criteria.",
            body: [
              { ex: {
                id: "r37a-lab-report-structure",
                spans: [ { t: "You already know how to structure a lab report - follow it here.", c: "FT" } ],
                notes: [ "→ __TASK__. The student is only told to meet a standard. They aren’t asked to judge their own work. “You already know…” is a reminder and doesn’t change the level. “Follow it here” means “structure your lab report properly”, and the structure is part of the submitted work (FT point c)." ]
              } },
              { ex: {
                id: "r37a-check-rubric",
                spans: [ { t: "Go through each paragraph and check it against the rubric criteria.", c: "FP" } ],
                notes: [ "→ __PROCESS__. The rubric supplies the criteria, so the student does not have to recall them. Hence, it could not be self-regulation, as it fails question 2." ]
              } },
              { ex: {
                id: "r37a-already-know",
                spans: [ { t: "You already know the key features of the opening of an argument. Check to see whether you have incorporated them in your first paragraph", c: "FR" } ],
                notes: [ "(H&T p. 90) → __SELF-REGULATION__. This is because it asks the student to recall the criteria and monitor whether they applied them (for more in-depth explanation, refer to examples under {{3.4|3.4}})." ]
              } },
              {
                text: "Together these examples form a ladder:",
                sub: [
                  "__TASK__ – the student is told to meet a standard (“[[FT:Make sure your references follow APA 7]]”) (FT point c).",
                  "__PROCESS__ – the student is told to check the work, against a standard the feedback names or against none (“[[FP:Check your references against APA 7]]”, “[[FP:Check your spelling]]”) (FP point a).",
                  "__SELF-REGULATION__ – the student is told to check the work against a standard they must recall, which the feedback refers to but doesn’t name (“[[FR:You already know the key features…]]”) (FR case b)."
                ]
              }
            ]
          },
          {
            key: "b", title: "If the feedback supplies the method for deciding, it is process.",
            body: [
              {
                text: "Consider: “[[FP:If confused, reflect on if the word is naming a specific person, place or item]]”. We have provided the student the test to apply (“naming a specific person, place or item”), and this feedback comment does not answer either of the questions for it to be classified as self-regulation. This is because it is NOT about the student’s own monitoring, judging, directing their thinking, or way of working. The student does not have to decide anything about their own thinking or way of working.",
                sub: [
                  { ex: { id: "r37b-naming-person-place", spans: [ { t: "If confused, reflect on if the word is naming a specific person, place or item", c: "FP" } ], notes: [] } }
                ]
              }
            ]
          },
          {
            key: "c", title: "Framing words do not make a fragment self-regulation.",
            body: [
              "Words like “think about”, “consider”, “reflect on” do not make something self-regulation. You should strip them and think about what remains. It is self-regulation if both questions in the FR definition point to self-regulation.",
              { ex: { id: "r37c-naming-person-place", spans: [ { t: "If confused, reflect on if the word is naming a specific person, place or item", c: "FP" } ], notes: [ "→ __PROCESS__. Stripping “reflect on” leaves a supplied test (FP point b)." ] } },
              { ex: { id: "r37c-improve-this", spans: [ { t: "Think about how you could improve this", c: "FT" } ], notes: [ "→ __TASK__. Stripping the framing leaves “Improve this”, which asks only for a change to the work (FT point b)." ] } },
              { ex: { id: "r37c-plan-next-essay", spans: [ { t: "Think about how you’ll plan your next essay differently", c: "FR" } ], notes: [ "→ __SELF-REGULATION__. Stripping the framing leaves the student’s own planning. Here, (Q1 from FR definition) they are asked to direct their way of working, and (Q2 from FR definition) no plan is supplied, so they must come up with it." ] } }
            ]
          },
          {
            key: "d", title: "Judging one’s own reasoning versus changing or checking the work.",
            body: [
              {
                text: "Whether the fragment is phrased as a question or an instruction does not by itself change the level. “[[FR:Could you explain why you chose a qualitative design?]]” and “[[FR:Explain why you chose a qualitative design]]” are coded the same way. What matters is what the fragment asks the student to do.",
                sub: [
                  { ex: { id: "r37d-could-you-explain", spans: [ { t: "Could you explain why you chose a qualitative design?", c: "FR" } ], notes: [] } },
                  { ex: { id: "r37d-explain-why", spans: [ { t: "Explain why you chose a qualitative design", c: "FR" } ], notes: [] } },
                  {
                    text: "One exception: an instruction with a checking verb (check, re-read, go over) follows 3.6 rule c and is process level, even when the matching question would be self-regulation.",
                    sub: [
                      { ex: {
                        id: "r37d-ttest-vs-check-test",
                        vs: [
                          { spans: [ { t: "Is a t-test the right choice for this data?", c: "FR" } ] },
                          { spans: [ { t: "Check your choice of statistical test.", c: "FP" } ] }
                        ],
                        notes: [
                          {
                            text: "The question is __SELF-REGULATION__",
                            sub: [
                              "Q1 from FR definition: the student is asked to judge their own decision (the test they chose).",
                              "Q2 from FR definition: no verdict is given, so the student must make the judgement."
                            ]
                          },
                          "The statement is __PROCESS__. “Check” is a checking verb, so it follows 3.6 rule c, whatever part of the work it points to (FP point a)."
                        ]
                      } }
                    ]
                  }
                ]
              },
              "It is self-regulation only if both questions in the FR definition are met: the student is asked to judge their own reasoning or decisions (Q1), and the feedback leaves the verdict or reasons for the student to work out (Q2). If the feedback already supplies the verdict, Q2 is not met, so code what is supplied. If the fragment asks for something to be added to or changed in the work Q1 is not met, because it is about the work itself, so it is task-level.",
              { ex: {
                id: "r37d-conclusion-follow",
                spans: [ { t: "Does your conclusion follow from your results?", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to judge their own reasoning (whether their conclusion follows from their results).",
                  "Q2 from FR definition: the feedback gives no verdict, so the student must make the judgement themselves."
                ]
              } },
              { ex: {
                id: "r37d-could-you-explain-design",
                spans: [ { t: "Could you explain why you chose a qualitative design?", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to examine their own decision.",
                  "Q2 from FR definition: no reasons are supplied, so the student must come up with them."
                ]
              } },
              { ex: {
                id: "r37d-add-sentence-methods",
                spans: [ { t: "Add a sentence to your methods section explaining why you chose a qualitative design", c: "FT" } ],
                notes: [ "→ __TASK__. It explicitly asks for something to be added to the work (FT point b)." ]
              } },
              { ex: {
                id: "r37d-check-argument",
                spans: [ { t: "Check your argument", c: "FP" } ],
                notes: [ "→ __PROCESS__. “Check” asks the student to look over part of the work for errors (FP point a), the same as “[[FP:check your spelling]]”. It does not ask the student a question about their own reasoning." ]
              } },
              {
                text: "**Known limitation:** “[[FR:Does your conclusion follow from your results?]]” (__SELF-REGULATION__) and “[[FP:Check that your conclusion follows from your results]]” (__PROCESS__) mean almost the same thing but get different levels. When the student is checking their own reasoning, FP point a and FR case a overlap, so the form of the fragment decides (3.6 rule c). A question that asks the student to judge is __SELF-REGULATION__, and an instruction to check is __PROCESS__. This keeps the level decidable from the wording alone.",
                sub: [
                  { ex: {
                    id: "r37d-conclusion-question-vs-check",
                    vs: [
                      { spans: [ { t: "Does your conclusion follow from your results?", c: "FR" } ] },
                      { spans: [ { t: "Check that your conclusion follows from your results", c: "FP" } ] }
                    ],
                    notes: []
                  } }
                ]
              }
            ]
          },
          {
            key: "e", title: "Rhetorical questions do not force something to be self-regulation.",
            body: [
              {
                text: "When a rhetorical question already contains the judgement, the judgement has been provided by the marker. Under Q2 of the FR definition, the student has to be the one to generate the judgement or direction. Hence, “[[FT:Did you forget to include a conclusion?]]” (FT point b) and “[[FT:Why recommend Asia when your SWOT says fuel costs are the main threat?]]” (FT point a) are __TASK__.",
                sub: [
                  { ex: { id: "r37e-forget-conclusion", spans: [ { t: "Did you forget to include a conclusion?", c: "FT" } ], notes: [] } },
                  { ex: { id: "r37e-recommend-asia", spans: [ { t: "Why recommend Asia when your SWOT says fuel costs are the main threat?", c: "FT" } ], notes: [] } }
                ]
              }
            ]
          },
          {
            key: "f", title: "Questions about the topic (task) versus the student’s own reasoning (self-regulation).",
            body: [
              "Ask what the student would have to think about to answer. If it is the topic, or content the work should have (a perspective, evidence, a step), it is __TASK__ (FT point b). If it is whether their own choice, reasoning, understanding or material holds up, and no verdict is given, it is __SELF-REGULATION__. If the fragment says the answer should go in the work (add, include, “in your methods section”), it is __TASK__, whatever it is about.",
              { ex: {
                id: "r37f-environmentalist",
                spans: [ { t: "How might an environmentalist respond to this text?", c: "FT" } ],
                notes: [
                  "→ __TASK__",
                  "This comment does not satisfy Q1 from the FR definition - the student is asked to think about the text, not about their own thinking, learning or way of working.",
                  "Even though there is the framing of a question, in essence the comment is saying that you should include this perspective of the environmentalist (FT point b)."
                ]
              } },
              { ex: {
                id: "r37f-assumptions",
                spans: [ { t: "What assumptions does your interpretation rely on?", c: "FR" } ],
                quiz: false,
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to examine their own reasoning (what their interpretation rests on).",
                  "Q2 from FR definition: the assumptions aren’t named, so the student must identify them.",
                  "Note: this depends on the assessment. If the task description requires the assumptions to be stated, answering means supplying content the work should have, so it is __TASK__ (FT point b). For example, a hypothesis-testing report requires the test’s assumptions as a step, and some scientific reports require an assumptions section. If the task description doesn’t require them, code SELF-REGULATION as above."
                ]
              } },
              { ex: {
                id: "r37f-justify-claim",
                spans: [ { t: "Justify this claim", c: "FT" } ],
                notes: [ "→ __TASK__. Answering means adding evidence for a claim in the work (FT point b)." ]
              } },
              { ex: {
                id: "r37f-relate-research-question",
                spans: [ { t: "How does this relate to your research question?", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to judge their own decision (whether this material serves their research question).",
                  "Q2 from FR definition: no verdict is given, so the student must work out whether and how it relates.",
                  {
                    text: "Compare with:",
                    sub: [
                      { ex: {
                        id: "r37f-really-relevant",
                        spans: [ { t: "Is this really relevant to your research question?", c: "FT" } ],
                        notes: [ "→ TASK. “Really” gives the marker’s verdict (see rhetorical questions in {{3.7e|point e}}), so it is the statement “[[FT:This isn’t relevant to your research question]]” (FT point a)." ]
                      } }
                    ]
                  },
                  {
                    text: "Compare with:",
                    sub: [
                      { ex: {
                        id: "r37f-link-back",
                        spans: [ { t: "Link this back to your research question", c: "FT" } ],
                        notes: [ "→ TASK. It asks for a change to the work (FT point b). As with “Check that your conclusion follows…”, an instruction and a question with similar meanings can get different levels (see the known limitation above in {{3.7d|point d}})." ]
                      } }
                    ]
                  }
                ]
              } }
            ]
          },
          {
            key: "g", title: "Judging one’s own understanding (self-regulation) versus learning content (task).",
            body: [
              { ex: {
                id: "r37g-central-limit",
                spans: [ { t: "Check your understanding of the central limit theorem", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to judge their own understanding (their “knowledge states”, H&T p. 94).",
                  "Q2 from FR definition: no verdict is given, so the student must judge it themselves."
                ]
              } },
              { ex: {
                id: "r37g-mean-median",
                spans: [ { t: "Revise the difference between mean and median", c: "FT" } ],
                notes: [ "→ __TASK__. It names content to take in, without asking the student to judge their understanding. It is a direction to acquire more, different, or correct information." ]
              } }
            ]
          },
          {
            key: "h", title: "Goals, targets and monitoring comments are coded by whether the student sets it themselves (self-regulation), or the teacher explicitly sets it for them (process, or task if it is a requirement of the work).",
            body: [
              {
                text: "If the student must set the goal or target themselves, it is __SELF-REGULATION__, even if the feedback says what kind of goal to set. If the marker sets an explicit goal or target, you code by what is supplied: a work habit is process, a requirement of the work is task-level. It is self-regulation only when the fragment asks the student to set or choose the goal or target themselves (e.g. “Set yourself…”, “Decide on…”). A habit the marker names stays process level even if its details are left open: “Start earlier”, “Plan before you write”, “Manage your time better” (FP point e).",
                sub: [
                  { ex: { id: "r37h-start-earlier", spans: [ { t: "Start earlier", c: "FP" } ], notes: [] } },
                  { ex: { id: "r37h-plan-before-write", spans: [ { t: "Plan before you write", c: "FP" } ], notes: [] } },
                  { ex: { id: "r37h-manage-time", spans: [ { t: "Manage your time better", c: "FP" } ], notes: [] } }
                ]
              },
              "The same applies to monitoring. A way of monitoring that the marker supplies is process level. Monitoring the student must work out for themselves is self-regulation level.",
              { ex: {
                id: "r37h-word-count-targets",
                spans: [ { t: "Set yourself daily word-count targets", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to direct their own way of working by setting targets.",
                  "Q2 from FR definition: the targets aren’t given, so the student must set them. “Daily” and “word-count” only say what kind of target to set."
                ]
              } },
              { ex: {
                id: "r37h-kinds-of-mistakes",
                spans: [ { t: "Work out what kinds of mistakes you tend to make", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the student is asked to monitor their own learning.",
                  "Q2 from FR definition: no method or answer is supplied, so the student must work it out themselves."
                ]
              } },
              { ex: {
                id: "r37h-500-words",
                spans: [ { t: "Write 500 words a day", c: "FP" } ],
                notes: [ "→ __PROCESS__. The marker sets the target/work-habit (FP point e)." ]
              } },
              { ex: {
                id: "r37h-error-log",
                spans: [ { t: "Keep a log of the errors I’ve marked so you can spot your patterns", c: "FP" } ],
                notes: [ "→ __PROCESS__. The marker supplies the way of monitoring (a log) (FP point b). “So you can spot your patterns” gives the purpose of the log and does not change the level." ]
              } },
              { ex: {
                id: "r37h-three-sources",
                spans: [ { t: "Use at least three peer-reviewed sources per section", c: "FT" } ],
                notes: [ "→ __TASK__. FT point b." ]
              } }
            ]
          },
          {
            key: "i", title: "Evaluating (positively or negatively) the student’s self-monitoring is self-regulation level.",
            body: [
              "For an evaluation, ask what is being evaluated. If it’s the work, the fragment is task level. If it’s a method, it’s process level. If it’s the student’s monitoring of their own work or learning, it’s self-regulation level.",
              { ex: {
                id: "r37i-taken-on-board",
                spans: [ { t: "I can see you’ve taken on board the feedback on your draft", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the fragment evaluates how the student used feedback to direct their own way of working (“taken on board” means “acted on”).",
                  "Q2 from FR definition: the judgement being evaluated (how to act on the feedback) was the student’s to make."
                ]
              } },
              { ex: {
                id: "r37i-listening-my-feedback",
                spans: [ { t: "Good job! I see you’ve been listening to my feedback.", c: "FR" } ],
                oneSpan: true,
                notes: [
                  "→ __SELF-REGULATION__",
                  "Q1 from FR definition: the fragment evaluates how the student dealt with feedback.",
                  "Q2 from FR definition: the judgement being evaluated (how to act on the feedback) was the student’s to make.",
                  "Note: like “receptive to feedback”, “listening” can sound like a personal quality, but a comment on how the student deals with feedback is self-regulation (H&T p. 94). “Good job!” stays in the same span (3.5).",
                  {
                    text: "Compare:",
                    sub: [
                      { ex: {
                        id: "r37i-listening-self",
                        spans: [ { t: "Good job! I see you’ve been listening.", c: "FS" } ],
                        oneSpan: true,
                        notes: [ "→ SELF. Without “my feedback”, it’s unclear what the student listened to (feedback or lectures, for example), so Q1 can’t be shown to be met. What’s left is praise for something the student did in general, like effort (3.8 rule d). “Good job!” stays in the same span (see 3.5 rule d)." ]
                      } }
                    ]
                  }
                ]
              } },
              { ex: {
                id: "r37i-yield-alerted",
                spans: [ { t: "A yield of 112% should have alerted you that something went wrong", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__.",
                  "Q1 from FR definition: the fragment evaluates how the student monitored their own results.",
                  "Q2 from FR definition: the judgement being evaluated (noticing the impossible yield) was the student’s to make. The fragment says they didn’t make it, which still meets Q2.",
                  "What’s evaluated is the student’s failure to notice. The criticism isn’t really “your yield is wrong” but “you should have caught that”. It’s the negative version of “Well done for catching and correcting your own errors”."
                ]
              } },
              { ex: {
                id: "r37i-proofreading-thorough",
                spans: [ { t: "Your proofreading was thorough", c: "FP" } ],
                notes: [ "→ __PROCESS__. This evaluates a method, not the student’s self-monitoring." ]
              } },
              { ex: {
                id: "r37i-didnt-proofread",
                spans: [ { t: "You clearly didn’t proofread this", c: "FP" } ],
                notes: [ "→ __PROCESS__. It names a method (FP point f)." ]
              } },
              { ex: {
                id: "r37i-caught-typos",
                spans: [ { t: "You should have caught these typos", c: "FR" } ],
                notes: [
                  "→ __SELF-REGULATION__. It evaluates the student’s failure to notice their own errors, like the 112% example above.",
                  "Q1 from FR definition: the fragment evaluates how the student monitored their own work (whether they noticed their own errors), not the work itself.",
                  "Q2 from FR definition: the judgement being evaluated (spotting the typos) was the student’s to make. The fragment says they didn’t make it, which still meets Q2."
                ]
              } },
              { ex: {
                id: "r37i-yield-impossible",
                spans: [ { t: "Your percentage yield of 112% is impossible", c: "FT" } ],
                notes: [ "→ __TASK__. This is because it evaluates the result itself." ]
              } },
              { ex: {
                id: "r37i-second-draft",
                spans: [ { t: "Your second draft is much improved", c: "FT" } ],
                notes: [ "→ __TASK__. This evaluates the work." ]
              } }
            ]
          }
        ],
        other: {
          title: "Other examples",
          examples: [
            {
              id: "o37-friend-vs-when-feedback",
              vs: [
                { spans: [ { t: "Ask a friend to read it", c: "FP" } ] },
                { spans: [ { t: "Think about when it would help to ask for feedback on a draft.", c: "FR" } ] }
              ],
              notes: [
                "“[[FP:Ask a friend to read it]]” supplies the help to seek, so the student does not have to decide where to get help, meaning it is process level (FP point d).",
                "“[[FR:Think about when it would help to ask for feedback on a draft]]” leaves the student to judge when to seek help. No timing or source is supplied, so the student must decide for themselves, giving it the self-regulation level.",
                "This follows H&T, who place help-seeking at more than one level. Process-level feedback can indicate a need “to seek help” (p. 93), while self-regulated students “know how and when to seek and receive feedback from others” (p. 94)."
              ]
            },
            {
              id: "o37-strengthen-analysis",
              spans: [ { t: "Consider how you could strengthen your analysis", c: "FT" } ],
              notes: [
                "Stripping the framing leaves “[[FT:strengthen your analysis]]”, a change verb that says what the work should become (FT point b). It names no way of producing or checking the work, so it is not process-level. Q1 from the FR definition is not met either: the student is asked to change the work, not to judge their own reasoning."
              ]
            }
          ]
        }
      },

      /* ---------------------------------------------------------------- 3.8 */
      {
        section: "3.8", title: "Effort Across Levels",
        intro: [
          "Comments about effort can fall at any level. The words “effort”, “try”, “work hard” or “more time” do not decide the level on their own. Apply the rules below in order."
        ],
        rules: [
          {
            key: "a", title: "If the student is asked to judge their own effort, it is self-regulation.",
            body: [
              { ex: {
                id: "r38a-spread-effort",
                spans: [ { t: "Reflect on whether you spread your effort well across the sections", c: "FR" } ],
                notes: [ "→ __SELF-REGULATION__. The student judges their own way of working (Q1), and no verdict is given (Q2). See {{3.4|3.4}}." ]
              } }
            ]
          },
          {
            key: "b", title: "If the effort is tied to a named part of the work, code what is said about that part. This is usually task.",
            body: [
              "A named part is a word that picks out a part of the work, not the whole of it. “Your essay”, “your work” and “the assignment” name the whole work, so this rule (3.8 b) does not apply. “This” and “it” do not name a part, and should be treated as referring to the whole work.",
              {
                text: "Advice: “[[FT:Put more effort into your referencing]]” and “[[FT:Spend more time on your analysis]]” are __TASK__. The effort wording is framing.",
                sub: [
                  { ex: { id: "r38b-effort-referencing", spans: [ { t: "Put more effort into your referencing", c: "FT" } ], notes: [] } },
                  { ex: { id: "r38b-time-analysis", spans: [ { t: "Spend more time on your analysis", c: "FT" } ], notes: [] } }
                ]
              },
              {
                text: "Evaluations: “[[FT:Your conclusion needed more effort]]” and “[[FT:Great effort on the literature review]]” are __TASK__. Each says whether that part of the work is up to standard (FT point a).",
                sub: [
                  { ex: { id: "r38b-conclusion-effort", spans: [ { t: "Your conclusion needed more effort", c: "FT" } ], notes: [] } },
                  { ex: { id: "r38b-effort-lit-review", spans: [ { t: "Great effort on the literature review", c: "FT" } ], notes: [] } }
                ]
              }
            ]
          },
          {
            key: "c", title: "Advice about when or how to organise the work is process.",
            body: [
              {
                text: "“[[FP:Start earlier]]”, “[[FP:Set aside an hour each day for this unit]]” and “[[FP:Plan before you write]]” are __PROCESS__. Each names a work habit (FP point e).",
                sub: [
                  { ex: { id: "r38c-start-earlier", spans: [ { t: "Start earlier", c: "FP" } ], notes: [ "__PROCESS__. It names a work habit (FP point e)." ] } },
                  { ex: { id: "r38c-hour-each-day", spans: [ { t: "Set aside an hour each day for this unit", c: "FP" } ], notes: [ "__PROCESS__. It names a work habit (FP point e)." ] } },
                  { ex: { id: "r38c-plan-before-write", spans: [ { t: "Plan before you write", c: "FP" } ], notes: [ "__PROCESS__. It names a work habit (FP point e)." ] } }
                ]
              }
            ]
          },
          {
            key: "d", title: "__Otherwise__, a fragment about how much effort the student puts in is self.",
            body: [
              {
                text: "Examples include when the marker evaluates the effort in general: “[[FS:Great effort]]”, “[[FS:You clearly worked hard on this]]”, “[[FS:Nice try]]” (FS point a).",
                sub: [
                  { ex: { id: "r38d-great-effort", spans: [ { t: "Great effort", c: "FS" } ], notes: [] } },
                  { ex: { id: "r38d-worked-hard", spans: [ { t: "You clearly worked hard on this", c: "FS" } ], notes: [] } },
                  { ex: { id: "r38d-nice-try", spans: [ { t: "Nice try", c: "FS" } ], notes: [] } }
                ]
              },
              {
                text: "The marker evaluates effort in the work as a whole: “[[FS:This essay shows real effort]]”, or “[[FS:With a bit more effort this could have been a distinction]]”. These are partly about the work too, but they cannot naturally be split, so they are __SELF__ (3.5 rule b).",
                sub: [
                  { ex: { id: "r38d-essay-real-effort", spans: [ { t: "This essay shows real effort", c: "FS" } ], notes: [] } },
                  { ex: { id: "r38d-more-effort-distinction", spans: [ { t: "With a bit more effort this could have been a distinction", c: "FS" } ], notes: [] } }
                ]
              },
              {
                text: "The marker asks for more effort or time in general: “[[FS:Try harder next time]]”, “[[FS:Put in more effort]]”, “[[FS:Put in more time]]”. No part of the work is named, so the effort itself is all that is left.",
                sub: [
                  { ex: { id: "r38d-try-harder", spans: [ { t: "Try harder next time", c: "FS" } ], notes: [] } },
                  { ex: { id: "r38d-more-effort", spans: [ { t: "Put in more effort", c: "FS" } ], notes: [] } },
                  { ex: { id: "r38d-more-time", spans: [ { t: "Put in more time", c: "FS" } ], notes: [] } }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
