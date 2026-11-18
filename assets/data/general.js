/* Section 1 (General Annotation Principles) and the front-page overview.
   See README.md for the content format. */
window.GUIDE = window.GUIDE || {};

GUIDE.home = {
  title: "Annotation Guidelines",
  intro: [
    "Under Hattie and Timperley’s (2007) widely used feedback model, effective feedback must answer three questions:"
  ],
  questions: [
    { q: "Where am I going? (the goals)", code: "FU", name: "Feed-Up" },
    { q: "How am I going?", code: "FB", name: "Feed-Back" },
    { q: "Where to next?", code: "FF", name: "Feed-Forward" }
  ],
  questionsNote: "Annotating these questions is called annotating the **feedback questions**.",
  levelsIntro: "Answers to these three questions operate at different main levels:",
  levels: [
    { q: "How well tasks are understood/performed", code: "FT", name: "Task-level" },
    { q: "The main process needed to understand/perform tasks", code: "FP", name: "Process-level" },
    { q: "Self-monitoring, directing, and regulating of actions", code: "FR", name: "Self-regulation-level" }
  ],
  after: [
    "In addition, there is a fourth level called [[FS:self-level]], which includes personal evaluations and affect about the learner. The self-level is unique as it never has a corresponding feedback question (after all, saying generic statements about a student being smart is not feed-up, feed-back or feed-forward).",
    "These four levels (self-level, task-level, process-level, self-regulation-level) are referred to as the **feedback levels**.",
    "In addition, effective feedback should be specific. Section four of these guidelines explains an annotation process for labelling specific feedback.",
    "Note, all page references in this document refer to the Hattie and Timperley paper, unless otherwise specified."
  ],
  changeLog: [
    { date: "18 Nov 2026", text: "First draft released." }
  ]
};

GUIDE.general = {
  id: "general",
  sectionNumber: "1",
  title: "General Annotation Principles",
  principles: [
    {
      n: 1,
      title: "Fragment-level coding",
      body: [
        "The coding will happen at what we refer to as the fragment level. Given a feedback comment (which will typically span multiple sentences), the annotator will classify the relevant words into a feedback question and a feedback level category. More specifically, there is no need (and it will often be inaccurate) to label the entire sentence or response with only one feedback question and feedback level. An exception to this is in section four when labelling specific feedback, which has its own rules (please refer to section 4 for this)."
      ]
    },
    {
      n: 2,
      title: "The annotation level spans between feedback questions and feedback levels do not have to correspond.",
      body: [
        "This is best explained through an example. Consider the sentence:",
        { ex: {
          id: "p2-comments",
          codings: {
            questions: [
              { t: "Please write comments on important long logic blocks (such as loops of long if-statements) ", c: "FF" },
              { t: "such that other people can understand more easily.", c: "FU" },
              { t: " For example, write a 1-2 line comment explaining what the method calculate_duration() does.", c: "FF" }
            ],
            levels: [
              { t: "Please write comments on important long logic blocks (such as loops of long if-statements) such that other people can understand more easily. For example, write a 1-2 line comment explaining what the method calculate_duration() does.", c: "FP" }
            ]
          },
          notes: [
            "For the feedback questions, the part underlined is feed-up, and the remainder, in italics, is feed-forward. This would result in three spans for this section (feed-forward, feed-up, feed-forward).",
            "However, when it comes to the feedback level categories, we would have the entire section as process level. This would result in only 1 span."
          ]
        } },
        "In this way, you can think of the classifications as independent."
      ]
    },
    {
      n: 3,
      title: "Mutually exclusive feedback question and feedback level coding.",
      body: [
        "For feedback questions, labelling is mutually exclusive. For example, if a fragment is labelled as feed-back it cannot also be labelled as feed-forward. Similarly, feedback levels are also mutually exclusive. For example, if a fragment is labelled as task, it cannot also be labelled as process."
      ]
    },
    {
      n: 4,
      title: "Don’t annotate unrelated information (exception is self-level feedback).",
      body: [
        { text: "If a fragment has absolutely no connection to the student submission, then it should not have any annotation. An example would be if a tutor wrote “This assessment task takes a long time” or “It’s a long assignment” or “looking forward to seeing the finished product in submission slot 2!” These are general statements that have no relationship to the student submission and hence should not be annotated.", sub: [
          { ex: { id: "p4-long-time", codings: { questions: [{ t: "This assessment task takes a long time", c: null }], levels: [{ t: "This assessment task takes a long time", c: null }] }, notes: [] } },
          { ex: { id: "p4-long-assignment", codings: { questions: [{ t: "It’s a long assignment", c: null }], levels: [{ t: "It’s a long assignment", c: null }] }, notes: [] } },
          { ex: { id: "p4-slot-2", codings: { questions: [{ t: "looking forward to seeing the finished product in submission slot 2!", c: null }], levels: [{ t: "looking forward to seeing the finished product in submission slot 2!", c: null }] }, notes: [] } }
        ] },
        { text: "However, if a comment includes self-level feedback, that should still be appropriately annotated, even though it has no connection to the student submission. For example, “You are a very smart student” would not usually be annotated as it is unrelated to the student assessment/artifact, but we make an exception as it is self-level feedback.", sub: [
          { ex: { id: "p4-smart", codings: { questions: [{ t: "You are a very smart student", c: null }], levels: [{ t: "You are a very smart student", c: "FS" }] }, notes: [] } }
        ] }
      ]
    },
    {
      n: 5,
      title: "Same span equals same purpose.",
      body: [
        "In the annotation tool, take care to ensure that a span contains the content relevant to 1 objective/idea. For example, consider the example:",
        { ex: {
          id: "p5-two-ideas",
          codings: {
            levels: [
              { t: "Please write comments on important long logic blocks (such as loops of long if-statements) such that other people can understand more easily. For example, write a 1-2 line comment explaining what the method calculate_duration() does.", c: "FP" },
              { t: " Also, please refrain from writing out the entire word, for example, “dura” instead of duration.", c: "FP" }
            ]
          },
          notes: [
            "This entire paragraph contains process level feedback, but on two distinct points. When annotating, we would have the following spans:",
            "“Please write comments on important long logic blocks (such as loops of long if-statements) + [context] + For example, write a 1-2 line comment explaining what the method calculate_duration() does.” This is one distinct idea, and so the span should cover the entirety of this point.",
            "“Also, please refrain from writing out the entire word, for example, “dura” instead of duration”. This is a second distinct idea, and so it is a separate span."
          ]
        } },
        "As an extension of the principle, neighbouring fragments on different points are separate spans, even when they have the same code. For example:",
        { ex: {
          id: "p5-intro-method",
          codings: {
            questions: [
              { t: "The introduction is clear, ", c: "FB" },
              { t: "but the method section is weak", c: "FB" }
            ]
          },
          notes: ["“The introduction is clear, | but the method section is weak” is two feed-back spans, as each is on a different point."]
        } },
        "Another thing to keep in mind is that for feedback questions, one idea can be split into several spans when its parts answer different questions."
      ]
    }
  ]
};
