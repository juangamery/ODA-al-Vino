import { Reveal } from "@/components/motion/Reveal";
import { PolaroidStack } from "@/components/ui/PolaroidStack";

const photos = [
  { id: "oav25-1", src: "/oda/gallery/oav25/009A7373.webp",  caption: "OAV 2025" },
  { id: "oav25-2", src: "/oda/gallery/oav25/009A7272.webp",  caption: "OAV 2025" },
  { id: "oav25-3", src: "/oda/gallery/oav25/0D0A7446.webp",  caption: "OAV 2025" },
  { id: "oav24-1", src: "/oda/gallery/oav24/_HID9267.webp",  caption: "OAV 2024" },
  { id: "oav24-2", src: "/oda/gallery/oav24/_HID8890.webp",  caption: "OAV 2024" },
  { id: "oav24-3", src: "/oda/gallery/oav24/_HID0705.webp",  caption: "OAV 2024" },
  { id: "oav23-1", src: "/oda/gallery/oav23/_09A0216.webp",  caption: "OAV 2023" },
  { id: "oav23-2", src: "/oda/gallery/oav23/_09A0080.webp",  caption: "OAV 2023" },
  { id: "oav23-3", src: "/oda/gallery/oav23/_09A0339.webp",  caption: "OAV 2023" },
];

export function Historia() {
  return (
    <section className="bg-paper overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-24 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
          <Reveal variant="clip">
            <h2 className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.88] uppercase text-wine">
              10 años de<br />
              <span className="script normal-case italic text-wine text-[1.25em]"><span className="script-ss01">H</span>istoria compartida</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="fecha-flanqueo text-[11px] text-wine/35 md:text-right">
              Desde 2015 · Triple Frontera
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stack polaroid — full width, desborda los márgenes */}
      <PolaroidStack images={photos} seed={7331} />

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pb-20">
        <Reveal delay={0.3}>
          <p className="lato-expanded text-[10px] text-wine/35 italic">
            Pasá el cursor sobre las fotos · Hacé click en "Revolver" para ver más
          </p>
        </Reveal>
      </div>
    </section>
  );
}
