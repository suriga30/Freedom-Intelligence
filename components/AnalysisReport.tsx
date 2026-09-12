
"use client";

import { AnalysisResult } from "@/types/analysis";

import Dashboard from "./dashboard/Dashboard";

import AIConsultantSection from "./report/AIConsultantSection";
import BasicSeoSection from "./report/BasicSeoSection";
import TechnicalSeoSection from "./report/TechnicalSeoSection";
import SocialSection from "./report/SocialSection";
import SecuritySection from "./report/SecuritySection";
import ImageSection from "./report/ImageSection";
import LinkSection from "./report/LinkSection";
import AccessibilitySection from "./report/AccessibilitySection";
import PerformanceSection from "./report/PerformanceSection";
import RecommendationsSection from "./report/RecommendationsSection";

type Props = {
  data: AnalysisResult;
};

type NavigationItem = {
  id: string;
  label: string;
  status:
    | "excellent"
    | "good"
    | "warning"
    | "critical";
};

function getStatus(
  score: number
): NavigationItem["status"] {
  if (score >= 90) {
    return "excellent";
  }

  if (score >= 75) {
    return "good";
  }

  if (score >= 50) {
    return "warning";
  }

  return "critical";
}

function getStatusDot(
  status: NavigationItem["status"]
): string {
  if (status === "excellent") {
    return "bg-green-500";
  }

  if (status === "good") {
    return "bg-blue-500";
  }

  if (status === "warning") {
    return "bg-amber-500";
  }

  return "bg-red-500";
}

export default function AnalysisReport({
  data,
}: Props) {
  const socialScore = [
    data.ogTitle,
    data.ogDescription,
    data.ogImage,
    data.twitterTitle,
    data.twitterDescription,
    data.twitterImage,
  ].filter(Boolean).length;

  const calculatedSocialScore = Math.round(
    (socialScore / 6) * 100
  );

  const imageScore =
    data.totalImages === 0
      ? 100
      : Math.round(
          (data.imagesWithAlt / data.totalImages) * 100
        );

  const validLinks =
    data.internalLinks +
    data.externalLinks +
    data.emailLinks +
    data.telephoneLinks;

  const linkScore =
    data.totalLinks === 0
      ? 100
      : Math.round(
          (validLinks / data.totalLinks) * 100
        );

  const recommendationsScore =
    data.recommendations.length === 0
      ? 100
      : Math.max(
          0,
          100 -
            data.recommendations.filter(
              (item) => item.priority === "High"
            ).length *
              20 -
            data.recommendations.filter(
              (item) => item.priority === "Medium"
            ).length *
              10
        );

  const navigationItems: NavigationItem[] = [
    {
      id: "ai-consultant",
      label: "AI Consultant",
      status: getStatus(data.websiteIQ),
    },
    {
      id: "basic-seo",
      label: "Basic SEO",
      status: getStatus(data.score),
    },
    {
      id: "technical-seo",
      label: "Technical SEO",
      status: getStatus(data.technicalScore),
    },
    {
      id: "social",
      label: "Social",
      status: getStatus(calculatedSocialScore),
    },
    {
      id: "security",
      label: "Security",
      status: getStatus(data.https ? 100 : 0),
    },
    {
      id: "images",
      label: "Images",
      status: getStatus(imageScore),
    },
    {
      id: "links",
      label: "Links",
      status: getStatus(linkScore),
    },
    {
      id: "accessibility",
      label: "Accessibility",
      status: getStatus(data.accessibilityScore),
    },
    {
      id: "performance",
      label: "Performance",
      status: getStatus(data.performanceScore),
    },
    {
      id: "recommendations",
      label: "Recommendations",
      status: getStatus(recommendationsScore),
    },
  ];

  return (
    <section className="mt-10 space-y-8">
      <Dashboard data={data} />

      {/* Report Navigation */}
      <nav className="sticky top-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        <div className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Report Navigation
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${getStatusDot(
                  item.status
                )}`}
              />

              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 px-2 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Excellent
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Good
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Needs Attention
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Critical
          </div>
        </div>
      </nav>

      <div
        id="ai-consultant"
        className="scroll-mt-28"
      >
        <AIConsultantSection data={data} />
      </div>

      <div
        id="basic-seo"
        className="scroll-mt-28"
      >
        <BasicSeoSection data={data} />
      </div>

      <div
        id="technical-seo"
        className="scroll-mt-28"
      >
        <TechnicalSeoSection data={data} />
      </div>

      <div
        id="social"
        className="scroll-mt-28"
      >
        <SocialSection data={data} />
      </div>

      <div
        id="security"
        className="scroll-mt-28"
      >
        <SecuritySection https={data.https} />
      </div>

      <div
        id="images"
        className="scroll-mt-28"
      >
        <ImageSection data={data} />
      </div>

      <div
        id="links"
        className="scroll-mt-28"
      >
        <LinkSection data={data} />
      </div>

      <div
        id="accessibility"
        className="scroll-mt-28"
      >
        <AccessibilitySection data={data} />
      </div>

      <div
        id="performance"
        className="scroll-mt-28"
      >
        <PerformanceSection data={data} />
      </div>

      <div
        id="recommendations"
        className="scroll-mt-28"
      >
        <RecommendationsSection data={data} />
      </div>
    </section>
  );
}