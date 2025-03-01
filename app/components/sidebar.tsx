"use client";

import { useEffect, useState } from "react";
import {
  Banknote,
  BarChart,
  Boxes,
  CircleFadingPlus,
  Cpu,
  Package,
  Zap,
  MessageCircle,
} from "lucide-react";
import { dark } from "@clerk/themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { UserButton } from "@clerk/remix";
import { Link, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

export function AppSideBar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/app/products-posts")) {
      setActiveItem("all-chats");
    } else if (location.pathname.startsWith("/app/generic-posts")) {
      setActiveItem("new-chat");
    } else if (location.pathname.startsWith("/app/product")) {
      setActiveItem("all-products");
    } else if (location.pathname.startsWith("/app/settings/model")) {
      setActiveItem("model-settings");
    } else if (location.pathname === "/app") {
      setActiveItem("dashboard");
    } else if (location.pathname === "/app/billing") {
      setActiveItem("billing");
    } else {
      setActiveItem("dashboard");
    }
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GenAI Hub</span>
          </div>

          <UserButton
            appearance={{ baseTheme: dark, layout: { shimmer: true } }}
            userProfileProps={{ appearance: { baseTheme: dark } }}
            afterSignOutUrl="/"
          />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link to={"/app"} viewTransition>
                    <SidebarMenuButton
                      isActive={activeItem === "dashboard"}
                      onClick={() => setActiveItem("dashboard")}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Generate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link to="/app/products-posts" viewTransition>
                    <SidebarMenuButton
                      isActive={activeItem === "all-chats"}
                      onClick={() => setActiveItem("all-chats")}
                    >
                      <Boxes className="h-4 w-4 mr-2" />
                      <span>Product posts</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link to="/app/generic-posts" viewTransition>
                    <SidebarMenuButton
                      isActive={activeItem === "new-chat"}
                      onClick={() => setActiveItem("new-chat")}
                    >
                      <CircleFadingPlus className="h-4 w-4 mr-2" />
                      <span>Generic posts</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Products</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link to={"/app/products"} viewTransition>
                    <SidebarMenuButton
                      isActive={activeItem === "all-products"}
                      onClick={() => setActiveItem("all-products")}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      <span>All Products</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeItem === "model-settings"}
                    onClick={() => setActiveItem("model-settings")}
                  >
                    <Cpu className="h-4 w-4 mr-2" />
                    <span>Model Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link to="/app/billing" viewTransition>
                    <SidebarMenuButton
                      isActive={activeItem === "billing"}
                      onClick={() => setActiveItem("billing")}
                    >
                      <Banknote className="h-4 w-4 mr-2" />
                      <span>Manage Subscription</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="rounded-xl">
                  Beta
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                We're currently in beta! Help us improve by sharing your
                feedback.
              </p>
              <Button
                variant="secondary"
                className="w-full rounded-xl"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </SidebarFooter>
        <SidebarTrigger className="absolute right-4 top-4 md:hidden" />
      </Sidebar>
    </SidebarProvider>
  );
}
