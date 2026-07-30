import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Garantía de Producto | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function GarantiaOG() {
  return await generateLegalOgImage({
    iconName: "workspace_premium",
    readingTime: 15,
  });
}
