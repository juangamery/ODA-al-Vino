import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.odaalvino.com.br"),
  title: {
    default: "ODA AL VINO 2026 | El vino nos reúne",
    template: "%s | ODA AL VINO 2026",
  },
  description:
    "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV · 25 años ODA.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "YKDSdOzTZLJEmCmKxKqLaG_M6wLywkGmmbWkfNqB-Zk",
  },
  openGraph: {
    siteName: "ODA AL VINO",
    locale: "es_AR",
    type: "website",
    title: "ODA AL VINO 2026 | El vino nos reúne",
    description:
      "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV · 25 años ODA.",
    images: [
      {
        url: "https://www.odaalvino.com.br/og-image-2026.jpg",
        width: 1200,
        height: 1200,
        alt: "ODA AL VINO 2026",
      },
    ],
    url: "https://www.odaalvino.com.br",
  },
  twitter: {
    site: "@odaalvino",
    card: "summary_large_image",
  },
  other: {
    "theme-color": "#47072c",
  },
  alternates: {
    canonical: "https://www.odaalvino.com.br",
    languages: {
      "pt-BR": "https://www.odaalvino.com.br",
      "es-AR": "https://odaalvino.com.ar",
      "x-default": "https://www.odaalvino.com.br",
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.odaalvino.com.br/#website",
      name: "ODA AL VINO",
      url: "https://www.odaalvino.com.br",
      inLanguage: "es-AR",
    },
    {
      "@type": "Organization",
      "@id": "https://www.odaalvino.com.br/#organization",
      name: "ODA AL VINO",
      url: "https://www.odaalvino.com.br",
      logo: {
        "@type": "ImageObject",
        url: "https://www.odaalvino.com.br/oda/brand/logo_crema_horizontal.svg",
      },
      sameAs: [
        "https://www.instagram.com/odaalvino",
        "https://www.facebook.com/odaalvino",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* JSON-LD Schema */}
        <Script
          id="schema-website-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

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

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '5583753594990251');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Meta Pixel Event Tracking */}
        <Script
          id="meta-pixel-events"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                const target = e.target.closest('[data-event]');
                if (target) {
                  const event = target.getAttribute('data-event');
                  const location = target.getAttribute('data-event-location') || 'unknown';

                  if (typeof fbq === 'function') {
                    if (event === 'purchase_click') {
                      fbq('track', 'Purchase', {
                        value: 630,
                        currency: 'BRL',
                        content_name: 'ODA AL VINO 2026',
                        content_category: 'ticket'
                      });
                    } else if (event === 'initiate_checkout') {
                      fbq('track', 'InitiateCheckout', {
                        value: 630,
                        currency: 'BRL',
                        content_name: 'ODA AL VINO 2026',
                        content_category: 'ticket'
                      });
                    }
                    console.log('[Meta Pixel Event]', event, { location });
                  }
                }
              });
            `,
          }}
        />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/oda/Fonts/ccsbelvareregular.ttf"
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

        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=5583753594990251&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel (noscript) */}

        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
