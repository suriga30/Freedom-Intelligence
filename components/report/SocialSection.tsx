import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function SocialSection({
  data,
}: Props) {
  const checks = [
    Boolean(data.ogTitle),
    Boolean(data.ogDescription),
    Boolean(data.ogImage),
    Boolean(data.twitterTitle),
    Boolean(data.twitterDescription),
    Boolean(data.twitterImage),
  ];

  const passedChecks = checks.filter(Boolean).length;
  const totalChecks = checks.length;

  const socialScore = Math.round(
    (passedChecks / totalChecks) * 100
  );

  let status = "Needs Improvement";
  let statusMessage =
    "Your social sharing metadata is incomplete. Adding the missing Open Graph and Twitter Card signals will improve how your pages appear when shared.";

  if (socialScore === 100) {
    status = "Excellent";
    statusMessage =
      "Your social sharing metadata is complete across the Open Graph and Twitter Card signals currently evaluated by Freedom Intelligence.";
  } else if (socialScore >= 75) {
    status = "Good";
    statusMessage =
      "Your social sharing metadata is mostly complete, with a few opportunities to improve social previews.";
  } else if (socialScore >= 50) {
    status = "Needs Attention";
    statusMessage =
      "Your social sharing metadata is partially configured. Several signals should be added to create stronger social previews.";
  }

  const getScoreColor = () => {
    if (socialScore === 100) {
      return "bg-green-500";
    }

    if (socialScore >= 75) {
      return "bg-blue-500";
    }

    if (socialScore >= 50) {
      return "bg-amber-500";
    }

    return "bg-red-500";
  };

  const getStatusContainer = () => {
    if (socialScore === 100) {
      return "border-green-200 bg-green-50";
    }

    if (socialScore >= 75) {
      return "border-blue-200 bg-blue-50";
    }

    if (socialScore >= 50) {
      return "border-amber-200 bg-amber-50";
    }

    return "border-red-200 bg-red-50";
  };

  return (
    <>
      <SectionHeading title="📱 Social Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3">
                <span className="text-2xl">📱</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Social Sharing Overview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  {statusMessage}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Social Score
              </p>

              <p className="mt-1 text-4xl font-bold text-slate-900">
                {socialScore}
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
                Social Metadata Coverage
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {socialScore}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${getScoreColor()}`}
                style={{
                  width: `${socialScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ReportCard
            title="Open Graph Title"
            value={
              data.ogTitle
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Open Graph Description"
            value={
              data.ogDescription
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Open Graph Image"
            value={
              data.ogImage
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Twitter Card Title"
            value={
              data.twitterTitle
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Twitter Card Description"
            value={
              data.twitterDescription
                ? "Present ✅"
                : "Missing ❌"
            }
          />

          <ReportCard
            title="Twitter Card Image"
            value={
              data.twitterImage
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
          {data.ogTitle && (
            <ReportCard
              title="Open Graph Title Content"
              value={data.ogTitle}
            />
          )}

          {data.ogDescription && (
            <ReportCard
              title="Open Graph Description Content"
              value={data.ogDescription}
            />
          )}

          {data.ogImage && (
            <ReportCard
              title="Open Graph Image URL"
              value={data.ogImage}
            />
          )}

          {data.twitterTitle && (
            <ReportCard
              title="Twitter Card Title Content"
              value={data.twitterTitle}
            />
          )}

          {data.twitterDescription && (
            <ReportCard
              title="Twitter Card Description Content"
              value={data.twitterDescription}
            />
          )}

          {data.twitterImage && (
            <ReportCard
              title="Twitter Card Image URL"
              value={data.twitterImage}
            />
          )}
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${getStatusContainer()}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Social Status
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
              ? "All social metadata signals currently evaluated by Freedom Intelligence are present."
              : `${totalChecks - passedChecks} social metadata signal(s) should be reviewed to improve link previews and social sharing.`}
          </p>

          {!data.ogTitle && (
            <p className="mt-2 leading-7 text-slate-600">
              Add an Open Graph title for a clear social sharing headline.
            </p>
          )}

          {!data.ogDescription && (
            <p className="mt-2 leading-7 text-slate-600">
              Add an Open Graph description to provide useful context when the page is shared.
            </p>
          )}

          {!data.ogImage && (
            <p className="mt-2 leading-7 text-slate-600">
              Add an Open Graph image to create a richer visual preview.
            </p>
          )}

          {!data.twitterTitle && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a Twitter Card title for improved social presentation.
            </p>
          )}

          {!data.twitterDescription && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a Twitter Card description to provide useful context when shared.
            </p>
          )}

          {!data.twitterImage && (
            <p className="mt-2 leading-7 text-slate-600">
              Add a Twitter Card image for a richer visual preview.
            </p>
          )}
        </div>
      </div>
    </>
  );
}