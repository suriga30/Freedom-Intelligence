
"use client";

import {
  CheckCircle2,
  Target,
  Sparkles,
  ArrowRight,
  Lightbulb,
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

  const priorityCount = consultant.priorities.length;
  const strengthCount = consultant.strengths.length;

  return (
    <>
      <SectionHeading title="🤖 AI Website Consultant" />

      <div className="space-y-6">
        {/* Consultant Introduction */}
        <div className="overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-sm">
          <div className="flex items-start gap-4 p-6">
            <div className="rounded-2xl bg-indigo-600 p-3 text-white shadow-sm">
              <Sparkles size={26} />
            </div>

            <div className="min-w-0">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
                Intelligent Website Review
              </div>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                Your Website Assessment
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {consultant.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-3 border-t border-indigo-100 bg-white/70 p-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">
                Identified Strengths
              </div>

              <div className="mt-1 text-2xl font-bold text-green-600">
                {strengthCount}
              </div>

              <div className="text-xs text-slate-500">
                Positive signals detected
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">
                Recommended Priorities
              </div>

              <div className="mt-1 text-2xl font-bold text-amber-600">
                {priorityCount}
              </div>

              <div className="text-xs text-slate-500">
                Areas requiring attention
              </div>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-green-50 p-3">
              <CheckCircle2
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                What Your Website Does Well
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Positive signals identified during the website analysis.
              </p>
            </div>
          </div>

          {consultant.strengths.length > 0 ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {consultant.strengths.map(
                (strength, index) => (
                  <div
                    key={`${strength}-${index}`}
                    className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <p className="leading-6 text-green-950">
                      {strength}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              No major strengths were identified yet. Improving the
              highest-priority issues can help establish a stronger
              foundation.
            </div>
          )}
        </div>

        {/* Priorities */}
        <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
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

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Address these items first to create the greatest
                improvement in your website’s overall quality.
              </p>
            </div>
          </div>

          {consultant.priorities.length > 0 ? (
            <div className="mt-5 space-y-3">
              {consultant.priorities.map(
                (priority, index) => (
                  <div
                    key={`${priority}-${index}`}
                    className="flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="leading-6 text-slate-800">
                        {priority}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs font-medium text-amber-700">
                        <ArrowRight size={14} />
                        Recommended action
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">
              Your current scan did not identify any major priorities.
              Continue monitoring your website regularly.
            </div>
          )}
        </div>

        {/* Consultant Guidance */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <Lightbulb
              size={22}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <h3 className="font-bold text-blue-950">
                Consultant Guidance
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-900">
                Start with the first recommended priority, complete the
                improvement, and scan your website again to measure
                progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}