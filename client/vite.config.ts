import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //To avoid cross origin issue since backend and frontend are on different origins(http://localhost:5000 & http://localhost:5173). Origins are protocol + domain + port. This proxy makes them look like the same origin to the browser while quitely forwarding the API calls to the backend
  //Only for dev though, during PROD the origin becommes the same, so not needed then
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
