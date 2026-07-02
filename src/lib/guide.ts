/**
 * Client side of the Builder Guide. Posts a short transcript to /api/guide and
 * streams the reply token by token. Returns which provider answered ("cerebras",
 * "groq", or "none" when no key is set) so the UI can fall back to its offline
 * script when the live model is not connected.
 */

export type GuideMsg = { role: "system" | "user" | "assistant"; content: string };

export async function streamGuide(
  messages: GuideMsg[],
  opts: {
    onToken?: (chunk: string, full: string) => void;
    signal?: AbortSignal;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<{ provider: string; text: string }> {
  let res: Response;
  try {
    res = await fetch("/api/guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        maxTokens: opts.maxTokens,
        temperature: opts.temperature,
      }),
      signal: opts.signal,
    });
  } catch {
    return { provider: "none", text: "" };
  }

  const provider = res.headers.get("X-Guide-Provider") || "none";
  if (provider === "none" || !res.body) {
    return { provider: "none", text: "" };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        text += chunk;
        opts.onToken?.(chunk, text);
      }
    }
  } catch {
    // aborted or dropped; return whatever we have
  }
  return { provider, text };
}
