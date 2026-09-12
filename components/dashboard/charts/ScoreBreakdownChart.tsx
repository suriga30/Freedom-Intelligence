"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Props = {
  seo: number;
  performance: number;
  accessibility: number;
  security: number;
  technical: number;
};

const COLORS = [
  "#2563EB", // SEO
  "#22C55E", // Performance
  "#F59E0B", // Accessibility
  "#10B981", // Security
  "#9333EA", // Technical
];

export default function ScoreBreakdownChart({
  seo,
  performance,
  accessibility,
  security,
  technical,
}: Props) {
  const data = [
    {
      name: "SEO",
      score: seo,
    },
    {
      name: "Performance",
      score: performance,
    },
    {
      name: "Accessibility",
      score: accessibility,
    },
    {
      name: "Security",
      score: security,
    },
    {
      name: "Technical",
      score: technical,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Score Breakdown
      </h2>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Score",
              ]}
            />

            <Bar
              dataKey="score"
              radius={[6, 6, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}