import { ReactNode } from "react";

import Card from "../ui/Card";
import CardContent from "../ui/CardContent";

type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
  progress: number;
  icon?: ReactNode;
};

export default function MetricCard({
  title,
  value,
  subtitle,
  progress,
  icon,
}: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              {value}
            </h2>

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {icon && (
            <div className="rounded-xl bg-slate-100 p-3">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}