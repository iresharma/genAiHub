import { useUser } from "@clerk/remix";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export const meta: MetaFunction = () => {
  return [
    { title: "Complete Your Profile - GenAI Hub" },
    { name: "description", content: "Set up your company profile and preferences to get started with GenAI Hub" },
  ];
};

export default function Onboard() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 chat-bg">
      <div className="max-w-2xl w-full mx-auto">
        <div className="space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Complete Your Profile</h1>
            <p className="text-muted-foreground">Let's set up your company profile to personalize your AI-powered marketing experience</p>
          </div>

          <form className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your company and its unique value proposition..."
                  className="min-h-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  This description will be used to help our AI better understand your brand voice and generate more relevant content.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-muted-foreground">Click to upload your logo</p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="logo-upload" type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select>
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
          </form>
        </div>
      </div>
    </div>
  );
}