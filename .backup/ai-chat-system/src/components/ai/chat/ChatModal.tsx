"use client";

import React, { useState, useRef } from "react";
import { Icon } from "@/components/ui/icons/Icon";
import { useChat } from "@/context/ChatContext";
import { WelcomeScreen } from "./WelcomeScreen";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useModal } from "@/hooks/useModal";
import FocusLock from "react-focus-lock";
import { cn } from "@/lib/utils";

export function ChatModal() {
  const {
    isOpen,
    closeChat,
    queueStep,
    viewingHistoryList,
    setViewingHistoryList,
    closeActiveConversation,
  } = useChat();

  const { modalRef } = useModal({ isOpen, onClose: closeChat });
  useBodyScrollLock(isOpen);

  // Swipe-down-to-close (mobile bottom sheet)
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  const handleDragStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  const handleDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragY(delta);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY > 100) {
      setDragY(0);
      closeChat();
    } else {
      setDragY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ zIndex: 99999 }}
      className="animate-in fade-in fixed inset-0 flex w-full cursor-default items-end justify-center bg-black/30 backdrop-blur-[2px] duration-200 sm:items-center sm:bg-black/20 sm:p-4"
      onClick={closeChat}
      aria-hidden="true"
    >
      <div
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        style={{ zIndex: 100000 }}
        className="flex w-full max-w-2xl sm:max-h-[90vh]"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-modal-title"
          className="flex h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-gray-100 bg-white shadow-2xl sm:h-[650px] sm:max-h-[90vh] sm:rounded-3xl dark:border-slate-800 dark:bg-slate-900"
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.35s ease",
            opacity: Math.max(0, 1 - dragY / 350),
          }}
        >
          <FocusLock
            returnFocus
            className="flex h-full min-h-0 w-full flex-col"
          >
            {/* Drag handle - mobile only */}
            <div
              className="flex shrink-0 touch-none justify-center pt-3 pb-1 sm:hidden"
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Header del Modal */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 p-4 sm:p-5 dark:border-slate-800">
              <h2
                id="chat-modal-title"
                className="flex items-center gap-2.5 font-serif text-lg font-bold text-slate-900 sm:text-2xl dark:text-slate-100"
              >
                {viewingHistoryList ? (
                  <button
                    onClick={() => setViewingHistoryList(false)}
                    className="mr-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                    title="Volver al chat"
                  >
                    <Icon name="arrow_back" size={20} />
                  </button>
                ) : (
                  <Icon
                    name="support_agent"
                    className="text-primary"
                    size={28}
                  />
                )}
                {viewingHistoryList
                  ? "Historial de Consultas"
                  : "Asistencia y Soporte"}
              </h2>

              <div className="flex items-center gap-1">
                {queueStep === "chat" && (
                  <>
                    <button
                      onClick={() => setViewingHistoryList(!viewingHistoryList)}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800",
                        viewingHistoryList &&
                          "bg-primary/10 text-primary font-bold"
                      )}
                      title="Historial de consultas"
                    >
                      <Icon name="history" size={20} />
                    </button>
                    <button
                      onClick={closeActiveConversation}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      title="Cerrar conversación"
                    >
                      <Icon name="power_settings_new" size={20} />
                    </button>
                  </>
                )}

                <button
                  onClick={closeChat}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                  aria-label="Cerrar ventana"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-white dark:bg-slate-900">
              {queueStep !== "chat" && <WelcomeScreen queueStep={queueStep} />}

              {queueStep === "chat" &&
                (viewingHistoryList ? <ConversationList /> : <ChatWindow />)}
            </div>
          </FocusLock>
        </div>
      </div>
    </div>
  );
}
