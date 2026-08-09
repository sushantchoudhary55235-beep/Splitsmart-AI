export const currency = (n: number) =>
  `$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export type Friend = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  balance: number; // positive => they owe you
  lastActivity: string;
};

export const friends: Friend[] = [
  {
    id: "aria",
    name: "Aria Mehta",
    handle: "@aria",
    avatar: "https://i.pravatar.cc/160?img=47",
    balance: 184.5,
    lastActivity: "Dinner at Kaido · 2 days ago",
  },
  {
    id: "daniel",
    name: "Daniel Okafor",
    handle: "@dokafor",
    avatar: "https://i.pravatar.cc/160?img=12",
    balance: -62.25,
    lastActivity: "Airport cab · 4 days ago",
  },
  {
    id: "sofia",
    name: "Sofia Lindqvist",
    handle: "@sofia",
    avatar: "https://i.pravatar.cc/160?img=32",
    balance: 96,
    lastActivity: "Lisbon Airbnb · 1 week ago",
  },
  {
    id: "rahul",
    name: "Rahul Verma",
    handle: "@rahulv",
    avatar: "https://i.pravatar.cc/160?img=15",
    balance: 0,
    lastActivity: "Settled up · 1 week ago",
  },
  {
    id: "mina",
    name: "Mina Choi",
    handle: "@minac",
    avatar: "https://i.pravatar.cc/160?img=45",
    balance: -18.4,
    lastActivity: "Coffee run · yesterday",
  },
  {
    id: "leo",
    name: "Leo Santos",
    handle: "@leos",
    avatar: "https://i.pravatar.cc/160?img=68",
    balance: 240,
    lastActivity: "Concert tickets · 3 days ago",
  },
];

const F = (i: number) => friends[i]!;

export type Group = {
  id: string;
  name: string;
  image: string;
  category: string;
  members: Friend[];
  total: number;
  yourShare: number;
};

export const groups: Group[] = [
  {
    id: "lisbon",
    name: "Lisbon Trip",
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=70",
    category: "Travel",
    members: [F(0), F(1), F(2), F(5)],
    total: 4820.4,
    yourShare: 1205.1,
  },
  {
    id: "apt",
    name: "Apartment 12B",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=70",
    category: "Household",
    members: [F(3), F(4), F(0)],
    total: 2140.8,
    yourShare: 713.6,
  },
  {
    id: "supper",
    name: "Supper Club",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=70",
    category: "Food",
    members: [F(0), F(2), F(4), F(5), F(1)],
    total: 1284.25,
    yourShare: 256.85,
  },
  {
    id: "studio",
    name: "Studio Co-op",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=70",
    category: "Work",
    members: [F(1), F(3)],
    total: 3960,
    yourShare: 1320,
  },
];

export const categories = [
  "Food & Drink",
  "Travel",
  "Rent & Utilities",
  "Groceries",
  "Entertainment",
  "Transport",
  "Shopping",
  "Health",
] as const;

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: (typeof categories)[number];
  paidBy: string;
  paidByAvatar: string;
  group: string;
  date: string;
  yourShare: number;
  youPaid: boolean;
};

export const expenses: Expense[] = [
  {
    id: "e1",
    title: "Kaido Omakase Dinner",
    amount: 328.6,
    category: "Food & Drink",
    paidBy: "You",
    paidByAvatar: "https://i.pravatar.cc/160?img=5",
    group: "Supper Club",
    date: "2026-08-03",
    yourShare: 65.72,
    youPaid: true,
  },
  {
    id: "e2",
    title: "Lisbon Airbnb — 4 nights",
    amount: 1240,
    category: "Travel",
    paidBy: "Sofia Lindqvist",
    paidByAvatar: "https://i.pravatar.cc/160?img=32",
    group: "Lisbon Trip",
    date: "2026-08-01",
    yourShare: 310,
    youPaid: false,
  },
  {
    id: "e3",
    title: "August Electricity",
    amount: 186.4,
    category: "Rent & Utilities",
    paidBy: "You",
    paidByAvatar: "https://i.pravatar.cc/160?img=5",
    group: "Apartment 12B",
    date: "2026-07-30",
    yourShare: 62.13,
    youPaid: true,
  },
  {
    id: "e4",
    title: "Whole Foods Restock",
    amount: 142.18,
    category: "Groceries",
    paidBy: "Mina Choi",
    paidByAvatar: "https://i.pravatar.cc/160?img=45",
    group: "Apartment 12B",
    date: "2026-07-28",
    yourShare: 47.39,
    youPaid: false,
  },
  {
    id: "e5",
    title: "Tame Impala Tickets",
    amount: 480,
    category: "Entertainment",
    paidBy: "Leo Santos",
    paidByAvatar: "https://i.pravatar.cc/160?img=68",
    group: "Supper Club",
    date: "2026-07-26",
    yourShare: 120,
    youPaid: false,
  },
  {
    id: "e6",
    title: "Airport Transfer",
    amount: 88.5,
    category: "Transport",
    paidBy: "Daniel Okafor",
    paidByAvatar: "https://i.pravatar.cc/160?img=12",
    group: "Lisbon Trip",
    date: "2026-07-24",
    yourShare: 22.13,
    youPaid: false,
  },
  {
    id: "e7",
    title: "Studio Desk Chairs",
    amount: 620,
    category: "Shopping",
    paidBy: "You",
    paidByAvatar: "https://i.pravatar.cc/160?img=5",
    group: "Studio Co-op",
    date: "2026-07-21",
    yourShare: 206.66,
    youPaid: true,
  },
  {
    id: "e8",
    title: "Padel Court Booking",
    amount: 96,
    category: "Health",
    paidBy: "Aria Mehta",
    paidByAvatar: "https://i.pravatar.cc/160?img=47",
    group: "Supper Club",
    date: "2026-07-18",
    yourShare: 24,
    youPaid: false,
  },
];

export const monthlyExpenses = [
  { month: "Feb", amount: 1820, budget: 2200 },
  { month: "Mar", amount: 2410, budget: 2200 },
  { month: "Apr", amount: 1980, budget: 2200 },
  { month: "May", amount: 2740, budget: 2200 },
  { month: "Jun", amount: 2210, budget: 2200 },
  { month: "Jul", amount: 3120, budget: 2200 },
  { month: "Aug", amount: 1640, budget: 2200 },
];

export const categorySpend = [
  { name: "Food & Drink", value: 1240, color: "var(--color-chart-1)" },
  { name: "Travel", value: 980, color: "var(--color-chart-2)" },
  { name: "Rent & Utilities", value: 760, color: "var(--color-chart-3)" },
  { name: "Groceries", value: 420, color: "var(--color-chart-4)" },
  { name: "Entertainment", value: 310, color: "var(--color-chart-5)" },
];

export const weeklyTrend = [
  { day: "Mon", amount: 62 },
  { day: "Tue", amount: 148 },
  { day: "Wed", amount: 94 },
  { day: "Thu", amount: 210 },
  { day: "Fri", amount: 328 },
  { day: "Sat", amount: 265 },
  { day: "Sun", amount: 118 },
];

export const settlements = [
  {
    id: "s1",
    person: F(0),
    amount: 184.5,
    direction: "incoming" as const,
    due: "Due Aug 8",
    method: "UPI · aria@okaxis",
  },
  {
    id: "s2",
    person: F(1),
    amount: 62.25,
    direction: "outgoing" as const,
    due: "Due Aug 10",
    method: "UPI · daniel@ybl",
  },
  {
    id: "s3",
    person: F(5),
    amount: 240,
    direction: "incoming" as const,
    due: "Due Aug 15",
    method: "UPI · leo@okhdfc",
  },
];

export const completedSettlements = [
  { id: "c1", person: F(3), amount: 310, date: "Jul 28, 2026", method: "UPI" },
  { id: "c2", person: F(2), amount: 128.4, date: "Jul 19, 2026", method: "Bank transfer" },
  { id: "c3", person: F(4), amount: 74, date: "Jul 11, 2026", method: "UPI" },
];

export const notifications = [
  {
    id: "n1",
    title: "Aria added “Kaido Omakase Dinner”",
    detail: "Your share is $65.72 in Supper Club",
    time: "12m ago",
    tone: "primary" as const,
  },
  {
    id: "n2",
    title: "Daniel settled $310 with you",
    detail: "Paid via UPI · reference #48210",
    time: "3h ago",
    tone: "blue" as const,
  },
  {
    id: "n3",
    title: "Lisbon Trip budget at 82%",
    detail: "$4,820 of $5,900 planned budget used",
    time: "Yesterday",
    tone: "purple" as const,
  },
];

export const aiInsights = [
  "You spent 34% more on Food & Drink this month — mostly weekend dinners with Supper Club.",
  "Leo has owed you $240 for 14 days. A reminder now usually gets paid within 2 days.",
  "Settling with Daniel first clears 3 chained debts across two groups.",
];

export const aiSuggestions = [
  {
    title: "Rebalance the Lisbon Trip",
    body: "Three members overpaid on lodging. One transfer of $312 from Daniel to Sofia clears the whole group.",
  },
  {
    title: "Set a $2,200 dining guardrail",
    body: "Your food spend crossed budget in 4 of the last 6 months. A soft cap would have saved $914.",
  },
  {
    title: "Automate rent splits",
    body: "Apartment 12B repeats the same split on the 1st every month. Turn it into a recurring expense.",
  },
];

export const topStats = {
  totalExpenses: 12480.6,
  youPaid: 5240.2,
  youOwe: 812.65,
  friendsOwe: 1520.5,
};
