// OPTIONAL server-side proxy.
//
// The site works fully offline with the local rule-based assistant in
// src/data/aiKnowledge.js (no API key, no network call, zero chance of
// hallucination). Run this file only if you want the assistant answered
// by a real LLM instead. It keeps the API key on the server, never in
// browser code, and forces the model's context to be Kesavan's resume
// data ONLY — the system prompt explicitly forbids adding outside info.
//
// Start:   npm run server        (reads ANTHROPIC_API_KEY from .env)
// Frontend: point VITE_AI_ENDPOINT (see .env.example) at
//           http://localhost:8787/api/ask and AIAssistant.jsx will use
//           it automatically instead of the local engine.

import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { profile, skills, projects, education, certifications } from "../src/data/resumeData.js";

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const RESUME_CONTEXT = JSON.stringify(
  { profile, skills, projects, education, certifications },
  null,
  2
);

const SYSTEM_PROMPT = `You are the Portfolio Assistant for Kesavan M's personal website.
You may ONLY use the JSON resume data provided below to answer questions.
Never invent skills, projects, employers, achievements, or contact details.
If the answer is not present in the JSON data, reply exactly:
"That isn't mentioned in Kesavan's resume, so I can't answer that."
Keep answers concise and factual, in plain text (no markdown).

RESUME DATA:
${RESUME_CONTEXT}`;

app.post("/api/ask", async (req, res) => {
  const { question } = req.body || {};
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Missing 'question' string in request body." });
  }
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: question }],
    });
    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");
    res.json({ answer: text });
  } catch (err) {
    console.error("AI proxy error:", err);
    res.status(500).json({ error: "The assistant is temporarily unavailable." });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`AI proxy listening on http://localhost:${PORT}`));
