import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function BasicSeoSection({
  data,
}: Props) {
  const score = data.score;

  const checks = [
    Boolean(data.title),
    Boolean(data.description),
    Boolean(data.h1),
    Boolean(data.canonical),
  ];

  const passedChecks = checks.filter(Boolean).length;
  const totalChecks = checks.length;

  let status = "Needs Improvement";
  let statusMessage =
    "The SEO foundation has several opportunities for improvement. Start with the missing page-level signals identified below.";

  if (score >= 90) {
    status = "Excellent";
    statusMessage =
      "The page has a strong basic SEO foundation across title, description, H1, and canonical signals.";
  } else if (score >= 75) {
    status = "Good";
    statusMessage =
      "The page has a good basic SEO foundation, with some opportunities to improve completeness.";
  } else if (score >= 50) {
    status = "Needs Attention";
    statusMessage =
      "The page has several missing or incomplete SEO signals that should be addressed to strengthen its search foundation.";
  }

  const getScoreColor = () => {
    if (score >= 90) {
      return "bg-green-500";
    }

    if (score >= 75) {
      return "bg-blue-500";
    }

    if (score >= 50) {
      return "bg-amber-500";
    }

    return "bg-red-500";
  };

  const getStatusContainer = () => {
    if (score >= 90) {
      return "border-green-200 bg-green-50";
    }

    if (score >= 75) {
      return "border-blue-200 bg-blue-50";
    }

    if (score >= 50) {
      return "border-amber-200 bg-amber-50";
    }

    return "border-red-200 bg-red-50";
  };

  return (
    <>
      <SectionHeading title="📄 Basic SEO Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3">
                <span className="text-2xl">📄</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  SEO Foundation Overview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  {statusMessage}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                SEO Score
              </p>

              <p className="mt-1 text-4xl font-bold text-slate-900">
                {score}
                <span className="text-lg text-slate-400">
                  /100
                </span>
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-600">
                {status}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                SEO Score
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {score}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${getScoreColor()}`}
                style={{
                  width: `${Math.min(
                    Math.max(score, 0),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ReportCard
            title="Website"
            value={data.website}
          />

          <ReportCard
            title="Page Title"
            value={
              data.title
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Meta Description"
            value={
              data.description
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="H1 Heading"
            value={
              data.h1
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Canonical URL"
            value={
              data.canonical
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Checks Passed"
            value={`${passedChecks}/${totalChecks}`}
          />
        </div>

        <div className="space-y-4">
          {data.title && (
            <ReportCard
              title="Page Title Content"
              value={data.title}
            />
          )}

          {data.description && (
            <ReportCard
              title="Meta Description Content"
              value={data.description}
            />
          )}

          {data.h1 && (
            <ReportCard
              title="H1 Heading Content"
              value={data.h1}
            />
          )}

          {data.canonical && (
            <ReportCard
              title="Canonical URL Content"
              value={data.canonical}
            />
          )}
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${getStatusContainer()}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                SEO Status
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {status}
              </p>
            </div>

            <div className="text-2xl font-bold text-slate-900">
              {passedChecks}/{totalChecks}
            </div>
          </div>

          <p className="mt-3 leading-7 text-slate-600">
            {passedChecks === totalChecks
              ? "All four core page-level SEO signals currently evaluated by Freedom Intelligence are present."
              : `${totalChecks - passedChecks} core SEO signal(s) should be reviewed to strengthen the page's search foundation.`}
          </p>

          {!data.title && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a clear, descriptive page title.
            </p>
          )}

          {!data.description && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a concise meta description that summarizes the page.
            </p>
          )}

          {!data.h1 && (
            <p className="mt-2 leading-7 text-slate-600">
              Add one clear H1 heading describing the main purpose of the page.
            </p>
          )}

          {!data.canonical && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a canonical URL to identify the preferred version of the page.
            </p>
          )}
        </div>
      </div>
    </>
  );
}