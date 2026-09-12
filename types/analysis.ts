export interface Recommendation {
  priority: "High" | "Medium" | "Low";
  title: string;
  description: string;
}

export interface AIConsultantResult {
  summary: string;
  strengths: string[];
  priorities: string[];
}

export interface AnalysisResult {
  success: boolean;
  website: string;

  // Basic SEO
  title: string;
  description: string;
  h1: string;
  canonical: string;

  score: number;
  rating: string;

  // Website IQ
  websiteIQ: number;
  websiteIQRating: string;

  // Technical
  technicalScore: number;

  // Website Health
  overallHealth: number;
  healthGrade: string;
  healthStatus: string;
  criticalIssues: number;
  warnings: number;
  passedChecks: number;

  // Robots
  robotsUrl: string;
  robotsFound: boolean;

  // Sitemap
  sitemapUrl: string;
  sitemapFound: boolean;

  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  // Twitter Cards
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Security
  https: boolean;

  // Images
  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;

  // Links
  totalLinks: number;
  internalLinks: number;
  externalLinks: number;
  emailLinks: number;
  telephoneLinks: number;

  // Performance
  responseTime: number;
  performanceRating: string;
  performanceScore: number;

  // Accessibility
  hasLang: boolean;
  hasViewport: boolean;
  ariaLabels: number;
  formsWithoutLabels: number;
  headingStructure: boolean;
  accessibilityScore: number;

  // Recommendations
  recommendations: Recommendation[];

  // AI Website Consultant
  aiConsultant: AIConsultantResult;
}