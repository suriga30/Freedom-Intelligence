export function scanOpenGraph($) {
  // ==========================
  // OPEN GRAPH
  // ==========================

  const ogTitle =
    $('meta[property="og:title"]').attr("content") || "";

  const ogDescription =
    $('meta[property="og:description"]').attr("content") || "";

  const ogImage =
    $('meta[property="og:image"]').attr("content") || "";

  const ogUrl =
    $('meta[property="og:url"]').attr("content") || "";

  const ogStatus =
    ogTitle ||
    ogDescription ||
    ogImage ||
    ogUrl
      ? "✅ Present"
      : "❌ Missing";

  return {
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogStatus,
  };
}