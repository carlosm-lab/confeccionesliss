import { createClient } from "@supabase/supabase-js";
import { revalidatePath, updateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PRODUCT_ID = "2656c3f1-fd1c-472c-a952-81bff0085c51";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, key);

  // 1. Get current is_featured value
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("is_featured, name")
    .eq("id", PRODUCT_ID)
    .single();

  if (fetchError || !product) {
    return NextResponse.json(
      { error: "Product not found", details: fetchError },
      { status: 404 }
    );
  }

  const newFeatured = !product.is_featured;

  // 2. Update is_featured in database
  const { error: updateError } = await supabase
    .from("products")
    .update({ is_featured: newFeatured, updated_at: new Date().toISOString() })
    .eq("id", PRODUCT_ID);

  if (updateError) {
    return NextResponse.json(
      { error: "Failed to update", details: updateError },
      { status: 500 }
    );
  }

  // 3. Call cache invalidation APIs (Same as Server Action)
  updateTag("products");
  updateTag("product-counts");
  revalidatePath("/");
  revalidatePath("/catalogo");

  return NextResponse.json({
    success: true,
    product: product.name,
    was_featured: product.is_featured,
    now_featured: newFeatured,
    message: "Data Cache tags expired and Full Route Cache invalidated.",
  });
}
