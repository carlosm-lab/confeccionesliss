import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Condiciones de Contratación | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ContratacionOG() {
  return await generateLegalOgImage({
    iconName: "handshake",
    readingTime: 12,
  });
}
