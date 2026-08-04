import { createFileRoute } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, currency, expenses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Expense history — SplitSmart AI" },
      {
        name: "description",
        content: "Search, filter and export every shared expense on a clean timeline.",
      },
      { property: "og:title", content: "Expense history — SplitSmart AI" },
      { property: "og:description", content: "A searchable timeline of every shared expense." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const list = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) &&
      (category === "all" || e.category === category),
  );

  const byMonth = list.reduce<Record<string, typeof expenses>>((acc, e) => {
    const key = new Date(e.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    (acc[key] ??= []).push(e);
    return acc;
  }, {});

  return (
    <AppShell
      title="Expense history"
      subtitle={`${list.length} expenses matching your filters`}
      actions={
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => toast.success("Export queued — CSV will download shortly")}
        >
          <Download className="mr-1.5 h-4 w-4" /> Export
        </Button>
      }
    >
      <div className="glass grid gap-3 rounded-2xl p-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="relative sm:col-span-2 xl:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search expenses"
            className="h-11 rounded-xl pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="date" defaultValue="2026-07-01" className="h-11 rounded-xl" />
        <Input type="date" defaultValue="2026-08-31" className="h-11 rounded-xl" />
      </div>

      <div className="space-y-6">
        {Object.entries(byMonth).map(([month, items]) => (
          <section key={month}>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{month}</h2>
            <ol className="relative space-y-3 border-l border-border/70 pl-6">
              {items.map((e) => (
                <li key={e.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full border-2 border-background",
                      e.youPaid ? "bg-primary" : "bg-brand-blue",
                    )}
                  />
                  <div className="glass lift flex flex-wrap items-center gap-3 rounded-2xl p-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={e.paidByAvatar} alt={e.paidBy} />
                      <AvatarFallback>{e.paidBy.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{e.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {e.paidBy} paid ·{" "}
                        {new Date(e.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {e.group}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 rounded-full">
                      {e.category}
                    </Badge>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold">{currency(e.amount)}</p>
                      <p
                        className={cn(
                          "text-xs",
                          e.youPaid ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {e.youPaid ? "you lent" : "you owe"} {currency(e.yourShare)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
        {!list.length && (
          <p className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No expenses match those filters yet.
          </p>
        )}
      </div>
    </AppShell>
  );
}
