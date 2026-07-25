-- ──────────────────────────────────────────────────────────────
-- MIGRACIÓN CHAT SYSTEM (LUCAS AI CHAT)
-- ──────────────────────────────────────────────────────────────

-- Tabla de conversaciones
CREATE TABLE IF NOT EXISTS public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Nueva conversación',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'read' CHECK (status IN ('sent', 'delivered', 'read')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Políticas para chat_conversations
-- 1. Usuarios autenticados pueden ver sus propias conversaciones
CREATE POLICY "Users can view their own conversations"
ON public.chat_conversations
FOR SELECT
USING (auth.uid() = user_id);

-- 2. Usuarios autenticados pueden crear sus propias conversaciones
CREATE POLICY "Users can insert their own conversations"
ON public.chat_conversations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. Usuarios autenticados pueden actualizar (ej. cerrar o renombrar) sus propias conversaciones
CREATE POLICY "Users can update their own conversations"
ON public.chat_conversations
FOR UPDATE
USING (auth.uid() = user_id);

-- 4. Admins pueden ver todas las conversaciones
CREATE POLICY "Admins can view all conversations"
ON public.chat_conversations
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);

-- Políticas para chat_messages
-- 1. Usuarios autenticados pueden ver mensajes de sus conversaciones
CREATE POLICY "Users can view messages of their conversations"
ON public.chat_messages
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.chat_conversations
        WHERE chat_conversations.id = chat_messages.conversation_id
          AND chat_conversations.user_id = auth.uid()
    )
);

-- 2. Usuarios autenticados pueden insertar mensajes en sus conversaciones
CREATE POLICY "Users can insert messages in their conversations"
ON public.chat_messages
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chat_conversations
        WHERE chat_conversations.id = chat_messages.conversation_id
          AND chat_conversations.user_id = auth.uid()
    )
);

-- 3. Admins pueden ver todos los mensajes
CREATE POLICY "Admins can view all messages"
ON public.chat_messages
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);

-- Índices para optimizar performance de consultas
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_updated_at ON public.chat_conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at ASC);
