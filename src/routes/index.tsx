import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Check,
  CreditCard,
  Github,
  Linkedin,
  PieChart,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Twitter,
  Users,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SplitSmart AI — AI-powered expense sharing for groups" },
      {
        name: "description",
        content:
          "Split bills, track who owes what and settle up instantly. SplitSmart AI turns messy group spending into clear, actionable balances.",
      },
      { property: "og:title", content: "SplitSmart AI — AI-powered expense sharing" },
      {
        property: "og:description",
        content:
          "Split bills, track balances and settle up instantly with AI insights built for groups.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Zap,
    title: "Splits that do the math",
    body: "Equal, percentage or custom shares with a live preview before you ever hit save.",
  },
  {
    icon: Bot,
    title: "An assistant that knows your ledger",
    body: "Ask “who owes me the most?” in plain language and get an answer with receipts attached.",
  },
  {
    icon: PieChart,
    title: "Analytics worth opening",
    body: "Category breakdowns, weekly trends and monthly reports rendered in a single glance.",
  },
  {
    icon: ReceiptText,
    title: "Receipt scanning",
    body: "Snap a photo and SplitSmart pulls the total, tax and line items into the right group.",
  },
  {
    icon: CreditCard,
    title: "One-tap settlements",
    body: "Simplified debts collapse chained IOUs into the fewest possible transfers.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Bank-grade encryption, granular group permissions and full export whenever you want.",
  },
];

const testimonials = [
  {
    quote:
      "We ran a 14-person trip through SplitSmart. Zero spreadsheets, zero arguments, everyone paid within a week.",
    name: "Aria Mehta",
    role: "Founder, Nine Yards",
    avatar: "https://i.pravatar.cc/160?img=47",
  },
  {
    quote:
      "The AI assistant is the part I didn't expect to love. It answers the question I actually had, not the report I asked for.",
    name: "Daniel Okafor",
    role: "Engineering lead, Cadence",
    avatar: "https://i.pravatar.cc/160?img=12",
  },
  {
    quote:
      "Our flatshare finally has one source of truth. Rent, utilities and groceries all reconcile on the first of the month.",
    name: "Mina Choi",
    role: "Architect, Studio Loom",
    avatar: "https://i.pravatar.cc/160?img=45",
  },
];

const faqs = [
  {
    q: "Is SplitSmart AI free to use?",
    a: "Yes. The Free plan covers unlimited friends, up to three active groups and full expense tracking. Premium adds unlimited groups, receipt scanning and the AI assistant.",
  },
  {
    q: "How does debt simplification work?",
    a: "SplitSmart looks at every balance in a group and finds the smallest set of transfers that clears them all. A chain of five IOUs often collapses into two payments.",
  },
  {
    q: "Can I split in different currencies?",
    a: "Premium supports 140 currencies with daily rates locked at the time each expense is added, so historical balances never drift.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Nothing disappears. You keep read access to your history and can export every group to CSV or PDF at any time.",
  },
];

function Landing() {
  return (
    <div className="page-canvas min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3.5 sm:px-6">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="ml-4 hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-foreground" href="#testimonials">
              Customers
            </a>
            <a className="transition-colors hover:text-foreground" href="#pricing">
              Pricing
            </a>
            <a className="transition-colors hover:text-foreground" href="#faq">
              FAQ
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden rounded-xl sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/register">Start free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="rise">
            <Badge
              variant="secondary"
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> New: AI settlement planner
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[56px]">
              Group spending, <span className="gradient-text">finally settled.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              SplitSmart AI tracks every shared expense, works out who owes what, and tells you the
              fastest way to clear it — before anyone has to send an awkward message.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 rounded-xl px-6 text-[15px]">
                <Link to="/register">
                  Create your first group <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-border/70 bg-card/60 px-6 text-[15px] backdrop-blur"
              >
                <Link to="/dashboard">See a live dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[47, 12, 32, 68, 45].map((n) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/80?img=${n}`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">240,000+ groups</span> settled
                $180M last year
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="glass-strong float-slow rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Lisbon Trip</p>
                  <p className="text-2xl font-bold">$4,820.40</p>
                </div>
                <Badge className="rounded-full bg-primary/12 text-primary hover:bg-primary/12">
                  4 members
                </Badge>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { n: "Airbnb — 4 nights", a: "$1,240.00", who: "Sofia paid", img: 32 },
                  { n: "Kaido Omakase Dinner", a: "$328.60", who: "You paid", img: 5 },
                  { n: "Airport transfer", a: "$88.50", who: "Daniel paid", img: 12 },
                ].map((r) => (
                  <div
                    key={r.n}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-3"
                  >
                    <img
                      src={`https://i.pravatar.cc/80?img=${r.img}`}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{r.n}</p>
                      <p className="text-xs text-muted-foreground">{r.who}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">{r.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/8 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Bot className="h-4 w-4" /> AI settlement plan
                </p>
                <p className="mt-1.5 text-sm">
                  Two transfers clear all four balances. Daniel → Sofia $312, You → Sofia $184.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-2xl glass p-4 sm:block">
              <p className="text-xs text-muted-foreground">Friends owe you</p>
              <p className="text-xl font-bold text-primary">$1,520.50</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-3/4 rounded-full brand-gradient" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Everything in one place</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Built for the way groups actually spend
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every screen answers one question fast: what do I owe, what am I owed, and what should
              I do next.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="glass lift rounded-2xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Loved by roommates, travellers and teams</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="glass lift flex flex-col rounded-2xl p-6">
                <blockquote className="flex-1 text-[15px] leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Simple pricing</h2>
            <p className="mt-3 text-muted-foreground">
              Start free forever. Upgrade when your groups get serious.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="glass rounded-3xl p-7">
              <p className="text-sm font-semibold text-muted-foreground">Free</p>
              <p className="mt-3 text-4xl font-extrabold">
                $0<span className="text-base font-medium text-muted-foreground">/month</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                For flatshares and casual splits.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Unlimited friends and expenses",
                  "Up to 3 active groups",
                  "Equal and custom splits",
                  "Monthly spending summary",
                  "CSV export",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-7 h-11 w-full rounded-xl">
                <Link to="/register">Get started free</Link>
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card/85 p-7 shadow-[var(--shadow-float)] backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 brand-gradient" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">Premium</p>
                <Badge className="rounded-full bg-brand-purple/12 text-brand-purple hover:bg-brand-purple/12">
                  Most popular
                </Badge>
              </div>
              <p className="mt-3 text-4xl font-extrabold">
                $6<span className="text-base font-medium text-muted-foreground">/month</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                For trips, teams and anyone tired of chasing payments.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Everything in Free",
                  "Unlimited groups and members",
                  "AI assistant and spending insights",
                  "Receipt scanning and OCR",
                  "Debt simplification and reminders",
                  "140 currencies with locked rates",
                  "Priority support",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-7 h-11 w-full rounded-xl">
                <Link to="/register">Start 30-day trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-8 backdrop-blur-xl sm:p-12">
          <div className="grid items-center gap-6 md:grid-cols-[1.4fr_auto]">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Clear every balance before the weekend
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Import your last trip, invite the group, and let SplitSmart draft the settlement
                plan. It takes about four minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-xl px-6">
                <Link to="/register">Start free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6">
                <Link to="/assistant">Try the assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Questions, answered</h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border/60">
                <AccordionTrigger className="text-left text-[15px] font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-powered expense sharing for people who'd rather enjoy the trip than run the
              spreadsheet.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
          {[
            { h: "Product", l: ["Features", "Pricing", "Analytics", "AI assistant"] },
            { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
            { h: "Resources", l: ["Help centre", "Security", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-sm font-semibold">{col.h}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.l.map((l) => (
                  <li key={l} className="cursor-pointer transition-colors hover:text-foreground">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© 2026 SplitSmart AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Trusted by 240,000 groups worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}
