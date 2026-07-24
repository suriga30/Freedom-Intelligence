export interface Recommendation {
  priority: "High" | "Medium" | "Low";
  title: string;
  description: string;
}

export function generateRecommendations(data: {
  imagesWithoutAlt: number;
  robotsFound: boolean;
  sitemapFound: boolean;
  https: boolean;
}) {
  const recommendations: Recommendation[] = [];

  if (!data.https) {
    recommendations.push({
      priority: "High",
      title: "Enable HTTPS",
      description:
        "Your website is not using HTTPS. Enable SSL to improve security and SEO.",
    });
  }

  if (!data.robotsFound) {
    recommendations.push({
      priority: "Medium",
      title: "Add robots.txt",
      description:
        "Search engines use robots.txt to understand crawling rules.",
    });
  }

  if (!data.sitemapFound) {
    recommendations.push({
      priority: "Medium",
      title: "Create sitemap.xml",
      description:
        "A sitemap helps search engines discover your pages.",
    });
  }

  if (data.imagesWithoutAlt > 0) {
    recommendations.push({
      priority: "High",
      title: "Add ALT text",
      description:
        `${data.imagesWithoutAlt} images are missing ALT attributes.`,
    });
  }

  return recommendations;
}