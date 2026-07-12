import { NextResponse } from "next/server";

export async function GET() {
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

  if (!APPS_SCRIPT_URL) {
    console.error("Missing APPS_SCRIPT_URL in environment variables");
    return NextResponse.json(
      { status: "error", message: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "GET",
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      throw new Error("Failed to pull spreadsheet data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { status: "error", message: "Could not load the guest list" },
      { status: 500 },
    );
  }
}
