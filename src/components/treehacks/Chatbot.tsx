"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { Typewriter } from "@/components/skiper/Typewriter";
import { streamGuide, type GuideMsg } from "@/lib/guide";

type Msg = { id: number; from: "you" | "guide"; text: string; live?: boolean };

function systemPrompt(context: string) {
  return (
    "You are the LiveX Builder Guide, a warm, concise on-site assistant at TreeHacks, " +
    "a large student hackathon at Stanford University. You help builders check in, learn " +
    "about sponsors, and find events. " +
    (context ? `Current topic: ${context}. ` : "") +
    "Answer in two or three short sentences. Be concrete and friendly. Never use em dashes. " +
    "If you are unsure of a real detail, say what you would do rather than inventing specifics."
  );
}

/**
 * The guide's chat. It streams real answers from the live model (Cerebras or
 * Groq) when a key is connected, and falls back to a short offline script when
 * it is not, so the demo always responds.
 */
export function Chatbot({
  context,
  placeholder = "Ask the guide anything",
  seed,
  onActivity,
}: {
  context: string;
  placeholder?: string;
  seed?: string;
  onActivity?: (talking: boolean) => void;
}) {
  const [messages, setMessages] = useState<Msg[]>(
    seed ? [{ id: 0, from: "guide", text: seed }] : []
  );
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [live, setLive] = useState<boolean | null>(null);
  const idRef = useRef(1);
  const busyRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollDown = () =>
    window.setTimeout(() => listRef.current?.scrollTo({ top: 99999, behavior: "smooth" }), 40);

  // Offline script, used only when no model is connected.
  const cannedReply = (question: string) => {
    const q = question.trim().toLowerCase();
    if (q.includes("team") || q.includes("find")) {
      return `Team finding runs off the ${context} floor. With a model connected I can match you to open teams by interest. For now, the wall by the main stage is the fastest way in.`;
    }
    if (q.includes("prize") || q.includes("track")) {
      return `Ask me about a specific sponsor and I will walk through their track and prize. Connect a key and I will rank them against what you want to build.`;
    }
    return `Good question about ${context}. Connect a Cerebras or Groq key and I answer live. Right now I can point you to the right place and remember it for later.`;
  };

  const send = async () => {
    const text = draft.trim();
    if (!text || busyRef.current) return;
    busyRef.current = true;

    const userMsg: Msg = { id: idRef.current++, from: "you", text };
    const history = [...messages, userMsg];
    setMessages(history);
    setDraft("");
    setThinking(true);
    setStreaming("");
    onActivity?.(true);
    scrollDown();

    const apiMessages: GuideMsg[] = [
      { role: "system", content: systemPrompt(context) },
      ...history.map((m) => ({
        role: (m.from === "you" ? "user" : "assistant") as GuideMsg["role"],
        content: m.text,
      })),
    ];

    let first = true;
    const { provider, text: full } = await streamGuide(apiMessages, {
      maxTokens: 320,
      onToken: (_chunk, fullText) => {
        if (first) {
          first = false;
          setThinking(false);
        }
        setStreaming(fullText);
        scrollDown();
      },
    });

    const isLive = provider !== "none" && full.trim().length > 0;
    const finalText = isLive ? full.trim() : cannedReply(text);
    setLive(isLive);
    setStreaming("");
    setThinking(false);
    setMessages((m) => [...m, { id: idRef.current++, from: "guide", text: finalText, live: isLive }]);
    scrollDown();
    window.setTimeout(() => onActivity?.(false), 250);
    busyRef.current = false;
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto pr-1" style={{ maxHeight: 200 }}>
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: ease.out }}
              className={cn("flex", m.from === "you" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-[0.8rem] leading-relaxed",
                  m.from === "you"
                    ? "bg-brand/15 text-ink"
                    : "border border-line bg-white/[0.03] text-ink-soft"
                )}
              >
                {m.from === "guide" && !m.live ? (
                  <Typewriter texts={[m.text]} typingSpeed={12} loop={false} />
                ) : (
                  m.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {streaming && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl border border-line bg-white/[0.03] px-3 py-2 text-[0.8rem] leading-relaxed text-ink-soft">
              {streaming}
              <motion.span
                aria-hidden
                className="ml-0.5 inline-block h-3 w-[3px] translate-y-[1px] rounded-[1px] bg-brand"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              />
            </div>
          </div>
        )}

        {thinking && !streaming && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl border border-line bg-white/[0.03] px-3 py-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-ink-dim"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={placeholder}
          className="cursor-target flex-1 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-brand/50"
        />
        <button
          type="button"
          onClick={send}
          aria-label="Send"
          className="cursor-target grid size-9 shrink-0 place-items-center rounded-full bg-brand text-void transition-transform active:scale-90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4z" />
          </svg>
        </button>
      </div>
      <p className="mt-2 text-center label-tight text-ink-faint">
        {live ? "Live model connected" : "Connect a Cerebras or Groq key for live answers"}
      </p>
    </div>
  );
}
