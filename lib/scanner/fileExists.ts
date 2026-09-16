export async function fileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      return true;
    }

    // Some servers do not support HEAD requests.
    // Fall back to a lightweight GET request.
    if (response.status === 405) {
      const fallbackResponse = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });

      return fallbackResponse.ok;
    }

    return false;
  } catch {
    return false;
  }
}