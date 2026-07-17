export function scanWordCount($) {
  // ==========================
  // WORD COUNT
  // ==========================

  const bodyText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  const wordCount =
    bodyText.length > 0
      ? bodyText.split(" ").length
      : 0;

  let contentQuality = "";

  if (wordCount < 300) {
    contentQuality = "❌ Thin Content";
  } else if (wordCount < 1000) {
    contentQuality = "⚠️ Average Content";
  } else {
    contentQuality = "✅ Good Content";
  }

  return {
    wordCount,
    contentQuality,
  };
}