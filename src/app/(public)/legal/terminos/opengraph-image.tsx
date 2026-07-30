import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Términos y Condiciones | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function TerminosOG() {
  return await generateLegalOgImage({
    iconName: "description",
    readingTime: 22,
  });
}
