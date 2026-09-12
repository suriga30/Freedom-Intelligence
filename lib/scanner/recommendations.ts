export interface Recommendation {
  priority: "High" | "Medium" | "Low";
  title: string;
  description: string;
}

export function generateRecommendations(data: {
  seoScore: number;
  accessibilityScore: number;
  performanceScore: number;
  technicalScore: number;

  imagesWithoutAlt: number;

  robotsFound: boolean;
  sitemapFound: boolean;
  https: boolean;

  title: string;
  description: string;
  h1: string;
  canonical: string;

  hasLang: boolean;
  hasViewport: boolean;
  formsWithoutLabels: number;
  headingStructure: boolean;

  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // =========================
  // SECURITY
  // =========================

  if (!data.https) {
    recommendations.push({
      priority: "High",
      title: "Enable HTTPS",
      description:
        "Your website is not using HTTPS. Install and configure an SSL certificate to protect visitors, improve trust, and support secure search traffic.",
    });
  }

  // =========================
  // SEO
  // =========================

  if (!data.title) {
    recommendations.push({
      priority: "High",
      title: "Add a page title",
      description:
        "Your page is missing a title tag. Add a clear, descriptive title that explains the page content and targets the primary search intent.",
    });
  }

  if (!data.description) {
    recommendations.push({
      priority: "High",
      title: "Add a meta description",
      description:
        "Your page is missing a meta description. Add a concise description that summarizes the page and encourages users to click from search results.",
    });
  }

  if (!data.h1) {
    recommendations.push({
      priority: "High",
      title: "Add an H1 heading",
      description:
        "Your page does not have an H1 heading. Add one clear primary heading that describes the main purpose of the page.",
    });
  }

  if (data.h1 && !data.headingStructure) {
    recommendations.push({
      priority: "Medium",
      title: "Improve heading structure",
      description:
        "Your heading structure should contain one clear H1. Review the page headings and organize them into a logical hierarchy.",
    });
  }

  if (!data.canonical) {
    recommendations.push({
      priority: "Medium",
      title: "Add a canonical URL",
      description:
        "Your page is missing a canonical URL. Add one to help search engines understand which version of the page should be considered authoritative.",
    });
  }

  // =========================
  // CRAWLING
  // =========================

  if (!data.robotsFound) {
    recommendations.push({
      priority: "Medium",
      title: "Add robots.txt",
      description:
        "Your website does not have a robots.txt file. Add one to provide search engines with clear crawling instructions.",
    });
  }

  if (!data.sitemapFound) {
    recommendations.push({
      priority: "Medium",
      title: "Create sitemap.xml",
      description:
        "Your website does not have a sitemap.xml file. Create and submit a sitemap to help search engines discover important pages.",
    });
  }

  // =========================
  // IMAGES
  // =========================

  if (data.imagesWithoutAlt > 0) {
    recommendations.push({
      priority:
        data.imagesWithoutAlt >= 5 ? "High" : "Medium",
      title: "Add descriptive ALT text",
      description:
        `${data.imagesWithoutAlt} image(s) are missing ALT attributes. Add meaningful alternative text to improve accessibility and help search engines understand your images.`,
    });
  }

  // =========================
  // ACCESSIBILITY
  // =========================

  if (!data.hasLang) {
    recommendations.push({
      priority: "Medium",
      title: "Add the HTML language attribute",
      description:
        "The HTML element is missing a language attribute. Add the correct lang value so assistive technologies can identify the page language.",
    });
  }

  if (!data.hasViewport) {
    recommendations.push({
      priority: "Medium",
      title: "Add the viewport meta tag",
      description:
        "Your page is missing a viewport declaration. Add a responsive viewport meta tag to ensure the website behaves correctly on mobile devices.",
    });
  }

  if (data.formsWithoutLabels > 0) {
    recommendations.push({
      priority: "High",
      title: "Label form fields",
      description:
        `${data.formsWithoutLabels} form field(s) may not have associated labels. Add accessible labels so users of assistive technologies can understand and operate the forms.`,
    });
  }

  // =========================
  // SOCIAL / SHARING
  // =========================

  if (!data.ogTitle) {
    recommendations.push({
      priority: "Low",
      title: "Add an Open Graph title",
      description:
        "Add an og:title value so your pages have a clear title when shared on social platforms and messaging applications.",
    });
  }

  if (!data.ogDescription) {
    recommendations.push({
      priority: "Low",
      title: "Add an Open Graph description",
      description:
        "Add an og:description value to control the description displayed when your page is shared.",
    });
  }

  if (!data.ogImage) {
    recommendations.push({
      priority: "Low",
      title: "Add an Open Graph image",
      description:
        "Add an og:image so shared links can display an appropriate preview image.",
    });
  }

  if (!data.twitterTitle) {
    recommendations.push({
      priority: "Low",
      title: "Add a Twitter Card title",
      description:
        "Add a Twitter Card title to improve how your page is presented when shared on supported social platforms.",
    });
  }

  if (!data.twitterDescription) {
    recommendations.push({
      priority: "Low",
      title: "Add a Twitter Card description",
      description:
        "Add a Twitter Card description to provide useful context when your page is shared.",
    });
  }

  if (!data.twitterImage) {
    recommendations.push({
      priority: "Low",
      title: "Add a Twitter Card image",
      description:
        "Add a Twitter Card image to create a richer visual preview when your page is shared.",
    });
  }

  // =========================
  // PERFORMANCE
  // =========================

  if (data.performanceScore < 60) {
    recommendations.push({
      priority: "High",
      title: "Improve website performance",
      description:
        "Your measured performance score is low. Reduce server response time and optimize page resources to improve loading speed and user experience.",
    });
  } else if (data.performanceScore < 80) {
    recommendations.push({
      priority: "Medium",
      title: "Optimize loading performance",
      description:
        "Your website performance has room for improvement. Review server response time, images, scripts, and other page resources.",
    });
  }

  // =========================
  // TECHNICAL HEALTH
  // =========================

  if (data.technicalScore < 60) {
    recommendations.push({
      priority: "High",
      title: "Improve technical website health",
      description:
        "Your technical score is low. Address missing crawling, canonical, and technical website signals to strengthen the technical foundation of the website.",
    });
  } else if (data.technicalScore < 80) {
    recommendations.push({
      priority: "Medium",
      title: "Strengthen technical SEO",
      description:
        "Your technical score indicates several opportunities for improvement. Review crawling, indexing, canonicalization, and other technical website signals.",
    });
  }

  // =========================
  // OVERALL SEO
  // =========================

  if (data.seoScore < 50) {
    recommendations.push({
      priority: "High",
      title: "Improve overall SEO foundation",
      description:
        "Your SEO score is low. Start with the page title, meta description, H1, and canonical URL, then address technical search signals.",
    });
  } else if (data.seoScore < 75) {
    recommendations.push({
      priority: "Medium",
      title: "Strengthen on-page SEO",
      description:
        "Your SEO foundation is incomplete. Review page metadata, headings, and canonicalization to improve search visibility.",
    });
  }

  // =========================
  // SORT BY PRIORITY
  // =========================

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  recommendations.sort(
    (a, b) =>
      priorityOrder[a.priority] -
      priorityOrder[b.priority]
  );

  return recommendations;
}