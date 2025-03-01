import { MetaFunction } from "@remix-run/react";
import { ProductList } from "~/sections/products";

export const meta: MetaFunction = () => {
    return [
      { title: "All Products - GenAI Hub" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  

export default function ProductsPage() {
    return <ProductList />
}