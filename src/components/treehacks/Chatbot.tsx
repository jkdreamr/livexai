"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { Typewriter } from "@/components/skiper/Typewriter";

type Msg = { id: number; from: "you" | "guide"; text: string };

/**
 * A simulated assistant chat. Replies are canned prototype text (real answers
 * arrive once the team connects API keys). The guide "types" its reply.
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
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);

  const reply = (question: string) => {
    const q = question.trim().toLowerCase();
    if (q.includes("team") || q.includes("find")) {
      return `Team finding runs off the ${context} floor. Once my API keys are live I can match you to open teams by interest. For now, the wall by the main stage is the fastest way in.`;
    }
    if (q.includes("prize") || q.includes("track")) {
      return `I can walk through tracks and prizes here. With live data connected I will rank them against what you want to build. Ask me about a specific sponsor and I will pull their details.`;
    }
    return `Good question about ${context}. I answer live once the team connects my API keys. Right now I can point you to the right place and remember it for later.`;
  };

  const send = () => {
    const text = draft.trim();
    if (!text || thinking) return;
    const userMsg: Msg = { id: idRef.current++, from: "you", text };
    setMessages((m) => [...m, userMsg]);
    setDraft("");
    setThinking(true);
    onActivity?.(true);
    window.setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        { id: idRef.current++, from: "guide", text: reply(text) },
      ]);
      window.setTimeout(() => {
        onActivity?.(false);
        listRef.current?.scrollTo({ top: 99999 });
      }, 300);
    }, 700);
  };

  return (
    <div className="flex h-full flex-col">
      <div
        ref={listRef}
        className="flex-1 space-y-2.5 overflow-y-auto pr-1"
        style={{ maxHeight: 200 }}
      >
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
                {m.from === "guide" ? (
                  <Typewriter texts={[m.text]} typingSpeed={12} loop={false} />
                ) : (
                  m.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {thinking && (
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
        Prototype. Live answers once API keys are connected.
      </p>
    </div>
  );
}
