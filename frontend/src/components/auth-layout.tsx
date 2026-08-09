import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="page-canvas grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md rise">
          <Link to="/" className="inline-flex">
            <Logo />
          </Link>
          <h1 className="mt-8 text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border/60 lg:block">
        <div className="absolute inset-0 brand-gradient opacity-[0.14]" />
        <div className="relative flex h-full flex-col justify-center gap-8 px-14">
          <blockquote className="text-2xl font-semibold leading-snug">
            “SplitSmart turned six months of messy group chats into one clean settlement. We paid
            each other back in a single afternoon.”
          </blockquote>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/160?img=32"
              alt="Sofia Lindqvist"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">Sofia Lindqvist</p>
              <p className="text-xs text-muted-foreground">Product designer, Lisbon</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { k: "$180M+", v: "settled" },
              { k: "240k", v: "groups" },
              { k: "4.9★", v: "App Store" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-4">
                <p className="text-lg font-bold">{s.k}</p>
                <p className="text-xs text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
