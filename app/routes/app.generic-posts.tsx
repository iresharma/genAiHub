import { GenericPosts } from "~/sections/genericPosts";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Generic Posts - GenAI Hub" },
    { name: "description", content: "Create and manage AI-generated social media content for your marketing needs" },
  ];
};

export default function GenericPostsPage() {
    return <GenericPosts />;
}