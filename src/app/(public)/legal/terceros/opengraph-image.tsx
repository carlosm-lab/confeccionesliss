import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Uso de Logos e Identidad de Terceros | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function TercerosOG() {
  return await generateLegalOgImage({
    iconName: "account_balance",
    readingTime: 20,
  });
}
