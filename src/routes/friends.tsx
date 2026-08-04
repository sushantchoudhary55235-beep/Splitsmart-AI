import { createFileRoute } from "@tanstack/react-router";
import { BellRing, History, Search, UserPlus, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currency, friends } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends — SplitSmart AI" },
      {
        name: "description",
        content: "Track balances with every friend, view shared history and settle up in a tap.",
      },
      { property: "og:title", content: "Friends — SplitSmart AI" },
      { property: "og:description", content: "Balances, history and reminders for every friend." },
    ],
  }),
  component: FriendsPage,
});

function FriendsPage() {
  const [query, setQuery] = useState("");
  const list = friends.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  const owedToYou = friends.filter((f) => f.balance > 0).reduce((a, f) => a + f.balance, 0);
  const youOwe = friends.filter((f) => f.balance < 0).reduce((a, f) => a - f.balance, 0);

  return (
    <AppShell
      title="Friends"
      subtitle={`${friends.length} people · ${currency(owedToYou)} owed to you · ${currency(youOwe)} you owe`}
      actions={
        <Button className="rounded-xl" onClick={() => toast.success("Invite link copied")}>
          <UserPlus className="mr-1.5 h-4 w-4" /> Add friend
        </Button>
      }
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search friends"
          className="h-11 rounded-xl border-border/70 bg-card/70 pl-9"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((f) => (
          <article key={f.id} className="glass lift rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 shrink-0 ring-2 ring-primary/15">
                <AvatarImage src={f.avatar} alt={f.name} />
                <AvatarFallback>{f.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">{f.name}</h2>
                <p className="truncate text-xs text-muted-foreground">{f.handle}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border/60 bg-card/60 p-3">
              <p className="text-xs text-muted-foreground">
                {f.balance > 0 ? "Owes you" : f.balance < 0 ? "You owe" : "All settled"}
              </p>
              <p
                className={cn(
                  "text-xl font-bold",
                  f.balance > 0 ? "text-primary" : f.balance < 0 ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {f.balance === 0 ? "$0.00" : currency(f.balance)}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{f.lastActivity}</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-2"
                onClick={() => toast(`Opening history with ${f.name}`)}
              >
                <History className="mr-1 h-3.5 w-3.5" /> History
              </Button>
              <Button
                size="sm"
                className="rounded-xl px-2"
                onClick={() => toast.success(`Settlement started with ${f.name}`)}
              >
                <Wallet className="mr-1 h-3.5 w-3.5" /> Settle
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl px-2"
                onClick={() => toast.success(`Reminder sent to ${f.name}`)}
              >
                <BellRing className="mr-1 h-3.5 w-3.5" /> Remind
              </Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
