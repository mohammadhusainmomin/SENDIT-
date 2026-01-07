import beautify from "js-beautify";

export const formatCode = (code) => {
  try {
    const trimmedCode = code.trim();

    // Beautify options for consistent formatting
    const jsBeautifyOptions = {
      indent_size: 2,
      indent_char: ' ',
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

    // Detect HTML/XML
    if (trimmedCode.startsWith("<") || trimmedCode.includes("<!DOCTYPE")) {
      return beautify.html(trimmedCode, {
        ...jsBeautifyOptions,
        indent_inner_html: true,
      });
    }

    // Detect JSON
    if (trimmedCode.startsWith("{") || trimmedCode.startsWith("[")) {
      try {
        JSON.parse(trimmedCode);
        return JSON.stringify(JSON.parse(trimmedCode), null, 2);
      } catch (e) {
        // Not valid JSON, treat as regular JS
      }
    }

    // Detect CSS
    if (trimmedCode.includes("{") && trimmedCode.includes("}")) {
      // Check if it's likely CSS
      if (
        trimmedCode.includes(":") &&
        !trimmedCode.includes("function") &&
        !trimmedCode.includes("=>") &&
        !trimmedCode.includes("class ")
      ) {
        // Try CSS beautify
        try {
          return beautify.css(trimmedCode, jsBeautifyOptions);
        } catch (e) {
          // Fallback to JS beautify
        }
      }
    }

    // Default to JavaScript beautify (handles JS, TS, React, etc.)
    return beautify.js(trimmedCode, jsBeautifyOptions);

  } catch (err) {
    // If all formatting fails, return original code with trimmed lines
    return code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  }
};
