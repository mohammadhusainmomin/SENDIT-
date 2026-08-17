import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCode,
  FiSearch,
  FiZap,
} from "react-icons/fi";
import {
  getLanguageDisplayName,
  normalizeLang,
} from "../utils/detectLanguage";
import "../styles/LanguageSelector.css";

function LanguageSelector({ value, onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectorRef = useRef(null);
  const searchRef = useRef(null);

  const languages = [
    "auto-detect",
    "javascript",
    "typescript",
    "jsx",
    "tsx",
    "python",
    "java",
    "c",
    "cpp",
    "csharp",
    "php",
    "html",
    "css",
    "json",
  ];

  const normalizedValue = normalizeLang(value);

  const languageIcons = {
    "auto-detect": "AI",
    javascript: "JS",
    typescript: "TS",
    jsx: "JSX",
    tsx: "TSX",
    python: "PY",
    java: "JV",
    c: "C",
    cpp: "C++",
    csharp: "C#",
    php: "PHP",
    html: "</>",
    css: "#",
    json: "{}",
  };

  const filteredLanguages = languages.filter((lang) =>
    getLanguageDisplayName(lang)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const selectedLanguage =
    languages.find((lang) => lang === normalizedValue) || "auto-detect";

  const selectedName = getLanguageDisplayName(selectedLanguage);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (language) => {
    onChange(language);
    setIsOpen(false);
    setSearch("");
  };

  const handleKeyDown = (event) => {
    if (disabled) return;

    if (event.key === "Escape") {
      setIsOpen(false);
      setSearch("");
    }

    if (event.key === "Enter" || event.key === " ") {
      if (!isOpen) {
        event.preventDefault();
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="language-selector" ref={selectorRef}>
      <label className="language-selector-label">
        <span className="language-label-icon">
          <FiCode />
        </span>

        <span>Language</span>

        {selectedLanguage === "auto-detect" && (
          <span className="language-label-badge">
            <FiZap />
            AUTO
          </span>
        )}
      </label>

      <div className="language-dropdown">
        <button
          type="button"
          className={`language-select-trigger ${
            isOpen ? "is-open" : ""
          }`}
          onClick={() => {
            if (!disabled) {
              setIsOpen((prev) => !prev);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="language-selected-content">
            <span
              className={`language-icon ${
                selectedLanguage === "auto-detect"
                  ? "language-icon-auto"
                  : ""
              }`}
            >
              {languageIcons[selectedLanguage] || "</>"}
            </span>

            <span className="language-selected-text">
              <span className="language-selected-name">
                {selectedName}
              </span>

              {selectedLanguage === "auto-detect" && (
                <span className="language-selected-description">
                  Detect automatically
                </span>
              )}
            </span>
          </span>

          <span className="language-chevron">
            <FiChevronDown />
          </span>
        </button>

        {isOpen && (
          <div className="language-dropdown-menu">
            <div className="language-search-wrapper">
              <FiSearch className="language-search-icon" />

              <input
                ref={searchRef}
                type="text"
                className="language-search"
                placeholder="Search language..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setIsOpen(false);
                    setSearch("");
                  }
                }}
              />
            </div>

            <div
              className="language-options"
              role="listbox"
              aria-label="Programming languages"
            >
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language) => {
                  const isSelected = language === normalizedValue;
                  const isAutoDetect = language === "auto-detect";

                  return (
                    <button
                      key={language}
                      type="button"
                      className={`language-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(language)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span
                        className={`language-icon ${
                          isAutoDetect ? "language-icon-auto" : ""
                        }`}
                      >
                        {languageIcons[language] || "</>"}
                      </span>

                      <span className="language-option-info">
                        <span className="language-option-name">
                          {getLanguageDisplayName(language)}
                        </span>

                        {isAutoDetect && (
                          <span className="language-option-description">
                            Automatically detect
                          </span>
                        )}
                      </span>

                      {isSelected && (
                        <span className="language-check">
                          <FiCheck />
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="language-no-results">
                  <FiSearch />
                  <span>No language found</span>
                </div>
              )}
            </div>

            <div className="language-dropdown-footer">
              <span>Choose your code language</span>
              <span className="language-count">
                {languages.length - 1} languages
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;