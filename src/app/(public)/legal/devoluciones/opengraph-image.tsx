import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Devoluciones | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function DevolucionesOG() {
  return await generateLegalOgImage({
    iconName: "replay",
    readingTime: 12,
  });
}
