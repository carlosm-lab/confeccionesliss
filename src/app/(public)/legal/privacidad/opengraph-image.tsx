import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Privacidad | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function PrivacidadOG() {
  return await generateLegalOgImage({
    iconName: "shield",
    readingTime: 14,
  });
}
