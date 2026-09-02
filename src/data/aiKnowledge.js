import { profile, skills, projects, education, certifications } from "./resumeData";

// ─────────────────────────────────────────────────────────────────────────
// The Portfolio Assistant answers ONLY from the structured resume data
// imported above. It does not call any external model, so it is
// physically incapable of inventing facts: every branch below returns
// text built from the resume fields, or the "not available" fallback.
//
// A production deployment could instead call an LLM through the included
// server/index.js proxy (see server/README section in the root README)
// and pass this same resumeData as the ONLY context, with a system
// prompt instructing it never to answer outside that context — but the
// rule-based engine here is what ships by default because it can be
// verified line by line to never hallucinate.
// ─────────────────────────────────────────────────────────────────────────

const NOT_AVAILABLE =
  "That isn't mentioned in Kesavan's resume, so I can't answer that. Feel free to ask about his skills, projects, education, certifications, or how to contact him.";

const list = (arr) => arr.join(", ");

function formatProject(p) {
  const lines = [
    `${p.name}${p.type ? ` — ${p.type}${p.duration ? ` (${p.duration})` : ""}` : ""}.`,
    p.description,
    `Tech stack: ${list(p.techStack)}.`,
    `Key features: ${p.features.join("; ")}.`,
  ];
  if (p.github) lines.push(`Code: ${p.github}`);
  if (p.live) lines.push(`Live: ${p.live}`);
  return lines.join(" ");
}

const rules = [
  {
    test: /who is kesavan|about kesavan|introduce|summary|tell me about (him|kesavan)/i,
    answer: () => `${profile.name} — ${profile.title}. ${profile.summary}`,
  },
  {
    test: /skill|technolog|stack|tech(?!stack).*use|know/i,
    answer: () =>
      skills.map((s) => `${s.category}: ${list(s.items)}.`).join(" "),
  },
  {
    test: /melodia/i,
    answer: () => formatProject(projects.find((p) => p.id === "melodia")),
  },
  {
    test: /stayease|guest room|hotel/i,
    answer: () => formatProject(projects.find((p) => p.id === "stayease")),
  },
  {
    test: /project/i,
    answer: () => projects.map(formatProject).join(" | "),
  },
  {
    test: /education|degree|college|university|study|studied|cgpa|academic/i,
    answer: () =>
      education
        .map((e) => `${e.degree}, ${e.institution} (${e.duration}), CGPA ${e.cgpa}.`)
        .join(" "),
  },
  {
    test: /certif|training|course/i,
    answer: () => certifications.map((c) => `${c.name} (${c.detail}).`).join(" "),
  },
  {
    test: /contact|email|phone|number|reach|hire|linkedin|github/i,
    answer: () =>
      `You can reach Kesavan at ${profile.email} or ${profile.phone}. GitHub: ${profile.github} · LinkedIn: ${profile.linkedin}`,
  },
  {
    test: /^(hi|hello|hey)\b/i,
    answer: () =>
      `Hi! I'm Kesavan's portfolio assistant. Ask me about his skills, projects, education, certifications, or how to contact him.`,
  },
];

export function answerQuestion(rawQuery) {
  const query = rawQuery.trim();
  if (!query) return NOT_AVAILABLE;
  for (const rule of rules) {
    if (rule.test.test(query)) return rule.answer();
  }
  return NOT_AVAILABLE;
}

export const suggestedQuestions = [
  "Who is Kesavan?",
  "What skills does Kesavan have?",
  "Tell me about Melodia",
  "Tell me about StayEase",
  "What is Kesavan's education?",
  "How can I contact Kesavan?",
];
