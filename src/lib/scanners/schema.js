export function scanSchema($) {
  // ==========================
  // SCHEMA (JSON-LD)
  // ==========================

  const schemas = [];

  $('script[type="application/ld+json"]').each((i, element) => {
    try {
      const json = JSON.parse($(element).html());

      if (Array.isArray(json)) {
        json.forEach((item) => {
          if (item["@type"]) {
            schemas.push(item["@type"]);
          }
        });
      } else {
        if (json["@type"]) {
          schemas.push(json["@type"]);
        }
      }
    } catch {
      // Ignore invalid JSON-LD
    }
  });

  const uniqueSchemas = [...new Set(schemas)];

  return {
    schemaCount: uniqueSchemas.length,

    schemaTypes: uniqueSchemas,

    schemaStatus:
      uniqueSchemas.length > 0
        ? `✅ ${uniqueSchemas.length} Schema Found`
        : "❌ No Schema Found",
  };
}