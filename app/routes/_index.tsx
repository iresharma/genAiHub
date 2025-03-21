import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

import { SignInButton, SignUpButton, useUser } from "@clerk/remix";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

export default function Index() {
  const { user } = useUser();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md mx-auto bg-card rounded-xl shadow-lg p-8 border border-border">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
            Welcome to <span className="text-primary">GenAI Hub</span>
          </h1>
          <div className="h-[100px] w-[300px] mx-auto my-4">
            <img
              src="/logo-light.png"
              alt="GenAI Hub"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="GenAI Hub"
              className="hidden w-full dark:block"
            />
          </div>
          <div className="flex gap-3 justify-center">
            {user && <p>
              Welcome {user.firstName}!
              <Link to="/app">
                <Button>Dashboard</Button>
              </Link>
            </p>}
            {!user && <><SignInButton mode="redirect" forceRedirectUrl="/app">
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-base">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="redirect" forceRedirectUrl="/onboard">
              <button className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium text-base">
                Sign Up
              </button>
            </SignUpButton></>}
          </div>
        </div>
      </div>
    </div>
  );
}
