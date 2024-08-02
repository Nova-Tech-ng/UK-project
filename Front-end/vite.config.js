import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Add this if you have a proxy
    proxy: {
      "/api": {
        target: "https://gregoryalpha.pythonanywhere.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
