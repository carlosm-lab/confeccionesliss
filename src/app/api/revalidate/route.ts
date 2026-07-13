import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  if (secret !== "supersecretrevalidate123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath(path);
    if (path === "/") {
      revalidatePath("/catalogo");
      revalidatePath("/(public)", "page");
      revalidatePath("/(public)/catalogo", "page");
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      success: true,
      message: `Revalidation triggered successfully for path: ${path}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
