"use client";

import { useModal } from "./ModalContext";

type Translation = { en: string; nl: string };
function t(entry: Translation): string { return entry.en; }

export default function StickyActions() {
  const { openBooking, openContact } = useModal();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] flex bg-[#f8fafd]/90 backdrop-blur-md border-t border-[var(--m-border)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <button
        onClick={openBooking}
        className="flex-1 h-[40px] flex items-center justify-center text-white font-sans font-semibold text-[14px] bg-[var(--m-accent)] hover:bg-[var(--m-accent-hover)] transition-colors cursor-pointer"
      >
        {t({ en: "Schedule a call", nl: "Afspraak maken" })}
      </button>
      <button
        onClick={openContact}
        className="flex-1 h-[40px] flex items-center justify-center text-white font-sans font-semibold text-[14px] bg-[var(--m-ink)] hover:bg-black transition-colors cursor-pointer"
      >
        {t({ en: "Chat with us", nl: "Start nu" })}
      </button>
    </div>
  );
}
