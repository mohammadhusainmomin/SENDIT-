/**
 * Syntax highlighting utilities for code display
 * Uses basic CSS-based approach with language-specific classes
 */

import { normalizeLang } from './detectLanguage';

/**
 * Basic tokenization for syntax highlighting
 * Returns HTML with spans for different token types
 */
export const highlightCode = (code, language = 'plaintext') => {
  const lang = normalizeLang(language);

  // For now, just return code as-is with language class
  // This is a placeholder for future Shiki integration
  // The actual highlighting will be done via CSS in the component
  return code;
};

/**
 * Get CSS class for a given language
 */
export const getLanguageClass = (language) => {
  const lang = normalizeLang(language);
  return `language-${lang === 'plaintext' ? 'text' : lang}`;
};

/**
 * Map language to highlight.js compatible name (for future use)
 */
export const getHighlightJsLang = (language) => {
  const lang = normalizeLang(language);
  const map = {
    'javascript': 'javascript',
    'typescript': 'typescript',
    'jsx': 'jsx',
    'tsx': 'typescript',
    'python': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'csharp': 'csharp',
    'php': 'php',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'plaintext': 'plaintext',
  };
  return map[lang] || 'plaintext';
};
