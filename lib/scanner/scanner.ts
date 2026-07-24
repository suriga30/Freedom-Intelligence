import { extractBasicSeo } from "./basicSeo";
import { calculateSeoScore } from "./score";
import { scanRobots } from "./robots";
import { scanSitemap } from "./sitemap";
import { extractOpenGraph } from "./openGraph";
import { extractTwitterCards } from "./twitterCards";
import { scanSecurity } from "./security";
import { extractImages } from "./images";
import { extractLinks } from "./links";
import { scanPerformance } from "./performance";
import { generateRecommendations } from "./recommendations";

export async function scanWebsite(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch website.");
  }

  const html = await response.text();

  // SEO
  const seo = extractBasicSeo(html);

  // Open Graph
  const openGraph = extractOpenGraph(html);

  // Twitter Cards
  const twitter = extractTwitterCards(html);

  // Security
  const security = await scanSecurity(url);

  // Images
  const images = extractImages(html);

  // Links
  const links = extractLinks(html, url);

  // Performance
  const performance = await scanPerformance(url);

  // SEO Score
  const scoreResult = calculateSeoScore(seo);

  // Robots
  const robots = await scanRobots(url);

  // Sitemap
  const sitemap = await scanSitemap(url);

  // AI Recommendations
  const recommendations = generateRecommendations({
    imagesWithoutAlt: images.imagesWithoutAlt,
    robotsFound: robots.robotsFound,
    sitemapFound: sitemap.sitemapFound,
    https: security.https,
  });

  return {
    success: true,

    website: url,

    title: seo.title,
    description: seo.description,
    h1: seo.h1,
    canonical: seo.canonical,

    score: scoreResult.score,
    rating: scoreResult.rating,

    robotsUrl: robots.robotsUrl,
    robotsFound: robots.robotsFound,

    sitemapUrl: sitemap.sitemapUrl,
    sitemapFound: sitemap.sitemapFound,

    ogTitle: openGraph.ogTitle,
    ogDescription: openGraph.ogDescription,
    ogImage: openGraph.ogImage,

    twitterTitle: twitter.twitterTitle,
    twitterDescription: twitter.twitterDescription,
    twitterImage: twitter.twitterImage,

    https: security.https,

    totalImages: images.totalImages,
    imagesWithAlt: images.imagesWithAlt,
    imagesWithoutAlt: images.imagesWithoutAlt,

    totalLinks: links.totalLinks,
    internalLinks: links.internalLinks,
    externalLinks: links.externalLinks,
    emailLinks: links.emailLinks,
    telephoneLinks: links.telephoneLinks,

    responseTime: performance.responseTime,
    performanceRating: performance.performanceRating,

    recommendations,
  };
}