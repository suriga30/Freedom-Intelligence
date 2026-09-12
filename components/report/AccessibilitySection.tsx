import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function AccessibilitySection({
  data,
}: Props) {
  const score = data.accessibilityScore;

  const checks = [
    data.hasLang,
    data.hasViewport,
    data.formsWithoutLabels === 0,
    data.headingStructure,
  ];

  const passedChecks = checks.filter(Boolean).length;
  const totalChecks = checks.length;

  let status = "Needs Improvement";
  let statusMessage =
    "Several accessibility signals need attention. Review the failed checks below to improve the experience for users of assistive technologies.";

  if (score >= 90) {
    status = "Excellent";
    statusMessage =
      "The scanned page has strong accessibility signals across the checks performed by Freedom Intelligence.";
  } else if (score >= 75) {
    status = "Good";
    statusMessage =
      "The scanned page has a generally good accessibility foundation, with some opportunities for improvement.";
  } else if (score >= 50) {
    status = "Needs Attention";
    statusMessage =
      "The scanned page has several accessibility opportunities that should be addressed to improve usability and accessibility.";
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
      <SectionHeading title="♿ Accessibility Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3">
                <span className="text-2xl">♿</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Accessibility Overview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  {statusMessage}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Accessibility Score
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
                Accessibility Score
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ReportCard
            title="HTML Lang Attribute"
            value={
              data.hasLang
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Viewport Meta Tag"
            value={
              data.hasViewport
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Forms Without Labels"
            value={data.formsWithoutLabels.toString()}
          />

          <ReportCard
            title="Heading Structure"
            value={
              data.headingStructure
                ? "Correct ✅"
                : "Needs Review ❌"
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ReportCard
            title="ARIA Labels"
            value={data.ariaLabels.toString()}
          />

          <ReportCard
            title="Checks Passed"
            value={`${passedChecks}/${totalChecks}`}
          />
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${getStatusContainer()}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Accessibility Status
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
            {data.formsWithoutLabels > 0
              ? `${data.formsWithoutLabels} form field(s) may need accessible labels.`
              : "No unlabeled form fields were detected in the scanned page."}
          </p>

          {!data.hasLang && (
            <p className="mt-2 leading-7 text-slate-600">
              The HTML language attribute should be reviewed.
            </p>
          )}

          {!data.hasViewport && (
            <p className="mt-2 leading-7 text-slate-600">
              The viewport meta tag should be reviewed for responsive behavior.
            </p>
          )}

          {!data.headingStructure && (
            <p className="mt-2 leading-7 text-slate-600">
              The heading structure should be reviewed to ensure one clear H1 is present.
            </p>
          )}
        </div>
      </div>
    </>
  );
}