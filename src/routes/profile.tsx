import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Camera, Globe, LogOut, Moon, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Switch } from "@/components/ui/switch";
import { currency, topStats } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & settings — SplitSmart AI" },
      {
        name: "description",
        content: "Manage your profile, dark mode, notifications and language preferences.",
      },
      { property: "og:title", content: "Profile & settings — SplitSmart AI" },
      { property: "og:description", content: "Profile, appearance, notifications and language." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <AppShell title="Profile" subtitle="Your account, appearance and notification preferences">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-primary/15">
                <AvatarImage src="https://i.pravatar.cc/240?img=5" alt="Maya Kapoor" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground">
                <Camera className="h-4 w-4" />
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold">Maya Kapoor</h2>
            <p className="text-sm text-muted-foreground">maya@splitsmart.ai · Premium member</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "Groups", v: "4" },
              { l: "Friends", v: "6" },
              { l: "Expenses", v: "128" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border/60 bg-card/60 p-3">
                <p className="text-lg font-bold">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/60 p-3">
              <p className="text-xs text-muted-foreground">Lifetime paid</p>
              <p className="text-base font-bold">{currency(topStats.youPaid)}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-3">
              <p className="text-xs text-muted-foreground">Lifetime settled</p>
              <p className="text-base font-bold">{currency(9860.4)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-base font-semibold">Account details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="pname">Full name</Label>
                <Input id="pname" defaultValue="Maya Kapoor" className="h-11 rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pemail">Email</Label>
                <Input id="pemail" defaultValue="maya@splitsmart.ai" className="h-11 rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="upi">UPI ID</Label>
                <Input id="upi" defaultValue="maya@okhdfc" className="h-11 rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="mt-5 rounded-xl" onClick={() => toast.success("Profile updated")}>
              Save changes
            </Button>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-base font-semibold">Preferences</h2>
            <div className="mt-4 divide-y divide-border/60">
              <Row
                icon={<Moon className="h-4 w-4" />}
                title="Dark mode"
                detail="Switch the whole app to a low-light palette"
              >
                <Switch checked={dark} onCheckedChange={setDark} />
              </Row>
              <Row
                icon={<Bell className="h-4 w-4" />}
                title="Expense notifications"
                detail="Alert me when someone adds an expense I'm part of"
              >
                <Switch defaultChecked />
              </Row>
              <Row
                icon={<Bell className="h-4 w-4" />}
                title="Settlement reminders"
                detail="Nudge friends who haven't paid after 7 days"
              >
                <Switch defaultChecked />
              </Row>
              <Row
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Two-factor authentication"
                detail="Require a code from your authenticator app"
              >
                <Switch />
              </Row>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-11 w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Link to="/login">
              <LogOut className="mr-1.5 h-4 w-4" /> Log out
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

function Row({
  icon,
  title,
  detail,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
