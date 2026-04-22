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
      <img
        src="/oda/brand/iso_whatsapp.svg"
        alt="WhatsApp"
        width="28"
        height="28"
      />
</a>
  );
}
