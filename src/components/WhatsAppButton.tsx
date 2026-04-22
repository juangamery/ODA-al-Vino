"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function WhatsAppButton() {
  const { language } = useLanguage();
  const whatsappNumber = "5545991340754";
  const message = language === "es"
    ? "Hola, tengo una consulta sobre ODA al Vino"
    : "Olá, tenho uma pergunta sobre ODA ao Vinho";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
      aria-label="WhatsApp"
      title={language === "es" ? "Enviar mensaje por WhatsApp" : "Enviar mensagem por WhatsApp"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.52 3.48C18.9 1.84 16.7 1 14.3 1 7.8 1 2.5 6.3 2.5 12.8c0 2.1.55 4.2 1.6 6L2 23l6.3-1.65c1.75.95 3.75 1.5 5.8 1.5 6.5 0 11.8-5.3 11.8-11.8 0-3.15-1.2-6.1-3.4-8.37zM14.3 20.8c-1.75 0-3.45-.45-4.95-1.3l-.35-.2-3.65.95.95-3.5-.25-.4c-1-1.55-1.55-3.35-1.55-5.15 0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.05 1.05 6.9 2.9 1.85 1.85 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm5.35-7.35c-.3-.15-1.75-.85-2.05-.95-.3-.1-.5-.15-.7.15-.2.3-.75.95-.95 1.15-.2.2-.4.25-.7.05-.3-.15-1.25-.45-2.35-1.45-.85-.75-1.4-1.7-1.6-2-.2-.3 0-.45.15-.6.15-.15.3-.35.45-.5.15-.15.2-.3.3-.5.1-.2.05-.35 0-.5-.05-.15-.7-1.6-.95-2.2-.25-.55-.5-.5-.7-.5-.15 0-.35 0-.55 0-.2 0-.5.1-.75.35-.25.25-1.05 1.05-1.05 2.5 0 1.45 1.05 2.9 1.2 3.1.15.2 2.1 3.2 5.05 4.5.7.3 1.25.5 1.7.6.7.25 1.35.2 1.85.1.55-.1 1.75-.7 2-1.4.25-.7.25-1.3.15-1.4-.1-.1-.3-.15-.55-.3z" />
      </svg>
    </a>
  );
}
