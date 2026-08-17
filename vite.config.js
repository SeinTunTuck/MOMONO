import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? "/" : "/MOMONO/",
  define: {
    "import.meta.env.VITE_PUBLIC_ASSET_BASE": JSON.stringify(
      process.env.VERCEL ? "https://seintuntuck.github.io/MOMONO/assets/" : "",
    ),
  },
});
