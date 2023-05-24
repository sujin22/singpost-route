import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/singpost-route/",
  server: {
    hmr:
      process.env.CODESANDBOX_SSE || process.env.GITPOD_WORKSPACE_ID
        ? 443
        : undefined,
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        route: "./route.html",
      },
    },
  },
  plugins: [
    {
      name: "copy-json",
      async writeBundle() {
        const fs = await import("fs");
        const path = await import("path");
        const fromPath = path.resolve(__dirname, "input-data/20230201_00001.json");
        const toPath = path.resolve(__dirname, "dist", "20230201_00001.json");
        fs.copyFileSync(fromPath, toPath);
      },
    },
  ],
});
