import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Bot,
  ChevronRight,
  PlusCircle,
  Receipt,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { CategoryPieChart, MonthlyExpensesChart, WeeklyTrendChart } from "@/components/charts";
import { StatCard } from "@/components/stat-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiInsights, currency, expenses, notifications, settlements, topStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SplitSmart AI" },
      {
        name: "description",
        content: "See total expenses, balances, charts and AI insights across all your groups.",
      },
      { property: "og:title", content: "Dashboard — SplitSmart AI" },
      { property: "og:description", content: "Balances, charts and AI insights in one view." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { to: "/add-expense", label: "Add Expense", icon: PlusCircle, tone: "bg-primary/10 text-primary" },
  { to: "/groups", label: "Create Group", icon: Users, tone: "bg-brand-blue/10 text-brand-blue" },
  { to: "/friends", label: "Add Friend", icon: UserPlus, tone: "bg-brand-purple/10 text-brand-purple" },
] as const;

const toneMap = {
  primary: "bg-primary",
  blue: "bg-brand-blue",
  purple: "bg-brand-purple",
} as const;

function Dashboard() {
  return (
    <AppShell
      title="Good morning, Maya"
      subtitle="You have 3 pending settlements and 2 new expenses since yesterday."
      actions={
        <Button asChild className="rounded-xl">
          <Link to="/add-expense">
            <PlusCircle className="mr-1.5 h-4 w-4" /> Add expense
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Expenses"
          value={currency(topStats.totalExpenses)}
          icon={Receipt}
          delta={{ value: "8.2%", up: true }}
        />
        <StatCard
          label="You Paid"
          value={currency(topStats.youPaid)}
          icon={Wallet}
          tone="blue"
          delta={{ value: "3.4%", up: true }}
        />
        <StatCard
          label="You Owe"
          value={currency(topStats.youOwe)}
          icon={ArrowUpRight}
          tone="amber"
          delta={{ value: "12.1%", up: false }}
        />
        <StatCard
          label="Friends Owe You"
          value={currency(topStats.friendsOwe)}
          icon={ArrowDownLeft}
          tone="purple"
          delta={{ value: "5.7%", up: true }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Monthly expenses</h2>
              <p className="text-xs text-muted-foreground">Last 7 months across all groups</p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              2026
            </Badge>
          </div>
          <div className="mt-4">
            <MonthlyExpensesChart />
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-base font-semibold">Spending categories</h2>
          <p className="text-xs text-muted-foreground">This month</p>
          <div className="mt-2">
            <CategoryPieChart height={252} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Weekly trend</h2>
            <span className="text-sm font-semibold text-primary">$1,225 this week</span>
          </div>
          <div className="mt-4">
            <WeeklyTrendChart height={210} />
          </div>
        </div>

        <div className="rounded-2xl border border-brand-purple/25 bg-brand-purple/6 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple/15 text-brand-purple">
              <Bot className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="text-base font-semibold">AI insights</h2>
              <p className="text-xs text-muted-foreground">Updated 10 minutes ago</p>
            </div>
          </div>
          <ul className="mt-4 space-y-3">
            {aiInsights.map((i) => (
              <li key={i} className="rounded-xl border border-border/50 bg-card/70 p-3 text-sm leading-relaxed">
                {i}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
            <Link to="/assistant">Ask the assistant</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent expenses</h2>
            <Link
              to="/history"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border/60">
            {expenses.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center gap-3 py-3 transition-colors hover:bg-secondary/40">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={e.paidByAvatar} alt={e.paidBy} />
                  <AvatarFallback>{e.paidBy.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{e.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {e.paidBy} paid · {e.group} · {e.category}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">{currency(e.amount)}</p>
                  <p className={cn("text-xs", e.youPaid ? "text-primary" : "text-muted-foreground")}>
                    {e.youPaid ? "you lent" : "you owe"} {currency(e.yourShare)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h2 className="text-base font-semibold">Quick actions</h2>
            <div className="mt-4 grid gap-2">
              {quickActions.map((a) => (
                <Link
                  key={a.label}
                  to={a.to}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", a.tone)}>
                    <a.icon className="h-[18px] w-[18px]" />
                  </span>
                  {a.label}
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Upcoming settlements</h2>
              <Link to="/settlements" className="text-sm font-medium text-primary hover:underline">
                All
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {settlements.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={s.person.avatar} alt={s.person.name} />
                    <AvatarFallback>{s.person.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.person.name}</p>
                    <p className="text-xs text-muted-foreground">{s.due}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-sm font-semibold",
                      s.direction === "incoming" ? "text-primary" : "text-destructive",
                    )}
                  >
                    {s.direction === "incoming" ? "+" : "−"}
                    {currency(s.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Bell className="h-4 w-4 text-muted-foreground" /> Notifications
            </h2>
            <div className="mt-4 space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", toneMap[n.tone])} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.detail}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
