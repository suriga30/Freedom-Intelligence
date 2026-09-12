import {
  CheckCircle2,
  Target,
  Sparkles,
} from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

import SectionHeading from "../SectionHeading";

type Props = {
  data: AnalysisResult;
};

export default function AIConsultantSection({
  data,
}: Props) {
  const consultant = data.aiConsultant;

  if (!consultant) {
    return null;
  }

  return (
    <>
      <SectionHeading title="🤖 AI Website Consultant" />

      <div className="space-y-6">
        {/* Executive Summary */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <Sparkles
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Executive Assessment
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {consultant.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Strengths */}
        {consultant.strengths.length > 0 && (
          <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                What Your Website Does Well
              </h3>
            </div>

            <div className="mt-5 space-y-3">
              {consultant.strengths.map(
                (strength, index) => (
                  <div
                    key={`${strength}-${index}`}
                    className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <p className="leading-6 text-green-900">
                      {strength}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Priorities */}
        {consultant.priorities.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3">
                <Target
                  size={22}
                  className="text-amber-600"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Recommended Priorities
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Focus on these areas first for the greatest
                  improvement.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {consultant.priorities.map(
                (priority, index) => (
                  <div
                    key={`${priority}-${index}`}
                    className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700 shadow-sm">
                      {index + 1}
                    </div>

                    <p className="leading-6 text-slate-700">
                      {priority}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}