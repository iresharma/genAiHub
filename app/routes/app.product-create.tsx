import { MetaFunction, useActionData } from "@remix-run/react";
import { ProductCreate } from "~/sections/createProduct";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { db } from "~/server/db.server";
import { products } from "~/lib/schema";

import { getAuth } from "@clerk/remix/ssr.server";
import { toast, ToastT } from "sonner";


export const meta: MetaFunction = () => {
    return [
      { title: "Add Product - GenAI Hub" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  
  export const action = async (args: ActionFunctionArgs) => {
    const formData = await args.request.formData();
  
    const { userId } = await getAuth(args);
  
    if (!userId) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const name = formData.get("name") as string;
    const badges = formData.get("badges") as string;
    const description = formData.get("description") as string;
    const productImage = formData.get("productImage") as string;
  
    if (!name || !description || !productImage) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }
  
    try {
      if (userId) {
        const product = await db.insert(products).values({
          name,
          badges,
          description,
          productImage,
          userId,
          category: ""
        });
        return json({ success: true, product });
      } else {
        return json({ error: "Unauthorized" }, { status: 401 });
      }
  
    } catch (error) {
      console.error("Failed to create product:", error);
      return json({ error: "Failed to create product" }, { status: 500 });
    }
  };

export default function CreateProductPage() {
    const actionData = useActionData<{success?: boolean, error?: string}>();
    if(actionData?.error) {
      toast.error("Failed adding product")
    } else if(actionData?.success) {
      toast.success("Product added successfully")
    }
    return <ProductCreate />;
}