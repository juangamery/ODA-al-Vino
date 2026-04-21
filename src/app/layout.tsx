import type { Metadata } from "next";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: "ODA AL VINO 2026 | El vino nos reúne",
  description:
    "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="font-sans min-h-full flex flex-col">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
