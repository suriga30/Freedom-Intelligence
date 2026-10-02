import * as cheerio from "cheerio";

export interface BasicSeoResult {
  title: string;
  description: string;
  h1: string;
  canonical: string;
}

export function extractBasicSeo(
  html: string
): BasicSeoResult {
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();

  const description =
    $('meta[name="description"]')
      .first()
      .attr("content")
      ?.trim() ?? "";

  const h1 = $("h1").first().text().trim();

  const canonical =
    $('link[rel~="canonical"]')
      .first()
      .attr("href")
      ?.trim() ?? "";

  return {
    title,
    description,
    h1,
    canonical,
  };
}