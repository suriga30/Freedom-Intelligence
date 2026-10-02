export interface RobotsResult {
  robotsUrl: string;
  robotsFound: boolean;
}

export async function scanRobots(
  website: string
): Promise<RobotsResult> {
  const robotsUrl = new URL(
    "/robots.txt",
    website
  ).toString();

  try {
    const response = await fetch(robotsUrl, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        robotsUrl,
        robotsFound: false,
      };
    }

    const contentType =
      response.headers.get("content-type") ?? "";

    const content = await response.text();

    const looksLikeRobotsFile =
      contentType.includes("text/plain") ||
      /(^|\n)\s*(user-agent|disallow|allow|sitemap)\s*:/i.test(
        content
      );

    return {
      robotsUrl,
      robotsFound: looksLikeRobotsFile,
    };
  } catch {
    return {
      robotsUrl,
      robotsFound: false,
    };
  }
}