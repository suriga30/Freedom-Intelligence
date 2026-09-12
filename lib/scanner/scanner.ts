import { extractBasicSeo } from "./basicSeo";
import { calculateSeoScore } from "./score";
import { calculateHealth } from "./health";
import { scanRobots } from "./robots";
import { scanSitemap } from "./sitemap";
import { extractOpenGraph } from "./openGraph";
import { extractTwitterCards } from "./twitterCards";
import { scanSecurity } from "./security";
import { extractImages } from "./images";
import { extractLinks } from "./links";
import { scanPerformance } from "./performance";
import { generateRecommendations } from "./recommendations";
import { scanAccessibility } from "./accessibility";
import { calculateTechnicalScore } from "./technical";
import { calculateWebsiteIQ } from "./websiteIQ";
import { generateAIConsultant } from "./aiConsultant";

export async function scanWebsite(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch website.");
  }

  const html = await response.text();

  // =========================
  // SEO
  // =========================

  const seo = extractBasicSeo(html);

  // =========================
  // Open Graph
  // =========================

  const openGraph = extractOpenGraph(html);

  // =========================
  // Twitter Cards
  // =========================

  const twitter = extractTwitterCards(html);

  // =========================
  // Security
  // =========================

  const security = await scanSecurity(url);

  // =========================
  // Images
  // =========================

  const images = extractImages(html);

  // =========================
  // Links
  // =========================

  const links = extractLinks(html, url);

  // =========================
  // Performance
  // =========================

  const performance = await scanPerformance(url);

  // =========================
  // Accessibility
  // =========================

  const accessibility = scanAccessibility(html);

  // =========================
  // SEO Score
  // =========================

  const scoreResult = calculateSeoScore(seo);

  // =========================
  // Robots
  // =========================

  const robots = await scanRobots(url);

  // =========================
  // Sitemap
  // =========================

  const sitemap = await scanSitemap(url);

  // =========================
  // Technical Score
  // =========================

  const technicalScore = calculateTechnicalScore({
    robotsFound: robots.robotsFound,
    sitemapFound: sitemap.sitemapFound,
    canonical: seo.canonical,
    imagesWithoutAlt: images.imagesWithoutAlt,
  });

  // =========================
  // Website Health
  // =========================

  const health = calculateHealth({
    score: scoreResult.score,
    https: security.https,
    robotsFound: robots.robotsFound,
    sitemapFound: sitemap.sitemapFound,
    imagesWithoutAlt: images.imagesWithoutAlt,
    hasLang: accessibility.hasLang,
    hasViewport: accessibility.hasViewport,
    headingStructure: accessibility.headingStructure,
  });

  // =========================
  // Website IQ
  // =========================

  const websiteIQ = calculateWebsiteIQ({
    seo: scoreResult.score,
    accessibility: accessibility.accessibilityScore,
    performance: performance.performanceScore,
    security: security.https ? 100 : 0,
    technical: technicalScore,
  });

  // =========================
  // AI Recommendations
  // =========================

  const recommendations = generateRecommendations({
    seoScore: scoreResult.score,
    accessibilityScore: accessibility.accessibilityScore,
    performanceScore: performance.performanceScore,
    technicalScore,

    imagesWithoutAlt: images.imagesWithoutAlt,
    robotsFound: robots.robotsFound,
    sitemapFound: sitemap.sitemapFound,
    https: security.https,

    title: seo.title,
    description: seo.description,
    h1: seo.h1,
    canonical: seo.canonical,

    hasLang: accessibility.hasLang,
    hasViewport: accessibility.hasViewport,
    formsWithoutLabels: accessibility.formsWithoutLabels,
    headingStructure: accessibility.headingStructure,

    ogTitle: openGraph.ogTitle,
    ogDescription: openGraph.ogDescription,
    ogImage: openGraph.ogImage,

    twitterTitle: twitter.twitterTitle,
    twitterDescription: twitter.twitterDescription,
    twitterImage: twitter.twitterImage,
  });

  // =========================
  // AI Website Consultant
  // =========================

  const aiConsultant = generateAIConsultant({
    websiteIQ: websiteIQ.score,
    seoScore: scoreResult.score,
    accessibilityScore: accessibility.accessibilityScore,
    performanceScore: performance.performanceScore,
    technicalScore,
    securityScore: security.https ? 100 : 0,
    recommendations,
  });

  // =========================
  // Final Analysis Result
  // =========================

  return {
    success: true,
    website: url,

    // Basic SEO

    title: seo.title,
    description: seo.description,
    h1: seo.h1,
    canonical: seo.canonical,

    // SEO

    score: scoreResult.score,
    rating: scoreResult.rating,

    // Website IQ

    websiteIQ: websiteIQ.score,
    websiteIQRating: websiteIQ.rating,

    // Technical

    technicalScore,

    // Website Health

    overallHealth: health.overallHealth,
    healthGrade: health.grade,
    healthStatus: health.status,
    criticalIssues: health.criticalIssues,
    warnings: health.warnings,
    passedChecks: health.passedChecks,

    // Robots

    robotsUrl: robots.robotsUrl,
    robotsFound: robots.robotsFound,

    // Sitemap

    sitemapUrl: sitemap.sitemapUrl,
    sitemapFound: sitemap.sitemapFound,

    // Open Graph

    ogTitle: openGraph.ogTitle,
    ogDescription: openGraph.ogDescription,
    ogImage: openGraph.ogImage,

    // Twitter

    twitterTitle: twitter.twitterTitle,
    twitterDescription: twitter.twitterDescription,
    twitterImage: twitter.twitterImage,

    // Security

    https: security.https,

    // Images

    totalImages: images.totalImages,
    imagesWithAlt: images.imagesWithAlt,
    imagesWithoutAlt: images.imagesWithoutAlt,

    // Links

    totalLinks: links.totalLinks,
    internalLinks: links.internalLinks,
    externalLinks: links.externalLinks,
    emailLinks: links.emailLinks,
    telephoneLinks: links.telephoneLinks,

    // Performance

    responseTime: performance.responseTime,
    performanceRating: performance.performanceRating,
    performanceScore: performance.performanceScore,

    // Accessibility

    hasLang: accessibility.hasLang,
    hasViewport: accessibility.hasViewport,
    ariaLabels: accessibility.ariaLabels,
    formsWithoutLabels: accessibility.formsWithoutLabels,
    headingStructure: accessibility.headingStructure,
    accessibilityScore: accessibility.accessibilityScore,

    // Recommendations

    recommendations,

    // AI Consultant

    aiConsultant,
  };
}