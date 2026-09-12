import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function LinkSection({
  data,
}: Props) {
  const totalLinks = data.totalLinks;

  const internalPercentage =
    totalLinks > 0
      ? Math.round(
          (data.internalLinks / totalLinks) * 100
        )
      : 0;

  const externalPercentage =
    totalLinks > 0
      ? Math.round(
          (data.externalLinks / totalLinks) * 100
        )
      : 0;

  const classifiedLinks =
    data.internalLinks +
    data.externalLinks +
    data.emailLinks +
    data.telephoneLinks;

  const classificationCoverage =
    totalLinks > 0
      ? Math.round(
          (classifiedLinks / totalLinks) * 100
        )
      : 100;

  let structureMessage =
    "No links were detected on the scanned page.";

  if (totalLinks > 0) {
    if (internalPercentage >= 60) {
      structureMessage =
        "The page has a strong internal-link presence, which can help users and search engines discover related pages.";
    } else if (externalPercentage >= 60) {
      structureMessage =
        "The page contains a high proportion of external links. Review important navigation paths to ensure internal pages remain easy to discover.";
    } else {
      structureMessage =
        "The page contains a mixed internal and external link structure.";
    }
  }

  return (
    <>
      <SectionHeading title="🔗 Link Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <span className="text-2xl">🔗</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Link Structure Overview
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {structureMessage}
              </p>
            </div>
          </div>

          {totalLinks > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Internal / External Distribution
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {internalPercentage}% /{" "}
                  {externalPercentage}%
                </span>
              </div>

              <div className="flex h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="bg-blue-600"
                  style={{
                    width: `${internalPercentage}%`,
                  }}
                />

                <div
                  className="bg-purple-500"
                  style={{
                    width: `${externalPercentage}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  Internal
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                  External
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ReportCard
            title="Total Links"
            value={data.totalLinks.toString()}
          />

          <ReportCard
            title="Internal Links"
            value={`${data.internalLinks} (${internalPercentage}%)`}
          />

          <ReportCard
            title="External Links"
            value={`${data.externalLinks} (${externalPercentage}%)`}
          />

          <ReportCard
            title="Email Links"
            value={data.emailLinks.toString()}
          />

          <ReportCard
            title="Telephone Links"
            value={data.telephoneLinks.toString()}
          />

          <ReportCard
            title="Classification Coverage"
            value={`${classificationCoverage}%`}
          />
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${
            classificationCoverage >= 95
              ? "border-green-200 bg-green-50"
              : classificationCoverage >= 80
                ? "border-amber-200 bg-amber-50"
                : "border-red-200 bg-red-50"
          }`}
        >
          <h3 className="text-lg font-bold text-slate-900">
            Link Analysis
          </h3>

          <p className="mt-2 leading-7 text-slate-600">
            {classificationCoverage === 100
              ? "All detected links were successfully classified as internal, external, email, or telephone links."
              : `${totalLinks - classifiedLinks} link(s) could not be classified from the scanned HTML. Review unusual or malformed link targets if necessary.`}
          </p>
        </div>
      </div>
    </>
  );
}