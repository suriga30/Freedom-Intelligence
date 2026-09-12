import { Recommendation } from "./recommendations";

export interface AIConsultantResult {
  summary: string;
  strengths: string[];
  priorities: string[];
}

export function generateAIConsultant(data: {
  websiteIQ: number;
  seoScore: number;
  accessibilityScore: number;
  performanceScore: number;
  technicalScore: number;
  securityScore: number;
  recommendations: Recommendation[];
}): AIConsultantResult {
  const strengths: string[] = [];
  const priorities: string[] = [];

  // =========================
  // STRENGTHS
  // =========================

  if (data.securityScore >= 90) {
    strengths.push("Security is strong with HTTPS enabled.");
  }

  if (data.performanceScore >= 90) {
    strengths.push(
      "Website performance is excellent based on the measured response time."
    );
  } else if (data.performanceScore >= 75) {
    strengths.push(
      "Website performance is good, with reasonable response speed."
    );
  }

  if (data.accessibilityScore >= 90) {
    strengths.push(
      "Accessibility signals are strong across the scanned page."
    );
  }

  if (data.seoScore >= 90) {
    strengths.push(
      "The website has a strong basic SEO foundation."
    );
  } else if (data.seoScore >= 75) {
    strengths.push(
      "The website has a good basic SEO foundation."
    );
  }

  if (data.technicalScore >= 90) {
    strengths.push(
      "Technical website health is excellent."
    );
  } else if (data.technicalScore >= 75) {
    strengths.push(
      "Technical website health is generally strong."
    );
  }

  // =========================
  // PRIORITIES
  // =========================

  if (data.securityScore < 90) {
    priorities.push(
      "Improve website security and ensure HTTPS is enabled."
    );
  }

  if (data.seoScore < 75) {
    priorities.push(
      "Strengthen the SEO foundation, starting with page metadata and headings."
    );
  }

  if (data.performanceScore < 75) {
    priorities.push(
      "Improve loading performance and reduce server response time."
    );
  }

  if (data.accessibilityScore < 75) {
    priorities.push(
      "Improve accessibility by addressing missing language, viewport, heading, and form-label signals."
    );
  }

  if (data.technicalScore < 75) {
    priorities.push(
      "Strengthen technical website health by improving crawling, sitemap, canonical, and image signals."
    );
  }

  // Add recommendation priorities
  for (const recommendation of data.recommendations) {
    if (
      recommendation.priority === "High" &&
      !priorities.includes(recommendation.title)
    ) {
      priorities.push(recommendation.title);
    }
  }

  // =========================
  // SUMMARY
  // =========================

  let summary = "";

  if (data.websiteIQ >= 90) {
    summary = `Your website has an excellent Website IQ of ${data.websiteIQ}/100. The overall foundation is strong, with only a small number of opportunities requiring attention.`;
  } else if (data.websiteIQ >= 75) {
    summary = `Your website has a good Website IQ of ${data.websiteIQ}/100. The core foundation is healthy, but several areas can still be improved to reach a stronger overall level.`;
  } else if (data.websiteIQ >= 50) {
    summary = `Your website has a Website IQ of ${data.websiteIQ}/100 and has clear opportunities for improvement. Focus first on the highest-impact weaknesses before making lower-priority changes.`;
  } else {
    summary = `Your website has a Website IQ of ${data.websiteIQ}/100 and requires significant improvement. Address the highest-priority issues first to establish a stronger website foundation.`;
  }

  return {
    summary,
    strengths,
    priorities: priorities.slice(0, 6),
  };
}