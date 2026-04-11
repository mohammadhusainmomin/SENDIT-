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
  const isScrollSyncingRef = useRef(false);

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

    if (!viewport || selectedIndex < 0 || isScrollSyncingRef.current) return;

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

      isScrollSyncingRef.current = false;
    };
  }, []);

  const getClosestIndex = (scrollTop) =>
    Math.max(0, Math.min(normalizedOptions.length - 1, Math.round(scrollTop / ITEM_HEIGHT)));

  const syncClosestValue = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextIndex = getClosestIndex(viewport.scrollTop);
    const nextValue = normalizedOptions[nextIndex]?.value;

    if (nextValue && nextValue !== String(value)) {
      onChange(nextValue);
    }
  };

  const commitClosestValue = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextIndex = getClosestIndex(viewport.scrollTop);

    viewport.scrollTo({
      top: nextIndex * ITEM_HEIGHT,
      behavior: "smooth",
    });

    syncClosestValue();
  };

  const handleScroll = () => {
    if (disabled) return;

    isScrollSyncingRef.current = true;
    syncClosestValue();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      commitClosestValue();
      isScrollSyncingRef.current = false;
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
