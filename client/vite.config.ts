import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //To avoid cross origin issue since backend and frontend are on different origins, this proxy makes them look like the same origin to the browser while quitely forwarding the API calls to the backend
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
