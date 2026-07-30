import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Comunicaciones | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ComunicacionesOG() {
  return await generateLegalOgImage({
    iconName: "campaign",
    readingTime: 12,
  });
}
