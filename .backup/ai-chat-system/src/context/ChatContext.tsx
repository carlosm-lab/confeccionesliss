"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

export interface ChatMessage {
  id: string;
  conversation_id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  status: "sent" | "delivered" | "read";
  created_at: string;
}

export interface ChatConversation {
  id: string;
  user_id: string;
  title: string;
  status: "active" | "closed";
  created_at: string;
  updated_at: string;
}

export type QueueStep =
  | "searching" // Step 1: Buscando agente...
  | "queue_position_2" // Step 2: Turno #2
  | "queue_position_1" // Step 3: Turno #1
  | "assigning" // Step 4: Asignando agente...
  | "assigned" // Step 5: ¡Se te ha asignado a Lucas!
  | "chat"; // Step 6: Chat activo

interface ChatContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  activeConversationId: string | null;
  conversations: ChatConversation[];
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
  queueStep: QueueStep;
  unreadCount: number;
  viewingHistoryList: boolean;
  setViewingHistoryList: (show: boolean) => void;
  fetchConversations: () => Promise<void>;
  selectConversation: (id: string) => Promise<void>;
  startNewConversation: () => Promise<string | null>;
  sendMessage: (text: string) => Promise<void>;
  closeActiveConversation: () => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [queueStep, setQueueStep] = useState<QueueStep>("searching");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [viewingHistoryList, setViewingHistoryList] = useState(false);

  const supabase = getSupabaseClient();

  const fetchConversations = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setConversations(data as ChatConversation[]);
      }
    } catch (err) {
      console.error("[ChatContext] Error fetching conversations:", err);
    }
  }, [supabase]);

  const selectConversation = useCallback(
    async (id: string) => {
      try {
        setActiveConversationId(id);
        setViewingHistoryList(false);
        setQueueStep("chat");
        setHasCompletedOnboarding(true);

        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("conversation_id", id)
          .order("created_at", { ascending: true });

        if (!error && data) {
          setMessages(data as ChatMessage[]);
        }
      } catch (err) {
        console.error("[ChatContext] Error selecting conversation:", err);
      }
    },
    [supabase]
  );

  const startNewConversation = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const nowIso = new Date().toISOString();

      if (!user) {
        const guestId = `guest_conv_${Date.now()}`;
        const guestConv: ChatConversation = {
          id: guestId,
          user_id: "guest",
          title: "Consulta de Asistencia y Soporte",
          status: "active",
          created_at: nowIso,
          updated_at: nowIso,
        };

        setConversations((prev) => [guestConv, ...prev]);
        setActiveConversationId(guestId);
        setMessages([]);
        setViewingHistoryList(false);
        return guestId;
      }

      const { data, error } = await supabase
        .from("chat_conversations")
        .insert([
          { user_id: user.id, title: "Consulta de Asistencia y Soporte" },
        ])
        .select()
        .single();

      if (error || !data) {
        const guestId = `conv_${Date.now()}`;
        setActiveConversationId(guestId);
        setMessages([]);
        return guestId;
      }

      const newConv = data as ChatConversation;
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      setMessages([]);
      setViewingHistoryList(false);

      return newConv.id;
    } catch (err) {
      const fallbackId = `conv_${Date.now()}`;
      setActiveConversationId(fallbackId);
      setMessages([]);
      return fallbackId;
    }
  }, [supabase]);

  // Secuencia realista de cola (~50 segundos total) — SOLO SE EJECUTA LA PRIMERA VEZ
  const runOnboardingSequence = useCallback(() => {
    setQueueStep("searching");

    // 0s - 12s: Buscando agente...
    const t1 = setTimeout(() => {
      setQueueStep("queue_position_2");
    }, 12000);

    // 12s - 27s: Turno #2 en la lista
    const t2 = setTimeout(() => {
      setQueueStep("queue_position_1");
    }, 27000);

    // 27s - 39s: Turno #1 en la lista
    const t3 = setTimeout(() => {
      setQueueStep("assigning");
    }, 39000);

    // 39s - 47s: Asignando agente...
    const t4 = setTimeout(() => {
      setQueueStep("assigned");
    }, 47000);

    // 47s: Pasa al chat e inicia la animación de escribiendo de Lucas (3.5s)
    const t5 = setTimeout(async () => {
      setQueueStep("chat");
      setHasCompletedOnboarding(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: activeConvs } = await supabase
          .from("chat_conversations")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .order("updated_at", { ascending: false })
          .limit(1);

        if (activeConvs && activeConvs.length > 0) {
          await selectConversation(activeConvs[0].id);
          return;
        }
      }

      const convId = await startNewConversation();

      // Animación de typing inicial de Lucas (3.5 segundos escribiendo)
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const nowIso = new Date().toISOString();
        const welcomeContent =
          "¡Hola! 👋 Bienvenido al Centro de Asistencia y Soporte de Confecciones Liss. Soy Lucas, tu ejecutivo de atención. ¿En qué te puedo ayudar hoy? Puedes preguntarme sobre productos, precios, políticas de envío, garantía o cotizaciones a la medida.";

        const welcomeMsg: ChatMessage = {
          id: `welcome_${Date.now()}`,
          conversation_id: convId || "guest",
          role: "assistant",
          content: welcomeContent,
          status: "read",
          created_at: nowIso,
        };

        setMessages([welcomeMsg]);

        if (user && convId && !convId.startsWith("guest_")) {
          supabase.from("chat_messages").insert([
            {
              conversation_id: convId,
              role: "assistant",
              content: welcomeContent,
              status: "read",
            },
          ]);
        }
      }, 3500);
    }, 50000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [supabase, selectConversation, startNewConversation]);

  // Abrir modal de chat — NUNCA reinicia la conversación si ya se realizó el onboarding o hay mensajes
  const openChat = useCallback(async () => {
    setIsOpen(true);
    setUnreadCount(0);

    // Si ya completó la cola o ya hay mensajes / conversación activa, permanecer en chat
    if (
      hasCompletedOnboarding ||
      messages.length > 0 ||
      activeConversationId !== null
    ) {
      setQueueStep("chat");
      return;
    }

    // Solo correr el onboarding si es la primera vez que abre el chat en esta sesión
    runOnboardingSequence();
    fetchConversations();
  }, [
    hasCompletedOnboarding,
    messages.length,
    activeConversationId,
    runOnboardingSequence,
    fetchConversations,
  ]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [isOpen, closeChat, openChat]);

  // Enviar mensaje con animación de escribiendo prolongada (2.5s) antes de la respuesta
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      let convId = activeConversationId;
      if (!convId) {
        convId = await startNewConversation();
        if (!convId) return;
      }

      const tempUserMsgId = `temp_user_${Date.now()}`;
      const nowIso = new Date().toISOString();

      const userMsg: ChatMessage = {
        id: tempUserMsgId,
        conversation_id: convId,
        role: "user",
        content,
        status: "sent",
        created_at: nowIso,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempUserMsgId ? { ...m, status: "delivered" } : m
          )
        );
      }, 500);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && !convId.startsWith("guest_")) {
          await supabase.from("chat_messages").insert([
            {
              conversation_id: convId,
              role: "user",
              content,
              status: "read",
            },
          ]);

          if (messages.length <= 1) {
            const autoTitle =
              content.slice(0, 35) + (content.length > 35 ? "..." : "");
            await supabase
              .from("chat_conversations")
              .update({ title: autoTitle, updated_at: nowIso })
              .eq("id", convId);

            setConversations((prev) =>
              prev.map((c) =>
                c.id === convId
                  ? { ...c, title: autoTitle, updated_at: nowIso }
                  : c
              )
            );
          }
        }
      } catch (err) {
        console.error("[ChatContext] DB save error:", err);
      }

      const historyForApi = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Esperar 2.5 segundos con la animación "Lucas está escribiendo..." para realismo humano
      await new Promise((res) => setTimeout(res, 2500));

      const assistantMsgId = `temp_assistant_${Date.now()}`;
      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          conversation_id: convId!,
          role: "assistant",
          content: "",
          status: "read",
          created_at: new Date().toISOString(),
        },
      ]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: convId,
            messages: historyForApi,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(
            errData.error || "Error al conectar con el asistente."
          );
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        setIsTyping(false);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempUserMsgId ? { ...m, status: "read" } : m
          )
        );

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && assistantContent && !convId.startsWith("guest_")) {
          await supabase.from("chat_messages").insert([
            {
              conversation_id: convId,
              role: "assistant",
              content: assistantContent,
              status: "read",
            },
          ]);
        }
      } catch (err: any) {
        console.error("[ChatContext] Error streaming response:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content:
                    err.message ||
                    "Disculpa, hubo un inconveniente al procesar tu respuesta. Por favor intenta de nuevo.",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    },
    [activeConversationId, messages, isLoading, supabase, startNewConversation]
  );

  const closeActiveConversation = useCallback(async () => {
    if (!activeConversationId) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && !activeConversationId.startsWith("guest_")) {
        await supabase
          .from("chat_conversations")
          .update({ status: "closed", updated_at: new Date().toISOString() })
          .eq("id", activeConversationId);
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId ? { ...c, status: "closed" } : c
        )
      );

      const closeNotice: ChatMessage = {
        id: `sys_${Date.now()}`,
        conversation_id: activeConversationId,
        role: "system",
        content:
          "Conversación finalizada. Gracias por comunicarte con el Centro de Asistencia y Soporte de Confecciones Liss.",
        status: "read",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, closeNotice]);
      setHasCompletedOnboarding(false);
    } catch (err) {
      console.error("[ChatContext] Error closing conversation:", err);
    }
  }, [activeConversationId, supabase]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: unknown, session: any) => {
      if (session?.user) {
        fetchConversations();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchConversations]);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        toggleChat,
        activeConversationId,
        conversations,
        messages,
        isLoading,
        isTyping,
        queueStep,
        unreadCount,
        viewingHistoryList,
        setViewingHistoryList,
        fetchConversations,
        selectConversation,
        startNewConversation,
        sendMessage,
        closeActiveConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    return {
      isOpen: false,
      openChat: () => {},
      closeChat: () => {},
      toggleChat: () => {},
      activeConversationId: null,
      conversations: [],
      messages: [],
      isLoading: false,
      isTyping: false,
      queueStep: "searching" as QueueStep,
      unreadCount: 0,
      viewingHistoryList: false,
      setViewingHistoryList: () => {},
      fetchConversations: async () => {},
      selectConversation: async () => {},
      startNewConversation: async () => null,
      sendMessage: async () => {},
      closeActiveConversation: async () => {},
    };
  }
  return context;
}
