import { Form, useActionData } from "@remix-run/react";
import { Blend, Info, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function ProductCreate() {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const actionData = useActionData<{ success?: boolean; error?: string }>();

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Product created successfully!");
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);


  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Convert file to base64
      setFileBlob(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoUrl(base64String);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo. Please try again.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fileBlob) {
      event.preventDefault();
      alert("Please upload a company logo");
      return;
    }

    // Upload to R2
    const formData = new FormData();

    // Remove background from image before uploading to R2
    const bgRemoveFormData = new FormData();
    bgRemoveFormData.append("image", fileBlob);

    const bgRemoveResponse = await fetch("/api/background-removal", {
      method: "POST",
      body: bgRemoveFormData,
    });

    if (!bgRemoveResponse.ok) {
      throw new Error("Failed to remove background from image");
    }

    const processedImageBlob = await bgRemoveResponse.blob();
    formData.append("file", processedImageBlob);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setLogoUrl(base64String);
    };
    reader.readAsDataURL(processedImageBlob);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload to R2");
      }

      const { url } = await response.json();

      // Add the R2 URL to a hidden input
      const logoInput = document.createElement("input");
      logoInput.type = "hidden";
      logoInput.name = "productImage";
      logoInput.value = url;
      (event.target as HTMLFormElement).appendChild(logoInput);
      (event.target as HTMLFormElement).submit();
    } catch (error) {
      event.preventDefault();
      console.error("Error uploading to R2:", error);
      alert("Failed to upload logo. Please try again.");
    }
  };

  return (
    <main>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">Create a new product.</p>
        </div>

        <Card className="bg-transparent">
          <CardContent>
            <Form onSubmit={handleSubmit} method="post" className="space-y-6">
              <div className="space-y-4 flex w-full justify-evenly items-start">
                <div className="w-full p-6">
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2 my-6">
                    <Label htmlFor="badges">Badges (comma-separated)</Label>
                    <Input
                      id="badges"
                      name="badges"
                      placeholder="e.g., new, featured, sale"
                    />
                  </div>

                  <div className="space-y-2 my-6">
                    <Label htmlFor="description" className="flex items-center">
                      Description
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 ml-2 text-primary" />
                          </TooltipTrigger>
                          <TooltipContent className="rounded-xl bg-secondary text-white text-center">
                            <p>
                              This will used as prompt to the model <br />
                              make sure this description is well versed
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter product description"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-6 p-6 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="logo-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {!logoUrl && (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-muted-foreground"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-muted-foreground">
                              Click to upload your logo
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        )}
                        {logoUrl && (
                          <img
                            src={logoUrl}
                            alt="Company Logo"
                            className="w-full h-full object-contain"
                          />
                        )}
                        <input
                          onChange={handleLogoUpload}
                          id="logo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Blend className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  We will be removing background from the product image, you
                  will be able to see the new image in the products page.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto rounded-xl">
                  Create Product
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
