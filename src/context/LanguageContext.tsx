"use client";

import React, { createContext, useContext, useState } from "react";
import { t, type Lang } from "@/lib/translations";

// Use a union type so both NO and EN are valid
type AnyTranslations = (typeof t)[Lang];

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: AnyTranslations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "NO",
  setLang: () => {},
  tr: t.NO,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("NO");
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
