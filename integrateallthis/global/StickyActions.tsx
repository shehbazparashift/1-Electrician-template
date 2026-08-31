"use client";

import { useLanguage } from "@/app/i18n/LanguageProvider";
import { useModal } from "./ModalContext";

export default function StickyActions() {
  const { t } = useLanguage();
  const { openBooking, openContact } = useModal();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] flex bg-[#FAF9F5]/90 backdrop-blur-md border-t border-[var(--color-border)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <button
        onClick={openBooking}
        className="flex-1 h-[52px] flex items-center justify-center text-white font-['Inter'] font-semibold text-[14px] bg-[var(--color-blue)] hover:bg-[var(--color-blue-dark)] transition-colors cursor-pointer"
      >
        {t({ en: "Schedule a call", nl: "Afspraak maken" })}
      </button>
      <button
        onClick={openContact}
        className="flex-1 h-[52px] flex items-center justify-center text-white font-['Inter'] font-semibold text-[14px] bg-[var(--color-ink)] hover:bg-black transition-colors cursor-pointer"
      >
        {t({ en: "Chat with us", nl: "Start nu" })}
      </button>
    </div>
  );
}
