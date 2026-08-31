"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import LeadEnquiryForm from "./LeadEnquiryForm";
import { lenisStart, lenisStop } from "./LenisProvider";

type Translation = { en: string; nl: string };
function t(entry: Translation): string { return entry.en; }

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadForm({ isOpen, onClose }: LeadFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleClose = useCallback(() => {
    setIsSuccess(false);
    onClose();
  }, [onClose]);

  // Lock body scroll while open (Lenis drives its own scroll, so it needs
  // to be stopped explicitly — toggling overflow alone doesn't hold it)
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    lenisStop();
    return () => {
      document.body.style.overflow = "";
      lenisStart();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lead-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={handleClose}
            className="fixed inset-0 z-[300] bg-[#07111F]/55 backdrop-blur-[8px]"
            aria-hidden="true"
          />

          {/* Modal container */}
          <div
            key="lead-modal"
            className="fixed inset-0 z-[301] flex items-center justify-center p-3 sm:p-5 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 22 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-[660px] bg-[#f8fafd]/95 backdrop-blur-xl rounded-[24px] shadow-[0_28px_90px_rgba(7,17,31,0.28)] overflow-hidden pointer-events-auto flex flex-col max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-40px)] border border-white/70 ring-1 ring-black/[0.04]"
              role="dialog"
              aria-modal="true"
              aria-label={t({ en: "Contact us", nl: "Neem contact op" })}
            >
              {/* Header */}
              <div className="relative shrink-0 px-5 sm:px-7 lg:px-9 pt-6 pb-5 overflow-hidden bg-[var(--m-accent)]">
                {/* Decorative radial glows */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-12 w-[280px] h-[280px] rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -left-8 w-[220px] h-[220px] rounded-full opacity-15"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[2px] text-white/60 font-sans mb-1">
                      {isSuccess
                        ? t({ en: "All done", nl: "Klaar" })
                        : t({ en: "Get in touch", nl: "Neem contact op" })}
                    </p>
                    <h2 className="font-sans font-semibold text-[clamp(20px,4vw,26px)] leading-[1.15] text-white">
                      {isSuccess
                        ? t({ en: "Thank you!", nl: "Bedankt!" })
                        : t({
                            en: "Let's connect",
                            nl: "Laten we contact opnemen",
                          })}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={t({
                      en: "Close form",
                      nl: "Formulier sluiten",
                    })}
                    className="shrink-0 -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 hover:text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-colors cursor-pointer"
                  >
                    <X size={19} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div
                className="overflow-y-auto px-5 sm:px-7 lg:px-9 py-5 sm:py-6 pb-7 lead-modal-scrollbar"
                data-lenis-prevent
              >
                <LeadEnquiryForm
                  idPrefix="lead-modal"
                  onSuccessComplete={() => setIsSuccess(true)}
                />
              </div>
            </motion.div>
          </div>

          <style jsx global>{`
            .lead-modal-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .lead-modal-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .lead-modal-scrollbar::-webkit-scrollbar-thumb {
              background: var(--m-accent);
              border-radius: 999px;
            }
            .lead-modal-scrollbar::-webkit-scrollbar-thumb:hover {
              background: var(--m-accent-hover);
            }
            .lead-modal-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: var(--m-accent) transparent;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
