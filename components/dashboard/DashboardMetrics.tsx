import {
  Globe,
  HeartPulse,
  Accessibility,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import MetricCard from "./MetricCard";
import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function DashboardMetrics({
  data,
}: Props) {
  const performance = data.performanceScore;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
      <MetricCard
        title="SEO Score"
        value={data.score}
        subtitle={data.rating}
        progress={data.score}
        icon={
          <Globe
            size={22}
            className="text-blue-600"
          />
        }
      />

      <MetricCard
        title="Website Health"
        value={data.overallHealth}
        subtitle={data.healthGrade}
        progress={data.overallHealth}
        icon={
          <HeartPulse
            size={22}
            className="text-red-500"
          />
        }
      />

      <MetricCard
        title="Accessibility"
        value={data.accessibilityScore}
        subtitle={
          data.accessibilityScore >= 90
            ? "Excellent"
            : data.accessibilityScore >= 80
              ? "Good"
              : data.accessibilityScore >= 60
                ? "Fair"
                : "Needs Review"
        }
        progress={data.accessibilityScore}
        icon={
          <Accessibility
            size={22}
            className="text-amber-500"
          />
        }
      />

      <MetricCard
        title="Performance"
        value={performance}
        subtitle={data.performanceRating}
        progress={performance}
        icon={
          <Gauge
            size={22}
            className="text-green-600"
          />
        }
      />

      <MetricCard
        title="Security"
        value={data.https ? 100 : 0}
        subtitle={
          data.https
            ? "Secure"
            : "Not Secure"
        }
        progress={data.https ? 100 : 0}
        icon={
          <ShieldCheck
            size={22}
            className="text-emerald-600"
          />
        }
      />

      <MetricCard
        title="Technical"
        value={data.technicalScore}
        subtitle={
          data.technicalScore >= 90
            ? "Excellent"
            : data.technicalScore >= 80
              ? "Good"
              : data.technicalScore >= 60
                ? "Fair"
                : "Needs Improvement"
        }
        progress={data.technicalScore}
        icon={
          <Wrench
            size={22}
            className="text-purple-600"
          />
        }
      />
    </div>
  );
}