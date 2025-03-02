import { Outlet } from "@remix-run/react";
import { AppSideBar } from "~/components/sidebar";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - GenAI Hub" },
    { name: "description", content: "Manage your AI-powered marketing content and product posts" },
  ];
};

export default function App() {
  return (
    <div className="grid grid-cols-6 h-screen bg-background">
      <AppSideBar />
      <div className="col-span-6 md:col-span-5 h-screen overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}