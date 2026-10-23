import { useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiGlobe,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiX,
} from "react-icons/fi";
import api from "../services/api";
import Mascot from "./Mascot";
import {
  CHATBOT_COPY,
  CHATBOT_SUGGESTIONS,
  LANGUAGE_NAMES,
  SUPPORT_LINKS,
} from "../data/chatbotContent";

const initialMessage = {
  id: "welcome",
  from: "assistant",
  language: "en",
  title: "SendIt Assistant",
  text: CHATBOT_COPY.welcome.en,
};

const hindiWords = /\b(mujhe|muje|kaise|kya|kyu|nahi|mera|meri|hai|bheju|bhejna|chahiye|kitna|kitni|karu)\b/i;
const gujaratiWords = /\b(kem|shu|nathi|maro|mari|mane|chhe|moklu|melvu|joie|ketlo|ketla)\b/i;

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function detectLanguage(value) {
  if (/[\u0A80-\u0AFF]/.test(value)) return "gu";
  if (/[\u0900-\u097F]/.test(value)) return "hi";

  const hindiMatches = value.match(new RegExp(hindiWords.source, "gi")) || [];
  const gujaratiMatches = value.match(new RegExp(gujaratiWords.source, "gi")) || [];
  if (hindiMatches.length || gujaratiMatches.length) {
    return gujaratiMatches.length > hindiMatches.length ? "gu" : "hi";
  }

  return "en";
}

function Message({ message }) {
  const isAssistant = message.from === "assistant";

  return (
    <div className={`sendit-chatbot-message ${message.from}`}>
      {isAssistant && message.title ? (
        <div className="sendit-chatbot-message-title">{message.title}</div>
      ) : null}
      <p>{message.text}</p>
      {isAssistant && message.showSupportLinks ? (
        <div className="sendit-chatbot-support-links">
          <a href={`mailto:${SUPPORT_LINKS.email}`}>
            <FiMail aria-hidden="true" />
            {CHATBOT_COPY.emailButton[message.language]}
          </a>
          <a href={SUPPORT_LINKS.whatsapp} target="_blank" rel="noreferrer">
            <FiMessageCircle aria-hidden="true" />
            {CHATBOT_COPY.whatsappButton[message.language]}
          </a>
        </div>
      ) : null}
    </div>
  );
}

function SendItChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [sending, setSending] = useState(false);
  const chatbotRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const sendingRef = useRef(false);
  const activeLanguage = messages[messages.length - 1]?.language || "en";

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [messages, open, sending]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handlePointerDown = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open]);

  const sendMessage = async (messageText) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || sendingRef.current) return;

    const language = detectLanguage(trimmedMessage);
    const userMessage = {
      id: makeId("user"),
      from: "user",
      language,
      text: trimmedMessage,
    };
    const visibleHistory = [...messages, userMessage];
    const conversation = visibleHistory
      .filter((message) => message.id !== "welcome" && !message.isError)
      .slice(-12)
      .map(({ from, text }) => ({ role: from, text }));

    setMessages(visibleHistory);
    setInput("");
    setOpen(true);
    setSending(true);
    sendingRef.current = true;

    try {
      const response = await api.post("/assistant/chat", {
        messages: conversation,
      });
      const answer = response.data?.answer?.trim();
      if (!answer) throw new Error("The assistant returned an empty answer.");

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: makeId("assistant"),
          from: "assistant",
          language,
          title: "SendIt Assistant",
          text: answer,
        },
      ]);
    } catch (error) {
      const message =
        error.response?.data?.message || CHATBOT_COPY.requestError[language];
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: makeId("assistant-error"),
          from: "assistant",
          language,
          title: "SendIt Assistant",
          text: message,
          showSupportLinks: true,
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
      sendingRef.current = false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      className={`sendit-chatbot ${open ? "is-open" : ""}`}
      ref={chatbotRef}
    >
      {open ? (
        <section
          className="sendit-chatbot-panel"
          role="dialog"
          aria-label="SendIt Assistant"
        >
          <div className="sendit-chatbot-header">
            <div className="sendit-chatbot-brand">
              <span className="sendit-chatbot-avatar" aria-hidden="true">
                <Mascot size="chatbot" />
              </span>
              <div>
                <span className="sendit-chatbot-kicker">SendIt Assistant</span>
                <strong>How can we help?</strong>
                <span className="sendit-chatbot-subtitle">
                  Your guide to sharing with SendIt
                </span>
              </div>
            </div>

            <div className="sendit-chatbot-header-actions">
              <button
                className="sendit-chatbot-icon-button"
                type="button"
                aria-label="Close chatbot"
                title="Close"
                onClick={() => setOpen(false)}
              >
                <FiX />
              </button>
            </div>
            <span className="sendit-chatbot-online">
              <FiCheckCircle aria-hidden="true" />
              Here to help
            </span>
          </div>

          <div className="sendit-chatbot-messages" aria-live="polite">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {sending ? (
              <div className="sendit-chatbot-message assistant" role="status">
                <p>{CHATBOT_COPY.thinking[activeLanguage]}</p>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="sendit-chatbot-suggestions" aria-label="Suggested questions">
            <div className="sendit-chatbot-suggestions-heading">
              <FiGlobe aria-hidden="true" />
              <span>QUICK QUESTIONS</span>
              <span className="sendit-chatbot-language">
                {LANGUAGE_NAMES[activeLanguage]}
              </span>
            </div>
            <div className="sendit-chatbot-suggestion-list">
              {CHATBOT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.en}
                  type="button"
                  onClick={() => sendMessage(suggestion[activeLanguage])}
                  disabled={sending}
                >
                  {suggestion[activeLanguage]}
                </button>
              ))}
            </div>
          </div>

          <form className="sendit-chatbot-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="sendit-chatbot-input">
              Ask SendIt Assistant
            </label>
            <input
              id="sendit-chatbot-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={CHATBOT_COPY.placeholder[activeLanguage]}
              autoComplete="off"
              maxLength={1500}
              disabled={sending}
            />
            <button
              className="sendit-chatbot-send"
              type="submit"
              aria-label="Send message"
              title="Send"
              disabled={!input.trim() || sending}
            >
              <FiSend />
            </button>
          </form>
        </section>
      ) : null}

      <button
        className="sendit-chatbot-toggle"
        type="button"
        aria-label={open ? "Close SendIt Assistant" : "Open SendIt Assistant"}
        aria-expanded={open}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <FiMessageCircle aria-hidden="true" />
        <span>Assistant</span>
      </button>
    </div>
  );
}

export default SendItChatbot;
