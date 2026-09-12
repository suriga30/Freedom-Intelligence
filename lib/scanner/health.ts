export interface HealthResult {
  overallHealth: number;
  grade: string;
  status: string;
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
  hasLang: boolean;
  hasViewport: boolean;
  headingStructure: boolean;
}): HealthResult {
  let health = 0;

  let criticalIssues = 0;
  let warnings = 0;
  let passedChecks = 0;

  // HTTPS — 20 points
  if (data.https) {
    health += 20;
    passedChecks++;
  } else {
    criticalIssues++;
  }

  // Robots.txt — 10 points
  if (data.robotsFound) {
    health += 10;
    passedChecks++;
  } else {
    warnings++;
  }

  // Sitemap — 10 points
  if (data.sitemapFound) {
    health += 10;
    passedChecks++;
  } else {
    warnings++;
  }

  // Images with ALT text — 15 points
  if (data.imagesWithoutAlt === 0) {
    health += 15;
    passedChecks++;
  } else {
    warnings++;
  }

  // HTML language — 10 points
  if (data.hasLang) {
    health += 10;
    passedChecks++;
  } else {
    warnings++;
  }

  // Viewport — 10 points
  if (data.hasViewport) {
    health += 10;
    passedChecks++;
  } else {
    warnings++;
  }

  // Heading structure — 25 points
  if (data.headingStructure) {
    health += 25;
    passedChecks++;
  } else {
    warnings++;
  }

  health = Math.max(0, Math.min(100, health));

  let grade = "F";

  if (health >= 97) {
    grade = "A+";
  } else if (health >= 90) {
    grade = "A";
  } else if (health >= 80) {
    grade = "B";
  } else if (health >= 70) {
    grade = "C";
  } else if (health >= 60) {
    grade = "D";
  }

  let status = "Poor";

  if (health >= 97) {
    status = "Outstanding";
  } else if (health >= 90) {
    status = "Excellent";
  } else if (health >= 80) {
    status = "Good";
  } else if (health >= 70) {
    status = "Fair";
  } else if (health >= 60) {
    status = "Needs Improvement";
  }

  return {
    overallHealth: health,
    grade,
    status,
    criticalIssues,
    warnings,
    passedChecks,
  };
}