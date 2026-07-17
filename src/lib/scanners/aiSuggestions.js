export function generateAISuggestions(report) {
  const suggestions = [];

  if (report.titleStatus !== "✅ Present") {
    suggestions.push({
      priority: "High",
      issue: "Missing Title Tag",
      recommendation:
        "Add a unique and descriptive title tag for every page.",
    });
  }

  if (report.descriptionStatus !== "✅ Present") {
    suggestions.push({
      priority: "High",
      issue: "Missing Meta Description",
      recommendation:
        "Write a compelling meta description between 140–160 characters.",
    });
  }

  if (report.h1Status !== "✅ Present") {
    suggestions.push({
      priority: "High",
      issue: "Missing H1 Heading",
      recommendation:
        "Every page should have one clear H1 heading.",
    });
  }

  if (report.missingAlt > 0) {
    suggestions.push({
      priority: "Medium",
      issue: "Images Missing ALT Text",
      recommendation:
        `Add ALT text to ${report.missingAlt} image(s).`,
    });
  }

  if (report.schemaCount === 0) {
    suggestions.push({
      priority: "Medium",
      issue: "Structured Data Missing",
      recommendation:
        "Implement JSON-LD Schema markup.",
    });
  }

  if (report.wordCount < 300) {
    suggestions.push({
      priority: "Medium",
      issue: "Low Word Count",
      recommendation:
        "Increase content depth to improve SEO.",
    });
  }

  return suggestions;
}