import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Mayoreo y Grupos | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function MayoreoOG() {
  return await generateLegalOgImage({
    iconName: "groups",
    readingTime: 10,
  });
}
