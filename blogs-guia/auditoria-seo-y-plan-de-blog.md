# Auditoría SEO y Plan de Blog — Confecciones Liss

**Sitio auditado:** confeccionesliss.com  
**Repositorio auditado:** github.com/carlosm-lab/confeccionesliss  
**Ubicación:** San Miguel, El Salvador — 1 de agosto de 2026

**Objetivo del documento:** Auditar el sitio y su base técnica, mapear el vacío de contenido informativo frente al catálogo transaccional, y entregar un plan editorial completo orientado a capturar el tráfico de búsqueda de uniformes médicos, clínicos y hospitalarios para enfermería, medicina y el resto de carreras de salud en El Salvador.

_Los 20 artículos de prioridad Alta ya están redactados en el documento “Contenido de Blogs Prioritarios — Confecciones Liss.pdf”_

---

## Índice

1. Resumen ejecutivo
2. Qué se auditó y cómo
3. Hallazgos de la auditoría
   - 3.1 — El blog no existe todavía
   - 3.2 — La base técnica ya está resuelta; el blog puede apoyarse en ella sin trabajo previo
   - 3.3 — El catálogo ya tiene la profundidad que el blog necesita explotar
   - 3.4 — Dominio nuevo: la estrategia debe sembrar cola larga antes que términos de alto volumen
   - 3.5 — La competencia local vive en redes sociales, no en buscadores
   - 3.6 — UEES es una ambición del texto del sitio, no una cobertura real todavía
   - 3.7 — Existe una normativa oficial (MINSAL) que nadie está explicando bien
4. Estrategia de contenido: los 7 pilares
5. Plan completo: 83 temas de blog
   - 1. Universidad — UNIVO
   - 1. Universidad — IEPROES
   - 1. Universidad — UGB
   - 1. Universidad — UNAB
   - 1. Universidad — UES
   - 1. Universidad — UMA
   - 1. Universidad — UEES (expansión)
   - 2. Carrera (genérico, nacional)
   - 3. Normativa oficial (MINSAL)
   - 4. Guías de compra y cuidado
   - 5. Local, negocio y grupos
   - 6. Estacional / calendario académico
   - 7. Comparativas / aspiracional
6. Referencia: carreras de salud confirmadas por universidad
7. Próximos pasos recomendados

---

## 1. Resumen ejecutivo

Confecciones Liss vende scrubs médicos y uniformes universitarios de salud desde San Miguel, El Salvador, con especialidad en la zona oriental del país. El sitio actual (confeccionesliss.com) es una construcción reciente — en producción formal desde junio de 2026 — con una base técnica de SEO ya resuelta: JSON-LD, sitemap y robots.txt dinámicos, canonicals, imágenes Open Graph, accesibilidad WCAG 2.2. Lo que falta no es técnica: es contenido informativo. El sitio de hoy solo tiene páginas transaccionales — catálogo, producto, empresa, legal — y ninguna ruta de blog.

Esa ausencia es, al mismo tiempo, la oportunidad. El catálogo de Confecciones Liss ya cubre 74 productos universitarios repartidos en 6 universidades (UNIVO, IEPROES, UGB, UNAB, UES y UMA), con una profundidad que ninguna página de categoría puede comunicar por sí sola: programas específicos hasta el nivel de Maestría. Esa granularidad es exactamente la materia prima de un blog que puede capturar cada combinación de búsqueda — universidad, carrera, color, normativa — antes de que alguien más lo haga. La investigación de mercado no encontró un solo competidor local con una estrategia de contenido SEO activa en este nicho: todos compiten en redes sociales, no en buscadores.

Este documento entrega, en este orden: los hallazgos completos de la auditoría del sitio y del repositorio, la lógica de los 7 pilares de contenido propuestos, y la lista completa de 83 artículos de blog organizados por pilar, con palabra clave, intención de búsqueda, prioridad y a qué página del catálogo debe enlazar cada uno. Los 20 artículos marcados como Prioridad Alta ya están redactados por completo y listos para publicar en el documento que acompaña a este: “Contenido de Blogs Prioritarios — Confecciones Liss”.

---

## 2. Qué se auditó y cómo

La auditoría combinó tres fuentes: el sitio en producción (confeccionesliss.com), el código fuente del repositorio en GitHub (carlosm-lab/confeccionesliss, rama master) y una investigación de mercado externa.

- **Sitio en producción:** página de inicio, catálogo general, hub de universidades, la ficha completa de la UES (28 productos) y la página pública de historial de cambios (/updates).
- **Repositorio:** arquitectura de rutas del App Router de Next.js 16, generación de sitemap.ts y robots.ts, configuración central del sitio (src/config/site.ts), taxonomía de categorías (src/data/categories.ts) y stack de dependencias (package.json).
- **Investigación externa:** oferta académica real de salud de UNIVO, IEPROES, UGB, UNAB, UES (Facultad Multidisciplinaria Oriental) y UEES; lineamientos técnicos oficiales del MINSAL sobre uniforme del personal de salud; panorama competitivo de venta de uniformes médicos en El Salvador.

---

## 3. Hallazgos de la auditoría

### 3.1 — El blog no existe todavía

El repositorio no tiene ninguna ruta /blog, ni en el App Router ni en el sitemap. Se confirmó además que no hay ninguna capa de contenido tipo MDX, ni un CMS de artículos (no aparecen dependencias como contentlayer, next-mdx-remote, sanity o gray-matter en package.json). Todo el contenido del sitio es, o bien catálogo transaccional respaldado por Supabase, o páginas institucionales escritas directamente en componentes React. La página “/updates” es un changelog técnico público (67 cambios documentados, pensado para transparencia del proyecto) y no debe confundirse con un blog: no compite ni sustituye la estrategia de contenido de este documento.

### 3.2 — La base técnica ya está resuelta; el blog puede apoyarse en ella sin trabajo previo

El historial de cambios del propio repositorio documenta que ya se implementaron: JSON-LD con schema Product, BreadcrumbList y LocalBusiness; sitemap.xml y robots.txt generados dinámicamente; imágenes Open Graph y Twitter Card dinámicas; canonicals autorreferenciadas en cada página; y una remediación completa de accesibilidad WCAG 2.2. En otras palabras: cuando se publique el primer artículo de blog, no hace falta resolver SEO técnico desde cero — la prioridad real es, de principio a fin, el contenido.

### 3.3 — El catálogo ya tiene la profundidad que el blog necesita explotar

La categoría “Universitario” del catálogo tiene 74 productos frente a apenas 8 en “Scrubs” genérico. Esa proporción dice algo importante: la ventaja competitiva real de Confecciones Liss no está en el scrub genérico (donde compite con cualquier tienda del país), sino en la cobertura hiperespecífica por universidad y carrera, incluyendo programas de posgrado. Solo la UES tiene 28 productos publicados, con nombres tan específicos como “Uniforme de Maestría en Gerontología Clínica y Social de la UES” o “Uniforme de Técnico en Farmacia Asistencial de la UES”. Nadie más está escribiendo contenido para esas búsquedas exactas.

### 3.4 — Dominio nuevo: la estrategia debe sembrar cola larga antes que términos de alto volumen

El sitio actual está en producción desde junio de 2026. El negocio opera desde 2005, pero el dominio y la autoridad acumulada del sitio actual son jóvenes. Términos genéricos de alto volumen como “scrubs El Salvador” tardarán más en posicionar frente a sitios con más historial. La cola larga muy específica — universidad + carrera, o normativa oficial — es donde se puede ganar posición más rápido, precisamente porque casi no tiene competencia directa todavía.

### 3.5 — La competencia local vive en redes sociales, no en buscadores

Se identificaron varios competidores activos: Uniform Boutique y Kanaus en un segmento más premium, D&C Uniforms Clinic como competidor directo dentro de San Miguel, Rolox y Donza en San Salvador, y varios revendedores informales de la marca estadounidense FIGS operando por TikTok. Ninguno de ellos tiene un blog SEO activo dirigido a este nicho: casi toda su presencia es Instagram, TikTok y Facebook. El contenido informativo en buscadores, en este nicho y en este país, está prácticamente libre.

### 3.6 — UEES es una ambición del texto del sitio, no una cobertura real todavía

“UEES” aparece mencionada en el meta description de la página de inicio y en una versión indexada del sitio, pero no está en la lista real de universidades del sitemap.ts (que solo incluye: univo, ieproes, ugb, unab, ues, uma) ni tiene productos publicados en el catálogo. Además, la UEES solo tiene sede en San Salvador, fuera de la zona oriental que hoy es el foco geográfico del negocio. Este plan la incluye como un bloque de expansión separado y marcado como tal — no como cobertura confirmada — para que la decisión de perseguirla o no sea explícita y no un descuido del copy.

### 3.7 — Existe una normativa oficial (MINSAL) que nadie está explicando bien

El Ministerio de Salud de El Salvador publica lineamientos técnicos oficiales sobre el uniforme del personal de salud por cargo y nivel de atención, actualizados en 2025. Es contenido de autoridad real, con potencial de enlaces externos y de posicionar a Confecciones Liss como una referencia informativa del sector — no solo como tienda. Es, además, contenido que por su naturaleza no puede vivir en una ficha de producto: solo puede vivir en un blog.

---

## 4. Estrategia de contenido: los 7 pilares

El plan editorial completo se organiza en 7 pilares. Cada uno cumple un papel distinto dentro de la estrategia de captura de tráfico: unos construyen cola larga hiperespecífica, otros construyen autoridad, otros sostienen la decisión de compra, y otros capturan intención local o estacional.

- **Pilar 1 — Uniformes por universidad (36 artículos):** El bloque más grande, porque es donde el catálogo ya tiene ventaja real. Un artículo por carrera con producto publicado en cada universidad, más artículos-hub que conectan todo el bloque. Incluye UEES como sub-bloque de expansión, claramente separado.
- **Pilar 2 — Uniformes por carrera, sin universidad (13 artículos):** Contenido genérico de alcance nacional: enfermería, medicina, odontología, laboratorio clínico, fisioterapia, nutrición, farmacia, radiología y más. Captura a quien busca sin mencionar una universidad, y a profesionales que ya no son estudiantes.
- **Pilar 3 — Normativa oficial / MINSAL (5 artículos):** Contenido de autoridad basado en los lineamientos técnicos oficiales del Ministerio de Salud. Es el bloque con más potencial de enlaces externos de todo el plan, y el que más diferencia a Confecciones Liss de cualquier competidor que solo vende en redes.
- **Pilar 4 — Guías de compra, producto y cuidado (13 artículos):** Contenido que sostiene la decisión de compra: tallas, telas (Sincatex, Lino Oxford), cortes, cuidado y bordado. Reduce preguntas repetidas por WhatsApp y es enlazable desde cualquier ficha de producto, no solo desde el blog.
- **Pilar 5 — Local, negocio y compras grupales (7 artículos):** Refuerza la posición geográfica en San Miguel y zona oriental, y da contenido buscable al ángulo de “delegado de sección” que ya existe como llamado a la acción en el sitio.
- **Pilar 6 — Estacional / calendario académico (6 artículos):** Contenido pensado para republicarse cada ciclo: nuevo ingreso, graduaciones, Día de la Enfermera. Genera picos de tráfico predecibles y recurrentes en vez de una sola lectura.
- **Pilar 7 — Comparativas y aspiracional (3 artículos):** Captura la demanda de marcas internacionales aspiracionales (como FIGS) que ya circulan informalmente en El Salvador, posicionando a Confecciones Liss como alternativa local seria.

---

## 5. Plan completo: 83 temas de blog

### 1. Universidad — UNIVO (4 artículos)

- **[ ] 1. Uniforme de Enfermería UNIVO: colores oficiales y guía de compra en San Miguel**  
  _Universidad:_ UNIVO | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería UNIVO` | _Secundarias:_ `uniforme UNIVO enfermería`, `uniforme enfermería Universidad de Oriente`  
  _Enlaza a:_ `/catalogo/universidades/univo` | _Ángulo:_ Confirmar colores exactos con fotos de producto real. Enfermería es 1 de las 2 únicas carreras de salud de la facultad — enfatizar exclusividad.

- **[ ] 2. Uniforme de Doctorado en Medicina UNIVO: guía para nuevo ingreso**  
  _Universidad:_ UNIVO | _Carrera:_ Doctorado en Medicina | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de medicina UNIVO` | _Secundarias:_ `uniforme doctorado en medicina UNIVO`, `uniforme médico UNIVO`  
  _Enlaza a:_ `/catalogo/universidades/univo` | _Ángulo:_ Explicar qué se usa el primer año (bata vs. scrub) y en qué momento del programa de 8 años cambia.

- **[ ] 3. Uniformes por rotación clínica en UNIVO: qué cambia entre Medicina Interna, Pediatría y otras áreas**  
  _Universidad:_ UNIVO | _Carrera:_ Medicina (rotaciones) | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme rotación clínica UNIVO` | _Secundarias:_ `uniforme medicina interna UNIVO`, `uniforme pediatría UNIVO`  
  _Enlaza a:_ Productos UNIVO Medicina Interna y Pediatría ya publicados | _Ángulo:_ Apoyarse en los 2 productos reales ya publicados (azul rey Medicina Interna, Pediatría) para explicar el criterio de color por rotación.

- **[ ] 4. Cuánto cuesta el uniforme de la UNIVO en San Miguel y qué incluye el precio**  
  _Universidad:_ UNIVO | _Carrera:_ General | _Intención:_ Transaccional | _Prioridad:_ Media  
  _Keyword principal:_ `precio uniforme UNIVO` | _Secundarias:_ `cuánto cuesta uniforme Universidad de Oriente`  
  _Enlaza a:_ `/catalogo/universidades/univo` | _Ángulo:_ Justificar el precio desde $35 explicando bordado y tela incluidos, sin usar 'confección' ni 'a la medida'.

### 1. Universidad — IEPROES (6 artículos)

- **[ ] 5. Uniforme de Enfermería IEPROES: colores oficiales y guía de compra en San Miguel**  
  _Universidad:_ IEPROES | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería IEPROES` | _Secundarias:_ `uniforme IEPROES enfermería`  
  _Enlaza a:_ `/catalogo/universidades/ieproes` | _Ángulo:_ Carrera de mayor demanda de IEPROES según su propia oferta académica; usar como ancla del bloque IEPROES.

- **[ ] 6. Uniforme de Psicología de la Salud IEPROES: qué usar en prácticas**  
  _Universidad:_ IEPROES | _Carrera:_ Psicología de la Salud | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme psicología de la salud IEPROES` | _Secundarias:_ `uniforme IEPROES psicología`  
  _Enlaza a:_ Producto IEPROES Psicología de la Salud ya publicado | _Ángulo:_ Aclarar por qué IEPROES exige uniforme institucional también en una carrera no clínica tradicional.

- **[ ] 7. Uniforme de Nutrición IEPROES: guía completa**  
  _Universidad:_ IEPROES | _Carrera:_ Nutrición | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de nutrición IEPROES` | _Secundarias:_ `uniforme nutricionista IEPROES`  
  _Enlaza a:_ Producto IEPROES Nutrición ya publicado.

- **[ ] 8. Uniforme de Salud Ambiental IEPROES: guía completa**  
  _Universidad:_ IEPROES | _Carrera:_ Salud Ambiental | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme salud ambiental IEPROES` | _Secundarias:_ `uniforme IEPROES salud ambiental`  
  _Enlaza a:_ Producto IEPROES Salud Ambiental ya publicado.

- **[ ] 9. Técnico y Tecnólogo en Enfermería IEPROES: uniforme y diferencias con la Licenciatura**  
  _Universidad:_ IEPROES | _Carrera:_ Técnico/Tecnólogo Enfermería | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `técnico en enfermería IEPROES` | _Secundarias:_ `tecnólogo en enfermería IEPROES uniforme`  
  _Enlaza a:_ `/catalogo/universidades/ieproes` | _Ángulo:_ Explicar los 3 niveles académicos de IEPROES (técnico/tecnólogo/licenciatura) y si cambia algo en el uniforme.

- **[ ] 10. Uniforme para las maestrías en Enfermería de IEPROES: Cuidados Intensivos y Materno Infantil**  
  _Universidad:_ IEPROES | _Carrera:_ Maestrías en Enfermería | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme maestría enfermería IEPROES` | _Secundarias:_ `maestría cuidados intensivos IEPROES uniforme`  
  _Enlaza a:_ `/catalogo/universidades/ieproes` | _Ángulo:_ Público distinto: enfermeras profesionales en posgrado, no estudiantes de pregrado — ajustar el tono.

### 1. Universidad — UGB (4 artículos)

- **[ ] 11. Uniforme de Enfermería UGB: colores oficiales y guía de compra en San Miguel**  
  _Universidad:_ UGB | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería UGB` | _Secundarias:_ `uniforme UGB enfermería`  
  _Enlaza a:_ `/catalogo/universidades/ugb`

- **[ ] 12. Uniforme de Doctorado en Medicina UGB: guía para nuevo ingreso**  
  _Universidad:_ UGB | _Carrera:_ Doctorado en Medicina | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de medicina UGB` | _Secundarias:_ `uniforme doctorado medicina UGB`  
  _Enlaza a:_ `/catalogo/universidades/ugb`

- **[ ] 13. Nuevas especialidades médicas de la UGB (Medicina Interna, Pediatría, Cirugía, Gineco-Obstetricia): ¿necesitan uniforme distinto?**  
  _Universidad:_ UGB | _Carrera:_ Especialidades médicas (posgrado) | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `especialidades médicas UGB uniforme` | _Secundarias:_ `posgrado médico UGB Usulután`  
  _Enlaza a:_ `/catalogo/universidades/ugb` | _Ángulo:_ Gancho de noticia reciente (alianza UGB con Hospital San Pedro de Usulután, 2026). Posiciona a la marca como al día con la oferta académica real.

- **[ ] 14. Técnico en Enfermería UGB: uniforme reglamentario**  
  _Universidad:_ UGB | _Carrera:_ Técnico en Enfermería | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `técnico en enfermería UGB` | _Secundarias:_ `uniforme técnico enfermería UGB`  
  _Enlaza a:_ `/catalogo/universidades/ugb`

### 1. Universidad — UNAB (6 artículos)

- **[ ] 15. Uniforme de Enfermería UNAB: blanco y azul marino, guía completa**  
  _Universidad:_ UNAB | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería UNAB` | _Secundarias:_ `uniforme UNAB blanco y azul marino`  
  _Enlaza a:_ `/catalogo/universidades/unab` | _Ángulo:_ Ya existe producto publicado con esta combinación exacta de colores — usarlo como referencia visual del artículo.

- **[ ] 16. Uniforme de Laboratorio Clínico UNAB: guía completa**  
  _Universidad:_ UNAB | _Carrera:_ Laboratorio Clínico | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme laboratorio clínico UNAB` | _Secundarias:_ `uniforme UNAB laboratorio`  
  _Enlaza a:_ `/catalogo/universidades/unab` | _Ángulo:_ Carrera que hoy solo ofrece la UNAB en la zona — oportunidad de ser la única referencia de búsqueda que existe.

- **[ ] 17. Uniforme de Radiología e Imágenes UNAB: guía completa**  
  _Universidad:_ UNAB | _Carrera:_ Radiología e Imágenes | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme radiología UNAB` | _Secundarias:_ `uniforme técnico rayos X UNAB`  
  _Enlaza a:_ `/catalogo/universidades/unab`

- **[ ] 18. Uniforme de Técnico en Optometría UNAB: guía completa**  
  _Universidad:_ UNAB | _Carrera:_ Técnico en Optometría | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme optometría UNAB` | _Secundarias:_ `uniforme técnico en optometría El Salvador`  
  _Enlaza a:_ `/catalogo/universidades/unab`

- **[ ] 19. Tecnólogo y Técnico en Enfermería UNAB: uniforme y diferencias con la Licenciatura**  
  _Universidad:_ UNAB | _Carrera:_ Técnico/Tecnólogo Enfermería | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `técnico en enfermería UNAB` | _Secundarias:_ `tecnólogo enfermería UNAB uniforme`  
  _Enlaza a:_ `/catalogo/universidades/unab`

- **[ ] 20. Uniforme para posgrado en Administración de Servicios de Salud UNAB**  
  _Universidad:_ UNAB | _Carrera:_ Maestría Admón. Servicios de Salud | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `maestría administración servicios de salud UNAB` | _Secundarias:_ `posgrado salud UNAB uniforme`  
  _Enlaza a:_ `/catalogo/universidades/unab` | _Ángulo:_ Público profesional en ejercicio, no estudiante de pregrado — ángulo distinto (gestión, no clínico).

### 1. Universidad — UES (11 artículos)

- **[ ] 21. Guía completa de uniformes para todas las carreras de salud de la UES en San Miguel**  
  _Universidad:_ UES | _Carrera:_ Todas (hub) | _Intención:_ Local | _Prioridad:_ Alta  
  _Keyword principal:_ `uniformes UES San Miguel` | _Secundarias:_ `uniformes FMO UES`, `uniformes universidad de El Salvador oriente`  
  _Enlaza a:_ `/catalogo/universidades/ues` | _Ángulo:_ Artículo ancla del bloque UES: debe enlazar a cada uno de los artículos de carrera específica de abajo.

- **[ ] 22. Uniforme de Enfermería UES: colores oficiales y guía completa**  
  _Universidad:_ UES | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería UES` | _Secundarias:_ `uniforme UES enfermería`  
  _Enlaza a:_ `/catalogo/universidades/ues`

- **[ ] 23. Uniforme de Doctorado en Medicina UES: guía para nuevo ingreso**  
  _Universidad:_ UES | _Carrera:_ Doctorado en Medicina | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de medicina UES` | _Secundarias:_ `uniforme doctorado medicina UES`  
  _Enlaza a:_ `/catalogo/universidades/ues`

- **[ ] 24. Uniforme de Psicología UES: guía completa**  
  _Universidad:_ UES | _Carrera:_ Psicología | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de psicología UES` | _Secundarias:_ `uniforme licenciatura psicología UES`  
  _Enlaza a:_ Producto UES Psicología ya publicado.

- **[ ] 25. Uniforme de Química y Farmacia UES: Licenciatura y Técnico en Farmacia Asistencial**  
  _Universidad:_ UES | _Carrera:_ Química y Farmacia | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de farmacia UES` | _Secundarias:_ `uniforme química y farmacia UES`, `uniforme técnico en farmacia asistencial`  
  _Enlaza a:_ 2 productos UES de farmacia ya publicados | _Ángulo:_ Cubre 2 productos reales del catálogo (Licenciatura y Técnico) en un solo artículo — evita canibalización.

- **[ ] 26. Uniforme de Optometría UES: guía completa**  
  _Universidad:_ UES | _Carrera:_ Optometría | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme optometría UES` | _Secundarias:_ `uniforme licenciatura optometría UES`  
  _Enlaza a:_ Producto UES Optometría ya publicado.

- **[ ] 27. Uniforme de Salud Ambiental UES: guía completa**  
  _Universidad:_ UES | _Carrera:_ Salud Ambiental | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme salud ambiental UES` | _Secundarias:_ `uniforme licenciatura salud ambiental UES`  
  _Enlaza a:_ Producto UES Salud Ambiental ya publicado.

- **[ ] 28. Uniforme de Salud Materno Infantil UES: guía completa**  
  _Universidad:_ UES | _Carrera:_ Salud Materno Infantil | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme salud materno infantil UES` | _Secundarias:_ `uniforme licenciatura materno infantil UES`  
  _Enlaza a:_ Producto UES Salud Materno Infantil ya publicado.

- **[ ] 29. Uniforme de Medicina Veterinaria y Zootecnia UES: Técnico y Licenciatura**  
  _Universidad:_ UES | _Carrera:_ Medicina Veterinaria y Zootecnia | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme veterinaria UES` | _Secundarias:_ `uniforme técnico veterinaria zootecnia UES`  
  _Enlaza a:_ 2 productos UES de veterinaria ya publicados | _Ángulo:_ Único programa no dirigido a salud humana del catálogo — aclarar por qué también usa scrub, ampliar el público del blog.

- **[ ] 30. Maestrías clínicas de la UES y su uniforme: Psicología Clínica, Gerontología y Jurídico Forense**  
  _Universidad:_ UES | _Carrera:_ Maestrías clínicas | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `maestría psicología clínica UES uniforme` | _Secundarias:_ `maestría gerontología clínica UES`, `maestría jurídico forense UES`  
  _Enlaza a:_ 3 productos UES de maestría ya publicados | _Ángulo:_ Agrupa 3 productos reales del catálogo en un solo artículo — público profesional en ejercicio.

- **[ ] 31. Maestrías en gestión y salud pública de la UES y su uniforme: Salud Pública, Gestión Hospitalaria y Salud Sexual y Reproductiva**  
  _Universidad:_ UES | _Carrera:_ Maestrías en gestión y salud pública | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `maestría salud pública UES uniforme` | _Secundarias:_ `maestría gestión hospitalaria UES`, `maestría salud sexual y reproductiva UES`  
  _Enlaza a:_ 3 productos UES de maestría ya publicados | _Ángulo:_ Agrupa el resto de maestrías reales del catálogo — ángulo de gestión/administración, distinto al clínico.

### 1. Universidad — UMA (1 artículo)

- **[ ] 32. Uniforme de Enfermería UMA: colores oficiales y guía de compra en San Miguel**  
  _Universidad:_ UMA | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería UMA` | _Secundarias:_ `uniforme UMA enfermería`  
  _Enlaza a:_ `/catalogo/universidades/uma` | _Ángulo:_ Único programa de salud confirmado hoy en el catálogo propio. Verificar directamente con la UMA si existe más oferta de salud antes de escribir contenido adicional para esta universidad.

### 1. Universidad — UEES (expansión) (4 artículos)

- **[ ] 33. Uniforme de Enfermería UEES: guía completa**  
  _Universidad:_ UEES | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de enfermería UEES` | _Secundarias:_ `uniforme UEES enfermería`  
  _Enlaza a:_ Catálogo de universidades (agregar UEES) | _Ángulo:_ UEES aún no está en el catálogo del sitio. Aclarar cobertura de envío: su única sede está en San Salvador, no en zona oriental.

- **[ ] 34. Uniforme de Doctorado en Medicina UEES: guía completa**  
  _Universidad:_ UEES | _Carrera:_ Doctorado en Medicina | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de medicina UEES` | _Secundarias:_ `uniforme doctorado medicina UEES`  
  _Enlaza a:_ Catálogo de universidades (agregar UEES)

- **[ ] 35. Uniforme de Nutrición y Dietética UEES: guía completa**  
  _Universidad:_ UEES | _Carrera:_ Nutrición y Dietética | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme nutrición UEES` | _Secundarias:_ `uniforme licenciatura nutrición y dietética UEES`  
  _Enlaza a:_ Catálogo de universidades (agregar UEES)

- **[ ] 36. Uniforme de Odontología UEES: Doctorado en Cirugía Dental y Técnico en Asistencia Odontológica**  
  _Universidad:_ UEES | _Carrera:_ Odontología | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme odontología UEES` | _Secundarias:_ `scrub dental UEES`  
  _Enlaza a:_ Catálogo de universidades (agregar UEES)

---

### 2. Carrera (genérico, nacional) (13 artículos)

- **[ ] 37. Uniforme de enfermería: guía completa de colores, cortes y tallas en El Salvador**  
  _Universidad:_ General | _Carrera:_ Enfermería | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme de enfermería El Salvador` | _Secundarias:_ `uniformes de enfermería`, `uniforme de enfermera`, `uniforme de enfermero`  
  _Enlaza a:_ `/catalogo/scrubs` | _Ángulo:_ Pilar principal del clúster de enfermería genérica. Debe enlazar a todos los artículos de enfermería por universidad.

- **[ ] 38. Uniforme médico para doctores y doctoras: cómo elegirlo bien**  
  _Universidad:_ General | _Carrera:_ Medicina | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme médico El Salvador` | _Secundarias:_ `uniforme de doctor`, `uniforme de doctora`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 39. Scrub dental: guía de uniformes para estudiantes y profesionales de odontología**  
  _Universidad:_ General | _Carrera:_ Odontología | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `scrub dental El Salvador` | _Secundarias:_ `uniforme de odontología`, `uniforme dental`, `uniforme de dentista`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 40. Uniforme de laboratorio clínico: qué debe tener y cómo elegirlo**  
  _Universidad:_ General | _Carrera:_ Laboratorio Clínico | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de laboratorio clínico` | _Secundarias:_ `uniforme para laboratorista El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 41. Uniforme de fisioterapia: guía de compra**  
  _Universidad:_ General | _Carrera:_ Fisioterapia | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de fisioterapia` | _Secundarias:_ `uniforme fisioterapeuta El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 42. Uniforme de nutrición y nutricionista: qué usar en consulta y hospital**  
  _Universidad:_ General | _Carrera:_ Nutrición | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de nutrición` | _Secundarias:_ `uniforme nutricionista El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 43. Uniforme de farmacia y farmacéutico: guía completa**  
  _Universidad:_ General | _Carrera:_ Farmacia | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme de farmacia` | _Secundarias:_ `uniforme farmacéutico`, `uniforme farmacéutica`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 44. Uniforme de radiología y técnico en rayos X: qué considerar**  
  _Universidad:_ General | _Carrera:_ Radiología | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme de radiología` | _Secundarias:_ `uniforme técnico en rayos X`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 45. Uniforme quirúrgico: diferencias entre la pijama de cirugía y el scrub de piso**  
  _Universidad:_ General | _Carrera:_ Quirúrgico | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme quirúrgico` | _Secundarias:_ `scrub quirúrgico`, `traje de cirugía`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 46. Uniforme de pediatría: por qué el color y el estampado importan**  
  _Universidad:_ General | _Carrera:_ Pediatría | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme de pediatría` | _Secundarias:_ `scrub de pediatra`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 47. Filipina, scrub, gabacha y bata: diferencias que debes conocer antes de comprar**  
  _Universidad:_ General | _Carrera:_ Vocabulario / educativo | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `diferencia entre filipina y scrub` | _Secundarias:_ `qué es una gabacha médica`  
  _Enlaza a:_ `/catalogo/scrubs` | _Ángulo:_ Contenido de cola larga y de vocabulario — útil para quien compra por primera vez y para captar búsquedas exploratorias.

- **[ ] 48. Uniforme médico unisex o de corte femenino y masculino: cómo elegir el ajuste correcto**  
  _Universidad:_ General | _Carrera:_ Ajuste / género | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme médico unisex` | _Secundarias:_ `uniforme de enfermera vs uniforme de enfermero`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 49. Gorro quirúrgico: para qué sirve y cómo elegir el tuyo**  
  _Universidad:_ General | _Carrera:_ Accesorios | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `gorro quirúrgico El Salvador` | _Secundarias:_ `gorro quirúrgico enfermería`  
  _Enlaza a:_ `/catalogo/accesorios` | _Ángulo:_ Apoya la categoría Accesorios, hoy con un solo producto publicado — el blog puede adelantarse a la expansión del catálogo.

---

### 3. Normativa oficial (MINSAL) (5 artículos)

- **[ ] 50. Colores de uniforme de enfermería según el MINSAL El Salvador: guía actualizada**  
  _Universidad:_ General | _Carrera:_ Enfermería | _Intención:_ Informativa | _Prioridad:_ Alta  
  _Keyword principal:_ `colores uniforme enfermería MINSAL` | _Secundarias:_ `uniforme enfermería MINSAL El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs` y `/catalogo/universidades` | _Ángulo:_ Basar en los lineamientos técnicos oficiales vigentes del MINSAL (verificar la versión más reciente antes de publicar). Mayor potencial de enlaces externos de todo el plan.

- **[ ] 51. Lineamientos del MINSAL para el uniforme del personal de salud: resumen para estudiantes y profesionales**  
  _Universidad:_ General | _Carrera:_ General | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `lineamientos MINSAL uniforme` | _Secundarias:_ `normativa uniforme salud El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 52. Uniforme según el nivel de atención: diferencias entre hospitalario y primer nivel de atención**  
  _Universidad:_ General | _Carrera:_ General | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme nivel de atención MINSAL` | _Secundarias:_ `uniforme hospitalario vs primer nivel de atención`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 53. ¿Es obligatorio el gorro quirúrgico? Normas de bioseguridad para el uniforme clínico en El Salvador**  
  _Universidad:_ General | _Carrera:_ Bioseguridad | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `uso obligatorio gorro quirúrgico` | _Secundarias:_ `bioseguridad uniforme clínico El Salvador`  
  _Enlaza a:_ `/catalogo/accesorios`

- **[ ] 54. Qué exige la ley salvadoreña sobre bioseguridad y uniforme del personal de salud**  
  _Universidad:_ General | _Carrera:_ Bioseguridad | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `ley bioseguridad uniforme salud El Salvador` | _Secundarias:_ `normativa uniforme hospitalario El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

---

### 4. Guías de compra y cuidado (13 artículos)

- **[ ] 55. Guía de tallas para uniformes médicos: cómo medirte correctamente en casa**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Informativa | _Prioridad:_ Alta  
  _Keyword principal:_ `guía de tallas uniforme médico` | _Secundarias:_ `cómo medir mi talla de scrub`  
  _Enlaza a:_ Todas las fichas de producto | _Ángulo:_ Reduce preguntas repetidas por WhatsApp sobre tallas. Enlazable desde cada ficha de producto, no solo desde el blog.

- **[ ] 56. Qué es la tela Sincatex y por qué se usa en uniformes médicos antifluidos**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Informativa | _Prioridad:_ Alta  
  _Keyword principal:_ `tela Sincatex` | _Secundarias:_ `tela antifluidos uniforme médico`  
  _Enlaza a:_ `/catalogo/scrubs` | _Ángulo:_ Refuerza el argumento de venta que ya usa el sitio ('tela médica certificada'). Convierte una palabra de marca propia en un imán de búsqueda.

- **[ ] 57. Lino Oxford o Sincatex: qué tela conviene según tu carrera**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `tela Lino Oxford uniforme médico` | _Secundarias:_ `Sincatex vs Lino Oxford`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 58. Cómo lavar y cuidar tu uniforme médico para que dure más**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `cómo lavar uniforme médico` | _Secundarias:_ `cuidado de scrubs`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 59. Cuánto dura un scrub de buena calidad: señales de que ya toca renovarlo**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `cuánto dura un scrub` | _Secundarias:_ `cuándo cambiar mi uniforme médico`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 60. Uniforme cruzado o clásico: ventajas de cada corte de filipina**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `uniforme cruzado o clásico` | _Secundarias:_ `filipina cruzada vs clásica`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 61. Pantalón jogger o pantalón recto para tu uniforme: cuál elegir según tu turno**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `pantalón jogger uniforme médico` | _Secundarias:_ `pantalón recto scrub El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 62. Cuántos uniformes necesita un estudiante de salud para el semestre**  
  _Universidad:_ General | _Carrera:_ Estudiantes | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `cuántos uniformes necesito enfermería` | _Secundarias:_ `uniformes para el semestre enfermería`  
  _Enlaza a:_ `/catalogo/universidades`

- **[ ] 63. Bordado de nombre y carrera en el uniforme: qué información incluir y por qué importa**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `bordado de nombre uniforme médico` | _Secundarias:_ `bordado de carrera uniforme universitario`  
  _Enlaza a:_ `/catalogo/universidades`

- **[ ] 64. Colores de scrubs y qué transmiten: guía para elegir el tuyo con intención**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `significado de los colores de los scrubs` | _Secundarias:_ `qué color de uniforme médico elegir`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 65. Uniforme para turnos de 12 horas: qué buscar para máxima comodidad**  
  _Universidad:_ General | _Carrera:_ Profesionales | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme médico turno de 12 horas` | _Secundarias:_ `uniforme cómodo para turnos largos`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 66. Cómo elegir tu uniforme médico si trabajas y estudias al mismo tiempo**  
  _Universidad:_ General | _Carrera:_ Estudiantes que trabajan | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme para quien trabaja y estudia salud` | _Secundarias:_ `checklist uniforme médico El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 67. Kit básico de accesorios para tu primer día de prácticas clínicas**  
  _Universidad:_ General | _Carrera:_ Estudiantes nuevo ingreso | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `kit para prácticas clínicas` | _Secundarias:_ `qué llevar el primer día de prácticas enfermería`  
  _Enlaza a:_ `/catalogo/accesorios` | _Ángulo:_ Apoya la expansión futura de la categoría Accesorios, hoy con un solo producto.

---

### 5. Local, negocio y grupos (7 artículos)

- **[ ] 68. Dónde comprar uniformes médicos en San Miguel, El Salvador**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Local | _Prioridad:_ Alta  
  _Keyword principal:_ `uniformes médicos San Miguel` | _Secundarias:_ `dónde comprar scrubs San Miguel`  
  _Enlaza a:_ Inicio / `/catalogo`

- **[ ] 69. Uniformes universitarios en la zona oriental de El Salvador: qué universidades cubrimos**  
  _Universidad:_ General | _Carrera:_ Todas | _Intención:_ Local | _Prioridad:_ Alta  
  _Keyword principal:_ `uniformes universitarios zona oriental` | _Secundarias:_ `uniformes universitarios San Miguel`  
  _Enlaza a:_ `/catalogo/universidades` | _Ángulo:_ Artículo hub que enlaza a los 6 bloques de universidad (7 con UEES) — refuerza el posicionamiento geográfico.

- **[ ] 70. Guía para delegados de sección: cómo coordinar el uniforme de todo tu grupo de carrera**  
  _Universidad:_ General | _Carrera:_ Delegados de sección | _Intención:_ Transaccional | _Prioridad:_ Media  
  _Keyword principal:_ `delegado de sección uniforme grupal` | _Secundarias:_ `precio grupal uniforme universitario`  
  _Enlaza a:_ `/catalogo/universidades` | _Ángulo:_ Ya existe un llamado a 'delegado de carrera' en el sitio — el blog refuerza ese ángulo con contenido buscable.

- **[ ] 71. Envío de uniformes médicos a todo El Salvador con pago al recibir: cómo funciona**  
  _Universidad:_ General | _Carrera:_ Envíos | _Intención:_ Transaccional | _Prioridad:_ Media  
  _Keyword principal:_ `envío uniformes médicos El Salvador` | _Secundarias:_ `pago al recibir uniformes médicos`  
  _Enlaza a:_ `/legal/envios`

- **[ ] 72. Uniformes para clínicas y hospitales de la zona oriental: pedidos institucionales**  
  _Universidad:_ General | _Carrera:_ Institucional | _Intención:_ Transaccional | _Prioridad:_ Media  
  _Keyword principal:_ `uniformes para clínicas El Salvador` | _Secundarias:_ `uniformes para hospitales San Miguel`  
  _Enlaza a:_ Inicio (sección institucional)

- **[ ] 73. Precio del bordado de escudo y nombre en uniformes médicos en San Miguel**  
  _Universidad:_ General | _Carrera:_ Bordado | _Intención:_ Transaccional | _Prioridad:_ Media  
  _Keyword principal:_ `precio bordado uniforme médico` | _Secundarias:_ `costo bordado escudo universidad`  
  _Enlaza a:_ `/servicios`

- **[ ] 74. Preguntas frecuentes antes de mandar a hacer tu uniforme universitario en San Miguel**  
  _Universidad:_ General | _Carrera:_ FAQ | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `preguntas frecuentes uniforme universitario` | _Secundarias:_ `dudas uniforme universitario San Miguel`  
  _Enlaza a:_ `/ayuda`

---

### 6. Estacional / calendario académico (6 artículos)

- **[ ] 75. Lista de uniformes y útiles para nuevo ingreso a Ciencias de la Salud**  
  _Universidad:_ General | _Carrera:_ Nuevo ingreso | _Intención:_ Informativa | _Prioridad:_ Alta  
  _Keyword principal:_ `uniforme nuevo ingreso ciencias de la salud` | _Secundarias:_ `lista de útiles enfermería nuevo ingreso`  
  _Enlaza a:_ `/catalogo/universidades` | _Ángulo:_ Republicar/actualizar cada inicio de ciclo (enero y julio) — mantiene la fecha del artículo fresca para Google.

- **[ ] 76. Cuándo comprar el uniforme antes de iniciar el ciclo académico: calendario recomendado**  
  _Universidad:_ General | _Carrera:_ Planeación | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `cuándo comprar uniforme universitario` | _Secundarias:_ `tiempo de entrega uniforme antes de clases`  
  _Enlaza a:_ `/catalogo/universidades`

- **[ ] 77. Ideas de regalo para tu graduación de enfermería o medicina**  
  _Universidad:_ General | _Carrera:_ Graduación | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `regalos graduación enfermería` | _Secundarias:_ `regalos graduación medicina El Salvador`  
  _Enlaza a:_ `/catalogo`

- **[ ] 78. Día Internacional de la Enfermera: cómo se celebra en las facultades de la zona oriental**  
  _Universidad:_ General | _Carrera:_ Día de la Enfermera | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `Día Internacional de la Enfermera El Salvador` | _Secundarias:_ `12 de mayo día de la enfermera`  
  _Enlaza a:_ `/catalogo/universidades` | _Ángulo:_ Contenido de temporada — republicar cada mayo.

- **[ ] 79. Checklist para tu primera práctica clínica: uniforme y todo lo que debes llevar**  
  _Universidad:_ General | _Carrera:_ Primera práctica | _Intención:_ Informativa | _Prioridad:_ Media  
  _Keyword principal:_ `checklist primera práctica clínica` | _Secundarias:_ `qué llevar a mi primera práctica de enfermería`  
  _Enlaza a:_ `/catalogo/accesorios`

- **[ ] 80. Uniformes para brigadas y jornadas médicas: qué usar en trabajo comunitario**  
  _Universidad:_ General | _Carrera:_ Brigadas | _Intención:_ Informativa | _Prioridad:_ Baja  
  _Keyword principal:_ `uniforme para brigadas médicas` | _Secundarias:_ `uniforme jornada de salud comunitaria`  
  _Enlaza a:_ `/catalogo/scrubs`

---

### 7. Comparativas / aspiracional (3 artículos)

- **[ ] 81. Alternativas a FIGS en El Salvador: uniformes con tela premium confeccionados en San Miguel**  
  _Universidad:_ General | _Carrera:_ Premium | _Intención:_ Comercial | _Prioridad:_ Media  
  _Keyword principal:_ `alternativas a FIGS El Salvador` | _Secundarias:_ `scrubs premium El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs` | _Ángulo:_ Capta la búsqueda de una marca aspiracional sin sugerir afiliación — dejar explícito que es una alternativa local, no un distribuidor.

- **[ ] 82. Uniformes importados o hechos en El Salvador: ventajas, precio y tiempos de entrega**  
  _Universidad:_ General | _Carrera:_ Importado vs. local | _Intención:_ Comercial | _Prioridad:_ Baja  
  _Keyword principal:_ `scrubs importados vs nacionales` | _Secundarias:_ `comprar uniforme importado o local El Salvador`  
  _Enlaza a:_ `/catalogo/scrubs`

- **[ ] 83. Cuánto cuesta un uniforme médico en El Salvador: guía de precios**  
  _Universidad:_ General | _Carrera:_ Precio | _Intención:_ Comercial | _Prioridad:_ Alta  
  _Keyword principal:_ `precio uniforme médico El Salvador` | _Secundarias:_ `cuánto cuesta un scrub en El Salvador`  
  _Enlaza a:_ `/catalogo` | _Ángulo:_ Artículo de alto volumen comercial. Comparar rangos de mercado de forma neutral, sin desprestigiar a la competencia.

---

## 6. Referencia: carreras de salud confirmadas por universidad

Ficha de trabajo para verificar antes de escribir cada bloque del pilar 1. Donde la investigación no pudo confirmar un dato con una fuente pública clara, queda dicho explícitamente en vez de asumirlo.

### UNIVO — Universidad de Oriente (slug: univo)

- Doctorado en Medicina; Licenciatura en Enfermería. Son, según la propia facultad, sus dos únicos programas de salud por ahora.
- _Sede:_ San Miguel
- _Fuente:_ `univo.edu.sv/salud` — sitio oficial de la Facultad de Ciencias de la Salud

### IEPROES — Instituto Especializado de Profesionales de la Salud (slug: ieproes)

- Lic. en Enfermería · Lic. en Psicología de la Salud · Lic. en Nutrición · Lic. en Salud Ambiental · Técnico y Tecnólogo en Enfermería · Técnico en Salud Ambiental · Maestría en Enfermería (Cuidados Intensivos, Materno Infantil).
- _Sede:_ San Miguel (además San Salvador y Santa Ana)
- _Fuente:_ `ieproes.edu.sv` — oferta académica oficial

### UGB — Universidad Gerardo Barrios (slug: ugb)

- Doctorado en Medicina · Licenciatura en Enfermería · Técnico en Enfermería. Desde 2026 además avala especialidades médicas de posgrado (Medicina Interna, Pediatría, Cirugía General, Gineco-Obstetricia) junto al Hospital Nacional San Pedro de Usulután.
- _Sede:_ San Miguel (además Usulután)
- _Fuente:_ `ugb.edu.sv`; nota de prensa El Salvador.com sobre especialidades médicas, 2026

### UNAB — Universidad Dr. Andrés Bello (slug: unab)

- Licenciatura en Enfermería · Tecnólogo y Técnico en Enfermería · Licenciatura en Laboratorio Clínico · Licenciatura en Radiología e Imágenes · Técnico en Optometría. Posgrado: Maestría en Administración de los Servicios de Salud.
- _Sede:_ San Miguel (además San Salvador, Sonsonate, Chalatenango)
- _Fuente:_ `unab.edu.sv` — primera Facultad de Enfermería de El Salvador y Centroamérica (2018)

### UES — Facultad Multidisciplinaria Oriental (slug: ues)

- Doctorado en Medicina · Enfermería · Psicología · Química y Farmacia + Técnico en Farmacia Asistencial · Optometría · Salud Ambiental · Salud Materno Infantil · Medicina Veterinaria y Zootecnia (Técnico y Licenciatura) · Maestrías en Salud Pública, Gestión Hospitalaria, Gerontología Clínica y Social, Psicología Clínica de la Comunidad, Psicología Jurídico Forense, Educación y Servicios en Salud Sexual y Reproductiva.
- _Sede:_ San Miguel
- _Fuente:_ Catálogo propio de Confecciones Liss (28 productos confirmados) + `fmoues.edu.sv`

### UMA — Universidad Modular Abierta (slug: uma)

- Licenciatura en Enfermería confirmada por catálogo propio. El resto de la oferta de salud de la sede San Miguel no se pudo confirmar con una fuente pública clara — verificar directamente con la universidad antes de crear más contenido de este bloque.
- _Sede:_ San Miguel
- _Fuente:_ Catálogo propio de Confecciones Liss; oferta académica completa pendiente de verificar

### UEES — Universidad Evangélica de El Salvador (expansión) (slug: no está en el catálogo aún)

- Doctorado en Medicina · Licenciatura en Enfermería · Técnico en Enfermería · Licenciatura en Nutrición y Dietética · Doctorado en Cirugía Dental (Odontología) · Técnico en Asistencia Odontológica. Maestrías en Salud Pública y Epidemiología.
- _Sede:_ San Salvador (sede única — NO tiene sede en zona oriental)
- _Fuente:_ `uees.edu.sv`. Mencionada en el meta description del sitio pero no en el sitemap.ts ni en el catálogo real: tratar como expansión, no como cobertura confirmada.

---

## 7. Próximos pasos recomendados

- Publicar primero los 20 artículos de Prioridad Alta — ya redactados en el documento de contenido prioritario — a un ritmo sostenible (por ejemplo 2 por semana) durante los primeros 60 a 90 días.
- Enlazar cada artículo, sin excepción, a la página de catálogo o producto que le corresponde. Un blog sin enlace interno hacia el catálogo genera tráfico que no convierte.
- Antes de publicar cada artículo, confirmar contra la ficha real del producto los datos marcados como “verificar” en este documento (colores exactos por carrera, oferta completa de UMA, versión vigente de los lineamientos del MINSAL).
- Actualizar el contenido estacional (Pilar 6) cada ciclo académico, cambiando el año y revisando fechas, para que Google siga viendo el contenido como vigente.
- Medir en Google Search Console qué palabras clave empiezan a generar impresiones antes de las 8 semanas, y usar esa señal para decidir qué artículos de Prioridad Media conviene adelantar.
- Cuando el catálogo agregue una universidad, carrera o especialidad nueva (como ya ocurrió con las especialidades médicas de la UGB), agregar su artículo correspondiente a este plan — está diseñado para crecer, no para cerrarse en 83.
- Decidir de forma explícita si se persigue la cobertura de UEES o se retira la mención del meta description del sitio — hoy el copy promete algo que el catálogo no cumple todavía.

_Documento generado a partir de auditoría directa del sitio, del repositorio en GitHub e investigación de fuentes públicas (universidades, MINSAL, panorama competitivo). Los datos marcados para verificar deben confirmarse contra la fuente oficial antes de publicarse como hecho._
