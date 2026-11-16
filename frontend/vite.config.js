import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // Listen on every interface so a phone on the same network can open the
    // app by this machine's IP.
    host: "0.0.0.0",

    port: 5173,

    strictPort: true,

    // The browser calls /api on this dev server, which forwards the request to
    // Spring Boot. The browser only ever talks to one origin, so the backend
    // needs no CORS setup, and a phone reaches the API through this machine
    // instead of looking for "localhost" on itself. `vite preview` reuses this
    // proxy.
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
})
