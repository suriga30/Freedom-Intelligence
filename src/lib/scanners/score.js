export function calculateSeoScore(report) {
  let score = 0;

  // ==========================
  // BASIC SEO
  // ==========================

  if (report.title) score += 10;

  if (report.description) score += 10;

  if (report.h1) score += 10;

  if (report.canonical) score += 10;

  // ==========================
  // TECHNICAL SEO
  // ==========================

  if (report.metaRobots) score += 5;

  if (report.robotsStatus === "✅ Found") score += 10;

  if (report.sitemapStatus === "✅ Found") score += 10;

  if (report.faviconStatus === "✅ Found") score += 5;

  if (
    report.httpsStatus ===
    "✅ Secure (HTTPS)"
  ) {
    score += 10;
  }

  // ==========================
  // CONTENT
  // ==========================

  if (report.h2Count > 0) score += 5;

  if (report.h3Count > 0) score += 5;

  if (report.wordCount >= 300) score += 5;

  // ==========================
  // SCHEMA
  // ==========================

  if (report.schemaCount > 0) score += 10;

  // ==========================
  // LIMIT
  // ==========================

  return Math.min(score, 100);
}