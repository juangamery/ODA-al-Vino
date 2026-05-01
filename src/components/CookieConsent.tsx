"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { gsap } from "@/lib/gsap";

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function CookieConsent() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
    marketing: false,
    functional: true, // Siempre necesario
  });

  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si el usuario ya hizo una selección
    const saved = localStorage.getItem("oda_cookie_preferences");

    if (!saved) {
      setIsVisible(true);
      // Animar entrada del banner
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    } else {
      try {
        const prefs = JSON.parse(saved);
        setPreferences(prefs);
      } catch (e) {
        console.error("Error loading cookie preferences:", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      analytics: false,
      marketing: false,
      functional: true, // Siempre necesario
    };
    savePreferences(rejected);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "functional") return; // No permitir desactivar funcional
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("oda_cookie_preferences", JSON.stringify(prefs));

    // Animar salida
    if (bannerRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(bannerRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setIsVisible(false),
          });
        },
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6"
      style={{ opacity: 0 }}
    >
      <div
        ref={contentRef}
        className="mx-auto max-w-4xl bg-gradient-to-r from-wine/95 to-plum/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-paper/20"
        style={{ opacity: 0 }}
      >
        {!showCustomize ? (
          // Main Banner
          <div>
            <div className="mb-6">
              <h3 className="font-serif text-lg md:text-xl text-paper font-bold mb-2">
                {t("cookieConsentTitle", language)}
              </h3>
              <p className="text-paper/80 text-sm md:text-base leading-relaxed max-w-2xl">
                {t("cookieConsentDescription", language)}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-start">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-paper hover:bg-paper/90 text-wine font-bold uppercase text-sm tracking-wider rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {t("cookieConsentAcceptAll", language)}
              </button>

              <button
                onClick={handleRejectAll}
                className="px-6 py-2 bg-transparent hover:bg-paper/10 text-paper border border-paper font-bold uppercase text-sm tracking-wider rounded-full transition-all duration-300"
              >
                {t("cookieConsentRejectAll", language)}
              </button>

              <button
                onClick={handleCustomize}
                className="px-6 py-2 bg-transparent hover:bg-paper/10 text-paper/70 hover:text-paper font-bold uppercase text-sm tracking-wider rounded-full transition-all duration-300"
              >
                {t("cookieConsentCustomize", language)}
              </button>
            </div>

            {/* Link to policy */}
            <p className="text-paper/60 text-xs mt-4">
              {t("cookieConsentReadMore", language)}{" "}
              <a
                href="/compliance#cookies"
                className="text-paper hover:text-paper/80 underline transition-colors"
              >
                {t("cookieConsentPolicyLink", language)}
              </a>
            </p>
          </div>
        ) : (
          // Customize Screen
          <div>
            <h3 className="font-serif text-lg md:text-xl text-paper font-bold mb-6">
              {t("cookieConsentCustomizeTitle", language)}
            </h3>

            {/* Cookie Options */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
              {/* Functional - Always enabled */}
              <div className="flex items-center justify-between p-4 bg-paper/10 rounded-lg">
                <div className="flex-1">
                  <p className="text-paper font-bold text-sm">
                    {t("cookieCategoryFunctional", language)}
                  </p>
                  <p className="text-paper/70 text-xs">
                    {t("cookieCategoryFunctionalDesc", language)}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5 rounded ml-4 cursor-not-allowed accent-paper"
                />
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 bg-paper/10 rounded-lg">
                <div className="flex-1">
                  <p className="text-paper font-bold text-sm">
                    {t("cookieCategoryAnalytics", language)}
                  </p>
                  <p className="text-paper/70 text-xs">
                    {t("cookieCategoryAnalyticsDesc", language)}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handleToggle("analytics")}
                  className="w-5 h-5 rounded ml-4 cursor-pointer accent-paper"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-4 bg-paper/10 rounded-lg">
                <div className="flex-1">
                  <p className="text-paper font-bold text-sm">
                    {t("cookieCategoryMarketing", language)}
                  </p>
                  <p className="text-paper/70 text-xs">
                    {t("cookieCategoryMarketingDesc", language)}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handleToggle("marketing")}
                  className="w-5 h-5 rounded ml-4 cursor-pointer accent-paper"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-start">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-paper hover:bg-paper/90 text-wine font-bold uppercase text-sm tracking-wider rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {t("cookieConsentSave", language)}
              </button>

              <button
                onClick={() => setShowCustomize(false)}
                className="px-6 py-2 bg-transparent hover:bg-paper/10 text-paper border border-paper font-bold uppercase text-sm tracking-wider rounded-full transition-all duration-300"
              >
                {t("cookieConsentCancel", language)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
