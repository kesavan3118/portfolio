import { useEffect, useRef, useState } from "react";
import { answerQuestion, suggestedQuestions } from "../data/aiKnowledge";
import "../styles/aiAssistant.css";

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT; // unset by default → local engine

const WELCOME = {
  role: "assistant",
  text: "Hi, I'm Kesavan's portfolio assistant. Ask me about his skills, projects or education.",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function handleAsk(question) {
    if (!question.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    let answer;
    try {
      if (AI_ENDPOINT) {
        const res = await fetch(AI_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });
        const data = await res.json();
        answer = data.answer || answerQuestion(question);
      } else {
        answer = answerQuestion(question);
      }
    } catch {
      answer = answerQuestion(question);
    }

    setMessages((m) => [...m, { role: "assistant", text: answer }]);
    setLoading(false);
  }

  return (
    <div className="ai-widget">
      {open && (
        <div className="ai-panel glass" role="dialog" aria-label="Portfolio AI Assistant">
          <div className="ai-panel-header">
            <div>
              <p className="ai-panel-title">AI Assistant</p>
              <p className="ai-panel-sub">Answers sourced only from Kesavan's resume</p>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)} aria-label="Close assistant">
              ×
            </button>
          </div>

          <div className="ai-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-bubble ai-bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="ai-bubble ai-bubble--assistant ai-typing">Thinking…</div>}
          </div>

          <div className="ai-suggestions">
            {suggestedQuestions.slice(0, 3).map((q) => (
              <button key={q} className="ai-suggestion" onClick={() => handleAsk(q)}>
                {q}
              </button>
            ))}
          </div>

          <form
            className="ai-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, education…"
              aria-label="Ask the portfolio assistant a question"
            />
            <button type="submit" className="ai-send" aria-label="Send question">
              →
            </button>
          </form>
        </div>
      )}

      <button
        className="ai-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        <span className="ai-toggle-dot" />
        {open ? "Close" : "Ask AI"}
      </button>
    </div>
  );
}
