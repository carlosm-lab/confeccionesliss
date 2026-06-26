"use client";

import { ServicioBordadosDetalle } from "./ServicioBordadosDetalle";
import { ServicioSublimacionDetalle } from "./ServicioSublimacionDetalle";
import { ServicioSastreriaDetalle } from "./ServicioSastreriaDetalle";
import { ServicioManoObraDetalle } from "./ServicioManoObraDetalle";
import { ServicioRopaCasualDetalle } from "./ServicioRopaCasualDetalle";
import { ServicioDetalleGeneric } from "./ServicioDetalleGeneric";

interface ServiceSection {
  heading: string;
  body: string;
}

interface ServicePage {
  slug: string;
  navLabel: string;
  navIcon: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  cardDescription: string;
  heroGradient: string;
  heroFeatures: { icon: string; text: string }[];
  ctaBanner: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
  cardImage: string;
  sections: ServiceSection[];
  faqs: { question: string; answer: string }[];
}

interface ServicioDetallePageProps {
  service: ServicePage;
}

export function ServicioDetallePage({ service }: ServicioDetallePageProps) {
  if (service.slug === "bordados-personalizados") {
    return <ServicioBordadosDetalle />;
  }

  if (service.slug === "sublimacion-deportiva") {
    return <ServicioSublimacionDetalle />;
  }

  if (service.slug === "confeccion-a-medida") {
    return <ServicioSastreriaDetalle />;
  }

  if (service.slug === "mano-de-obra") {
    return <ServicioManoObraDetalle />;
  }

  if (service.slug === "ropa-general") {
    return <ServicioRopaCasualDetalle />;
  }

  return <ServicioDetalleGeneric service={service} />;
}
