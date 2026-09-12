import {
  CircleAlert,
  TriangleAlert,
  BadgeCheck,
} from "lucide-react";

import Card from "../ui/Card";
import CardContent from "../ui/CardContent";

type Props = {
  criticalIssues: number;
  warnings: number;
  passedChecks: number;
};

export default function StatsBar({
  criticalIssues,
  warnings,
  passedChecks,
}: Props) {
  const stats = [
    {
      title: "Critical Issues",
      value: criticalIssues,
      icon: CircleAlert,
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-600",
    },
    {
      title: "Warnings",
      value: warnings,
      icon: TriangleAlert,
      bg: "bg-amber-50",
      border: "border-amber-500",
      text: "text-amber-600",
    },
    {
      title: "Passed Checks",
      value: passedChecks,
      icon: BadgeCheck,
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent>
              <div
                className={`rounded-xl border-l-4 ${stat.border} ${stat.bg} p-5`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-slate-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <Icon
                      size={24}
                      className={stat.text}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}