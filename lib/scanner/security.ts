export interface SecurityResult {
  https: boolean;
}

export async function scanSecurity(
  website: string
): Promise<SecurityResult> {
  const url = new URL(website);

  return {
    https: url.protocol === "https:",
  };
}