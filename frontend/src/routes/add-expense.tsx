import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Camera, Check, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, currency, friends, groups } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/add-expense")({
  head: () => ({
    meta: [
      { title: "Add expense — SplitSmart AI" },
      {
        name: "description",
        content: "Add a shared expense with equal, percentage or custom splits and a live preview.",
      },
      { property: "og:title", content: "Add expense — SplitSmart AI" },
      { property: "og:description", content: "Equal, percentage or custom splits with live preview." },
    ],
  }),
  component: AddExpensePage,
});

const splitTypes = ["Equal", "Percentage", "Custom"] as const;

function AddExpensePage() {
  const [title, setTitle] = useState("Kaido Omakase Dinner");
  const [amount, setAmount] = useState("328.60");
  const [splitType, setSplitType] = useState<(typeof splitTypes)[number]>("Equal");
  const [selected, setSelected] = useState<string[]>(["me", "aria", "sofia", "leo"]);
  const [paidBy, setPaidBy] = useState("me");

  const people = useMemo(
    () => [
      { id: "me", name: "You", avatar: "https://i.pravatar.cc/160?img=5" },
      ...friends.map((f) => ({ id: f.id, name: f.name, avatar: f.avatar })),
    ],
    [],
  );

  const total = Number(amount) || 0;
  const chosen = people.filter((p) => selected.includes(p.id));
  const shares = chosen.map((p, i) => {
    if (splitType === "Equal") return { ...p, share: total / (chosen.length || 1) };
    if (splitType === "Percentage") {
      const pct = i === 0 ? 40 : 60 / Math.max(1, chosen.length - 1);
      return { ...p, share: (total * pct) / 100, pct };
    }
    return { ...p, share: i === 0 ? total * 0.5 : (total * 0.5) / Math.max(1, chosen.length - 1) };
  });

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <AppShell title="Add expense" subtitle="Log it once — SplitSmart handles the maths and the reminders.">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <form
          className="glass space-y-5 rounded-2xl p-5 sm:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Expense added to Supper Club");
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Expense name</Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 rounded-xl text-[15px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 rounded-xl pl-8 text-lg font-semibold"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="date" type="date" defaultValue="2026-08-03" className="h-12 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Paid by</Label>
              <Select value={paidBy} onValueChange={setPaidBy}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {people.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select defaultValue={categories[0]}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Group</Label>
            <Select defaultValue={groups[2]!.name}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {groups.map((g) => (
                  <SelectItem key={g.id} value={g.name}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" /> Split between
            </Label>
            <div className="flex flex-wrap gap-2">
              {people.map((p) => {
                const on = selected.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-sm font-medium transition-all duration-200",
                      on
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border/70 bg-card/60 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={p.avatar} alt={p.name} />
                      <AvatarFallback>{p.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {p.name}
                    {on && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Split type</Label>
            <Tabs
              value={splitType}
              onValueChange={(v) => setSplitType(v as (typeof splitTypes)[number])}
            >
              <TabsList className="w-full rounded-xl">
                {splitTypes.map((t) => (
                  <TabsTrigger key={t} value={t} className="flex-1 rounded-lg">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-2">
            <Label>Receipt</Label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
              <Camera className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm font-medium">Upload a receipt</span>
              <span className="text-xs text-muted-foreground">
                PNG, JPG or PDF — we'll read the total for you
              </span>
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Birthday dinner — Leo covered the wine separately."
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="h-11 flex-1 rounded-xl">
              Save expense
            </Button>
            <Button type="button" variant="outline" className="h-11 rounded-xl">
              Save as draft
            </Button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Live preview</h2>
              <Badge variant="secondary" className="rounded-full">
                {splitType}
              </Badge>
            </div>
            <div className="mt-4 rounded-2xl border border-border/60 bg-card/70 p-4">
              <p className="truncate text-sm font-semibold">{title || "Untitled expense"}</p>
              <p className="mt-1 text-3xl font-extrabold">{currency(total)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Paid by {people.find((p) => p.id === paidBy)?.name} · split {chosen.length} ways
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {shares.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={s.avatar} alt={s.name} />
                    <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate text-sm">{s.name}</span>
                  {"pct" in s && s.pct ? (
                    <span className="text-xs text-muted-foreground">{s.pct.toFixed(0)}%</span>
                  ) : null}
                  <span className="text-sm font-semibold">{currency(s.share)}</span>
                </div>
              ))}
              {!chosen.length && (
                <p className="text-sm text-muted-foreground">Pick at least one person to split with.</p>
              )}
            </div>
            <div className="mt-4 rounded-xl bg-primary/8 p-3 text-xs text-primary">
              Everyone is notified instantly and balances update across all shared groups.
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
