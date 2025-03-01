import { ProductPosts } from "~/sections/productPosts";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Product Posts - GenAI Hub" },
    { name: "description", content: "Generate and manage AI-powered social media posts for your products" },
  ];
};

export default function ProductPostsPage() {
    return <ProductPosts />;
}