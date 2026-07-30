import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Catálogo de Deberes | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function DeberesOG() {
  return await generateLegalOgImage({
    iconName: "task_alt",
    readingTime: 20,
  });
}
