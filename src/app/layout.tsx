import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: "ODA AL VINO 2026 | El vino nos reúne",
  description:
    "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "ODA AL VINO 2026 | El vino nos reúne",
    description:
      "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
    images: [
      {
        url: "https://odaalvino.com.br/oda/gallery/elvinonosreune.png",
        width: 1192,
        height: 1486,
        alt: "ODA AL VINO 2026",
      },
    ],
    url: "https://odaalvino.com.br",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K65F99CM');`,
          }}
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V5ZNWM0MVC"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V5ZNWM0MVC');
            `,
          }}
        />

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K65F99CM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
