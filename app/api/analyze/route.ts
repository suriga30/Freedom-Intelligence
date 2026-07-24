import { NextResponse } from "next/server";
import { scanWebsite } from "@/lib/scanner/scanner";

export async function POST(request: Request) {
  try {
    const { website } = await request.json();

    if (!website) {
      return NextResponse.json(
        {
          success: false,
          message: "Website URL is required.",
        },
        {
          status: 400,
        }
      );
    }

    let url = website.trim();

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = "https://" + url;
    }

    const result = await scanWebsite(url);

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}