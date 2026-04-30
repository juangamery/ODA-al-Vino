"use client";

import { LayoutClient } from "@/components/LayoutClient";
import FaqPage from "@/components/sections/FaqPage";

export default function FAQ() {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/oda/Fonts/CCSBelvareRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/oda/Fonts/LuxuriousScript-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/oda/Fonts/Lato-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans min-h-full flex flex-col">
        <LayoutClient>
          <FaqPage />
        </LayoutClient>
      </body>
    </html>
  );
}
