export function scanImages($) {
  // ==========================
  // IMAGES
  // ==========================

  const images = $("img");

  const imageCount = images.length;

  let missingAlt = 0;

  images.each((index, image) => {
    const alt = $(image).attr("alt");

    if (!alt || alt.trim() === "") {
      missingAlt++;
    }
  });

  return {
    imageCount,

    imageStatus:
      imageCount > 0
        ? `✅ ${imageCount} Images`
        : "❌ No Images",

    missingAlt,

    missingAltStatus:
      missingAlt === 0
        ? "✅ All Images Have ALT"
        : `⚠️ ${missingAlt} Missing ALT`,
  };
}