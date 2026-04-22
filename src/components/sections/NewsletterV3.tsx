"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function NewsletterV3() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Aquí irá la integración con tu servicio de email (Mailchimp, Brevo, etc.)
      // Por ahora simulamos la respuesta
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email) {
        setMessage(
          language === "es"
            ? "¡Gracias! Revisa tu email para confirmar."
            : "Obrigado! Verifique seu email para confirmar."
        );
        setEmail("");

        // Limpiar mensaje después de 5 segundos
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      setMessage(
        language === "es"
          ? "Hubo un error. Intenta de nuevo."
          : "Houve um erro. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-wine py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-8 md:px-16 text-center">
        {/* Eyebrow */}
        <p className="text-paper/60 text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-bold mb-4 md:mb-6">
          ✦ {language === "es" ? "Comunidad ODA" : "Comunidade ODA"} ✦
        </p>

        {/* Título */}
        <h2 className="font-serif text-3xl md:text-5xl text-paper uppercase mb-4 md:mb-6 leading-tight">
          {language === "es" ? "Recibí noticias" : "Receba notícias"}
        </h2>

        {/* Subtítulo */}
        <p className="text-paper/80 text-base md:text-lg mb-8 md:mb-12">
          {language === "es"
            ? "Sé el primero en conocer novedades sobre ODA al Vino, experiencias exclusivas y promociones especiales."
            : "Seja o primeiro a saber sobre novidades sobre ODA ao Vinho, experiências exclusivas e promoções especiais."}
        </p>

        {/* Email Input + CTA */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-4">
          <input
            type="email"
            placeholder={language === "es" ? "tu@email.com" : "seu@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-paper text-wine placeholder-wine/40 font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-harvest disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 md:px-8 py-3 md:py-4 bg-harvest hover:bg-harvest/90 text-paper font-bold uppercase tracking-wider rounded-full transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
          >
            {isLoading
              ? language === "es"
                ? "Enviando..."
                : "Enviando..."
              : language === "es"
              ? "Suscribirse"
              : "Inscrever-se"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm md:text-base font-medium ${
              message.includes("Gracias") || message.includes("Obrigado")
                ? "text-harvest"
                : "text-red-300"
            }`}
          >
            {message}
          </p>
        )}

        {/* Disclaimer */}
        <p className="text-paper/50 text-xs md:text-sm mt-6 md:mt-8">
          {language === "es"
            ? "No compartimos tu email. Cancelar suscripción en cualquier momento."
            : "Não compartilhamos seu email. Cancelar inscrição a qualquer momento."}
        </p>
      </div>
    </section>
  );
}
