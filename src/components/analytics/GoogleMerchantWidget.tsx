"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export interface GoogleMerchantWidgetProps {
  merchantId?: number;
  position?:
    | "BOTTOM_RIGHT"
    | "BOTTOM_LEFT"
    | "CENTER_LINE"
    | "USER_DEFINED"
    | string;
  region?: string;
}

export function GoogleMerchantWidget({
  merchantId = 5773588467,
  position = "BOTTOM_RIGHT",
  region = "SV",
}: GoogleMerchantWidgetProps) {
  const isStartedRef = useRef(false);

  useEffect(() => {
    const startWidget = () => {
      if (window.merchantwidget && !isStartedRef.current) {
        try {
          window.merchantwidget.start({
            merchant_id: Number(merchantId),
            ...(position ? { position } : {}),
            ...(region ? { region } : {}),
          });
          isStartedRef.current = true;
        } catch (err) {
          console.error(
            "[GoogleMerchantWidget] Error al iniciar merchantwidget:",
            err
          );
        }
      }
    };

    if (window.merchantwidget) {
      startWidget();
    }
  }, [merchantId, position, region]);

  const handleScriptLoad = () => {
    if (window.merchantwidget && !isStartedRef.current) {
      try {
        window.merchantwidget.start({
          merchant_id: Number(merchantId),
          ...(position ? { position } : {}),
          ...(region ? { region } : {}),
        });
        isStartedRef.current = true;
      } catch (err) {
        console.error(
          "[GoogleMerchantWidget] Error al iniciar merchantwidget tras carga:",
          err
        );
      }
    }
  };

  return (
    <Script
      id="merchantWidgetScript"
      src="https://www.gstatic.com/shopping/merchant/merchantwidget.js"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
    />
  );
}
