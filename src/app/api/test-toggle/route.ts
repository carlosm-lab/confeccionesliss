import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Trigger cache invalidation using revalidateTag with the required 2-argument signature
    revalidateTag("products", "max");
    revalidateTag("product-counts", "max");
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
