export interface ScoreResult {
  score: number;
  rating: string;
}

export function calculateSeoScore(data: {
  title: string;
  description: string;
  h1: string;
  canonical: string;
}): ScoreResult {

  let score = 0;

  if (data.title) score += 25;
  if (data.description) score += 25;
  if (data.h1) score += 25;
  if (data.canonical) score += 25;

  let rating = "Poor";

  if (score >= 90) {
    rating = "Excellent";
  } else if (score >= 70) {
    rating = "Good";
  } else if (score >= 50) {
    rating = "Fair";
  }

  return {
    score,
    rating,
  };
}