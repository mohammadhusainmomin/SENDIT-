import { useEffect, useMemo, useRef } from "react";

const ITEM_HEIGHT = 36;
const VISIBLE_ROWS = 5;
const SIDE_PADDING = Math.floor(VISIBLE_ROWS / 2) * ITEM_HEIGHT;

function ScrollValuePicker({
  label,
  options,
  value,
  onChange,
  disabled = false,
  formatter = (option) => String(option).padStart(2, "0"),
}) {
  const viewportRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const normalizedOptions = useMemo(
    () =>
      options.map((option) => ({
        raw: option,
        value: String(option),
        label: formatter(option),
      })),
    [formatter, options]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const selectedIndex = normalizedOptions.findIndex((option) => option.value === String(value));

    if (!viewport || selectedIndex < 0) return;

    const targetTop = selectedIndex * ITEM_HEIGHT;
    if (Math.abs(viewport.scrollTop - targetTop) < 2) return;

    viewport.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  }, [normalizedOptions, value]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const commitClosestValue = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextIndex = Math.max(
      0,
      Math.min(normalizedOptions.length - 1, Math.round(viewport.scrollTop / ITEM_HEIGHT))
    );

    viewport.scrollTo({
      top: nextIndex * ITEM_HEIGHT,
      behavior: "smooth",
    });

    const nextValue = normalizedOptions[nextIndex]?.value;
    if (nextValue && nextValue !== String(value)) {
      onChange(nextValue);
    }
  };

  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      commitClosestValue();
    }, 90);
  };

  return (
    <div className={`expiry-scroll-picker${disabled ? " is-disabled" : ""}`}>
      <div className="si-meta-label">{label}</div>
      <div className="expiry-scroll-shell">
        <div className="expiry-scroll-highlight" aria-hidden="true" />
        <div
          ref={viewportRef}
          className="expiry-scroll-viewport"
          onScroll={handleScroll}
          role="listbox"
          aria-label={label}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <div style={{ height: `${SIDE_PADDING}px` }} aria-hidden="true" />
          {normalizedOptions.map((option) => {
            const isSelected = option.value === String(value);

            return (
              <button
                key={option.value}
                type="button"
                className={`expiry-scroll-option${isSelected ? " is-selected" : ""}`}
                onClick={() => !disabled && onChange(option.value)}
                disabled={disabled}
                role="option"
                aria-selected={isSelected}
              >
                {option.label}
              </button>
            );
          })}
          <div style={{ height: `${SIDE_PADDING}px` }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default ScrollValuePicker;
