import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Boxes,
  PlusCircle,
  History,
  PieChart,
  Wallet,
  Bot,
  UserRound,
  Bell,
  Search,
  Plus,
} from "lucide-react";
import type { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/friends", label: "Friends", icon: Users },
  { to: "/groups", label: "Groups", icon: Boxes },
  { to: "/add-expense", label: "Add Expense", icon: PlusCircle },
  { to: "/history", label: "History", icon: History },
  { to: "/analytics", label: "Analytics", icon: PieChart },
  { to: "/settlements", label: "Settlements", icon: Wallet },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

const mobileNav = [nav[0], nav[1], nav[2], nav[7], nav[8]] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="page-canvas min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-border/60 bg-card/70 px-4 py-6 backdrop-blur-xl lg:flex">
        <Link to="/" className="px-2">
          <Logo />
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold">Premium trial</p>
          <p className="mt-1 text-xs text-muted-foreground">
            18 days left of unlimited AI insights.
          </p>
          <Button size="sm" className="mt-3 w-full">
            Upgrade
          </Button>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
            <Link to="/" className="lg:hidden">
              <Logo compact />
            </Link>
            <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search expenses, friends, groups"
                className="h-10 rounded-xl border-border/70 bg-card/70 pl-9"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative ml-auto rounded-xl md:ml-0"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarImage src="https://i.pravatar.cc/160?img=5" alt="Your avatar" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-14">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold sm:text-3xl">{title}</h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
          </div>
          <div className="mt-6 space-y-6">{children}</div>
        </main>
      </div>

      <Link
        to="/add-expense"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-200 active:scale-95 brand-gradient lg:hidden"
        aria-label="Add expense"
      >
        <Plus className="h-6 w-6" />
      </Link>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="flex items-stretch justify-between px-2">
          {mobileNav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
