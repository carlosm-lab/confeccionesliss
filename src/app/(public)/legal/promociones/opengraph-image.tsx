import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Términos de Promociones | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function PromocionesOG() {
  return await generateLegalOgImage({
    iconName: "sell",
    readingTime: 16,
  });
}
