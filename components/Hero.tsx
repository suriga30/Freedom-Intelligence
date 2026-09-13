import {
  ShieldCheck,
  Gauge,
  SearchCheck,
  Accessibility,
} from "lucide-react";

export default function Hero() {
  const features = [
    {
      icon: SearchCheck,
      label: "SEO Intelligence",
    },
    {
      icon: ShieldCheck,
      label: "Security Analysis",
    },
    {
      icon: Accessibility,
      label: "Accessibility Checks",
    },
    {
      icon: Gauge,
      label: "Performance Insights",
    },
  ];

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          AI-Powered Website Intelligence
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
          Understand Your Website.
          <span className="block text-blue-600">
            Improve Your Digital Presence.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
          Freedom Intelligence analyzes your website’s SEO, security,
          accessibility, performance, and technical health in seconds.
        </p>

        <p className="text-sm text-neutral-500">
          Get actionable insights, intelligent recommendations, and a clear
          picture of your website’s overall quality.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <Icon size={22} className="text-blue-600" />

              <span className="text-xs font-semibold text-neutral-700 sm:text-sm">
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}