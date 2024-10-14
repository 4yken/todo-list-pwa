import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Lista de Tareas",
        short_name: "TO-DO List",
        description: "PWA Lista de tareas",
        lang: "es-ES",
        display: "standalone",
        display_override: ["window-controls-overlay"],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/icons/Demogorgon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/Demogorgon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
});
