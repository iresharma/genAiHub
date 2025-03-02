import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      serverModuleFormat: "esm",
    }),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            if (id.includes('react') || id.includes('@clerk/remix')) {
              return 'vendor';
            }
            if (id.includes('onnxruntime-web')) {
              return 'onnx';
            }
            if (id.includes('@imgly/background-removal-node')) {
              return 'imgProcessing';
            }
          }
        }
      },
    },
  },
});