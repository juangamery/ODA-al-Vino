"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { ReactNode } from "react";

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
