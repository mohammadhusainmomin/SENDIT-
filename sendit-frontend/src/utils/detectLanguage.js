/**
 * Detects the programming language from code content
 * Returns a language identifier or 'plaintext' if detection fails
 */

export const detectLanguage = (code) => {
  if (!code || code.trim().length === 0) {
    return 'plaintext';
  }

  const trimmed = code.trim();

  // JSON detection
  if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && (trimmed.endsWith('}') || trimmed.endsWith(']'))) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch (e) {
      // Not valid JSON, continue
    }
  }

  // HTML/XML detection
  if (trimmed.startsWith('<') || trimmed.includes('<!DOCTYPE')) {
    if (trimmed.includes('<!DOCTYPE') || trimmed.includes('<html')) {
      return 'html';
    }
    if (trimmed.match(/<[a-z]+[^>]*>/i)) {
      return 'html';
    }
  }

  // CSS detection
  if (trimmed.includes('{') && trimmed.includes('}') && trimmed.includes(':')) {
    const isCss = 
      (trimmed.includes('.') || trimmed.includes('#') || trimmed.includes('[')) &&
      !trimmed.includes('function') &&
      !trimmed.includes('=>') &&
      !trimmed.includes('class ') &&
      !trimmed.includes('def ') &&
      !trimmed.includes('fun ');
    if (isCss) {
      return 'css';
    }
  }

  // Python detection
  if (trimmed.includes('def ') || trimmed.includes('import ') || trimmed.includes('from ')) {
    if (trimmed.match(/^\s*(def|class|import|from|if __name__|async def)/m)) {
      return 'python';
    }
  }

  // C# detection
  if (trimmed.includes('using ') || trimmed.includes('namespace ')) {
    return 'csharp';
  }

  // Java detection
  if (trimmed.includes('public class') || trimmed.includes('private class') || trimmed.includes('protected class')) {
    return 'java';
  }

  // Java also with System.out.println pattern
  if (trimmed.includes('System.out.println')) {
    return 'java';
  }

  // PHP detection
  if (trimmed.includes('<?php') || trimmed.includes('<?') || trimmed.includes('echo ')) {
    if (trimmed.includes('<?')) {
      return 'php';
    }
  }

  // C++ detection (before C detection)
  if (trimmed.includes('#include') && (trimmed.includes('std::') || trimmed.includes('iostream') || trimmed.includes('vector') || trimmed.includes('string'))) {
    return 'cpp';
  }

  // C detection
  if (trimmed.includes('#include') && (trimmed.includes('stdio.h') || trimmed.includes('stdlib.h') || trimmed.includes('string.h'))) {
    return 'c';
  }

  // React JSX/TSX detection
  if (trimmed.includes('import React') || trimmed.includes('from "react"') || trimmed.includes("from 'react'")) {
    if (trimmed.includes('export default') && trimmed.includes('return') && trimmed.match(/<[A-Z]/)) {
      if (trimmed.includes(': React.FC') || trimmed.includes('as const')) {
        return 'tsx';
      }
      return 'jsx';
    }
  }

  // TSX/JSX by presence of JSX tags
  if (trimmed.match(/<[A-Z][a-zA-Z0-9]*[\s>]/)) {
    // Has uppercase component tags
    if (trimmed.includes('interface ') || trimmed.includes(': string') || trimmed.includes(': number')) {
      return 'tsx';
    }
    return 'jsx';
  }

  // TypeScript detection (before JavaScript)
  if (trimmed.includes('interface ') || trimmed.includes('type ') || trimmed.includes(': string') || trimmed.includes(': number')) {
    if (trimmed.match(/:\s*(string|number|boolean|any|void|never|unknown|interface|type)\b/)) {
      return 'typescript';
    }
  }

  // JavaScript/TypeScript detection
  if (trimmed.includes('function ') || trimmed.includes('=>') || trimmed.includes('const ') || trimmed.includes('let ') || trimmed.includes('var ')) {
    if (trimmed.includes('import ') || trimmed.includes('export ')) {
      // Check for TypeScript indicators
      if (trimmed.match(/:\s*(string|number|boolean|any|Array|void|undefined|null|interface|type)\b/)) {
        return 'typescript';
      }
      return 'javascript';
    }
  }

  // If still JavaScript-like but no module syntax
  if (trimmed.includes('function ') || trimmed.includes('=>') || trimmed.match(/\b(var|let|const)\s+\w+\s*=/)) {
    return 'javascript';
  }

  // Default to plaintext
  return 'plaintext';
};

/**
 * Normalizes language identifier to match formatter expectations
 */
export const normalizeLang = (lang) => {
  const normalized = (lang || 'plaintext').toLowerCase().trim();
  const langMap = {
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'jsx': 'jsx',
    'react': 'jsx',
    'tsx': 'tsx',
    'python': 'python',
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'c++': 'cpp',
    'csharp': 'csharp',
    'c#': 'csharp',
    'php': 'php',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'plaintext': 'plaintext',
    'auto-detect': 'auto-detect',
  };

  return langMap[normalized] || 'plaintext';
};

/**
 * Get display name for language
 */
export const getLanguageDisplayName = (lang) => {
  const displayNames = {
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'jsx': 'React JSX',
    'tsx': 'React TSX',
    'python': 'Python',
    'java': 'Java',
    'c': 'C',
    'cpp': 'C++',
    'csharp': 'C#',
    'php': 'PHP',
    'html': 'HTML',
    'css': 'CSS',
    'json': 'JSON',
    'plaintext': 'Plain Text',
    'auto-detect': 'Auto Detect',
  };

  return displayNames[normalizeLang(lang)] || 'Plain Text';
};
