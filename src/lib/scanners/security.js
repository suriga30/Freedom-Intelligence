export async function scanSecurity($, url) {
  // ==========================
  // HTTPS
  // ==========================

  const httpsStatus = url.startsWith("https://")
    ? "✅ Secure (HTTPS)"
    : "❌ Not Secure (HTTP)";

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
      const response = await fetch(
        new URL("/favicon.ico", url).toString()
      );

      if (response.ok) {
        favicon = new URL("/favicon.ico", url).toString();
      }
    } catch {}
  }

  return {
    httpsStatus,

    favicon,

    faviconStatus:
      favicon
        ? "✅ Found"
        : "❌ Missing",
  };
}