import beautify from "js-beautify";

const INDENT_SIZE = 2;
const INDENT_CHAR = ' ';

// Smart indentation for all languages
const smartIndentCode = (code) => {
  const lines = code.split('\n');
  const formattedLines = [];
  let indentLevel = 0;

  const closeBrackets = ['}', ']', ')'];

  for (let line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      formattedLines.push('');
      continue;
    }

    // Decrease indent for closing brackets
    if (closeBrackets.some(bracket => trimmedLine.startsWith(bracket))) {
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

  return formattedLines.join('\n');
};

export const formatCode = (code) => {
  try {
    const trimmedCode = code.trim();

    // Beautify options for consistent formatting
    const jsBeautifyOptions = {
      indent_size: INDENT_SIZE,
      indent_char: INDENT_CHAR,
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: true,
      indent_inner_html: true,
      wrap_line_length: 100,
      wrap_attributes: 'auto',
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
      end_with_newline: true,
    };

    // Detect and format JSON
    if (trimmedCode.startsWith("{") || trimmedCode.startsWith("[")) {
      try {
        JSON.parse(trimmedCode);
        return JSON.stringify(JSON.parse(trimmedCode), null, INDENT_SIZE);
      } catch (e) {
        // Not valid JSON, continue with other formatters
      }
    }

    // Detect HTML/XML
    if (trimmedCode.startsWith("<") || trimmedCode.includes("<!DOCTYPE")) {
      try {
        return beautify.html(trimmedCode, {
          ...jsBeautifyOptions,
          indent_inner_html: true,
        });
      } catch (e) {
        // Fallback to smart indent for complex XML
        return smartIndentCode(trimmedCode);
      }
    }

    // Detect CSS
    if (trimmedCode.includes("{") && trimmedCode.includes("}") && trimmedCode.includes(":")) {
      if (
        !trimmedCode.includes("function") &&
        !trimmedCode.includes("=>") &&
        !trimmedCode.includes("class ") &&
        !trimmedCode.includes("fun ") // Kotlin function keyword
      ) {
        try {
          return beautify.css(trimmedCode, jsBeautifyOptions);
        } catch (e) {
          // Fallback to smart indent
          return smartIndentCode(trimmedCode);
        }
      }
    }

    // Try JavaScript beautify for JS/TS/Java/Kotlin/C++/C# (similar syntax)
    try {
      return beautify.js(trimmedCode, jsBeautifyOptions);
    } catch (e) {
      // Fallback to smart indent for any language with brackets
      return smartIndentCode(trimmedCode);
    }

  } catch (err) {
    // Final fallback: smart indentation for any language
    try {
      return smartIndentCode(code);
    } catch (fallbackErr) {
      // Return original code if all else fails
      return code;
    }
  }
};
