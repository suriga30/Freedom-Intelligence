export interface WebsiteIQInput {
  seo: number;
  accessibility: number;
  performance: number;
  security: number;
  technical: number;
}

export interface WebsiteIQResult {
  score: number;
  rating: string;
}

export function calculateWebsiteIQ(
  data: WebsiteIQInput
): WebsiteIQResult {
  const score = Math.round(
    data.seo * 0.3 +
      data.accessibility * 0.2 +
      data.performance * 0.2 +
      data.security * 0.15 +
      data.technical * 0.15
  );

  let rating = "Poor";

  if (score >= 90) {
    rating = "Excellent";
  } else if (score >= 80) {
    rating = "Very Good";
  } else if (score >= 70) {
    rating = "Good";
  } else if (score >= 60) {
    rating = "Fair";
  } else if (score >= 50) {
    rating = "Needs Improvement";
  }

  return {
    score,
    rating,
  };
}