import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Documentos Legales | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function LegalHubOG() {
  return await generateLegalOgImage({
    iconName: "gavel",
    readingTime: null,
  });
}
