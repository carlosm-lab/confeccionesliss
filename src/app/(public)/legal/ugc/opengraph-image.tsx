import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Contenido UGC | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function UgcOG() {
  return await generateLegalOgImage({
    iconName: "forum",
    readingTime: 12,
  });
}
