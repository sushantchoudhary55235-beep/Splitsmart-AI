import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Plus, Receipt, TrendingUp, Users } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { MonthlyExpensesChart } from "@/components/charts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Friend } from "@/lib/mock-data";
import { currency, expenses, groups } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/groups/$groupId")({
  loader: ({ params }) => {
    const group = groups.find((g) => g.id === params.groupId);
    if (!group) throw notFound();
    return { group };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.group.name ?? "Group"} — SplitSmart AI` },
      {
        name: "description",
        content: `Expense timeline, balances, members and statistics for ${loaderData?.group.name ?? "your group"}.`,
      },
      { property: "og:title", content: `${loaderData?.group.name ?? "Group"} — SplitSmart AI` },
      { property: "og:description", content: "Timeline, balances, members and group statistics." },
    ],
  }),
  component: GroupDetail,
});

function GroupDetail() {
  const { group } = Route.useLoaderData();
  const timeline = expenses.filter((e) => e.group === group.name);
  const shown = timeline.length ? timeline : expenses.slice(0, 4);

  return (
    <AppShell
      title={group.name}
      subtitle={`${group.category} · ${group.members.length} members · ${currency(group.total)} total`}
      actions={
        <>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/groups">
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Groups
            </Link>
          </Button>
          <Button asChild className="rounded-xl">
            <Link to="/add-expense">
              <Plus className="mr-1.5 h-4 w-4" /> Add
            </Link>
          </Button>
        </>
      }
    >
      <div className="relative overflow-hidden rounded-3xl">
        <img src={group.image} alt={group.name} className="h-48 w-full object-cover sm:h-60" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Badge className="rounded-full bg-background/85 text-foreground hover:bg-background/85">
              {group.category}
            </Badge>
            <h2 className="mt-2 text-2xl font-bold text-white">{group.name}</h2>
          </div>
          <div className="rounded-2xl bg-background/85 px-4 py-2 backdrop-blur">
            <p className="text-xs text-muted-foreground">Your share</p>
            <p className="text-lg font-bold">{currency(group.yourShare)}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="rounded-xl">
          <TabsTrigger value="timeline" className="rounded-lg">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="balances" className="rounded-lg">
            Balances
          </TabsTrigger>
          <TabsTrigger value="members" className="rounded-lg">
            Members
          </TabsTrigger>
          <TabsTrigger value="stats" className="rounded-lg">
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-5">
          <div className="glass rounded-2xl p-5">
            <ol className="relative space-y-6 border-l border-border/70 pl-6">
              {shown.map((e) => (
                <li key={e.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-primary" />
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{e.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.paidBy} paid · {e.category} ·{" "}
                        {new Date(e.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{currency(e.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        your share {currency(e.yourShare)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="balances" className="mt-5">
          <div className="glass rounded-2xl p-5">
            <div className="space-y-4">
              {group.members.map((m: Friend, i: number) => {
                const bal = m.balance || (i % 2 === 0 ? 120 : -85);
                return (
                  <div key={m.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{m.name}</p>
                      <Progress
                        value={Math.min(100, (Math.abs(bal) / 300) * 100)}
                        className="mt-2 h-1.5"
                      />
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-sm font-semibold",
                        bal >= 0 ? "text-primary" : "text-destructive",
                      )}
                    >
                      {bal >= 0 ? "gets back " : "owes "}
                      {currency(bal)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((m: Friend) => (
              <div key={m.id} className="glass lift flex items-center gap-3 rounded-2xl p-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { l: "Total spent", v: currency(group.total), i: Receipt },
              {
                l: "Average per member",
                v: currency(group.total / group.members.length),
                i: Users,
              },
              { l: "Largest expense", v: currency(1240), i: TrendingUp },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <s.i className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs text-muted-foreground">{s.l}</p>
                <p className="text-xl font-bold">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-base font-semibold">Spend over time</h3>
            <div className="mt-4">
              <MonthlyExpensesChart height={220} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
