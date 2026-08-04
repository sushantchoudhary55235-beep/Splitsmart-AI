import { createFileRoute, Link } from "@tanstack/react-router";
import { Apple, Chrome, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SplitSmart AI" },
      { name: "description", content: "Log in to SplitSmart AI to track balances and settle up." },
      { property: "og:title", content: "Log in — SplitSmart AI" },
      { property: "og:description", content: "Access your groups, balances and AI insights." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see what changed in your groups today."
      footer={
        <>
          New to SplitSmart?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 rounded-xl pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember" /> Remember me
          </label>
          <span className="cursor-pointer text-sm font-medium text-primary hover:underline">
            Forgot password?
          </span>
        </div>
        <Button asChild className="h-11 w-full rounded-xl">
          <Link to="/dashboard">Log in</Link>
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with{" "}
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="outline" className="h-11 rounded-xl">
          <Chrome className="mr-2 h-4 w-4" /> Google
        </Button>
        <Button variant="outline" className="h-11 rounded-xl">
          <Apple className="mr-2 h-4 w-4" /> Apple
        </Button>
      </div>
    </AuthLayout>
  );
}
