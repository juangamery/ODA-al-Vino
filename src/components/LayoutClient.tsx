"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { CookieConsent } from "@/components/CookieConsent";
import { AgeGateModal } from "@/components/AgeGateModal";
import { ReactNode } from "react";

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AgeGateModal />
      {children}
      <CookieConsent />
    </LanguageProvider>
  );
}
