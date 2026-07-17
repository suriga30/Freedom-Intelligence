export function scanLinks($, websiteUrl) {
  // ==========================
  // LINKS
  // ==========================

  const links = $("a[href]");

  let internalLinks = 0;
  let externalLinks = 0;

  const baseDomain = new URL(websiteUrl).hostname;

  links.each((index, link) => {
    const href = $(link).attr("href");

    if (!href) return;

    // Ignore anchors, mailto, tel, javascript
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    try {
      const absoluteUrl = new URL(href, websiteUrl);

      if (absoluteUrl.hostname === baseDomain) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    } catch {
      // Ignore invalid URLs
    }
  });

  return {
    internalLinks,
    externalLinks,

    internalLinksStatus:
      internalLinks > 0
        ? `✅ ${internalLinks} Internal Links`
        : "❌ None",

    externalLinksStatus:
      externalLinks > 0
        ? `✅ ${externalLinks} External Links`
        : "❌ None",
  };
}