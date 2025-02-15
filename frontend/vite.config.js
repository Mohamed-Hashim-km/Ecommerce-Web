import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});

// "/api": {
//         target: "https://ecommerce-app-mern-6-3o32.onrender.com",
//         changeOrigin: true,
//         secure: false,
//       },
