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
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.15-1.739-.86-2.012-.96-.273-.11-.471-.15-.67.15-.197.295-.76.954-.93 1.155-.168.198-.337.223-.634.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-2.176 0-4.273.6-6.079 1.734l-.423.25-4.39-.587.598 4.185.267.424a7.05 7.05 0 001.077 3.611c1.338 2.092 3.641 3.576 6.214 3.576 4.029 0 7.29-3.277 7.29-7.314 0-1.933-.778-3.749-2.189-5.11a7.348 7.348 0 00-5.365-2.269" />
      </svg>
    </a>
  );
}
