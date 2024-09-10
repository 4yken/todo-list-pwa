import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest:{
        display: 'standalone',
        display_override:['window-controls-overlay'],
        lang:'es-ES',
        name: 'Lista de Tareas',
        short_name: 'TO-DO List',
        description: 'PWA Lista de tareas',
        theme_color: '#ffffff',
        background_color:'',
        icons: [
          {
            src: 'Demogorgon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose:'any',
          },
          {
            src: 'Demogorgon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose:'maskable',
          }
        ]
      }
    })
  ],
})
