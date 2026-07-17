export function scanHeadings($) {
  // ==========================
  // HEADINGS
  // ==========================

  const h1 = $("h1").first().text().trim();

  const h2Count = $("h2").length;

  const h3Count = $("h3").length;

  return {
    h1,
    h1Status: h1
      ? "✅ Present"
      : "❌ Missing",

    h2Count,
    h2Status:
      h2Count > 0
        ? `✅ ${h2Count} Found`
        : "❌ Missing",

    h3Count,
    h3Status:
      h3Count > 0
        ? `✅ ${h3Count} Found`
        : "❌ Missing",
  };
}