import { createFileRoute, Link } from "@tanstack/react-router";
import { Apple, Chrome } from "lucide-react";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — SplitSmart AI" },
      {
        name: "description",
        content: "Create a free SplitSmart AI account and start splitting group expenses today.",
      },
      { property: "og:title", content: "Create your account — SplitSmart AI" },
      {
        property: "og:description",
        content: "Free forever for casual splits. Premium adds AI insights and receipt scanning.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free forever for up to three groups. No card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="first">First name</Label>
            <Input id="first" placeholder="Maya" className="h-11 rounded-xl" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" placeholder="Kapoor" className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            className="h-11 rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            Use 8+ characters with a number and a symbol.
          </p>
        </div>
        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <Checkbox id="terms" className="mt-0.5" />
          <span>
            I agree to the <span className="font-medium text-foreground">Terms</span> and{" "}
            <span className="font-medium text-foreground">Privacy Policy</span>.
          </span>
        </label>
        <Button asChild className="h-11 w-full rounded-xl">
          <Link to="/dashboard">Create account</Link>
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or sign up with{" "}
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
