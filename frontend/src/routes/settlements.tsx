import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completedSettlements, currency, settlements } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settlements")({
  head: () => ({
    meta: [
      { title: "Settlements — SplitSmart AI" },
      {
        name: "description",
        content: "Pending and completed payments with one-tap UPI settlement and full history.",
      },
      { property: "og:title", content: "Settlements — SplitSmart AI" },
      { property: "og:description", content: "Clear balances with one-tap UPI settlements." },
    ],
  }),
  component: SettlementsPage,
});

function SettlementsPage() {
  const incoming = settlements.filter((s) => s.direction === "incoming").reduce((a, s) => a + s.amount, 0);
  const outgoing = settlements.filter((s) => s.direction === "outgoing").reduce((a, s) => a + s.amount, 0);

  return (
    <AppShell title="Settlements" subtitle="Two transfers clear every open balance you have right now.">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Incoming</p>
          <p className="mt-1 text-2xl font-bold text-primary">{currency(incoming)}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Outgoing</p>
          <p className="mt-1 text-2xl font-bold text-destructive">{currency(outgoing)}</p>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-primary/8 p-5">
          <p className="text-sm text-muted-foreground">Net position</p>
          <p className="mt-1 text-2xl font-bold text-primary">+{currency(incoming - outgoing)}</p>
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="rounded-xl">
          <TabsTrigger value="pending" className="rounded-lg">
            Pending
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-lg">
            Completed
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-5 space-y-3">
          {settlements.map((s) => (
            <div key={s.id} className="glass lift flex flex-wrap items-center gap-3 rounded-2xl p-4">
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarImage src={s.person.avatar} alt={s.person.name} />
                <AvatarFallback>{s.person.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{s.person.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.method} · {s.due}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    "flex items-center gap-1 text-base font-bold",
                    s.direction === "incoming" ? "text-primary" : "text-destructive",
                  )}
                >
                  {s.direction === "incoming" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                  {currency(s.amount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {s.direction === "incoming" ? "owes you" : "you owe"}
                </p>
              </div>
              <Button
                className="w-full shrink-0 rounded-xl sm:w-auto"
                onClick={() =>
                  toast.success(
                    s.direction === "incoming"
                      ? `Payment request sent to ${s.person.name}`
                      : `UPI payment of ${currency(s.amount)} initiated`,
                  )
                }
              >
                <Smartphone className="mr-1.5 h-4 w-4" />
                {s.direction === "incoming" ? "Request via UPI" : "Pay via UPI"}
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-5 space-y-3">
          {completedSettlements.map((c) => (
            <div key={c.id} className="glass flex items-center gap-3 rounded-2xl p-4">
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarImage src={c.person.avatar} alt={c.person.name} />
                <AvatarFallback>{c.person.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{c.person.name}</p>
                <p className="text-xs text-muted-foreground">
                  {c.method} · {c.date}
                </p>
              </div>
              <Badge className="shrink-0 rounded-full bg-primary/12 text-primary hover:bg-primary/12">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Settled
              </Badge>
              <p className="shrink-0 text-sm font-semibold">{currency(c.amount)}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-5">
          <div className="glass rounded-2xl p-5">
            <ol className="relative space-y-6 border-l border-border/70 pl-6">
              {[...completedSettlements, ...completedSettlements.slice(0, 2)].map((c, i) => (
                <li key={`${c.id}-${i}`} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
                  <p className="text-sm font-semibold">
                    {currency(c.amount)} settled with {c.person.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.date} · {c.method} · reference #{48210 + i}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
