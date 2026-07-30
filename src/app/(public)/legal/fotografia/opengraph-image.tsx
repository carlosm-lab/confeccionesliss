import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Fotografía e Imagen | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function FotografiaOG() {
  return await generateLegalOgImage({
    iconName: "photo_camera",
    readingTime: 15,
  });
}
