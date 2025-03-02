import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/server/db.server";
import { products } from "~/lib/schema";
import { eq } from "drizzle-orm";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  
  if (!userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(args.request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "10");
  const offset = (page - 1) * limit;

  try {
    const userProducts = await db.select()
      .from(products)
      .where(eq(products.userId, userId))
      .limit(limit)
      .offset(offset);

    const totalProducts = await db.select({ count: products.id })
      .from(products)
      .where(eq(products.userId, userId));

    const totalCount = totalProducts.length;
    const totalPages = Math.ceil(totalCount / limit);

    return json({
      products: userProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return json({ error: "Failed to fetch products" }, { status: 500 });
  }
};