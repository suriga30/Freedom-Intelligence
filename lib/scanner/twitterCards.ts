import * as cheerio from "cheerio";

export interface TwitterCardResult {
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export function extractTwitterCards(
  html: string
): TwitterCardResult {

  const $ = cheerio.load(html);

  return {
    twitterTitle:
      $('meta[name="twitter:title"]').attr("content") ?? "",

    twitterDescription:
      $('meta[name="twitter:description"]').attr("content") ?? "",

    twitterImage:
      $('meta[name="twitter:image"]').attr("content") ?? "",
  };
}