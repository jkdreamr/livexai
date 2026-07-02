import type { NextRequest } from "next/server";

/**
 * The Builder Guide's live brain. The browser posts a short chat transcript and
 * this route relays it to a fast inference provider, streaming the reply back
 * as plain text tokens.
 *
 * Providers are tried in order. Cerebras goes first (it is the fastest
 * inference we have), then Groq as the fallback if Cerebras is missing, rate
 * limited, or erroring. Keys live only on the server, in .env.local:
 *   CEREBRAS_API_KEY, GROQ_API_KEY   (optional: CEREBRAS_MODEL, GROQ_MODEL)
 *
 * With no keys set the route answers with a short note and the header
 * X-Guide-Provider: none, so the UI can fall back to its offline script.
 */

type Msg = { role: "system" | "user" | "assistant"; content: string };

type Provider = {
  name: string;
  url: string;
  key: () => string | undefined;
  model: () => string;
};

const PROVIDERS: Provider[] = [
  {
    name: "cerebras",
    url: "https://api.cerebras.ai/v1/chat/completions",
    key: () => process.env.CEREBRAS_API_KEY,
    model: () => process.env.CEREBRAS_MODEL || "llama-3.3-70b",
  },
  {
    name: "groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: () => process.env.GROQ_API_KEY,
    model: () => process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  },
];

const enc = new TextEncoder();

function textResponse(body: string, provider: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Guide-Provider": provider,
    },
  });
}

/** Read an OpenAI-style SSE stream and re-emit only the text deltas. */
function relay(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  let buffer = "";
  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const raw of lines) {
            const line = raw.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta: string | undefined = json?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(enc.encode(delta));
            } catch {
              // keepalive or partial line, ignore
            }
          }
        }
      } catch {
        // upstream dropped, end gracefully
      }
      controller.close();
    },
  });
}

export async function POST(req: NextRequest) {
  let messages: Msg[] = [];
  let maxTokens = 400;
  let temperature = 0.6;
  try {
    const body = await req.json();
    if (Array.isArray(body?.messages)) {
      messages = body.messages
        .filter((m: Msg) => m && typeof m.content === "string" && m.role)
        .slice(-12);
    }
    if (typeof body?.maxTokens === "number") maxTokens = Math.min(body.maxTokens, 800);
    if (typeof body?.temperature === "number") temperature = body.temperature;
  } catch {
    return textResponse("Bad request.", "none", 400);
  }

  if (messages.length === 0) return textResponse("Nothing to answer.", "none", 400);

  const available = PROVIDERS.filter((p) => p.key());
  if (available.length === 0) {
    return textResponse(
      "The live model is not connected yet. Add a Cerebras or Groq API key in .env.local to switch this on.",
      "none"
    );
  }

  for (const p of available) {
    try {
      const res = await fetch(p.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${p.key()}`,
        },
        body: JSON.stringify({
          model: p.model(),
          messages,
          stream: true,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!res.ok || !res.body) {
        // Rate limited, bad key, or model error: fall through to the next one.
        continue;
      }

      return new Response(relay(res.body), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Guide-Provider": p.name,
        },
      });
    } catch {
      // Network or provider outage, try the next provider.
      continue;
    }
  }

  return textResponse("The guide could not reach a live model just now. Please try again.", "none", 502);
}
