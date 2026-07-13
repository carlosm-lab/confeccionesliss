import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Trigger cache invalidation using revalidateTag (which is allowed in Route Handlers)
  revalidateTag("products");
  revalidateTag("product-counts");
  revalidatePath("/");
  revalidatePath("/catalogo");

  return NextResponse.json({
    success: true,
    message:
      "Data Cache tags ('products', 'product-counts') revalidated and Full Route Cache for / and /catalogo invalidated.",
  });
}
