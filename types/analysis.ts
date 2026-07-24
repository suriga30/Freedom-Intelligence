export interface Recommendation {
  priority: "High" | "Medium" | "Low";
  title: string;
  description: string;
}

export interface AnalysisResult {
  success: boolean;

  website: string;

  title: string;
  description: string;
  h1: string;
  canonical: string;

  score: number;
  rating: string;

  robotsUrl: string;
  robotsFound: boolean;

  sitemapUrl: string;
  sitemapFound: boolean;

  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  https: boolean;

  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;

  totalLinks: number;
  internalLinks: number;
  externalLinks: number;
  emailLinks: number;
  telephoneLinks: number;

  responseTime: number;
  performanceRating: string;

  recommendations: Recommendation[];
}