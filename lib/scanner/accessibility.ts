import * as cheerio from "cheerio";

export interface AccessibilityResult {
  hasLang: boolean;
  hasViewport: boolean;
  ariaLabels: number;
  formsWithoutLabels: number;
  headingStructure: boolean;
  accessibilityScore: number;
}

export function scanAccessibility(
  html: string
): AccessibilityResult {
  const $ = cheerio.load(html);

  const hasLang = Boolean(
    $("html").attr("lang")
  );

  const hasViewport = Boolean(
    $('meta[name="viewport"]').attr("content")
  );

  const ariaLabels = $(
    "[aria-label]"
  ).length;

  let formsWithoutLabels = 0;

  $("input, select, textarea").each(
    (_, element) => {
      const field = $(element);

      const type =
        field.attr("type")?.toLowerCase();

      if (type === "hidden") {
        return;
      }

      const hasAriaLabel =
        Boolean(field.attr("aria-label")) ||
        Boolean(field.attr("aria-labelledby"));

      const id = field.attr("id");

      const hasAssociatedLabel =
        Boolean(
          id &&
            $(
              `label[for="${id.replace(
                /"/g,
                '\\"'
              )}"]`
            ).length
        ) ||
        field.parents("label").length > 0;

      if (
        !hasAriaLabel &&
        !hasAssociatedLabel
      ) {
        formsWithoutLabels++;
      }
    }
  );

  const h1Count = $("h1").length;

  const headingStructure = h1Count === 1;

  let score = 100;

  if (!hasLang) {
    score -= 20;
  }

  if (!hasViewport) {
    score -= 10;
  }

  if (formsWithoutLabels > 0) {
    score -= Math.min(
      30,
      formsWithoutLabels * 5
    );
  }

  if (!headingStructure) {
    score -= 15;
  }

  score = Math.max(
    0,
    Math.min(100, score)
  );

  return {
    hasLang,
    hasViewport,
    ariaLabels,
    formsWithoutLabels,
    headingStructure,
    accessibilityScore: score,
  };
}