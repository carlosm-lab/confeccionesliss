import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Catálogo de Derechos | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function DerechosOG() {
  return await generateLegalOgImage({
    iconName: "verified_user",
    readingTime: 22,
  });
}
