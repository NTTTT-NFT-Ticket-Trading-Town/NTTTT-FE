import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const TEST_URL = "https://ntttt.dxworks.co.kr/api/";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "^/api": {
        target: TEST_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.png"],
      manifest: {
        name: "NTTTT",
        short_name: "NTTTT",
        description: "Non-Fungible-Team-NFT-Project",
        start_url: "/",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
