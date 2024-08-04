import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://backend-nova-3omg.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
