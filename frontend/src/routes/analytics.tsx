import { createFileRoute } from "@tanstack/react-router";
import { Bot, Crown, Download, Flame, Gauge } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { CategoryPieChart, MonthlyExpensesChart, WeeklyTrendChart } from "@/components/charts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { aiSuggestions, categorySpend, currency, friends } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — SplitSmart AI" },
      {
        name: "description",
        content: "Category breakdowns, monthly reports and AI suggestions for your shared spending.",
      },
      { property: "og:title", content: "Analytics — SplitSmart AI" },
      { property: "og:description", content: "Charts, monthly reports and AI spending suggestions." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell
      title="Analytics"
      subtitle="How your shared money moved over the last seven months"
      actions={
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => toast.success("Monthly report exported as PDF")}
        >
          <Download className="mr-1.5 h-4 w-4" /> Monthly report
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass lift rounded-2xl p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
            <Crown className="h-[18px] w-[18px]" />
          </span>
          <p className="mt-3 text-xs text-muted-foreground">Top spending friend</p>
          <div className="mt-2 flex items-center gap-2.5">
            <Avatar className="h-9 w-9">
              <AvatarImage src={friends[5]!.avatar} alt={friends[5]!.name} />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{friends[5]!.name}</p>
              <p className="text-xs text-muted-foreground">{currency(2140)} across 14 expenses</p>
            </div>
          </div>
        </div>
        <div className="glass lift rounded-2xl p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Flame className="h-[18px] w-[18px]" />
          </span>
          <p className="mt-3 text-xs text-muted-foreground">Top category</p>
          <p className="mt-2 text-xl font-bold">Food &amp; Drink</p>
          <p className="text-xs text-muted-foreground">{currency(1240)} · 34% of total spend</p>
        </div>
        <div className="glass lift rounded-2xl p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <Gauge className="h-[18px] w-[18px]" />
          </span>
          <p className="mt-3 text-xs text-muted-foreground">Average monthly spending</p>
          <p className="mt-2 text-xl font-bold">{currency(2274)}</p>
          <p className="text-xs text-muted-foreground">3.4% above your $2,200 target</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Monthly expenses</h2>
          <p className="text-xs text-muted-foreground">Bar chart · all groups combined</p>
          <div className="mt-4">
            <MonthlyExpensesChart height={260} />
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-base font-semibold">Category split</h2>
          <p className="text-xs text-muted-foreground">Pie chart · this month</p>
          <div className="mt-2">
            <CategoryPieChart height={272} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Weekly trend</h2>
          <div className="mt-4">
            <WeeklyTrendChart height={220} />
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-base font-semibold">Category detail</h2>
          <div className="mt-4 space-y-4">
            {categorySpend.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{c.name}</span>
                  <span className="font-semibold">{currency(c.value)}</span>
                </div>
                <Progress value={(c.value / 1240) * 100} className="mt-2 h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-purple/25 bg-brand-purple/6 p-5 backdrop-blur-xl">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <Bot className="h-[18px] w-[18px] text-brand-purple" /> AI suggestions
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {aiSuggestions.map((s) => (
            <div key={s.title} className="rounded-xl border border-border/50 bg-card/70 p-4">
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
