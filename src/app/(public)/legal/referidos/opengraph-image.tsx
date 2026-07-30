import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Programa de Referidos | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ReferidosOG() {
  return await generateLegalOgImage({
    iconName: "group_add",
    readingTime: 18,
  });
}
