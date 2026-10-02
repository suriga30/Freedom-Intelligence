export interface TechnicalScoreInput {
  robotsFound: boolean;
  sitemapFound: boolean;
  canonical: string;
  totalImages: number;
  imagesWithAlt: number;
}

export function calculateTechnicalScore(
  data: TechnicalScoreInput
): number {
  let score = 0;

  // =========================
  // Robots.txt — 25 points
  // =========================
  if (data.robotsFound) {
    score += 25;
  }

  // =========================
  // Sitemap.xml — 25 points
  // =========================
  if (data.sitemapFound) {
    score += 25;
  }

  // =========================
  // Canonical URL — 30 points
  // =========================
  if (data.canonical) {
    score += 30;
  }

  // =========================
  // Image ALT coverage — 20 points
  // =========================
  let imageAltScore = 20;

  if (data.totalImages > 0) {
    const altCoverage =
      data.imagesWithAlt / data.totalImages;

    imageAltScore = Math.round(
      altCoverage * 20
    );
  }

  score += imageAltScore;

  return Math.max(
    0,
    Math.min(100, score)
  );
}