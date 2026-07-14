import { NextResponse } from "next/server";
import { scanWebsite } from "@/lib/seoScanner";

export async function POST(request) {
  try {
    const { website } = await request.json();

    let url = website.trim();

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = "https://" + url;
    }

    const result = await scanWebsite(url);

    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}