import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

import SectionHeading from "../SectionHeading";

type Props = {
  data: AnalysisResult;
};

export default function RecommendationsSection({
  data,
}: Props) {
  const recommendations = data.recommendations || [];

  const highPriority = recommendations.filter(
    (item) => item.priority === "High"
  );

  const mediumPriority = recommendations.filter(
    (item) => item.priority === "Medium"
  );

  const lowPriority = recommendations.filter(
    (item) => item.priority === "Low"
  );

  if (recommendations.length === 0) {
    return (
      <>
        <SectionHeading title="💡 Recommendations" />

        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <CheckCircle2
                size={26}
                className="text-green-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-green-900">
                Excellent website health
              </h3>

              <p className="mt-2 leading-7 text-green-800">
                No recommendations were generated. Your
                website is currently meeting the checks
                performed by Freedom Intelligence.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionHeading title="💡 Recommendations" />

      <div className="space-y-8">
        {/* Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Lightbulb
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Improvement Opportunities
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Freedom Intelligence identified{" "}
              <span className="font-semibold text-slate-900">
              {recommendations.length}
              </span>{" "}
              {recommendations.length === 1
              ? "improvement opportunity"
              : "improvement opportunities"}{" "}
                across your website.
            </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                High Priority
              </p>

              <p className="mt-1 text-2xl font-bold text-red-900">
                {highPriority.length}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-700">
                Medium Priority
              </p>

              <p className="mt-1 text-2xl font-bold text-amber-900">
                {mediumPriority.length}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-600">
                Low Priority
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {lowPriority.length}
              </p>
            </div>
          </div>
        </div>

        {/* High Priority */}
        {highPriority.length > 0 && (
          <RecommendationGroup
            title="High Priority"
            description="Address these issues first because they can have the greatest impact on website quality."
            recommendations={highPriority}
            icon={
              <AlertCircle
                size={22}
                className="text-red-600"
              />
            }
            headerClass="border-red-200 bg-red-50"
          />
        )}

        {/* Medium Priority */}
        {mediumPriority.length > 0 && (
          <RecommendationGroup
            title="Medium Priority"
            description="These improvements can strengthen your website after the high-priority issues are addressed."
            recommendations={mediumPriority}
            icon={
              <AlertTriangle
                size={22}
                className="text-amber-600"
              />
            }
            headerClass="border-amber-200 bg-amber-50"
          />
        )}

        {/* Low Priority */}
        {lowPriority.length > 0 && (
          <RecommendationGroup
            title="Low Priority"
            description="These improvements are useful for polishing your website and improving completeness."
            recommendations={lowPriority}
            icon={
              <Lightbulb
                size={22}
                className="text-blue-600"
              />
            }
            headerClass="border-blue-200 bg-blue-50"
          />
        )}
      </div>
    </>
  );
}

type RecommendationGroupProps = {
  title: string;
  description: string;
  recommendations: AnalysisResult["recommendations"];
  icon: React.ReactNode;
  headerClass: string;
};

function RecommendationGroup({
  title,
  description,
  recommendations,
  icon,
  headerClass,
}: RecommendationGroupProps) {
  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl border p-5 ${headerClass}`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-white p-2 shadow-sm">
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 leading-6 text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={`${recommendation.title}-${index}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-lg font-bold text-slate-900">
                    {recommendation.title}
                  </h4>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      recommendation.priority ===
                      "High"
                        ? "bg-red-100 text-red-700"
                        : recommendation.priority ===
                            "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {recommendation.priority}
                  </span>
                </div>

                <p className="mt-3 leading-7 text-slate-600">
                  {recommendation.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Recommended Action
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    Review this issue and apply the recommended
                    improvement to strengthen your website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}