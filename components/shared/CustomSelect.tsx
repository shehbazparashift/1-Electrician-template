"use client";

import { ChevronDown } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export type SelectOption = { value: string; label: string };

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  /** Classes for the closed trigger button — pass the same string you'd give a native <select>. */
  triggerClassName: string;
  /** Classes for the chevron icon. Defaults to a black icon. */
  chevronClassName?: string;
  /** Extra classes applied to the displayed value once a real option is
   * selected — e.g. to render it solid white on a colored-background
   * variant, while the empty placeholder stays muted. Leave unset to have
   * the selected value just inherit triggerClassName's color. */
  valueClassName?: string;
}

export default function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled,
  triggerClassName,
  chevronClassName = "text-black",
  valueClassName,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  // Move focus into the list once it mounts, so arrow keys work whether the
  // popup was opened by mouse or keyboard.
  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    const activeEl = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const openDropdown = () => {
    if (disabled) return;
    // Seed the keyboard highlight from the current value.
    setActiveIndex(Math.max(0, options.findIndex((opt) => opt.value === value)));
    setIsOpen(true);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openDropdown();
    }
  };

  const handleListKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (activeIndex >= 0) handleSelect(options[activeIndex].value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className={`${triggerClassName} text-left flex items-center justify-between gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`truncate ${
            selectedOption ? (valueClassName ?? "") : "opacity-70"
          }`}
        >
          {selectedOption?.label ?? placeholder}
        </span>
      </button>

      <ChevronDown
        className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        } ${chevronClassName}`}
        size={16}
      />

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="absolute z-20 mt-1.5 w-full max-h-60 overflow-auto rounded-xl border border-[var(--m-border)] bg-white py-1.5 shadow-[0_18px_40px_-12px_rgba(17,17,17,0.18)] focus:outline-none"
        >
          {options.map((opt, index) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleSelect(opt.value)}
              className={`px-3.5 py-2 text-[14px] font-sans text-black cursor-pointer transition-colors ${
                index === activeIndex
                  ? "bg-[var(--m-accent)] text-white"
                  : opt.value === value
                    ? "bg-[var(--m-accent-weak)] font-medium"
                    : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {/* Hidden field solely to hook into native HTML5 required-field
         validation (form submission is handled in JS, not by this input) —
         visually invisible but overlays the trigger so the browser's
         validation bubble anchors to the right spot. */}
      <input
        type="text"
        required={required}
        value={value}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-default opacity-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
