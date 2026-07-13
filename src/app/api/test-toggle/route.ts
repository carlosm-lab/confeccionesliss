import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Try to trigger cache invalidation and capture any errors
    revalidateTag("products");
    revalidateTag("product-counts");
    revalidatePath("/");
    revalidatePath("/catalogo");

    return NextResponse.json({
      success: true,
      message:
        "Data Cache tags ('products', 'product-counts') revalidated and Full Route Cache for / and /catalogo invalidated.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || error,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
