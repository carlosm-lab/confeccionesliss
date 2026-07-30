import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Envíos | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function EnviosOG() {
  return await generateLegalOgImage({
    iconName: "local_shipping",
    readingTime: 15,
  });
}
