"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const bodegas = [
  "Jorge Rubio", "Antigal", "Ojo de Tigre", "Don Bosco", "Bemberg",
  "Escorihuela", "Rutini", "Ernesto Catena", "Catena Zapata", "Falasco",
  "Chateau Subsónico", "Goyenechea", "Sottano", "Mil Demonios", "Colosso",
  "Viña Alicia", "Heracles", "Makila", "Argana", "Gloria Galvagno",
  "Domingo Molina", "La Anita", "Yacochuya", "El Porvenir", "Funckenhausen",
  "Puna", "La Macarena", "Maison Pouget", "Mauricio Lorca", "Ojo de Agua",
  "Penedo Borges", "Primogénito", "Finca Iral", "La Coste de los Andes",
  "Navarro Correas", "El Esteco", "Las Moras", "Trapiche", "Séptima",
  "Domaine Bousquet", "Cuarto Surco", "Mosquita Muerta", "Salentein",
  "Antucura", "Luigi Bosca", "Cicchitti", "Proyecto X", "Achaval",
  "Monte Viejo", "Huentala", "Mil Suelos", "Lui", "Desquiciado",
  "Los Imposibles", "La Azul", "Benegas", "Budeguer", "Sposato",
  "Grazie Mille", "Kalos Cru", "CarinaE", "Lauri Viana", "Sánchez Carrillo",
  "Andillian", "López", "Finca Los Maza", "Diamandes", "Rosell Boher",
  "Renacer", "A16", "Flechas de los Andes", "Familia Altieri", "Freixenet",
  "Doña Paula", "Zuccardi", "Cara Sur", "Los Dragones", "Michelini i Mufatto",
  "Finca Suarez", "Claroscuro", "Matervini", "Caro", "Susana Balbo",
  "Ballester", "Durigutti", "Vistalba", "Ribera del Cuarzo", "Due Continenti",
  "A Corazón Abierto", "Montequieto", "Casa Araujo", "Rocamadre",
  "Casa Gli Amici", "Colomé", "Bianchi", "Isasmendi", "Aceites Olei Guardia",
  "Mal Wine", "Gimenez Riili", "El Lado Polo del Mundo", "San Huberto",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BodegasModal({ isOpen, onClose }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative bg-paper w-full max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-wine px-6 md:px-10 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="lato-expanded text-[9px] text-paper/50 uppercase tracking-[0.35em] font-bold mb-1">
              ✦ ODA AL VINO 2026 ✦
            </p>
            <h3 className="font-serif text-xl md:text-3xl uppercase text-paper leading-tight">
              {t("bodegasParticipants", language)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-paper/60 hover:text-paper transition text-2xl leading-none ml-4 flex-shrink-0"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Lista scrollable */}
        <div className="overflow-y-auto px-6 md:px-10 py-6 flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
            {bodegas.map((bodega, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-harvest text-xs flex-shrink-0">★</span>
                <span className="text-sm md:text-base text-wine/80 font-medium leading-snug">
                  {bodega}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-wine/10 px-6 md:px-10 py-4 flex-shrink-0 text-center">
          <p className="text-[10px] uppercase tracking-widest text-wine/40 font-bold">
            {bodegas.length} {language === "pt" ? "adegas participantes" : "bodegas participantes"}
          </p>
        </div>
      </div>
    </div>
  );
}
