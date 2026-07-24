export interface PerformanceResult {
  responseTime: number;
  performanceRating: string;
}

export async function scanPerformance(
  website: string
): Promise<PerformanceResult> {

  const start = Date.now();

  await fetch(website);

  const responseTime = Date.now() - start;

  let performanceRating = "Poor 🔴";

  if (responseTime < 500) {
    performanceRating = "Excellent 🟢";
  } else if (responseTime < 1000) {
    performanceRating = "Good 🟢";
  } else if (responseTime < 2000) {
    performanceRating = "Fair 🟡";
  }

  return {
    responseTime,
    performanceRating,
  };
}