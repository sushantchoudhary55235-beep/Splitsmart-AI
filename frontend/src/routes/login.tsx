import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Apple, Chrome, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth/auth-context";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            const user = await login({ email, password });
            toast.success(`Welcome back, ${user.fullName.split(" ")[0]}`);
            navigate({ to: "/dashboard" });
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Could not log in.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 rounded-xl"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" disabled={busy} className="h-11 w-full rounded-xl">
          {busy ? "Logging in…" : "Log in"}
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
