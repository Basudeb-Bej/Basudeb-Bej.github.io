import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STORAGE_KEY = "portfolio-chatbot-state-v3";
const MAX_HISTORY = 12;
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const PROFILE = {
  name: "Basudeb Bej",
  role: "MERN Stack Developer",
  projects: ["Portfolio Website"],
  skills: ["React", "Node.js", "Express", "MongoDB"],
};

const ROUTE_PROMPTS = {
  "/": {
    summary: "A polished portfolio overview with clear navigation and visual hierarchy.",
    prompts: ["Show projects", "Tell me about skills", "Open contact"],
  },
  "/about": {
    summary: "Design-first thinking, responsive UI, and practical frontend delivery.",
    prompts: ["Open about", "Show skills", "What is your design style?"],
  },
  "/education": {
    summary: "A concise view of academic background and learning milestones.",
    prompts: ["Show education", "What did you study?", "Open projects"],
  },
  "/skills": {
    summary: "A focused summary of the stack and tools used across the portfolio.",
    prompts: ["Show React skills", "What backend tools do you use?", "Open projects"],
  },
  "/projects": {
    summary: "Project highlights with direct links and a clear breakdown of work.",
    prompts: ["Tell me about the Portfolio Website", "Show projects", "Open contact"],
  },
  "/contact": {
    summary: "Clear contact options and a straightforward message form.",
    prompts: ["Open contact", "How can I reach you?", "Show projects"],
  },
};

const DEFAULT_PROMPTS = ["Show projects", "Skills", "Contact", "Education"];

const initialMessages = [
  {
    role: "assistant",
    content: `Hi, I’m the assistant for ${PROFILE.name}. Ask me about projects, skills, education, or contact details.`,
  },
];

const isValidMessage = (message) => Boolean(message && message.role && message.content);

const loadMessages = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return initialMessages;
    }

    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
      return parsed.messages.filter(isValidMessage);
    }

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.filter(isValidMessage);
    }
  } catch {
    return initialMessages;
  }

  return initialMessages;
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => loadMessages());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const endRef = useRef(null);
  const closeTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const routeMeta = useMemo(() => ROUTE_PROMPTS[location.pathname] || null, [location.pathname]);
  const suggestions = routeMeta?.prompts || DEFAULT_PROMPTS;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeaking = () => {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  };

  const speakMessage = (text, index) => {
    if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance === "undefined") {
      return;
    }

    stopSpeaking();

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const detectIntent = (text) => {
    const normalized = text.toLowerCase();

    if (normalized.includes("project")) {
      return {
        type: "local",
        response: `Projects include ${PROFILE.projects.join(", ")}. Opening the projects page.`,
        route: "/projects",
      };
    }

    if (normalized.includes("skill") || normalized.includes("stack") || normalized.includes("tech")) {
      return {
        type: "local",
        response: `The core stack is ${PROFILE.skills.join(", ")}.`,
        route: "/skills",
      };
    }

    if (normalized.includes("contact") || normalized.includes("reach")) {
      return {
        type: "local",
        response: "Opening the contact page so you can reach out directly.",
        route: "/contact",
      };
    }

    if (normalized.includes("education") || normalized.includes("study")) {
      return {
        type: "local",
        response: "Opening the education page with academic background details.",
        route: "/education",
      };
    }

    if (normalized.includes("home") || normalized.includes("about")) {
      return {
        type: "local",
        response: "Opening the requested page now.",
        route: normalized.includes("about") ? "/about" : "/",
      };
    }

    return { type: "ai" };
  };

  const closePanel = () => {
    setIsClosing(true);
    stopSpeaking();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 180);
  };

  const openPanel = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    setOpen(true);
    setIsClosing(false);
  };

  const sendMessage = async (rawMessage) => {
    const trimmedMessage = rawMessage.trim();

    if (!trimmedMessage) {
      return;
    }

    stopSpeaking();

    const nextMessages = [...messages, { role: "user", content: trimmedMessage }].slice(-MAX_HISTORY);
    setMessages(nextMessages);
    setInput("");

    const intent = detectIntent(trimmedMessage);

    if (intent.type === "local") {
      window.setTimeout(() => {
        setMessages((currentMessages) => [
          ...currentMessages,
          { role: "assistant", content: intent.response },
        ].slice(-MAX_HISTORY));

        if (intent.route) {
          navigate(intent.route);
        }
      }, 220);

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: nextMessages.slice(0, -1),
          profile: PROFILE,
          currentPath: location.pathname,
        }),
      });

      const result = await response.json().catch(() => ({}));
      const reply = result.reply || "Gemini is returning a quota error, so live replies are unavailable right now.";

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: reply },
      ].slice(-MAX_HISTORY));
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: "Gemini is returning a quota error, so live replies are unavailable right now. Add billing or available credits to restore online chat.",
        },
      ].slice(-MAX_HISTORY));
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    stopSpeaking();
    setMessages(initialMessages);
    localStorage.removeItem(STORAGE_KEY);
  };

  const currentLabel = routeMeta?.summary || "Ask about my projects, skills, education, or contact details.";

  const chatbotUi = (
    <div className="chatbot-shell">
      {open ? (
        <div className={`chatbot-panel ${isClosing ? "chatbot-panel-closing" : "chatbot-panel-open"}`}>
          <div className="chatbot-panel-header">
            <div>
              <span className="chatbot-eyebrow">Portfolio Assistant</span>
            </div>
            <button type="button" className="chatbot-icon-button" onClick={closePanel} aria-label="Close chat">
              <i className="bi bi-x-lg" />
            </button>
          </div>

          <div className="chatbot-status-row">
            <span className="chatbot-status-pill">
              <i className="bi bi-sparkles" />
              {currentLabel}
            </span>
            <button type="button" className="chatbot-reset" onClick={resetChat}>
              Reset
            </button>
          </div>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chatbot-message ${message.role}`}>
                <div className="chatbot-message-row">
                  <span>{message.content}</span>

                  {message.role === "assistant" ? (
                    <button
                      type="button"
                      className={`chatbot-speak ${speakingIndex === index ? "is-speaking" : ""}`}
                      onClick={() => speakMessage(message.content, index)}
                      aria-label="Read answer aloud"
                      title="Read aloud"
                    >
                      <i className={`bi ${speakingIndex === index ? "bi-volume-up-fill" : "bi-volume-up"}`} />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="chatbot-message assistant chatbot-typing" aria-label="Assistant is typing">
                <span className="chatbot-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : null}

            <div ref={endRef} />
          </div>

          <div className="chatbot-actions">
            {suggestions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="chatbot-chip"
                onClick={() => sendMessage(prompt)}
              >
                <i className="bi bi-chat-square-text" />
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="chatbot-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about projects, skills, or contact..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send" disabled={loading} aria-label="Send message">
              <i className="bi bi-send-fill" />
            </button>
          </form>
        </div>
      ) : null}

      <button type="button" className="chatbot-launcher" onClick={openPanel} aria-label="Open chat assistant">
        <span className="chatbot-launcher-avatar">
          <i className="bi bi-robot" />
        </span>
        <span className="chatbot-launcher-pulse" />
      </button>
    </div>
  );

  if (typeof document === "undefined") {
    return chatbotUi;
  }

  return createPortal(chatbotUi, document.body);
};

export default Chatbot;
