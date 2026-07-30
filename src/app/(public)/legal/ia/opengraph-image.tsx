import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Inteligencia Artificial | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function LegalIaOG() {
  return await generateLegalOgImage({
    iconName: "psychology",
    readingTime: 20,
  });
}
