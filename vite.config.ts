
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Internal development toolkit
import { componentTagger as devToolkit } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Development toolkit only used in development
    mode === 'development' &&
    devToolkit(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
