import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ecommerce-app-mern-10.onrender.com",
        changeOrigin: false,
      },
    },
  },
});

// "/api": {
//         target: "https://ecommerce-app-mern-6-3o32.onrender.com",
//         changeOrigin: true,
//         secure: false,
//       },
