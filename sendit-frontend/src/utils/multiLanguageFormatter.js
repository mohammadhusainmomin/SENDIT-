/**
 * Multi-language code formatter
 * Uses appropriate formatters for each language
 */

import { normalizeLang } from "./detectLanguage";
import beautify from "js-beautify";
import * as prettier from "prettier/standalone";
import * as babelPlugin from "prettier/plugins/babel";
import * as typescriptPlugin from "prettier/plugins/typescript";
import * as estreePlugin from "prettier/plugins/estree";
import * as htmlPlugin from "prettier/plugins/html";
import * as cssPlugin from "prettier/plugins/postcss";
import * as markdownPlugin from "prettier/plugins/markdown";


const INDENT_SIZE = 2;
const INDENT_CHAR = " ";



/**
 * Smart indentation fallback for languages without dedicated formatters
 */
const smartIndentCode = (code) => {
  const lines = code.split("\n");
  const formattedLines = [];
  let indentLevel = 0;

  const closeBrackets = ["}", "]", ")", "end", "endif", "endfor", "endwhile"];

  for (let line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      formattedLines.push("");
      continue;
    }

    // Decrease indent for closing brackets
    const startsWithClose = closeBrackets.some(
      (bracket) =>
        trimmedLine.startsWith(bracket) ||
        trimmedLine.toLowerCase().startsWith(bracket),
    );
    if (startsWithClose) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Add indented line
    const indent = INDENT_CHAR.repeat(indentLevel * INDENT_SIZE);
    formattedLines.push(indent + trimmedLine);

    // Increase indent for opening brackets
    const openCount = (trimmedLine.match(/[{[(]/g) || []).length;
    const closeCount = (trimmedLine.match(/[}\])]/g) || []).length;
    indentLevel += openCount - closeCount;
    indentLevel = Math.max(0, indentLevel);
  }

  return formattedLines.join("\n");
};

/**
 * Format Python code with basic smart formatting
 */const formatPython = (code) => {
  try {
    const lines = code.replace(/\r\n/g, "\n").split("\n");
    const result = [];
    let indentLevel = 0;
    let bracketDepth = 0;

    const blockStartRegex =
      /^(if|elif|else|for|while|def|class|try|except|finally|with|match|case)\b/;

    const dedentRegex =
      /^(elif|else|except|finally|case)\b/;

    const isContinuationLine = (line) => {
      return (
        bracketDepth > 0 ||
        /[([{]\s*$/.test(line) ||
        /[,\\]$/.test(line)
      );
    };

    const updateBracketDepth = (line) => {
      let single = false;
      let double = false;
      let escaped = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (escaped) {
          escaped = false;
          continue;
        }

        if (char === "\\") {
          escaped = true;
          continue;
        }

        if (char === "'" && !double) {
          single = !single;
          continue;
        }

        if (char === '"' && !single) {
          double = !double;
          continue;
        }

        if (single || double) {
          continue;
        }

        if (char === "(" || char === "[" || char === "{") {
          bracketDepth++;
        }

        if (char === ")" || char === "]" || char === "}") {
          bracketDepth = Math.max(0, bracketDepth - 1);
        }
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const original = lines[i];
      const trimmed = original.trim();

      if (!trimmed) {
        if (result.length > 0 && result[result.length - 1] !== "") {
          result.push("");
        }
        continue;
      }

      if (trimmed.startsWith("#")) {
        result.push(" ".repeat(indentLevel * 4) + trimmed);
        continue;
      }

      if (dedentRegex.test(trimmed)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const continuation = isContinuationLine(trimmed);

      let currentIndent = indentLevel;

      if (continuation && bracketDepth > 0) {
        currentIndent = indentLevel + 1;
      }

      result.push(" ".repeat(currentIndent * 4) + trimmed);

      updateBracketDepth(trimmed);

      if (
        trimmed.endsWith(":") &&
        blockStartRegex.test(trimmed)
      ) {
        indentLevel++;
      }
    }

    return result.join("\n").replace(/\n{3,}/g, "\n\n");
  } catch (error) {
    console.error("Python formatting failed:", error);
    return code;
  }
};
/**
 * Format Java code
 */
const formatJava = (code) => {
  // Use js-beautify which works reasonably well for Java
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      break_chained_methods: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format C code
 */
const formatC = (code) => {
  try {
    // js-beautify works for C-like syntax
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      break_chained_methods: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format C++ code
 */
const formatCpp = (code) => {
  // Same as C
  return formatC(code);
};

/**
 * Format C# code
 */
const formatCsharp = (code) => {
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      break_chained_methods: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format PHP code
 */
const formatPhp = (code) => {
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format HTML code
 */
const formatHtml = (code) => {
  try {
    return beautify.html(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      indent_inner_html: true,
      wrap_line_length: 100,
      wrap_attributes: "auto",
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format CSS code
 */
const formatCss = (code) => {
  try {
    return beautify.css(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      newline_between_rules: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format JSON code
 */
const formatJson = (code) => {
  try {
    return JSON.stringify(JSON.parse(code), null, INDENT_SIZE);
  } catch (e) {
    return code;
  }
};

/**
 * Format JavaScript code
 */
const formatJavaScript = (code) => {
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: true,
      comma_first: false,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format TypeScript code
 */
const formatTypeScript = (code) => {
  // TypeScript can be formatted similar to JavaScript with js-beautify
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Dynamically use Prettier with the correct parser
 * Falls back to other formatters if Prettier fails
 */
const formatWithPrettier = async (code, parser) => {
  try {
    const plugins = [
      babelPlugin,
      typescriptPlugin,
      estreePlugin,
      htmlPlugin,
      cssPlugin,
      markdownPlugin,
    ];

    return await prettier.format(code, {
      parser,
      plugins,
      semi: true,
      singleQuote: false,
      trailingComma: "es5",
      tabWidth: 2,
      useTabs: false,
      printWidth: 100,
      arrowParens: "always",
      bracketSpacing: true,
    });
  } catch (error) {
    console.error("Prettier formatting failed:", error);
    return null;
  }
};

/**
 * Format HTML code using Prettier
 */
const formatHtmlWithPrettier = async (code) => {
  const formatted = await formatWithPrettier(code, "html");
  if (formatted) return formatted;

  // Fallback to js-beautify
  try {
    return beautify.html(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      indent_inner_html: true,
      wrap_line_length: 100,
      wrap_attributes: "auto",
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format CSS code using Prettier
 */
const formatCssWithPrettier = async (code) => {
  const formatted = await formatWithPrettier(code, "css");
  if (formatted) return formatted;

  // Fallback to js-beautify
  try {
    return beautify.css(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      newline_between_rules: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format JSON code using Prettier
 */
const formatJsonWithPrettier = async (code) => {
  const formatted = await formatWithPrettier(code, "json");
  if (formatted) return formatted;

  // Fallback to native JSON stringify
  try {
    return JSON.stringify(JSON.parse(code), null, INDENT_SIZE);
  } catch (e) {
    return code;
  }
};

/**
 * Format JavaScript code using Prettier
 */
const formatJavaScriptWithPrettier = async (code) => {
  const formatted = await formatWithPrettier(code, "babel");
  if (formatted) return formatted;

  // Fallback to js-beautify
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: true,
      comma_first: false,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format TypeScript code using Prettier
 */
const formatTypeScriptWithPrettier = async (code) => {
  const formatted = await formatWithPrettier(code, "typescript");
  if (formatted) return formatted;

  // Fallback to js-beautify
  try {
    return beautify.js(code, {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: true,
    });
  } catch (e) {
    return smartIndentCode(code);
  }
};

/**
 * Format React JSX code using Prettier
 * IMPORTANT: Use 'babel' parser which properly handles JSX
 * Never use js-beautify.js() for JSX as it corrupts the markup
 */
const formatJsx = async (code) => {
  const formatted = await formatWithPrettier(code, "babel");

  if (formatted) {
    return formatted;
  }

  return smartIndentCode(code);
};

/**
 * Format React TSX code using Prettier
 * IMPORTANT: Use 'typescript' parser which handles both TypeScript and JSX
 * Never use js-beautify.js() for TSX as it corrupts the markup
 */
const formatTsx = async (code) => {
  const formatted = await formatWithPrettier(code, "typescript");

  if (formatted) {
    return formatted;
  }

  return smartIndentCode(code);
};

/**
 * Main formatter function
 * Takes code and language identifier, returns formatted code
 */
export const formatCode = async (code, language = "auto-detect") => {
  try {
    if (!code || code.trim().length === 0) {
      return code;
    }

    const lang = normalizeLang(language);
    const trimmedCode = code.trim();

    // Route to appropriate formatter
    switch (lang) {
      case "javascript":
      case "js":
        return await formatJavaScriptWithPrettier(trimmedCode);

      case "typescript":
      case "ts":
        return await formatTypeScriptWithPrettier(trimmedCode);

      case "jsx":
        return await formatJsx(trimmedCode);

      case "tsx":
        return await formatTsx(trimmedCode);

      case "python":
      case "py":
        return formatPython(trimmedCode);

      case "java":
        return formatJava(trimmedCode);

      case "c":
        return formatC(trimmedCode);

      case "cpp":
      case "c++":
        return formatCpp(trimmedCode);

      case "csharp":
      case "c#":
        return formatCsharp(trimmedCode);

      case "php":
        return formatPhp(trimmedCode);

      case "html":
        return await formatHtmlWithPrettier(trimmedCode);

      case "css":
        return await formatCssWithPrettier(trimmedCode);

      case "json":
        return await formatJsonWithPrettier(trimmedCode);

      case "plaintext":
      default:
        return trimmedCode;
    }
  } catch (error) {
    console.error("Formatting error:", error);
    // Return original code on any error
    return code;
  }
};

/**
 * Synchronous version of formatCode (for use in React state updates)
 * Note: This is the blocking version without Prettier async support
 */
export const formatCodeSync = (code, language = "auto-detect") => {
  try {
    if (!code || code.trim().length === 0) {
      return code;
    }

    const lang = normalizeLang(language);
    const trimmedCode = code.trim();

    // Route to appropriate formatter
    switch (lang) {
      case "javascript":
      case "js":
        return formatJavaScript(trimmedCode);

      case "typescript":
      case "ts":
        return formatTypeScript(trimmedCode);

      case "jsx":
        // CRITICAL: Never use js-beautify for JSX - it corrupts the markup
        // Use smart indentation which preserves JSX syntax
        return smartIndentCode(trimmedCode);

      case "tsx":
        // CRITICAL: Never use js-beautify for TSX - it corrupts the markup
        // Use smart indentation which preserves JSX syntax
        return smartIndentCode(trimmedCode);

   case "python":
     case "py":
  return formatPython(trimmedCode);

      case "java":
        return formatJava(trimmedCode);

      case "c":
        return formatC(trimmedCode);

      case "cpp":
      case "c++":
        return formatCpp(trimmedCode);

      case "csharp":
      case "c#":
        return formatCsharp(trimmedCode);

      case "php":
        return formatPhp(trimmedCode);

      case "html":
        return formatHtml(trimmedCode);

      case "css":
        return formatCss(trimmedCode);

      case "json":
        return formatJson(trimmedCode);

      case "plaintext":
      default:
        return trimmedCode;
    }
  } catch (error) {
    console.error("Formatting error:", error);
    // Return original code on any error
    return code;
  }
};
