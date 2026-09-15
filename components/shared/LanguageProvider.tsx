"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Language = "en" | "nl";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const language: Language = pathname?.startsWith("/nl") ? "nl" : "en";

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    router.push(lang === "nl" ? "/nl" : "/", { scroll: false });
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
