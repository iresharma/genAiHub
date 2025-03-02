import { useUser } from "@clerk/remix";
import { Form } from "@remix-run/react";
import {
  json,
  LoaderFunctionArgs,
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import { db } from "~/server/db.server";
import { users } from "~/lib/schema";
import { eq } from "drizzle-orm";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getAuth } from "@clerk/remix/ssr.server";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Complete Your Profile - GenAI Hub" },
    {
      name: "description",
      content:
        "Set up your company profile and preferences to get started with GenAI Hub",
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const companyName = formData.get("companyName")?.toString();
  const description = formData.get("description")?.toString();
  const industry = formData.get("industry")?.toString();
  const userId = formData.get("userId")?.toString();
  const companyLogo = formData.get("companyLogo")?.toString();

  if (!companyName || !description || !industry || !userId || !companyLogo) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (existingUser.length > 0) {
      return json({ error: "User already exists" }, { status: 400 });
    }

    // Create new user
    await db.insert(users).values({
      id: userId,
      companyName,
      companyDescription: description,
      industry,
      companyLogo,
      tokens: 50, // Starting tokens
    });

    return redirect("/app");
  } catch (error) {
    console.error("Error creating user:", error);
    return json({ error: "Failed to create user" }, { status: 500 });
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/");
  }

  return json({});
};

export default function Onboard() {
  const { user } = useUser();

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);

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
    formData.append("file", fileBlob);

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
      logoInput.name = "companyLogo";
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 chat-bg">
      <div className="max-w-2xl w-full mx-auto">
        <div className="space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground">
              Let's set up your company profile to personalize your AI-powered
              marketing experience
            </p>
          </div>

          <Form
            onSubmit={handleSubmit}
            method="post"
            className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input type="hidden" name="userId" value={user?.id} />
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your company and its unique value proposition..."
                  className="min-h-[200px]"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This description will be used to help our AI better understand
                  your brand voice and generate more relevant content.
                </p>
              </div>
            </div>

            <div className="space-y-6">
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

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select name="industry" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                Complete Setup
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
