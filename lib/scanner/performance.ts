export interface PerformanceResult {
  responseTime: number;
  performanceRating: string;
  performanceScore: number;
}

export async function scanPerformance(
  website: string
): Promise<PerformanceResult> {
  const measurements: number[] = [];

  for (let i = 0; i < 3; i++) {
    const start = Date.now();

    try {
      await fetch(website, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });

      const responseTime = Date.now() - start;

      measurements.push(responseTime);
    } catch {
      measurements.push(10000);
    }
  }

  const sortedMeasurements = [...measurements].sort(
    (a, b) => a - b
  );

  const middleIndex = Math.floor(
    sortedMeasurements.length / 2
  );

  const responseTime =
    sortedMeasurements[middleIndex];

  let performanceScore = 30;

  if (responseTime <= 300) {
    performanceScore = 100;
  } else if (responseTime <= 500) {
    performanceScore =
      100 -
      ((responseTime - 300) / 200) * 15;
  } else if (responseTime <= 1000) {
    performanceScore =
      85 -
      ((responseTime - 500) / 500) * 20;
  } else if (responseTime <= 2000) {
    performanceScore =
      65 -
      ((responseTime - 1000) / 1000) * 35;
  }

  performanceScore = Math.round(
    Math.max(30, Math.min(100, performanceScore))
  );

  let performanceRating = "Poor 🔴";

  if (performanceScore >= 90) {
    performanceRating = "Excellent 🟢";
  } else if (performanceScore >= 75) {
    performanceRating = "Good 🟢";
  } else if (performanceScore >= 60) {
    performanceRating = "Fair 🟡";
  }

  return {
    responseTime,
    performanceRating,
    performanceScore,
  };
}