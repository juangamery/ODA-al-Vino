import dynamic from "next/dynamic";
import { Authority } from "@/components/sections/Authority";
import { ExperienceV3 } from "@/components/sections/ExperienceV3";
import { FinalV3 } from "@/components/sections/FinalV3";
import { FooterV3 } from "@/components/sections/FooterV3";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { HeroV3 } from "@/components/sections/HeroV3";
import { ManifestoV3 } from "@/components/sections/ManifestoV3";
import { SealDivider } from "@/components/sections/SealDivider";
import { Tickets } from "@/components/sections/Tickets";
import { VenueV3 } from "@/components/sections/VenueV3";
import { Marquee } from "@/components/ui/Marquee";

// Lazy load secciones no críticas
const BodegasV3 = dynamic(() => import("@/components/sections/BodegasV3").then(mod => ({ default: mod.BodegasV3 })), {
  loading: () => <div className="h-64" />,
});

const Community = dynamic(() => import("@/components/sections/Community").then(mod => ({ default: mod.Community })), {
  loading: () => <div className="h-64" />,
});

const Iguazu = dynamic(() => import("@/components/sections/Iguazu").then(mod => ({ default: mod.Iguazu })), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  return (
    <main className="bg-paper text-wine">
      <FloatingHeader />

      {/* ── Secciones ── */}
      <HeroV3 />

      <SealDivider />

      <ManifestoV3 />

      <Marquee
        text="ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE · EL VINO NOS REÚNE · ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE · EL VINO NOS REÚNE ·"
        variant="dark"
      />

      <ExperienceV3 />

      <Marquee
        text="+100 BODEGAS · +700 ETIQUETAS · 10 AÑOS · +2000 ASISTENTES · TRIPLE FRONTERA ·"
        variant="harvest"
        speed={35}
      />

      <Authority />

      <Tickets />

      <BodegasV3 />

      <VenueV3 />

      <Marquee
        text="ODA AL VINO · 4 Y 5 SEPTIEMBRE · IGUAZÚ · ARGENTINA · 10° EDICIÓN ·"
        variant="dark"
        speed={38}
      />

      <Community />

      <Iguazu />

      <FinalV3 />

      <FooterV3 />
    </main>
  );
}
