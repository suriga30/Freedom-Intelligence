export async function fileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });

    if (response.ok) {
      return true;
    }

    // Some servers reject HEAD requests even when the resource exists.
    // Fall back to GET for any non-successful HEAD response.
    const fallbackResponse = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });

    return fallbackResponse.ok;
  } catch {
    return false;
  }
}