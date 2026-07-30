import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Cookies | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function CookiesOG() {
  return await generateLegalOgImage({
    iconName: "cookie",
    readingTime: 10,
  });
}
