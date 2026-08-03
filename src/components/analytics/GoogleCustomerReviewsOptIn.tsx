"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface GoogleCustomerReviewsOptInProps {
  merchantId?: number;
  orderId: string;
  email: string;
  deliveryCountry?: string;
  estimatedDeliveryDate: string; // YYYY-MM-DD
  products?: Array<{ gtin: string }>;
}

export function GoogleCustomerReviewsOptIn({
  merchantId = 5773588467,
  orderId,
  email,
  deliveryCountry = "SV",
  estimatedDeliveryDate,
  products,
}: GoogleCustomerReviewsOptInProps) {
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (!orderId || !email || !estimatedDeliveryDate) {
      return;
    }

    const renderSurvey = () => {
      if (window.gapi) {
        window.gapi.load("surveyoptin", () => {
          if (window.gapi?.surveyoptin?.render) {
            const config: Record<string, unknown> = {
              merchant_id: Number(merchantId),
              order_id: String(orderId),
              email: String(email),
              delivery_country: String(deliveryCountry),
              estimated_delivery_date: String(estimatedDeliveryDate),
            };

            if (products && products.length > 0) {
              config.products = products;
            }

            try {
              window.gapi.surveyoptin.render(config);
              isRenderedRef.current = true;
            } catch (err) {
              console.error(
                "[GoogleCustomerReviewsOptIn] Error de renderizado:",
                err
              );
            }
          }
        });
      }
    };

    // Asignar función global que llamará platform.js?onload=renderOptIn
    window.renderOptIn = renderSurvey;

    // Si gapi ya fue cargado por una navegación previa en SPA
    if (window.gapi && typeof window.renderOptIn === "function") {
      renderSurvey();
    }
  }, [
    merchantId,
    orderId,
    email,
    deliveryCountry,
    estimatedDeliveryDate,
    products,
  ]);

  if (!orderId || !email || !estimatedDeliveryDate) {
    return null;
  }

  return (
    <Script
      id="google-customer-reviews-opt-in"
      src="https://apis.google.com/js/platform.js?onload=renderOptIn"
      strategy="afterInteractive"
    />
  );
}
