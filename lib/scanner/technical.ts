export interface TechnicalScoreInput {
  robotsFound: boolean;
  sitemapFound: boolean;
  canonical: string;
  imagesWithoutAlt: number;
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
  // Image ALT hygiene — 20 points
  // =========================

  if (data.imagesWithoutAlt === 0) {
    score += 20;
  } else {
    const imagePenalty = Math.min(
      20,
      data.imagesWithoutAlt * 2
    );

    score += Math.max(
      0,
      20 - imagePenalty
    );
  }

  return Math.max(
    0,
    Math.min(100, score)
  );
}