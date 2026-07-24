export interface HealthResult {
  overallHealth: number;
  grade: string;
  criticalIssues: number;
  warnings: number;
  passedChecks: number;
}

export function calculateHealth(data: {
  score: number;
  https: boolean;
  robotsFound: boolean;
  sitemapFound: boolean;
  imagesWithoutAlt: number;
}) : HealthResult {

  let health = data.score;

  let criticalIssues = 0;
  let warnings = 0;

  if (!data.https) {
    criticalIssues++;
    health -= 20;
  }

  if (!data.robotsFound) {
    warnings++;
    health -= 5;
  }

  if (!data.sitemapFound) {
    warnings++;
    health -= 5;
  }

  if (data.imagesWithoutAlt > 0) {
    warnings++;
    health -= Math.min(10, data.imagesWithoutAlt);
  }

  if (health < 0) health = 0;

  let grade = "F";

  if (health >= 90) grade = "A";
  else if (health >= 80) grade = "B";
  else if (health >= 70) grade = "C";
  else if (health >= 60) grade = "D";

  return {
    overallHealth: health,
    grade,
    criticalIssues,
    warnings,
    passedChecks: 5 - criticalIssues - warnings,
  };
}