import { MetaFunction } from "@remix-run/react";
import { Dashboard } from "~/sections/dashboard";

export const meta: MetaFunction = () => {
    return [
      { title: "DashBoard - GenAI Hub" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  

export default function DashboardPage() {
    return <Dashboard />;
}