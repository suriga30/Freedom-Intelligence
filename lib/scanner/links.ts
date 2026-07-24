import * as cheerio from "cheerio";

export interface LinkResult {
  totalLinks: number;
  internalLinks: number;
  externalLinks: number;
  emailLinks: number;
  telephoneLinks: number;
}

export function extractLinks(
  html: string,
  website: string
): LinkResult {
  const $ = cheerio.load(html);

  const links = $("a");

  let internalLinks = 0;
  let externalLinks = 0;
  let emailLinks = 0;
  let telephoneLinks = 0;

  const host = new URL(website).hostname;

  links.each((_, element) => {
    const href = $(element).attr("href");

    if (!href) return;

    if (href.startsWith("mailto:")) {
      emailLinks++;
      return;
    }

    if (href.startsWith("tel:")) {
      telephoneLinks++;
      return;
    }

    try {
      const url = new URL(href, website);

      if (url.hostname === host) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    } catch {
      // Ignore invalid URLs
    }
  });

  return {
    totalLinks: links.length,
    internalLinks,
    externalLinks,
    emailLinks,
    telephoneLinks,
  };
}