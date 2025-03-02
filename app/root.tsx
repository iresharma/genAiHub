import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import { Toaster } from "~/components/ui/sonner";
import { useEffect } from "react";
import NProgress from "nprogress";

import "./tailwind.css";

// Create a ProgressBar component with inline styles
function ProgressBar() {
  const navigation = useNavigation();
  
  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      minimum: 0.1,
      showSpinner: false,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 200,
    });
    
    if (navigation.state === "loading" || navigation.state === "submitting") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);
  
  return null;
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = (args: DataFunctionArgs) => rootAuthLoader(args);

function App() {
  return (
    <html lang="en" className="dark" style={{ background: "#030712" }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Add NProgress styles directly */}
        <style>
          {`
            /* Make clicks pass-through */
            #nprogress {
              pointer-events: none;
            }
            
            #nprogress .bar {
              background: #ad94ef;
              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;
              width: 100%;
              height: 4px;
            }
            
            /* Fancy blur effect */
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              box-shadow: 0 0 10px #29d, 0 0 5px #29d;
              opacity: 1.0;
              transform: rotate(3deg) translate(0px, -4px);
            }
          `}
        </style>
      </head>
      <body>
        <ProgressBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default ClerkApp(App);