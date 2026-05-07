"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const AGE_GATE_KEY = "oda_age_verified";
const AGE_GATE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

export function AgeGateModal() {
  const [showModal, setShowModal] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem(AGE_GATE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const now = Date.now();
        if (data.timestamp && now - data.timestamp < AGE_GATE_EXPIRY) {
          setShowModal(false);
          return;
        }
      } catch (e) {
        // Invalid JSON, show modal
      }
    }
    setShowModal(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      AGE_GATE_KEY,
      JSON.stringify({
        verified: true,
        timestamp: Date.now(),
        language
      })
    );
    setShowModal(false);
  };

  const handleReject = () => {
    setRejectionMessage(true);
    setTimeout(() => setRejectionMessage(false), 3000);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-wine rounded-lg p-8 max-w-md mx-4 text-center space-y-6">
        <p className="text-sm text-paper/70 uppercase tracking-widest font-semibold">
          {t("ageGateLabel", language)}
        </p>

        <h2 className="font-serif text-3xl text-paper">
          {t("ageGateTitle", language)}
        </h2>

        <p className="text-lg text-paper/90">
          {t("ageGateMessage", language)}
        </p>

        <p className="text-sm text-paper/75 leading-relaxed">
          {t("ageGateDisclaimer", language)}
        </p>

        {rejectionMessage && (
          <p className="text-sm text-harvest font-semibold">
            Reintentar
          </p>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleAccept}
            className="flex-1 bg-harvest text-wine font-bold py-3 rounded-lg hover:bg-harvest/90 transition-colors"
          >
            {t("ageGateButton", language)}
          </button>
          <button
            onClick={handleReject}
            disabled={rejectionMessage}
            className={`flex-1 border-2 border-paper/40 text-paper font-bold py-3 rounded-lg transition-all ${
              rejectionMessage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-paper/10"
            }`}
          >
            {t("ageGateExit", language)}
          </button>
        </div>
      </div>
    </div>
  );
}
