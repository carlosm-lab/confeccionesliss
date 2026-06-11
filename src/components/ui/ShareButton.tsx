"use client";

import { useState } from "react";

export function ShareButton() {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://www.confeccionesliss.com/links";

    // Check if navigator.clipboard is available (blocked in insecure HTTP environments)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
        return;
      } catch (err) {
        console.error("Failed to copy link via clipboard API:", err);
      }
    }

    // Fallback for insecure contexts (e.g. mobile testing on local network HTTP)
    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed"; // avoid scrolling to bottom
      textArea.style.left = "-9999px"; // hide off-screen
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      } else {
        throw new Error("execCommand copy returned false");
      }
    } catch (fallbackErr) {
      console.error("Fallback copy failed:", fallbackErr);
    }
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <button
        onClick={handleCopy}
        aria-label="Copiar enlace de esta página"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          backgroundColor: "#f5f2fb",
          border: "1px solid rgba(20,48,103,0.15)",
          color: "#143067",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.2s ease-in-out",
          outline: "none",
        }}
        className="hover:border-primary/40 focus:ring-primary/20 hover:scale-105 hover:bg-white focus:ring-2 active:scale-95"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "1.1rem" }}
        >
          share
        </span>
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#1e1e24",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            fontSize: "0.875rem",
            fontWeight: 600,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation:
              "toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: "#10b981",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            check_circle
          </span>
          <span>Enlace copiado</span>
        </div>
      )}

      {/* CSS Animation injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes toastFadeIn {
              from {
                opacity: 0;
                transform: translate(-50%, 16px);
              }
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }
          `,
        }}
      />
    </div>
  );
}
