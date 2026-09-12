import { NextResponse } from "next/server";
import { scanWebsite } from "@/lib/scanner/scanner";

export async function POST(request: Request) {
  try {
    const { website } = await request.json();

    if (!website || typeof website !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Website URL is required.",
        },
        { status: 400 }
      );
    }

    let url = website.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    // Validate URL before sending it to the scanner
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid website URL, such as https://example.com",
        },
        { status: 400 }
      );
    }

    // Require a real hostname
    if (!parsedUrl.hostname || !parsedUrl.hostname.includes(".")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid website URL, such as https://example.com",
        },
        { status: 400 }
      );
    }

    const result = await scanWebsite(parsedUrl.toString());

    return NextResponse.json(result);
  } catch (error) {
    console.error("Website analysis failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to analyze this website. We couldn't reach the website. Please check the URL and try again.",
      },
      { status: 502 }
    );
  }
}