import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function PerformanceSection({
  data,
}: Props) {
  const score = data.performanceScore;
  const responseTime = data.responseTime;

  let status = "Poor";
  let statusMessage =
    "The measured server response time indicates that performance should be improved.";

  if (score >= 90) {
    status = "Excellent";
    statusMessage =
      "The website responded very quickly during the scan, indicating strong server response performance.";
  } else if (score >= 75) {
    status = "Good";
    statusMessage =
      "The website demonstrated good response performance during the scan, with some room for optimization.";
  } else if (score >= 60) {
    status = "Needs Attention";
    statusMessage =
      "The measured response time indicates that performance could be improved.";
  }

  const getScoreColor = () => {
    if (score >= 90) {
      return "bg-green-500";
    }

    if (score >= 75) {
      return "bg-blue-500";
    }

    if (score >= 60) {
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

    if (score >= 60) {
      return "border-amber-200 bg-amber-50";
    }

    return "border-red-200 bg-red-50";
  };

  return (
    <>
      <SectionHeading title="⚡ Performance Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-green-50 p-3">
                <span className="text-2xl">⚡</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Server Response Overview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  {statusMessage}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Performance Score
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
                Performance Score
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
            title="Response Time"
            value={`${responseTime} ms`}
          />

          <ReportCard
            title="Performance Rating"
            value={data.performanceRating}
          />

          <ReportCard
            title="Performance Score"
            value={`${score}/100`}
          />

          <ReportCard
            title="Measurement Method"
            value="Median of 3 server requests"
          />
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${getStatusContainer()}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Performance Status
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {status}
              </p>
            </div>

            <div className="text-2xl font-bold text-slate-900">
              {responseTime} ms
            </div>
          </div>

          <p className="mt-3 leading-7 text-slate-600">
            The scanner measures server response time using three
            requests and uses the median measurement to reduce the
            effect of temporary network variation.
          </p>

          {score >= 90 && (
            <p className="mt-2 leading-7 text-slate-600">
              The measured response time is within the excellent
              performance range used by Freedom Intelligence.
            </p>
          )}

          {score >= 75 && score < 90 && (
            <p className="mt-2 leading-7 text-slate-600">
              Performance is good, but further server and resource
              optimization may improve responsiveness.
            </p>
          )}

          {score >= 60 && score < 75 && (
            <p className="mt-2 leading-7 text-slate-600">
              Review server response time and page resources for
              opportunities to improve loading performance.
            </p>
          )}

          {score < 60 && (
            <p className="mt-2 leading-7 text-slate-600">
              The response time is relatively slow. Prioritize
              server optimization and investigate heavy resources,
              scripts, and infrastructure configuration.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">
            Measurement Note
          </p>

          <p className="mt-2 leading-7 text-blue-800">
            This V1 performance assessment is based on server
            response time measured by Freedom Intelligence. It is
            not a Lighthouse or Core Web Vitals measurement.
          </p>
        </div>
      </div>
    </>
  );
}