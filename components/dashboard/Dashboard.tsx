import { AnalysisResult } from "@/types/analysis";

import DashboardHeader from "./DashboardHeader";
import WebsiteIQCard from "./WebsiteIQCard";
import AiSummaryCard from "./AiSummaryCard";
import DashboardMetrics from "./DashboardMetrics";
import StatsBar from "./StatsBar";
import ScoreBreakdownChart from "./charts/ScoreBreakdownChart";
import WebsiteIntelligenceCard from "./charts/WebsiteIntelligenceCard";

type Props = {
  data: AnalysisResult;
};

export default function Dashboard({ data }: Props) {
  const performance = data.performanceScore;
  const security = data.https ? 100 : 0;

  const summary =
    data.websiteIQ >= 90
      ? data.criticalIssues > 0
        ? `Your website has an excellent Website IQ of ${data.websiteIQ}/100, but ${data.criticalIssues} critical issue(s) still require attention. Resolve those issues to maintain strong overall website quality.`
        : data.warnings > 0
          ? `Excellent! Your website has a Website IQ of ${data.websiteIQ}/100 and is performing strongly overall. There are ${data.warnings} warning(s) worth reviewing to further improve website quality.`
          : `Excellent! Your website has a Website IQ of ${data.websiteIQ}/100 and is performing strongly across SEO, accessibility, performance, security, and technical health.`
      : data.websiteIQ >= 75
        ? data.criticalIssues > 0
          ? `Your website has a good Website IQ of ${data.websiteIQ}/100, but ${data.criticalIssues} critical issue(s) need attention. Address these issues first to further improve overall website quality.`
          : data.warnings > 0
            ? `Your website has a good Website IQ of ${data.websiteIQ}/100. There are ${data.warnings} warning(s) that should be reviewed to further improve SEO, accessibility, performance, security, and technical health.`
            : `Your website has a good Website IQ of ${data.websiteIQ}/100 with no critical issues or warnings detected. Continue monitoring and maintaining your website.`
        : data.websiteIQ >= 50
          ? data.criticalIssues > 0
            ? `Your website has a Website IQ of ${data.websiteIQ}/100 and needs improvement. ${data.criticalIssues} critical issue(s) require attention. Address those first, followed by the ${data.warnings} warning(s), to improve overall website quality.`
            : data.warnings > 0
              ? `Your website has a Website IQ of ${data.websiteIQ}/100 and needs improvement. No critical issues were detected, but ${data.warnings} warning(s) should be addressed to improve overall website quality.`
              : `Your website has a Website IQ of ${data.websiteIQ}/100 and has opportunities for improvement across SEO, accessibility, performance, security, and technical health.`
          : data.criticalIssues > 0
            ? `Your website has a low Website IQ of ${data.websiteIQ}/100 and requires significant improvement. ${data.criticalIssues} critical issue(s) require immediate attention.`
            : data.warnings > 0
              ? `Your website has a low Website IQ of ${data.websiteIQ}/100 and requires significant improvement. No critical issues were detected, but ${data.warnings} warning(s) should be addressed to improve overall website quality.`
              : `Your website has a low Website IQ of ${data.websiteIQ}/100 and requires significant improvement. Review the detailed analysis to identify the highest-impact opportunities.`;

  return (
    <div className="mb-12 space-y-8">
      {/* Hidden in PDF to avoid duplicating the main report header */}
      <div className="print:hidden">
        <DashboardHeader website={data.website} />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <WebsiteIQCard
          score={data.websiteIQ}
          rating={data.websiteIQRating}
          overallHealth={data.overallHealth}
          grade={data.healthGrade}
          status={data.healthStatus}
        />

        <AiSummaryCard summary={summary} />
      </div>

      <DashboardMetrics data={data} />

      <StatsBar
        criticalIssues={data.criticalIssues}
        warnings={data.warnings}
        passedChecks={data.passedChecks}
      />

      <div className="grid gap-8 xl:grid-cols-2">
        <ScoreBreakdownChart
          seo={data.score}
          performance={performance}
          accessibility={data.accessibilityScore}
          security={security}
          technical={data.technicalScore}
        />

        <WebsiteIntelligenceCard
          seo={data.score}
          performance={performance}
          accessibility={data.accessibilityScore}
          security={security}
          technical={data.technicalScore}
        />
      </div>
    </div>
  );
}