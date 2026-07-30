import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Declaración de Accesibilidad Web | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function AccesibilidadOG() {
  return await generateLegalOgImage({
    iconName: "accessibility_new",
    readingTime: 12,
  });
}
