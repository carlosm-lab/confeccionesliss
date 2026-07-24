"use client";

import { Icon } from "@/components/ui/icons/Icon";
interface MessageCardMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface MessageCardProps {
  message: MessageCardMessage;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export default function MessageCard({
  message,
  onClick,
  onDelete,
}: MessageCardProps) {
  const date = new Date(message.created_at).toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      role="button"
      tabIndex={0}
      className={`focus:ring-primary/30 cursor-pointer border-b border-slate-100 p-4 transition-colors hover:bg-slate-50 focus:ring-2 focus:outline-none dark:border-white/5 dark:hover:bg-white/5 ${!message.is_read ? "bg-primary/5 dark:bg-white/10" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Leer mensaje de ${message.name}. Asunto: ${message.subject || "Sin asunto"}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Avatar/Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${!message.is_read ? "bg-primary text-white" : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500"}`}
        >
          <Icon name={message.is_read ? "drafts" : "mail"} size={20} />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <h3
              className={`truncate font-medium ${!message.is_read ? "font-bold text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}
            >
              {message.name}{" "}
              <span className="ml-2 text-sm font-normal text-slate-500">
                &lt;{message.email}&gt;
              </span>
            </h3>
            <p className="mt-0.5 line-clamp-1 text-sm text-slate-600 dark:text-slate-400">
              <span className="mr-2 font-medium">
                {message.subject || "Sin asunto"}
              </span>
              - {message.message}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <span className="text-xs whitespace-nowrap text-slate-500">
              {date}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(message.id);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
              aria-label="Eliminar mensaje"
            >
              <Icon name="delete" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
