type Props = {
  website: string;
};

export default function DashboardHeader({
  website,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Freedom Intelligence
        </p>

        <p className="text-sm font-medium text-slate-500">
          Website Intelligence Platform
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Website Intelligence Report
        </h1>

        <p className="text-lg font-medium text-slate-700">
          {website}
        </p>

        <p className="max-w-3xl text-sm leading-6 text-slate-500">
          AI-powered analysis of your website's SEO, technical health,
          accessibility, security, performance, and overall quality to help
          you identify issues and prioritize improvements.
        </p>
      </div>
    </div>
  );
}