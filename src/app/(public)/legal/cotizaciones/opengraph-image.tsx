import {
  generateLegalOgImage,
  size as ogSize,
  contentType as ogContentType,
} from "@/lib/legalOgHelper";

export const alt = "Política de Cotizaciones | Confecciones Liss";
export const size = ogSize;
export const contentType = ogContentType;

export default async function CotizacionesOG() {
  return await generateLegalOgImage({
    iconName: "attach_money",
    readingTime: 18,
  });
}
