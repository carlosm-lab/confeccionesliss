import { revalidatePath, updateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Trigger cache invalidation for the products tag and the pages
  updateTag("products");
  updateTag("product-counts");
  revalidatePath("/");
  revalidatePath("/catalogo");

  return NextResponse.json({
    success: true,
    message:
      "Data Cache tags ('products', 'product-counts') expired and Full Route Cache for / and /catalogo invalidated.",
  });
}
