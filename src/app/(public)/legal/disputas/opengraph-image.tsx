import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Resolución de Disputas | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function DisputasOG() {
  return await generateLegalOgImage({
    iconName: "gavel",
    readingTime: 18,
  });
}
