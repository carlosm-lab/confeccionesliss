import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { groq, getLucasSystemPrompt } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        {
          error:
            "El cuerpo de la solicitud debe contener un arreglo 'messages'.",
        },
        { status: 400 }
      );
    }

    const { messages } = body;

    const userName = user
      ? user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        null
      : null;

    const systemMessage = {
      role: "system" as const,
      content: getLucasSystemPrompt(userName),
    };

    // Últimos 4 mensajes recortados a 400 caracteres cada uno (~300 tokens de historial)
    const recentMessages = messages
      .slice(-4)
      .map((m: { role: string; content: string }) => ({
        role:
          m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: String(m.content).slice(0, 400),
      }));

    const fullMessages = [systemMessage, ...recentMessages];

    let stream;
    // Intentar llama-3.1-8b-instant primero (ultra rápido y con alto límite diario de tokens)
    try {
      stream = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: fullMessages,
        temperature: 0.7,
        max_completion_tokens: 350,
        top_p: 0.9,
        stream: true,
      });
    } catch (modelErr: any) {
      console.warn(
        "[/api/chat] Fallback a llama-3.3-70b-versatile:",
        modelErr?.message
      );
      stream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: fullMessages,
        temperature: 0.7,
        max_completion_tokens: 350,
        top_p: 0.9,
        stream: true,
      });
    }

    const encoder = new TextEncoder();

    const customStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("[/api/chat] Error en el stream de Groq:", err);
          controller.error(err);
        }
      },
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error(
      "[/api/chat] Error procesando la petición:",
      error?.message || error
    );

    if (
      error?.status === 401 ||
      error?.message?.includes("API key") ||
      error?.message?.includes("invalid_api_key")
    ) {
      return NextResponse.json(
        {
          error:
            "El servicio de IA no está configurado aún (GROQ_API_KEY no válida). Por favor asigna tu GROQ_API_KEY.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Ocurrió un error al procesar el mensaje con Lucas." },
      { status: 500 }
    );
  }
}
