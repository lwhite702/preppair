
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Try to import lovable-tagger, but don't fail if it's not available
  let componentTagger = () => null;
  try {
    const lovableTaggerImport = require('lovable-tagger');
    if (lovableTaggerImport && typeof lovableTaggerImport.componentTagger === 'function') {
      componentTagger = lovableTaggerImport.componentTagger;
    } else {
      console.warn('lovable-tagger found but componentTagger function not available');
    }
  } catch (error) {
    console.warn('lovable-tagger not found. Component tagging will be disabled.');
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
