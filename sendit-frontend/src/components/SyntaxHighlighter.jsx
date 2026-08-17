import { useMemo } from 'react';
import { normalizeLang, getLanguageDisplayName } from '../utils/detectLanguage';
import '../styles/SyntaxHighlighter.css';

/**
 * SyntaxHighlighter component
 * Displays code with language-specific styling
 * Supports all SENDIT supported languages
 */
function SyntaxHighlighter({ code = '', language = 'plaintext', showLanguageLabel = false }) {
  const normalizedLang = useMemo(() => normalizeLang(language), [language]);
  const displayName = useMemo(() => getLanguageDisplayName(normalizedLang), [normalizedLang]);

  return (
    <div className={`syntax-highlighter language-${normalizedLang}`}>
      {showLanguageLabel && (
        <div className="syntax-highlighter-label">
          {displayName}
        </div>
      )}
      <pre className={`syntax-highlighter-code`}>
        <code className={`language-${normalizedLang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default SyntaxHighlighter;
