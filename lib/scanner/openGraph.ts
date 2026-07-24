import * as cheerio from "cheerio";

export interface OpenGraphResult {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export function extractOpenGraph(
  html: string
): OpenGraphResult {

  const $ = cheerio.load(html);

  return {
    ogTitle:
      $('meta[property="og:title"]').attr("content") ?? "",

    ogDescription:
      $('meta[property="og:description"]').attr("content") ?? "",

    ogImage:
      $('meta[property="og:image"]').attr("content") ?? "",
  };
}