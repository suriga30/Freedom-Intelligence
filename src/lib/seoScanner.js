import * as cheerio from "cheerio";

export async function scanWebsite(url) {
  // ==========================
  // FETCH WEBSITE
  // ==========================

  const response = await fetch(url);

  const html = await response.text();

  const $ = cheerio.load(html);

  // ==========================
  // BASIC SEO
  // ==========================

  const title = $("title").text().trim();

  const description =
    $('meta[name="description"]').attr("content") || "";

  const h1 = $("h1").first().text().trim();

  const canonical =
    $('link[rel="canonical"]').attr("href") || "";

  // ==========================
  // FAVICON
  // ==========================

  let favicon = "";

  const faviconTag =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href");

  if (faviconTag) {
    favicon = new URL(faviconTag, url).toString();
  } else {
    try {
      const faviconResponse = await fetch(
        new URL("/favicon.ico", url).toString()
      );

      if (faviconResponse.ok) {
        favicon = new URL("/favicon.ico", url).toString();
      }
    } catch {}
  }

  const faviconStatus =
    favicon ? "✅ Found" : "❌ Missing";

  // ==========================
  // HTTPS
  // ==========================

  const httpsStatus = url.startsWith("https://")
    ? "✅ Secure (HTTPS)"
    : "❌ Not Secure (HTTP)";

  // ==========================
  // ROBOTS
  // ==========================

  let robotsUrl = "";
  let robotsStatus = "❌ Missing";

  try {
    const robotsResponse = await fetch(
      new URL("/robots.txt", url).toString()
    );

    if (robotsResponse.ok) {
      robotsUrl = new URL("/robots.txt", url).toString();
      robotsStatus = "✅ Found";
    }
  } catch {}

  // ==========================
  // SITEMAP
  // ==========================

  let sitemapUrl = "";
  let sitemapStatus = "❌ Missing";

  try {
    const sitemapResponse = await fetch(
      new URL("/sitemap.xml", url).toString()
    );

    if (sitemapResponse.ok) {
      sitemapUrl = new URL("/sitemap.xml", url).toString();
      sitemapStatus = "✅ Found";
    }
  } catch {}

  // ==========================
  // SCORE
  // ==========================

  let seoScore = 0;

  if (title) seoScore += 15;
  if (description) seoScore += 15;
  if (h1) seoScore += 15;
  if (canonical) seoScore += 15;
  if (robotsStatus === "✅ Found") seoScore += 15;
  if (sitemapStatus === "✅ Found") seoScore += 15;
  if (faviconStatus === "✅ Found") seoScore += 10;

  return {
    website: url,

    seoScore,

    httpsStatus,

    title,
    titleStatus: title
      ? "✅ Present"
      : "❌ Missing",

    description,
    descriptionStatus: description
      ? "✅ Present"
      : "❌ Missing",

    h1,
    h1Status: h1
      ? "✅ Present"
      : "❌ Missing",

    canonical,
    canonicalStatus: canonical
      ? "✅ Present"
      : "❌ Missing",

    robotsUrl,
    robotsStatus,

    sitemapUrl,
    sitemapStatus,

    favicon,
    faviconStatus,
  };
}