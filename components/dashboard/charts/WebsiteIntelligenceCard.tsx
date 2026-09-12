import {
  Globe,
  Gauge,
  ShieldCheck,
  Accessibility,
  Wrench,
} from "lucide-react";

type Props = {
  seo: number;
  performance: number;
  accessibility: number;
  security: number;
  technical: number;
};

export default function WebsiteIntelligenceCard({
  seo,
  performance,
  accessibility,
  security,
  technical,
}: Props) {
  const metrics = [
    {
      label: "SEO",
      value: seo,
      icon: Globe,
      color: "bg-blue-600",
    },
    {
      label: "Performance",
      value: performance,
      icon: Gauge,
      color: "bg-green-600",
    },
    {
      label: "Accessibility",
      value: accessibility,
      icon: Accessibility,
      color: "bg-amber-500",
    },
    {
      label: "Security",
      value: security,
      icon: ShieldCheck,
      color: "bg-emerald-600",
    },
    {
      label: "Technical",
      value: technical,
      icon: Wrench,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Website Intelligence
      </h2>

      <div className="space-y-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    size={18}
                    className="text-slate-600"
                  />

                  <span className="font-medium text-slate-700">
                    {metric.label}
                  </span>
                </div>

                <span className="font-semibold text-slate-900">
                  {metric.value}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${metric.color}`}
                  style={{
                    width: `${Math.min(
                      Math.max(metric.value, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}