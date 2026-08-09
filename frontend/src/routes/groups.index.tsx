import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currency, groups } from "@/lib/mock-data";

export const Route = createFileRoute("/groups/")({
  head: () => ({
    meta: [
      { title: "Groups — SplitSmart AI" },
      {
        name: "description",
        content: "Trips, flatshares and teams — every shared budget with balances and totals.",
      },
      { property: "og:title", content: "Groups — SplitSmart AI" },
      { property: "og:description", content: "Every shared budget with members, totals and balances." },
    ],
  }),
  component: GroupsPage,
});

function GroupsPage() {
  return (
    <AppShell
      title="Groups"
      subtitle="Four active groups · $12,205 tracked this quarter"
      actions={
        <Button className="rounded-xl" onClick={() => toast.success("New group draft created")}>
          <Plus className="mr-1.5 h-4 w-4" /> Create group
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((g) => (
          <Link
            key={g.id}
            to="/groups/$groupId"
            params={{ groupId: g.id }}
            className="glass lift group overflow-hidden rounded-2xl"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={g.image}
                alt={g.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <Badge className="absolute left-3 top-3 rounded-full bg-background/85 text-foreground hover:bg-background/85">
                {g.category}
              </Badge>
              <h2 className="absolute bottom-3 left-3 text-lg font-semibold text-white">{g.name}</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2.5">
                  {g.members.slice(0, 4).map((m) => (
                    <Avatar key={m.id} className="h-8 w-8 border-2 border-card">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {g.members.length > 4 && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-secondary text-[11px] font-semibold">
                      +{g.members.length - 4}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{g.members.length} members</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total expense</p>
                  <p className="text-xl font-bold">{currency(g.total)}</p>
                </div>
                <p className="flex items-center text-sm font-medium text-primary">
                  Open <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
