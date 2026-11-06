import { MetadataRoute } from "next";
import { historias } from "@/lib/historias";

const BASE_URL = "https://www.odaalvino.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const editoriales: MetadataRoute.Sitemap =
    historias.length === 0
      ? []
      : [
          { url: `${BASE_URL}/historias`, changeFrequency: "weekly", priority: 0.8 },
          ...historias.map((h) => ({
            url: `${BASE_URL}/historias/${h.slug}`,
            lastModified: new Date(h.fecha),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ];

  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    ...editoriales,
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/compliance`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
