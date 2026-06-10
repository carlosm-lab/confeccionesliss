// SERVER COMPONENT — sin "use client", sin JavaScript en el navegador
// Los links son <a> puros: el navegador maneja el deep-link nativo.

import Image from "next/image";
import { ShareButton } from "@/components/ui/ShareButton";

interface LinkItem {
  id: string;
  svgPath: string;
  label: string;
  sublabel: string;
  href: string;
  color: string;
}

const socialLinks: LinkItem[] = [
  {
    id: "whatsapp",
    svgPath:
      "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    label: "WhatsApp",
    sublabel: "Info & Ventas",
    href: "https://wa.me/50373317181",
    color: "#25D366",
  },
  {
    id: "website",
    svgPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    label: "Página web",
    sublabel: "Catálogo y Compras",
    href: "https://www.confeccionesliss.com/",
    color: "#4c55b6",
  },
  {
    id: "facebook-page",
    svgPath:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    label: "Página de Facebook",
    sublabel: "Comunidad e interacción",
    href: "https://www.facebook.com/confeccionliss",
    color: "#1877F2",
  },
  {
    id: "facebook-admin",
    svgPath:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    label: "Perfil de Facebook",
    sublabel: "Administración y difusión",
    href: "https://web.facebook.com/confeccionliss.admin/",
    color: "#1877F2",
  },
  {
    id: "instagram",
    svgPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    label: "Instagram",
    sublabel: "Identidad & Servicios",
    href: "https://www.instagram.com/confeccionliss",
    color: "#E1306C",
  },
  {
    id: "tiktok",
    svgPath:
      "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    label: "TikTok",
    sublabel: "Creatividad & Alcance",
    href: "https://www.tiktok.com/@confeccionliss",
    color: "#010101",
  },
  {
    id: "threads",
    svgPath:
      "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",
    label: "Threads",
    sublabel: "Noticias & novedades",
    href: "https://www.threads.net/@confeccionliss",
    color: "#010101",
  },
  {
    id: "twitter",
    svgPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.847L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
    label: "X (Twitter)",
    sublabel: "Info. & Actualizaciones",
    href: "https://x.com/confeccionliss",
    color: "#010101",
  },
  {
    id: "youtube",
    svgPath:
      "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    label: "YouTube",
    sublabel: "De todo un poco",
    href: "https://www.youtube.com/@confeccionliss",
    color: "#FF0000",
  },
  {
    id: "linkedin",
    svgPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    label: "LinkedIn",
    sublabel: "Red Profesional",
    href: "https://www.linkedin.com/company/confeccionliss",
    color: "#0077B5",
  },
  {
    id: "pinterest",
    svgPath:
      "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z",
    label: "Pinterest",
    sublabel: "Inspiración",
    href: "https://www.pinterest.com/confeccionliss",
    color: "#E60023",
  },
  {
    id: "marketplace",
    svgPath:
      "M11.985 0C5.365 0 0 5.4 0 12.064c0 6.028 4.388 11.022 10.133 11.902V15.58H7.09v-3.516h3.042v-2.68c0-3.027 1.79-4.698 4.537-4.698 1.312 0 2.684.236 2.684.236v2.971H15.83c-1.489 0-1.953.932-1.953 1.887v2.284h3.325l-.53 3.516h-2.795v8.386C19.607 23.081 24 18.088 24 12.064 24 5.4 18.602 0 11.985 0z",
    label: "MarketPlace",
    sublabel: "Catálogo Facebook",
    href: "https://web.facebook.com/marketplace/profile/61556619779863/",
    color: "#1877F2",
  },
  {
    id: "maps",
    svgPath:
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    label: "Ubicación",
    sublabel: "Visítanos",
    href: "https://maps.app.goo.gl/UmJdZgoYD7pgC88GA",
    color: "#EA4335",
  },
];

export function LinksPageClient() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(180deg, #fbf8fe 0%, #efecf6 100%)",
        backgroundAttachment: "fixed",
        padding: "0",
        margin: "0",
        fontFamily: "inherit",
      }}
    >
      {/* Overrides and Responsive styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Cancel layout padding bottom on links page to prevent white gap */
            #main-content {
              padding-bottom: 0 !important;
            }

            /* Default mobile styling */
            #links-main {
              width: 100%;
              max-width: 480px;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 2rem 1.25rem 2rem !important;
              box-sizing: border-box;
              margin: 0 auto !important;
              background-color: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }

            .desktop-dashed-border {
              display: none;
            }

            /* Tablet/Desktop card container */
            @media (min-width: 540px) {
              #links-main {
                background-color: #ffffff !important;
                border: 1px solid rgba(20, 48, 103, 0.35) !important;
                border-radius: 1rem !important;
                box-shadow: 0 0 25px 6px rgba(20, 48, 103, 0.15), 0 0 10px 2px rgba(20, 48, 103, 0.1) !important;
                padding: 2rem 2.5rem !important;
                margin-top: 2rem !important;
                margin-bottom: 2rem !important;
                position: relative !important;
              }
              .desktop-dashed-border {
                display: block !important;
              }
            }
          `,
        }}
      />

      <main id="links-main">
        {/* Marco de bordes punteados (solo en Desktop, igual al del Hero) */}
        <div className="desktop-dashed-border border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
        {/* Profile Section */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "2rem",
          }}
          aria-label="Perfil de Confecciones Liss"
        >
          {/* Avatar */}
          <div
            style={{
              width: "8rem",
              height: "8rem",
              borderRadius: "50%",
              padding: "3px",
              background: "linear-gradient(135deg, #4c55b6 0%, #8c95fb 100%)",
              boxShadow: "0 8px 32px rgba(76,85,182,0.25)",
              marginBottom: "1.25rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#fff",
                border: "3px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo de Confecciones Liss"
                width={150}
                height={150}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "8px",
                }}
                priority
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              margin: "0 0 0.5rem",
            }}
          >
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#32323b",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Confecciones Liss
            </h1>
            <ShareButton />
          </div>
          <p
            style={{
              color: "#5f5e68",
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: "20rem",
              margin: 0,
              fontSize: "0.9rem",
            }}
          >
            Scrubs médicos y Uniformes universitarios en San Miguel &bull; Por
            talla o a la medida &bull; Envíos a todo el País &bull; Paga al
            recibir.
          </p>
        </section>

        {/* Social Links */}
        <nav
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
          }}
          aria-label="Canales y redes sociales"
        >
          {socialLinks.map((link) => (
            <a
              key={link.id}
              id={`link-${link.id}`}
              href={link.href}
              aria-label={`${link.label} — ${link.sublabel}`}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
                background: "#ffffff",
                borderRadius: "3rem",
                boxShadow:
                  "0 0 25px 6px rgba(20,48,103,0.12),0 0 10px 2px rgba(20,48,103,0.08)",
                border: "1px solid rgba(20,48,103,0.18)",
                textDecoration: "none",
                color: "inherit",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                }}
              >
                {/* Icon bubble */}
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    minWidth: "2.75rem",
                    borderRadius: "50%",
                    background: "#f5f2fb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      fill: link.color,
                      flexShrink: 0,
                    }}
                  >
                    <path d={link.svgPath} />
                  </svg>
                </div>

                {/* Text */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: "#32323b",
                      fontSize: "0.9375rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#5f5e68",
                      textTransform: "uppercase",
                      lineHeight: 1.4,
                    }}
                  >
                    {link.sublabel}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{
                  width: "1rem",
                  height: "1rem",
                  fill: "#b2b1bc",
                  flexShrink: 0,
                  marginLeft: "0.5rem",
                }}
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </a>
          ))}
        </nav>
      </main>
    </div>
  );
}
