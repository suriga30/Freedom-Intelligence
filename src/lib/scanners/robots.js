export async function scanRobots(url) {
  // ==========================
  // ROBOTS.TXT
  // ==========================

  let robotsUrl = "";
  let robotsStatus = "❌ Missing";

  try {
    const response = await fetch(
      new URL("/robots.txt", url).toString()
    );

    if (response.ok) {
      robotsUrl = new URL("/robots.txt", url).toString();
      robotsStatus = "✅ Found";
    }
  } catch {}

  // ==========================
  // SITEMAP.XML
  // ==========================

  let sitemapUrl = "";
  let sitemapStatus = "❌ Missing";

  try {
    const response = await fetch(
      new URL("/sitemap.xml", url).toString()
    );

    if (response.ok) {
      sitemapUrl = new URL("/sitemap.xml", url).toString();
      sitemapStatus = "✅ Found";
    }
  } catch {}

  return {
    robotsUrl,
    robotsStatus,
    sitemapUrl,
    sitemapStatus,
  };
}