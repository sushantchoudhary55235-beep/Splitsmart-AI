import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { categorySpend, monthlyExpenses, weeklyTrend } from "@/lib/mock-data";

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 14,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    boxShadow: "var(--shadow-soft)",
    fontSize: 12,
  },
} as const;

export function MonthlyExpensesChart({ height = 240 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={monthlyExpenses} barCategoryGap="28%">
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} width={44} tickFormatter={(v: number) => `$${v / 1000}k`} />
        <Tooltip cursor={{ fill: "var(--color-muted)", opacity: 0.4 }} {...tooltipStyle} />
        <Bar
          dataKey="amount"
          radius={[10, 10, 6, 6]}
          fill="var(--color-chart-1)"
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ height = 240 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={categorySpend}
          dataKey="value"
          nameKey="name"
          innerRadius="58%"
          outerRadius="86%"
          paddingAngle={3}
          stroke="none"
          isAnimationActive={false}
        >
          {categorySpend.map((c) => (
            <Cell key={c.name} fill={c.color} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          formatter={(v: string) => (
            <span style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>{v}</span>
          )}
        />
        <Tooltip {...tooltipStyle} />
      </RePieChart>
    </ResponsiveContainer>
  );
}

export function WeeklyTrendChart({ height = 240 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={weeklyTrend}>
        <defs>
          <linearGradient id="weeklyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" {...axis} />
        <YAxis {...axis} width={40} tickFormatter={(v: number) => `$${v}`} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="var(--color-chart-2)"
          strokeWidth={2.5}
          fill="url(#weeklyFill)"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
