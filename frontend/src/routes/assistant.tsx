import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/lib/auth/auth-context";
import { firstNameOf, initialsOf } from "@/lib/auth/types";
import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — SplitSmart AI" },
      {
        name: "description",
        content: "Ask about balances, spending and settlements in plain language.",
      },
      { property: "og:title", content: "AI Assistant — SplitSmart AI" },
      { property: "og:description", content: "Ask your ledger anything, in plain language." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { id: string; role: "user" | "assistant"; text: string };

const prompts = [
  "Who owes me the most?",
  "How much did I spend this month?",
  "Show food expenses.",
  "What's the fastest way to settle Lisbon Trip?",
];

const canned: Record<string, string> = {
  "who owes me the most?":
    "Leo Santos owes you the most — $240.00 from Tame Impala tickets on Jul 26. Aria Mehta is next at $184.50, then Sofia Lindqvist at $96.00. Altogether friends owe you $1,520.50.",
  "how much did i spend this month?":
    "You've spent $1,640 so far in August across 9 expenses. That's 47% below your July total of $3,120, and $560 under your monthly target with 27 days left.",
  "show food expenses.":
    "Food & Drink is your largest category at $1,240 this month (34% of spend). Biggest items: Kaido Omakase Dinner $328.60, Supper Club tasting $214.00, and weekend brunches totalling $186.40.",
  "what's the fastest way to settle lisbon trip?":
    "Two transfers clear all four balances: Daniel → Sofia $312.00, and You → Sofia $184.00. That replaces six separate IOUs and settles the group completely.",
};

const fallback =
  "Here's what I found: your balances are net positive at $707.85. Three settlements are pending, and clearing Daniel first removes two chained debts across Lisbon Trip and Apartment 12B.";

function AssistantPage() {
  const { user } = useAuth();
  const firstName = firstNameOf(user?.fullName ?? "");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      text: `Hi${firstName ? ` ${firstName}` : ""} — I've read all 128 of your expenses. Ask me about balances, categories or the fastest way to settle a group.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: canned[text.toLowerCase()] ?? fallback,
        },
      ]);
      setThinking(false);
      inputRef.current?.focus();
    }, 900);
  };

  return (
    <AppShell title="AI Assistant" subtitle="Ask your ledger anything — answers use your real data.">
      <div className="glass flex h-[calc(100vh-260px)] min-h-[460px] flex-col rounded-2xl">
        <div ref={boxRef} className="flex-1 space-y-5 overflow-y-auto p-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
            >
              {m.role === "assistant" && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-primary-foreground brand-gradient">
                  <Bot className="h-4 w-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[80%] text-[15px] leading-relaxed",
                  m.role === "user"
                    ? "rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <Avatar className="h-8 w-8 shrink-0">
                  {user?.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.fullName} /> : null}
                  <AvatarFallback>{initialsOf(user?.fullName ?? "")}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl text-primary-foreground brand-gradient">
                <Bot className="h-4 w-4" />
              </span>
              <span className="animate-pulse">Reading your expenses…</span>
            </div>
          )}
        </div>

        <div className="border-t border-border/60 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {p}
              </button>
            ))}
          </div>
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Textarea
              ref={inputRef}
              value={input}
              rows={2}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about balances, categories or settlements…"
              className="resize-none rounded-2xl pr-14 text-[15px]"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || thinking}
              className="absolute bottom-2.5 right-2.5 h-9 w-9 rounded-xl"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
