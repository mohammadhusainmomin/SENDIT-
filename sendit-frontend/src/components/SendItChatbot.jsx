import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiExternalLink,
  FiGlobe,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiX,
  FiZap,
} from "react-icons/fi";
import {
  CHATBOT_COPY,
  CHATBOT_SUGGESTIONS,
  LANGUAGE_HINTS,
  LANGUAGE_NAMES,
  LANGUAGE_PRIORITY,
  SUPPORT_LINKS,
  chatbotFaq,
} from "../data/chatbotFaq";

const initialMessage = {
  id: "welcome",
  from: "assistant",
  language: "en",
  title: "SendIt Assistant",
  text: CHATBOT_COPY.welcome.en,
};

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeText(value) {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .trim();
}

function tokenize(value) {
  return normalizeText(value).match(/[\p{L}\p{M}\p{N}]+/gu) || [];
}

function flattenKeywords() {
  return chatbotFaq.reduce(
    (bank, intent) => {
      Object.entries(intent.keywords).forEach(([language, words]) => {
        bank[language].push(...words);
      });
      return bank;
    },
    { en: [], hi: [], gu: [] },
  );
}

function countKeywordHits(tokens, keywords) {
  const tokenSet = new Set(tokens);

  return keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    const keywordTokens = tokenize(keyword);

    if (!normalizedKeyword || keywordTokens.length === 0) {
      return score;
    }

    if (keywordTokens.length > 1) {
      for (let index = 0; index <= tokens.length - keywordTokens.length; index += 1) {
        const phraseMatches = keywordTokens.every(
          (token, tokenIndex) => tokens[index + tokenIndex] === token,
        );

        if (phraseMatches) {
          return score + keywordTokens.length + 2;
        }
      }

      return (
        score +
        keywordTokens.reduce(
          (tokenScore, token) => tokenScore + (tokenSet.has(token) ? 1 : 0),
          0,
        )
      );
    }

    const [keywordToken] = keywordTokens;
    const exactMatch = tokenSet.has(keywordToken);
    const stemMatch =
      keywordToken.length >= 5 &&
      tokens.some((token) => token.startsWith(keywordToken));

    return score + (exactMatch || stemMatch ? 1 : 0);
  }, 0);
}

function detectLanguage(input) {
  const tokens = tokenize(input);
  const scores = {
    gu: countKeywordHits(tokens, LANGUAGE_HINTS.gu),
    hi: countKeywordHits(tokens, LANGUAGE_HINTS.hi),
    en: countKeywordHits(tokens, LANGUAGE_HINTS.en),
  };

  const gujaratiCharacters = input.match(/[\u0A80-\u0AFF]/g)?.length || 0;
  const hindiCharacters = input.match(/[\u0900-\u097F]/g)?.length || 0;

  scores.gu += gujaratiCharacters * 2;
  scores.hi += hindiCharacters * 2;

  const highestScore = Math.max(scores.gu, scores.hi, scores.en);

  if (highestScore === 0) {
    return "en";
  }

  return LANGUAGE_PRIORITY.reduce((bestLanguage, language) => {
    if (scores[language] > scores[bestLanguage]) {
      return language;
    }

    return bestLanguage;
  }, "gu");
}

function scoreIntent(tokens, intent, language) {
  const allKeywords = [
    ...intent.keywords.en,
    ...intent.keywords.hi,
    ...intent.keywords.gu,
  ];
  const baseScore = countKeywordHits(tokens, allKeywords);
  const languageScore = countKeywordHits(tokens, intent.keywords[language]);

  return baseScore + languageScore;
}

function findIntent(message, language) {
  const tokens = tokenize(message);

  return chatbotFaq.reduce(
    (bestMatch, intent) => {
      const score = scoreIntent(tokens, intent, language);

      if (score > bestMatch.score) {
        return { intent, score };
      }

      return bestMatch;
    },
    { intent: null, score: 0 },
  );
}

function makeAssistantMessage(text, keywordBank) {
  const language = detectLanguage(text);
  const { intent, score } = findIntent(text, language);

  if (!intent || score === 0) {
    return {
      id: makeId("assistant"),
      from: "assistant",
      language,
      title: CHATBOT_COPY.fallbackTitle[language],
      text: CHATBOT_COPY.fallbackAnswer[language],
      cta: {
        href: SUPPORT_LINKS.contact,
        label: CHATBOT_COPY.contactButton,
      },
      showSupportLinks: true,
    };
  }

  return {
    id: makeId("assistant"),
    from: "assistant",
    language,
    title: intent.title[language],
    text: intent.answer[language],
    cta: intent.cta,
    showSupportLinks: intent.showSupportLinks,
  };
}

function ChatActionLink({ href, children }) {
  if (href.startsWith("/")) {
    return (
      <Link className="sendit-chatbot-cta" to={href}>
        {children}
        <FiExternalLink aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a className="sendit-chatbot-cta" href={href} target="_blank" rel="noreferrer">
      {children}
      <FiExternalLink aria-hidden="true" />
    </a>
  );
}

function Message({ message }) {
  const isAssistant = message.from === "assistant";

  return (
    <div className={`sendit-chatbot-message ${message.from}`}>
      {isAssistant && message.title ? (
        <div className="sendit-chatbot-message-title">{message.title}</div>
      ) : null}
      <p>{message.text}</p>

      {isAssistant && message.cta ? (
        <ChatActionLink href={message.cta.href}>
          {message.cta.label[message.language]}
        </ChatActionLink>
      ) : null}

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
  const keywordBank = useMemo(() => flattenKeywords(), []);
  const activeLanguage = messages[messages.length - 1]?.language || "en";
  const chatbotRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [messages, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
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

  const sendMessage = (messageText) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    const language = detectLanguage(trimmedMessage);
    const assistantMessage = makeAssistantMessage(trimmedMessage, keywordBank);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: makeId("user"),
        from: "user",
        language,
        text: trimmedMessage,
      },
      assistantMessage,
    ]);
    setInput("");
    setOpen(true);
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
                <FiZap />
              </span>
              <div>
                <span className="sendit-chatbot-kicker">SendIt Assistant</span>
                <strong>Quick help</strong>
              </div>
            </div>

            <div className="sendit-chatbot-header-actions">
              <span className="sendit-chatbot-language">
                <FiGlobe aria-hidden="true" />
                {LANGUAGE_NAMES[activeLanguage]}
              </span>
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
          </div>

          <div className="sendit-chatbot-messages" aria-live="polite">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="sendit-chatbot-suggestions" aria-label="Suggested questions">
            {CHATBOT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.en}
                type="button"
                onClick={() => sendMessage(suggestion[activeLanguage])}
              >
                {suggestion[activeLanguage]}
              </button>
            ))}
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
            />
            <button
              className="sendit-chatbot-send"
              type="submit"
              aria-label="Send message"
              title="Send"
              disabled={!input.trim()}
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
