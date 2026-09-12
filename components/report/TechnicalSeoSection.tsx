import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function TechnicalSeoSection({
  data,
}: Props) {
  const score = data.technicalScore;

  const checks = [
    data.robotsFound,
    data.sitemapFound,
    Boolean(data.canonical),
    data.imagesWithoutAlt === 0,
  ];

  const passedChecks = checks.filter(Boolean).length;
  const totalChecks = checks.length;

  let status = "Needs Improvement";
  let statusMessage =
    "The technical foundation has several opportunities for improvement. Address the missing technical signals below to strengthen crawling, indexing, and page structure.";

  if (score >= 90) {
    status = "Excellent";
    statusMessage =
      "The website has a strong technical foundation across the technical signals currently evaluated by Freedom Intelligence.";
  } else if (score >= 75) {
    status = "Good";
    statusMessage =
      "The website has a generally strong technical foundation, with some opportunities that can still be addressed.";
  } else if (score >= 50) {
    status = "Needs Attention";
    statusMessage =
      "The website has several technical signals that should be reviewed to strengthen its technical foundation.";
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
      <SectionHeading title="🌐 Technical SEO Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3">
                <span className="text-2xl">⚙️</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Technical Foundation Overview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  {statusMessage}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technical Score
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
                Technical Score
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
            title="Robots.txt"
            value={
              data.robotsFound
                ? "Found ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Sitemap.xml"
            value={
              data.sitemapFound
                ? "Found ✅"
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
            title="Images Missing ALT"
            value={data.imagesWithoutAlt.toString()}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ReportCard
            title="Robots.txt URL"
            value={data.robotsUrl}
          />

          <ReportCard
            title="Sitemap URL"
            value={data.sitemapUrl}
          />
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${getStatusContainer()}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Technical Status
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
              ? "All technical signals currently evaluated by the scanner passed."
              : `${totalChecks - passedChecks} technical signal(s) should be reviewed to strengthen the website foundation.`}
          </p>

          {!data.robotsFound && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a robots.txt file to provide search engines with crawling instructions.
            </p>
          )}

          {!data.sitemapFound && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a sitemap.xml file to help search engines discover important pages.
            </p>
          )}

          {!data.canonical && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a canonical URL to identify the preferred version of the page.
            </p>
          )}

          {data.imagesWithoutAlt > 0 && (
            <p className="mt-2 leading-7 text-slate-600">
              Review {data.imagesWithoutAlt} image(s) missing ALT attributes.
            </p>
          )}
        </div>
      </div>
    </>
  );
}