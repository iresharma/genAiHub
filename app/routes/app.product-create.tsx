import { MetaFunction } from "@remix-run/react";
import { ProductCreate } from "~/sections/createProduct";

export const meta: MetaFunction = () => {
    return [
      { title: "Add Product - GenAI Hub" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  

export default function CreateProductPage() {
    return <ProductCreate />;
}