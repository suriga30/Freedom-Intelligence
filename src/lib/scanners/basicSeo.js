export function scanBasicSeo($) {
  // ==========================
  // BASIC SEO
  // ==========================

  const title = $("title").text().trim();

  const description =
    $('meta[name="description"]').attr("content") || "";

  const canonical =
    $('link[rel="canonical"]').attr("href") || "";

  const metaRobots =
    $('meta[name="robots"]').attr("content") || "";

  return {
    title,
    titleStatus: title
      ? "✅ Present"
      : "❌ Missing",

    description,
    descriptionStatus: description
      ? "✅ Present"
      : "❌ Missing",

    canonical,
    canonicalStatus: canonical
      ? "✅ Present"
      : "❌ Missing",

    metaRobots,
    metaRobotsStatus: metaRobots
      ? "✅ Present"
      : "❌ Missing",
  };
}