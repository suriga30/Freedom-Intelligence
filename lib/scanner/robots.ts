import { fileExists } from "./fileExists";

export interface RobotsResult {
  robotsUrl: string;
  robotsFound: boolean;
}

export async function scanRobots(
  website: string
): Promise<RobotsResult> {
  const robotsUrl = new URL("/robots.txt", website).toString();

  const robotsFound = await fileExists(robotsUrl);

  return {
    robotsUrl,
    robotsFound,
  };
}