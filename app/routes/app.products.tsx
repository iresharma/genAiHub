import { MetaFunction } from "@remix-run/react";
import { ProductList } from "~/sections/products";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export const meta: MetaFunction = () => {
    return [
      { title: "All Products - GenAI Hub" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };

export async function loader(args: LoaderFunctionArgs) {
  const {userId} = await getAuth(args);

  if (!userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(args.request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const response = await fetch(`${baseUrl}/api/products?page=1&limit=10`, {

      headers: {
        Cookie: args.request.headers.get("Cookie") || ""
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch products');
    }

    return json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return json({
      products: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
      },
    });
  }
}

export default function ProductsPage() {
    return <ProductList />
}