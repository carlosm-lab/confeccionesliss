import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Estándares de Confección | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ConfeccionOG() {
  return await generateLegalOgImage({
    iconName: "straighten",
    readingTime: 17,
  });
}
