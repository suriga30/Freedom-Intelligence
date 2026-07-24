import * as cheerio from "cheerio";

export interface BasicSeoResult {
  title: string;
  description: string;
  h1: string;
  canonical: string;
}

export function extractBasicSeo(html: string): BasicSeoResult {
  const $ = cheerio.load(html);

  return {
    title: $("title").text().trim(),

    description:
      $('meta[name="description"]').attr("content") ?? "",

    h1:
      $("h1").first().text().trim(),

    canonical:
      $('link[rel="canonical"]').attr("href") ?? "",
  };
}