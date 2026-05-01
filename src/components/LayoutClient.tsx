"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { CookieConsent } from "@/components/CookieConsent";
import { ReactNode } from "react";

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <CookieConsent />
    </LanguageProvider>
  );
}
