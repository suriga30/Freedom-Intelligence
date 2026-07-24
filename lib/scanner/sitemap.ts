import { fileExists } from "./fileExists";

export interface SitemapResult {
  sitemapUrl: string;
  sitemapFound: boolean;
}

export async function scanSitemap(
  website: string
): Promise<SitemapResult> {

  const sitemapUrl = new URL(
    "/sitemap.xml",
    website
  ).toString();

  const sitemapFound =
    await fileExists(sitemapUrl);

  return {
    sitemapUrl,
    sitemapFound,
  };
}