import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        menu: resolve(__dirname, "menu.html"),
        order: resolve(__dirname, "order.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        faq: resolve(__dirname, "faq.html"),
        privacy: resolve(__dirname, "privacy.html"),
        terms: resolve(__dirname, "terms.html"),
        disclaimer: resolve(__dirname, "disclaimer.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
