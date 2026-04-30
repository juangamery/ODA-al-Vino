import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: "ODA AL VINO 2026 | El vino nos reúne",
  description:
    "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "https://odaalvino.com.br",
    languages: {
      "pt-BR": "https://odaalvino.com.br",
      "es-AR": "https://odaalvino.com.ar",
      "x-default": "https://odaalvino.com.br",
    },
  },
  openGraph: {
    title: "ODA AL VINO 2026 | El vino nos reúne",
    description:
      "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
    images: [
      {
        url: "https://oda-al-vino.vercel.app/oda/gallery/elvinonosreune.jpg",
        width: 1200,
        height: 630,
        alt: "ODA AL VINO 2026",
      },
    ],
    url: "https://odaalvino.com.br",
    type: "website",
  },
  verification: {
    google: "YKDSdOzTZLJEmCmKxKqLaG_M6wLywkGmmbWkfNqB-Zk",
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

        {/* Event Tracking for Purchase Buttons */}
        <Script
          id="purchase-event-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                const target = e.target.closest('[data-event="purchase_click"]');
                if (target) {
                  const location = target.getAttribute('data-event-location') || 'unknown';
                  const lotNumber = target.getAttribute('data-lot-number') || 'general';

                  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
                  window.gtag('event', 'purchase_click', {
                    'event_category': 'engagement',
                    'event_label': location,
                    'lot_number': lotNumber,
                    'timestamp': new Date().toISOString()
                  });

                  console.log('[GA4 Event]', 'purchase_click', { location, lotNumber });
                }
              });
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
