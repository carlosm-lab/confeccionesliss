// ─────────────────────────────────────────────────────────────────
// BASE DE CONOCIMIENTO COMPACTA Y OPTIMIZADA (2,000 TOKENS MAX)
// ─────────────────────────────────────────────────────────────────

export const CHAT_KNOWLEDGE_BASE: string = `
## INFORMACIÓN DE CONFECCIONES LISS
- **Negocio**: Taller de confección a la medida de scrubs médicos, uniformes universitarios, ropa clínica, corporativa y escolar.
- **Fundadora**: Iris Lisseth Villacorta de Molina (confeccionando desde 2005, marca fundada el 20 de enero de 2021).
- **Ubicación física**: Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, San Miguel, El Salvador. (A la par del anexo de la UNAB, sobre la calle de la Corte de Cuentas).
- **WhatsApp**: +503 7331-7181 (https://wa.me/50373317181) | Email: confeccionesliss.contacto@gmail.com
- **Horario**: Lunes a Sábado, 8:00 a.m. – 5:00 p.m. (Cerrado domingos).

## UNIVERSIDADES E INSTITUCIONES (CON BORDADO OFICIAL DE ESCUDO Y COLORES)
- **IEPROES** (San Miguel): Licenciatura y Técnico en Enfermería, gabachas de laboratorio y scrubs.
- **UNIVO** (Universidad de Oriente): Medicina, Odontología, Enfermería, Laboratorio Clínico.
- **UNAB** (Universidad Dr. Andrés Bello): Medicina y Enfermería (verde/blanco/azul). Taller ubicado al lado del anexo UNAB.
- **UGB** (Universidad Gerardo Barrios): Scrubs clínicos y gabachas blancas/color.
- **UES** (FMO-UES): Medicina y ciencias de la salud.
- **UMA** (Universidad Modular Abierta) y **UEES** (Universidad Evangélica).
- Confeccionamos para cualquier otra universidad compartiendo el modelo y color.

## PRECIOS Y PRODUCTOS PRINCIPALES
- **Scrubs Médicos Generales (Set Filipina + Pantalón)**: Desde **$35.00 USD** (Tela antimicrobiana Sincatex antifluidos o Lino Oxford).
- **Scrubs Universitarios (Colores oficiales)**: Desde **$39.50 USD**.
- **Uniformes Escolares**: Desde **$12.00 USD** ($8.00 USD por prendas sueltas).
- **Uniformes Corporativos con Logo**: Precios por volumen desde 10–12 unidades.
- **Gabachas y Filipinas sueltas**: Desde $18.00 USD. Pantalones sueltos desde $17.00 USD.
- **Servicios**: Bordado computarizado (gratis al pedir uniforme completo; individual desde $5.00 USD), Sublimación full color desde 1 pieza, Confección a la medida (12 medidas anatómicas) y Servicio de solo mano de obra (el cliente trae su tela).

## ENVÍOS Y MÉTODOS DE PAGO EN EL SALVADOR
- **Retiro en Taller (San Miguel)**: $0.00 (Gratis).
- **Punto de Entrega (San Miguel)**: $1.00 USD.
- **Envío a Domicilio San Miguel / Zona Oriental (Usulután, La Unión, Morazán)**: $3.00 USD.
- **Envío a Domicilio Resto de El Salvador**: $6.00 USD.
- **Pagos**: Efectivo en taller, Pago al recibir (contra entrega a domicilio) o Transferencia bancaria.
- **Anticipo**: 25% a 50% de anticipo para iniciar confección.
- **Devoluciones**: Al ser prendas a la medida/personalizadas, no hay devoluciones de dinero por cambios de opinión. Sí hay corrección gratis por defecto de costura del taller.
`;

export const KNOWLEDGE_STATS = {
  generatedAt: new Date().toISOString(),
  charCount: CHAT_KNOWLEDGE_BASE.length,
  estimatedTokens: Math.ceil(CHAT_KNOWLEDGE_BASE.length / 4),
} as const;
